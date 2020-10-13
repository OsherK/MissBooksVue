<template>
  <main v-if="book" class="book-details-page flex justify-around">
    <section class="book-details">
      <nav class="absolute book-nav">
        <button @click="changeBook(-1)">Prev</button>
        <button @click="changeBook(1)">Next</button>
      </nav>
      <button class="exit-btn" @click="onLeave">X</button>
      <h1>{{ book.title }}</h1>
      <h3>{{ book.subtitle }}</h3>
      <img :src="book.thumbnail" alt="Loading..." />
      <h3>Authors: {{ bookAuthors }}</h3>
      <h3>Publish Date: {{ bookAge }}}</h3>
      <h5>Length: {{ bookLength }}</h5>
      <h5>Language: {{ book.language }}</h5>
      <long-text :txt="book.description" :length="20" />
      <h2>Price: {{ bookPrice }}</h2>
    </section>
    <section class="review-container">
      <review-add />
      <review-list :reviews="getReviews" />
    </section>
  </main>
</template>

<script>
import { bookService } from "../services/book-service.js";
import eventBus from "../services/event-bus-service.js";
import LongText from "../cmps/LongText";
import ReviewList from "../cmps/ReviewList";
import ReviewAdd from "../cmps/ReviewAdd";
export default {
  data() {
    return {
      book: null,
    };
  },
  async created() {
    this.book = await this.$store.dispatch({type: 'getBook', bookId: this.$route.params.id})
    eventBus.$on('remove-review', this.removeReview);
    eventBus.$on('add-review', this.addReview)
  },
  destroyed(){
    eventBus.$off('remove-review', this.removeReview);
    eventBus.$off('add-review', this.addReview)
  },
  methods: {
    onLeave() {
      this.$router.push("/");
    },
    async addReview(review) {
      const bookId = this.book.id;
      const reviewToSave = await bookService.addReview(review, bookId);
      eventBus.$emit("user-msg", { txt: "Review added!", type: "success" });
      this.$store.commit({type: 'addReview', reviewToSave, bookId})
    },
    async removeReview(reviewId) {
      const bookId = this.book.id;
      bookService.removeReview(reviewId,bookId);
      eventBus.$emit("user-msg", { txt: "Review removed!", type: "failure" });
      this.$store.commit({type: 'removeReview', reviewId, bookId})
    },
    async changeBook(diff){
      this.book =  await this.$store.dispatch({type: 'getNearBook', diff, bookId: this.book.id})
      this.$router.push(`/book/${this.book.id}`)
    }
  },
  computed: {
    bookAge() {
      const { publishedDate } = this.book;
      const age = new Date().getFullYear() - publishedDate;
      if (age <= 1) return `${publishedDate} New!`;
      else if (age >= 10) return `${publishedDate} Veteran Book`;
      else return publishedDate;
    },
    bookLength() {
      const { pageCount } = this.book;
      if (pageCount > 500) return "Long reading";
      else if (pageCount > 200) return "Decent reading";
      else return "Light reading";
    },
    bookPrice() {
      const { currencyCode, amount } = this.book.listPrice;
      switch (currencyCode) {
        case "EUR":
          return `${amount}€`;
        case "ILS":
          return `${amount}₪`;
        case "USD":
          return `${amount}$`;
        default:
          break;
      }
    },
    bookAuthors() {
      console.log(this.book);
      return this.book.authors.join(" ");
    },
    getReviews() {
      const { book } = this;
      return book.reviews;
    },
  },
  components: {
    LongText,
    ReviewList,
    ReviewAdd,
  },
};
</script>

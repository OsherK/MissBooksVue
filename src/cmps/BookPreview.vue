<template>
  <article @click="moveToDetails" class="book-preview">
    <button @click.stop="removeBook" class="remove-btn absolute">X</button>
    <h1 class="title">{{ book.title }}</h1>
    <img :src="book.thumbnail" alt="">
    <h3 :class="getPriceColor">{{book.listPrice.amount + getCurrencyIcon}}</h3>
    <div v-if="book.listPrice.isOnSale" class='on-sale'>On Sale!</div>
  </article>
</template>

<script>
export default {
  props: ["book"],
  computed:{
    getPriceColor(){
      const price = this.book.listPrice.amount
        if (price > 150) return 'red';
        else if (price < 20) return 'green'
        return ''
    },
    getCurrencyIcon(){
      const currency = this.book.listPrice.currencyCode;
      switch (currency) {
            case 'EUR':
                return '€';
            case 'ILS':
                return '₪';
            case 'USD':
                return '$';
            default:
               return '';
        }
    }
  },
  methods:{
    moveToDetails(){
      this.$router.push(`/book/${this.book.id}`)
    },
    removeBook(){
      this.$store.commit({type: 'removeBook', bookId: this.book.id})
    }
  }
};
</script>
<style lang="scss">

</style>
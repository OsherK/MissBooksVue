<template>
    <ul class="review-list">
      Reviews
      <review-preview
        v-for="review in getReviews"
        :key="review.id"
        :review="review"
      />
    </ul>
</template>

<script>
import ReviewPreview from "./ReviewPreview";
export default {
  props: ["reviews"],
  components: {
    ReviewPreview,
  },
  computed: {
    getReviews() {
      const { reviews } = this;
      return reviews;
    },
  },
};
</script>

<style>
</style>
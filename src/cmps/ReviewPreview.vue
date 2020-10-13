<template>
  <li class="review-preview">
    <button @click="onRemoveReview">X</button>
    <h3>By: {{ review.name }}</h3>
    <h4>Read at:{{ review.reviewDate }}</h4>
    <h4>Rateing: {{ reviewRate }}</h4>
    <div class="flex justify-around"></div>
    <p>
      {{ review.desc }}
    </p>
  </li>
</template>

<script>
import moment from "moment";

import { bookService } from "../services/book-service.js";
import eventBus from "../services/event-bus-service.js";
export default {
  props: ["review"],
  methods: {
    async onRemoveReview() {
      eventBus.$emit("remove-review", this.review.id);
    },
  },
  computed: {
    reviewDate() {
      moment(this.review.readAt).format("DD/MM/YY");
    },
    reviewRate() {
      return `${this.review.rate}/5`;
    },
  },
};
</script>

<style>
</style>
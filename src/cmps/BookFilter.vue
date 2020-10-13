<template>
  <section class="book-filter flex column align-center">
      <input @input="handleChange" placeholder="Search for a book..." type="text" v-model="title">
      Price
      <div>
    <label>
      From
      <input @input="handleChange" placeholder="Minimum book price" type="number" v-model="minPrice">
    </label>
    <label>
      To
      <input @input="handleChange" placeholder="Maimum book price" type="number" v-model="maxPrice">
    </label>        
      </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      title: '',
      minPrice: 0,
      maxPrice: 0
    }
  },
  methods:{
    handleChange(){
      const {title, minPrice, maxPrice} = this;
      this.$emit('set-filter', {title, minPrice, maxPrice})
    }
  }
}
</script>

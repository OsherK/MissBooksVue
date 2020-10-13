<template>
  <div class="book-add flex column">
      <input @blur="setShown(false)" @focus="setShown(true)" @input="searchBook" type="text" v-model="searchVal" placeholder="Add a book!">
      <ul class="results absolute" v-if="results && isShown">
          <li v-for="(title, idx) in showResults" :key="idx" @mousedown="addBook(idx)">{{title}}</li>
      </ul>
  </div>
</template>

<script>
import {bookService} from '../services/book-service.js';
export default {
    data(){
        return {
            results: null,
            searchVal: '',
            isShown: false
        }
    },
    methods:{
        async searchBook(){
            this.results = await bookService.searchGoogleBooks(this.searchVal);
        },
        addBook(idx){
            const book = this.results[idx];
            const bookToSave = bookService.addGoogleBook(book);
            this.$store.commit({type: 'addBook', bookToSave});
            this.searchVal = '';
            this.results = null;
        },
        setShown(val){
            this.isShown = val;
        }
        },
    computed:{
        showResults(){
            const titles = this.results.map(result => result.volumeInfo.title)
            return titles;
        }
    }
}
</script>

<style>

</style>
<template>
<main>
    <book-add />
  <book-filter @set-filter="filterBooks" />
  <book-list :books="booksToShow" />
</main>
</template>

<script>
import BookList from '../cmps/BookList'
import BookFilter from '../cmps/BookFilter'
import BookAdd from '../cmps/BookAdd'
import {bookService} from '../services/book-service.js'
export default {
    data(){
        return {}
    },
    computed:{
        booksToShow(){
            return this.$store.getters.booksToShow;
        }
    },
    methods:{
        filterBooks(filterBy){
      this.$store.commit({type:'setBooksFilterBy', filterBy})
        }
    },
    components:{
        BookList,
        BookFilter,
        BookAdd
    }
}
</script>

<style>

</style>
<template>
    <ul class="book-list">
        <li v-for="currBook in books" :key="currBook.id">
            <book-preview :book="currBook" />
        </li>
    </ul>
</template>

<script>
import BookPreview from './BookPreview'
export default {
    props:['books'],
    components:{
        BookPreview
    }
}
</script>

<style>
.book-list {
    display: grid;
    list-style: none;
    grid-template: repeat(auto-fit, 500px) / repeat(auto-fit, 300px);
    grid-gap: 20px;
    list-style: none;
    padding: 0 20px;
    width: fit-content;
    max-width: 90%;
    margin: 15px auto 0;
}
</style>
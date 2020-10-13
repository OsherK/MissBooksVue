
import {bookService} from '../../services/book-service';


export default {
    state: {
        books: null,
        booksFilterBy: {}
    },
    getters: {
        booksToShow(state) {
            const {books, booksFilterBy} = state;
            let newBooks = JSON.parse(JSON.stringify(books));
            if(booksFilterBy.title){
                newBooks = newBooks.filter(book => book.title.toLowerCase().includes(booksFilterBy.title.toLowerCase()))
            }
            if(booksFilterBy.minPrice){
                newBooks = newBooks.filter(book => book.listPrice.amount >= booksFilterBy.minPrice)
            }
            if(booksFilterBy.maxPrice){
                newBooks = newBooks.filter(book => book.listPrice.amount <= booksFilterBy.maxPrice)
            }
            return newBooks;
        }
    },
    mutations: {
        setBooks(state, { books }) {
            state.books = books
        },
        addBook(state, {bookToSave}){
            state.books.unshift(bookToSave)
        },
        removeBook(state, { bookId }) {
            bookService.removeBook(bookId)
            const idx = state.books.findIndex(book => book.id === bookId)
            state.books.splice(idx, 1)
        },
        setBooksFilterBy(state, { filterBy }) {
            state.booksFilterBy = filterBy
        },
        removeReview(state, {reviewId, bookId}){
            const idx = state.books.findIndex(book => book.id === bookId)
            const reviewIdx = state.books[idx].reviews.findIndex(review => review.id === reviewId);
            state.books[idx].reviews.splice(reviewIdx, 1)
        },
        addReview(state, {reviewToSave, bookId}){
            const idx = state.books.findIndex(book => book.id === bookId)
            state.books[idx].reviews.push(reviewToSave)
        }
    },
    actions: {
        async loadBooks(context) {
            const books = await bookService.query()
            context.commit({ type: 'setBooks', books })
        },
        async removeBook({ commit }, { id }) {
            await bookService.remove(id)
            commit({ type: 'removeBook', id })
        },
        async getBook({state}, { bookId }) {
            return state.books?.find(book => book.id === bookId)
        },
        getNearBook({state}, {diff, bookId}){
            console.log(diff, bookId);
            console.log(state);
            let idx = state.books.findIndex(book => book.id === bookId);
            const length = state.books.length
            idx += diff;
            if(idx === length) idx =  0;
            if(idx === -1) idx = length - 1;
            return state.books[idx];
        }
    },
    modules: {}
}
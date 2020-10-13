import Vue from 'vue'
import VueRouter from 'vue-router'

import Books from '../views/Books.vue'
import BookDetails from '../views/BookDetails.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/book',
    name: 'Books',
    component: Books
  },
  {
    path: '/book/:id',
    name: 'BookDetails',
    component: BookDetails
  },
]

const router = new VueRouter({
  routes
})

export default router

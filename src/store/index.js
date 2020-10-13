import Vue from 'vue'
import Vuex from 'vuex'

import bookModule from './module/book-module'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: Vue.config.devtools,
  state: {
  },
  getters: {
  },
  mutations: {},
  actions: {

  },
  modules: {
    bookModule
  }
})

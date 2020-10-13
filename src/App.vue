<template>
  <div id="app">
    <app-header />
    <router-view />
    <user-msg />
  </div>
</template>

<script>
import AppHeader from './cmps/AppHeader';
import UserMsg from './cmps/UserMsg';
export default {
  created(){
    this.$store.dispatch({type: 'loadBooks'})
  },
  components:{
    AppHeader,
    UserMsg
  }
}
</script>

<style lang="scss">

</style>

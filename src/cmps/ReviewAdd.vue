<template>
  <form class="review-add flex column" @submit.prevent="addReview">
      <h3>Add a review!</h3>
      <input type="text" placeholder="enter your name" v-model="name">
      <input type="date" v-model="readAt">
      <select v-model="rate">
          <option v-for="n in 5" :value="n" :key="n">{{n}}</option>
      </select>
      <textarea v-model="desc"/>
      <button type="submit">Save</button>
  </form>
</template>

<script>
import eventBus from '../services/event-bus-service.js';
export default {
    data(){
        return {
            name: '',
            readAt: new Date().toISOString().substr(0, 10),
            desc: '',
            rate: 5
        }
    },
    methods:{
        addReview(){
            const {name, readAt, desc, rate} = this;
            if(!name || !readAt || !desc) return;
            eventBus.$emit('add-review', {name, readAt, desc, rate})
        }
    },
    computed:{
        getCurrDate(){
            return moment().format('yyy/MM/dd')
        }
    }
}
</script>

<style>

</style>
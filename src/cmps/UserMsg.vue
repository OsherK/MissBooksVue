<template>
  <div v-if="txt" class="user-msg flex column justify-around" :class="type">
    <p>{{ txt }}</p>
    <router-link v-if="link" :to="link" />
    <button @click="hideMsg" >X</button>
    <span>{{userMsg}}</span>
  </div>
</template>

<script>
import eventBus from "../services/event-bus-service.js";
export default {
  data() {
    return {
      txt: "",
      type: "",
      link: "",
      timeout: null
    };
  },
  created(){
    eventBus.$on('user-msg', this.setMsg)
  },
  computed:{
    userMsg(){
      return this.$store.getters.userMsg
    }
  },
  methods:{
      setMsg(msg){
        this.txt = msg.txt;
        this.type = msg.type;
        this.link = msg.link;
        this.timeout = setTimeout(() => {
            this.hideMsg()
        }, 3000)
      },
      hideMsg(){
          this.txt = '';
          this.type = '';
          this.link = '';
          clearTimeout(this.timeout);
      }
  }
};
</script>

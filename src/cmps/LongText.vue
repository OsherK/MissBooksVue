<template>
<div>
  <p>
      {{getTxt}}
  </p>
    <button @click="toggleShown">Toggle</button>
</div>
</template>

<script>
export default {
    props:['txt', 'length'],
    data(){
        return {
            isShown: false
        }
    },computed:{
        getTxt(){
            const {txt, isShown, length} = this;
            return isShown ? txt : txt.substr(0, length) + '...';
        },
        getBtnTxt(){
            const {isShown} = this;
            return isShown ? 'Show Less' : 'Show More'
        }
    },
    methods:{
        toggleShown(){
            this.isShown = !this.isShown;
        }
    }
    
}
</script>

<style>

</style>
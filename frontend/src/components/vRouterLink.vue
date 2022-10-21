<template>
  <router-link :class="classStyle" :to="to" @click.native="selectMenu">
    <slot >Home</slot>
  </router-link>
  
</template>

<script setup> 
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router'

  const selected = ref(false)

  const selectMenu = (e) => {
    console.log('selecting .. :>> ', e.target);
  }
defineEmits({
  selecting(payload) {
    console.log('payload :>> ', payload);
  }
})

defineProps({
  to: {
    type: Object,
    default() {
      return {
        name: 'home',
      }
    }
  },
  classStyle: {
    type: String
  }
  
})
</script>

<style>

</style>
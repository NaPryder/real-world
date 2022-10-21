<template>
  <router-link :to="toPath" :class="className">
    {{tagName}}
  </router-link>
</template>

<script setup>

 
defineProps({
  tagName: {
    type: String
  },
  className: {
    type:String,
    default: 'tag-pill tag-default'
  },
  toPath: {
    type:Object,
    default() {
      return {name: 'home-tag-feed', params: { tag: 'A'}}
    }
  }
})

</script>

<style>

</style>
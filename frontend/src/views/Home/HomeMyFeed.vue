<template>

  <ArticlePreviews :multipleArticles="multipleArticles">
    My Feed
  </ArticlePreviews>
</template>

<script setup> 
import ArticlePreviews from '@/components/ArticlePreviews.vue'

defineProps({
  multipleArticles: Object
})
</script>

<style>

</style>
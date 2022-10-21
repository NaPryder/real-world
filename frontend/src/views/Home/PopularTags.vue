<template>
  <div class="col-md-3">
      <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <vTag v-for="tag in taglist" :key="tag.id">
              <template #tagName >{{tag}}</template>
            </vTag>
            
          </div>
      </div>
  </div>
</template>

<script setup> 
import vTag from '@/components/vTag.vue'

defineProps({
  taglist: {
    type: Array,
    default(rawProps) {
      return [
        "Tag1" ,
        "Tag2" ,
        "Tag3" ,
        "angularjs" ,
        "react" ,
        "mean" ,
        "node" ,
        "rails" ,
      ]
    }
  }
})
</script>

<style>

</style>

<template>
  <main>
    <div class="home-page">

      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">

          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <router-link class="nav-link" active-class="active" :to="{name: 'home-my-feed'}">Your Feed</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" active-class="active" :to="{name: 'home-global-feed'}">Global Feed</router-link>
                </li>

                <!-- Tag Param -->
                <li class="nav-item" v-if="tag">
                  <router-link class="nav-link" active-class="active" :to="{name: 'home-tag-feed', params: { tag }}">Tag: {{tag}}</router-link>
                </li>
              </ul>
            </div>

            <!-- multiple article-->
            <RouterView :multipleArticles="multipleArticles" />
            
            
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <!-- Tag list -->
              <div class="tag-list">
                <vTag 
                  v-for="tag in taglist" 
                  :key="tag.id"
                  :tagName=tag 
                  :toPath="{name: 'home-tag-feed', params: { tag }}"
                  >
                </vTag>
                <!-- <router-link 
                  v-for="tag in taglist" 
                  :key="tag.id"
                  :to="{name: 'home-tag-feed', params: { tag }}" 
                  class="tag-pill tag-default" 
                  >
                  {{tag}}
                </router-link> -->
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { computed, watch} from 'vue';
import { useStore } from 'vuex'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import vTag from '@/components/vTag.vue'

const store = useStore()

const tag = computed(() => {
  const route = useRoute()
  return route.params.tag ? route.params.tag : ""
})

const multipleArticles = {
  articles: [{
    slug: "aaa",
    title: "AAA",
    description: "Ever wonder how?",
    body: "It takes a Jacobian",
    tagList: ["dragons", "training"],
    createdAt: "2016-02-18T03:22:56.637Z",
    updatedAt: "2016-02-18T03:48:35.824Z",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "jake",
      bio: "I work at statefarm",
      image: "https://cdn-icons-png.flaticon.com/512/3033/3033143.png",
      following: false
    }
  }, 
  {
    slug: "how-to-train-your-dragon-2",
    title: "How to train your dragon 2",
    description: "So toothless",
    body: "It a dragon",
    tagList: ["dragons", "training"],
    createdAt: "2016-02-18T03:22:56.637Z",
    updatedAt: "2016-02-18T03:48:35.824Z",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "Tomas",
      bio: "I am developer",
      image: "https://cdn-icons-png.flaticon.com/512/3033/3033143.png",
      following: false
    }
  }],
  articlesCount: 2
}
const taglist = [
        "Tag1" ,
        "Tag2" ,
        "Tag3" ,
        "Tag4" ,
        "react" ,
        "mean" ,
        "node" ,
        "rails" ,
      ]


</script>

<style lang="scss" scoped>

</style>
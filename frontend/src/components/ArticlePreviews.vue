<template>
  <slot></slot>
  <div class="article-preview" v-for="article in multipleArticles.articles" :key="article.slug">
    <ArticleBlock :article="article" />
  </div>
</template>

<script setup> 
import ArticleBlock from '@/components/ArticleBlock.vue'

defineProps({
  multipleArticles: {
    type: Object,
    default:() => {
      return {
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
            username: "jake",
            bio: "I work at statefarm",
            image: "https://cdn-icons-png.flaticon.com/512/3033/3033143.png",
            following: false
          }
        }],
        articlesCount: 2
      }
    }
    
  }
})
</script>

<style>

</style>
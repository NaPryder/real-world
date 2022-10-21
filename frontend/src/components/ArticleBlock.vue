<template>
  <div class="article-meta">

    <router-link :to="`profile/${article.author.username}`">
      <img :src="article.author.image"/>
    </router-link>
    <div class="info">
      <a href="" class="author">{{article.author.username}}</a>
      <span class="date">{{article.updatedAt}}</span>
    </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
          <i class="ion-heart"></i> {{article.favoritesCount}}
      </button> 
  </div>

  <a href="" class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
  </a>
</template>

<script setup>


defineProps({
  article: {
    type: Object,
    default(rawProps) {
      return {
        slug: "how-to-train-your-dragon",
        title: "How to train your dragon",
        description: "Ever wonder how?",
        body: "It takes a Jacobian",
        tagList: ["dragons", "training"],
        createdAt: "2016-02-18T03:22:56.637Z",
        updatedAt: "2016-02-18T03:48:35.824Z",
        favorited: false,
        favoritesCount: 3,
        author: {
          username: "jake",
          bio: "I work at statefarm",
          image: "https://cdn-icons-png.flaticon.com/512/3033/3033143.png",
          following: false
        }
      }
    },
  }
})

</script>

<style>

</style>
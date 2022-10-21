<template>
  <nav class="navbar navbar-light">
    <div class="container">

      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Home
      </router-link>

      <!-- <a class="navbar-brand" href="#">Real World</a> -->
      <ul class="nav navbar-nav pull-xs-right">
        <!-- Add "active" class when you're on that page" -->

        <li class="nav-item" v-for="route in routes" :key="route.id">
          <router-link class="nav-link" :to="{name: route.name}" v-if="!route.meta.checkLogin">
            {{route.meta.title}}
          </router-link>

          <!-- show if not login -->
          <router-link class="nav-link" :to="{name: route.name}" v-if="route.meta.checkLogin && !isLogin">
            {{route.meta.title}}
          </router-link>
          
        </li>
        
      </ul>

    </div>
  </nav>
</template>

<script setup>

import { ref, inject } from "vue";


const routes = inject('$routes').filter((route) => route.meta.show)
console.log('routes :>> ', routes);
const isLogin = ref(false)



</script>

<style lang="scss" scoped>

.nav-link:hover {
  font-weight: 900;

}

.active-link {
  &.nav-link {
    font-weight: 800;
  }

}
</style>

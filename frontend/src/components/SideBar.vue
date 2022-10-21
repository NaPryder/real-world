<template>
  <aside :class="`${isExpand ? 'expanded' : '' }`">
    <div class="logo">
      <span class="material-symbols-outlined logo-icon">
        rocket_launch
      </span>
      <span class="app-name">{{appName}}</span>
    </div>

    <div class="menu-toggle-bar">
      <button class="menu-toggle" v-on:click="toggleMenu">
        <span class="material-symbols-outlined open-icon">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <div class="menu-list">
      <div class="normal-menu">

        <div class="menu-border">
          <router-link class="menu" to="/">
            <span id="menu-icon" class="material-symbols-outlined">home</span>
            <span id="menu-title">Home</span>
          </router-link>
        </div>

        <div class="menu-border">
          <router-link class="menu" to="/register">
            <span id="menu-icon" class="material-symbols-outlined">app_registration</span>
            <span id="menu-title">Sign up</span>
          </router-link>
        </div>

        <div class="menu-border">
          <router-link class="menu" to="/article">
            <span id="menu-icon" class="material-symbols-outlined">app_registration</span>
            <span id="menu-title">Articles</span>
          </router-link>
        </div>
        
        <div class="menu-border">
          <router-link class="menu" to="/login">
            <span id="menu-icon" class="material-symbols-outlined">login</span>
            <span id="menu-title">Sign in</span>
          </router-link>
        </div>

      </div>

      <div class="footer-menu">
        <div class="menu-border">
          <router-link class="menu" to="/login">
            <span id="menu-icon" class="material-symbols-outlined">settings</span>
            <span id="menu-title">Setting</span>
          </router-link>
        </div>


        <router-link class="menu" to="/login">
          <span id="menu-icon" class="material-symbols-outlined">logout</span>
          <span id="menu-title">Sign out</span>
        </router-link>
      </div>
    </div>
    
  </aside>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {ref} from 'vue'

const appName = "Real World"
const isExpand = ref(false)
const toggleMenu = () => {
  isExpand.value = !isExpand.value 
  event.preventDefault()
}

defineProps({
  pages: {
    type: Array,
    default: [
      {
        name: "home",
        path: "/"
      },
      {
        name: "Register",
        path: "/register"
      },
    ]
  }
})

</script>


<style lang="scss" scoped>

aside {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  color: var(--light);
  width: calc(2rem + 32px);
  background-color: var(--dark);
  transition: var(--transition-02);
  
  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
  
  // Side bar hide
  .app-name {
    display: none;
  }
  .menu-toggle-bar {
    display: flex;
    justify-content: flex-end;
    position: relative;
    transition: var(--transition-02);
    
    .menu-toggle {
      margin-top: 1rem;
      transition: var(--transition-02);
      color: white;

      .open-icon {
        font-size: 2rem;
        transition: var(--transition-02);
      }

      &:hover {
        .open-icon {
          color: var(--primary);
          transform: translateX(.5rem);
        }
      }
    }
  }

  // Menu hide
  .menu-list{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    height: 100%;
    margin-top: 1.5rem;
    transition: var(--transition-02);
    
    .normal-menu{
      display: flex;
      flex-direction: column;
      align-content: center;
      transition: var(--transition-02);
    }
  }
  
  .menu{
    text-decoration: none;
    color: var(--light);
    display: flex;
    align-items: center;
    width: 100%;
    margin: 1rem 0 1rem 0;
    transition: var(--transition-02);

    &:hover {
      color: var(--primary);
      
      #menu-title {
        font-size: 1.25rem;
      }
      #menu-icon {
        font-size: 2rem;
      }
    }

    #menu-title {
      margin-left: 1rem;
      display: none;
    }
  }

  
  // Side-bar expand
  &.expanded{
      width: var(--sidebar-width);
      .app-name {
        display: inline;
        margin-left: 1.5rem;
      }
      .menu-toggle-bar {
        top: -3rem;

        .menu-toggle {
            transform: rotate(-180deg);
          }
      }
      
      .menu-list{
        align-items: flex-start;
      }

      .menu{
        margin-right: 1rem;
        margin-left: 1rem;
      }
      #menu-title {
        display: inline;
      }

    }
}

// Logo icon & name
.logo {
  display: flex;
  align-items: center;
}




  



</style>
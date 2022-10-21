import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home/global-feed',
    name: 'home',
    meta: {
      title: 'Home',
      show: true,
      checkLogin: false,
    }
  },
  {
    path: '/home',
    meta: {
      show: false,
    },
    component: () => import('@/views/Home/HomeView.vue'),
    children:[
      {
        path: 'global-feed',
        name: 'home-global-feed',
        component: () =>  import('@/views/Home/HomeGlobalFeed.vue'),
      },
      {
        path: 'my-feed',
        name: 'home-my-feed',
        component: () =>  import('@/views/Home/HomeMyFeed.vue'),
      },
      {
        path: 'tag-feed/:tag',
        name: 'home-tag-feed',
        component: () =>  import('@/views/Home/HomeTagFeed.vue'),
      },
    ]
  },
  
  {
    path: '/article',
    name: 'article',
    meta: {
      title: 'New Article',
      checkLogin: false,
      show: true,
    },
    component: () => import('@/views/Articles/ArticlesView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      title: 'Settings',
      checkLogin: false,
      show: true,
    },
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Setting/SettingView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Sign in',
      checkLogin: true,
      show: true,
    },
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Signin/SigninView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Sign up',
      checkLogin: true ,
      show: true,
    },
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Signup/SignupView.vue')
  },
  {
    path: '/profile/:username',
    name: 'profile',
    meta: {
      title: 'Profile',
      checkLogin: true ,
      show: false,
    },
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Profile/ProfileView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
})
export default router


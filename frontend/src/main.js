import {createApp} from 'vue'
import App from './App.vue'
import store from './stores/index'
import router from '@/router/index'
import './assets/main.css'

console.log('z router :>> ', router);
const app = createApp(App)

app.use(router)
app.use(store)

// Global
app.provide('$routes', router.getRoutes())

app.mount('#app')

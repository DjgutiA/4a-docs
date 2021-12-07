import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

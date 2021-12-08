import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import Login from '../components/Login.vue'
//import Home from '../components/Home2.vue'
import Home from '../views/Home.vue'
import Signup from '../components/Signup.vue'
import CarDetailed from '../components/CarDetailed.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/carDetailed',
    name: 'carDetailed',
    component: CarDetailed
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

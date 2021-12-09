import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import Swal from "sweetalert2";

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
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { requiresAuth: false }
  },
  {
    path: '/carDetailed',
    name: 'carDetailed',
    component: CarDetailed,
    meta: { requiresAuth: true }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: 'https://apigateway-sixrental.herokuapp.com/' }),
  cache: new InMemoryCache()
})

async function isAuth() {
  if (localStorage.getItem("token_access") === null ||
    localStorage.getItem("token_refresh") === null) {
    return false;
  }
  try {
    var result = await apolloClient.mutate({
      mutation: gql`
    mutation RefreshToken($refresh: String!) {
      refreshToken(refresh: $refresh) {
        access
      }
    }`,
      variables: {
        refresh: localStorage.getItem("token_refresh"),
      },
    })
    localStorage.setItem("token_access", result.data.refreshToken.access);
    return true;
  } catch {
    localStorage.clear();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Su sesión expiró, por favor vuelva a iniciar sesión.",
      confirmButtonColor: "#141e28",
    });
    return false;
  }
}

router.beforeEach(async (to, from) => {
  var is_auth = await isAuth();
  if (is_auth == to.meta.requiresAuth) return true
  if (is_auth) return { name: "home" };
  return { name: "login" };
})

export default router

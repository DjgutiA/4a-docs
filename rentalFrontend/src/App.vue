<template>
  <div class="body-main">
    <router-view
      v-on:completedLogIn="completedLogIn"
      v-on:completedSignUp="completedSignUp"
      v-on:loadLogIn="loadLogIn"
    ></router-view>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "App",

  data: function () {
    return {
      is_auth: false,
    };
  },
  methods: {
    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Autenticación Exitosa",
        confirmButtonColor: "#141e28",
      });
      this.verifyAuth();
    },
    completedSignUp: function (data) {
      Swal.fire({
        icon: "success",
        title: "Felicidades",
        text: "Registro Exitoso",
        confirmButtonColor: "#141e28",
      });
      this.completedLogIn(data);
    },
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false) this.$router.push({ name: "login" });
      else this.$router.push({ name: "Home" });
    },
    loadLogIn: function () {
      this.$router.push({ name: "login" });
    },
  },
  created: function () {
    this.verifyAuth();
  },
};
</script>

<style src="@/assets/css/normalize.css">
</style>

<style>
:root {
  --pink-color: #d1345b;
  --dark-blue-color: #141e28;
  --light-blue-color: #7c8f99;
  --white-color: #f3f8fa;
}

html {
  overflow-y: scroll;
  scroll-behavior: smooth;
  font-family: "Montserrat";
  font-size: 50px;
}

body {
  background-color: var(--white-color);
}

.swal2-popup {
  font-size: 40% !important;
}
</style>

<template>
  <div class="body-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  data: function () {
    return {
      is_auth: false,
    };
  },
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;
      this.is_auth = true;
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

* {
  font-family: "Montserrat";
  font-size: 50px;
}

html {
  overflow-y: scroll;
  scroll-behavior: smooth;
}

body {
  background-color: var(--white-color);
}
</style>

<template>
  <div class="login">
    <aside class="logIn-container">
      <h1 class="logIn-title">Inicia Sesión</h1>
      <form action="" class="logIn">
        <label>Usuario</label>
        <input type="text" v-model="user.document" required />

        <label>Contraseña</label>
        <input type="password" v-model="user.password" required />

        <button type="submit" @click="login">Iniciar Sesión</button>
      </form>

      <p class="cta">
        ¿No tienes una cuenta?<span
          ><a href="SignUp.html"> ¡Regístrate!</a></span
        >
      </p>
    </aside>
    <div class="logo-container">
      <a href="./index.html"
        ><img src="../assets/images/logo_transparent.png" alt="Logo Six Rental"
      /></a>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data: function () {
    return {
      user: {
        document: "",
        password: "",
      },
    };
  },
  methods: {
    login: async function () {
      if (this.user.document != "" && this.user.password != "") {
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation Mutation($credentials: CredentialsInput!) {
                logIn(credentials: $credentials) {
                  refresh
                  access
                }
              }
            `,
            variables: {
              credentials: this.user,
            },
          })
          .then((result) => {
            let userId = jwt_decode(
              result.data.logIn.access
            ).user_id.toString();
            let dataLogIn = {
              userId: userId,
              token_access: result.data.logIn.access,
              token_refresh: result.data.logIn.refresh,
            };
            this.$emit("completedLogIn", dataLogIn);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "ERROR 401: Credenciales Incorrectas.",
              confirmButtonColor: "#141e28",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
:root {
  --pink-color: #d1345b;
  --dark-blue-color: #141e28;
  --light-blue-color: #7c8f99;
  --white-color: #f3f8fa;
}

.login {
  background-image: url("../assets/images/fondoLogin.png");
  background-size: cover;
  height: 100vh;
  width: 100vw;
}

.logIn-container {
  width: 30%;
  height: 100%;
  font-size: 100%;
  background-color: var(--white-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logIn-title {
  font-size: 70%;
  font-weight: bold;
  color: var(--pink-color);
  margin: 40% 0 10% 0;
}

.logIn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logIn label {
  font-size: 40%;
  color: var(--dark-blue-color);
  margin: 2% 0 0 0;
  width: 95%;
  text-align: left;
}

.logIn input[type="text"],
input[type="password"] {
  width: 95%;
  height: 45px;
  border-radius: 10px;
  border: 2px solid var(--dark-blue-color);
  background-color: var(--white-color);
  color: var(--dark-blue-color);
  margin: 6% 0 2% 0;
  font-size: 40%;
  padding-left: 5%;
}

.logIn button {
  width: fit-content;
  padding: 4% 10%;
  border-radius: 10px;
  border: none;
  background-color: var(--pink-color);
  color: var(--white-color);
  font-size: 35%;
  margin-top: 10%;
  margin-bottom: 10%;
  cursor: pointer;
}

.cta {
  margin: 0;
  font-size: 40%;
  color: var(--dark-blue-color);
}

.cta span a {
  text-decoration: none;
  color: var(--pink-color);
  font-weight: bold;
}

.logo-container {
  position: absolute;
  top: 8%;
  right: 8%;
  background-color: var(--dark-blue-color);
  width: 150px;
  height: 150px;
  transform: rotate(45deg);
}

.logo-container img {
  transform: rotate(-45deg);
  width: 100%;
  cursor: pointer;
}
</style>
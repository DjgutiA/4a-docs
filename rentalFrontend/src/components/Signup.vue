<template>
  <div class="Signup">
    <aside class="SignUp-container">
      <h1 class="SignUp-title">Formulario de registro</h1>
      <form class="SignUp-form" v-on:submit.prevent="signup">
        <div class="SignUp-form-innerDiv">
          <div class="left-form">
            <label>Nombre</label>
            <input type="text" v-model="userInput.first_name" required />
            <label>Documento</label>
            <input type="text" v-model="userInput.document" required />
            <label>Contraseña</label>
            <input type="password" v-model="userInput.password" required />
            <label>Fecha de Nacimiento</label>
            <input type="date" v-model="userInput.birth_date" required />
          </div>
          <div class="right-form">
            <label>Apellido</label>
            <input type="text" v-model="userInput.last_name" required />
            <label>Correo Electrónico</label>
            <input type="email" v-model="userInput.email" required />
            <label>Celular</label>
            <input type="text" v-model="userInput.cellphone" required />
            <label>Género</label>
            <select name="select" v-model="userInput.gender" required>
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
          </div>
        </div>
        <button type="submit">Registrarse</button>
      </form>

      <p class="cta">
        ¿Ya tienes una cuenta?<span
          ><a @click="toLogin"> ¡Inicia Sesión!</a></span
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
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

export default {
  name: "Signup",
  data: function () {
    return {
      userInput: {
        first_name: "",
        last_name: "",
        document: "",
        password: "",
        email: "",
        birth_date: "",
        cellphone: "",
        gender: "",
      },
    };
  },
  methods: {
    signup: async function () {
      this.userInput.birth_date = new Date(
        this.userInput.birth_date
      ).toISOString();
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($userInput: SignUpInput!) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.userInput,
          },
        })
        .then((result) => {
          let userId = jwt_decode(
            result.data.signUpUser.access
          ).user_id.toString();
          let dataSignUp = {
            userId: userId,
            token_access: result.data.signUpUser.access,
            token_refresh: result.data.signUpUser.refresh,
          };
          this.$emit("completedSignUp", dataSignUp);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "ERROR: Fallo en el registro.",
            confirmButtonColor: "#141e28",
          });
        });
    },
    toLogin: function () {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.Signup {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/images/fondoLogin.png");
  background-size: cover;
}

.SignUp-container {
  width: 60%;
  height: 100%;
  font-size: 100%;
  background-color: var(--white-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.SignUp-title {
  font-size: 70%;
  font-weight: bold;
  color: var(--pink-color);
  margin: 4% 0 2% 0;
}

.SignUp-form {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.SignUp-form-innerDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
}

.left-form,
.right-form {
  display: flex;
  flex-direction: column;
  float: left;
  width: 50%;
  margin: 0;
}

.right-form label,
.left-form label {
  font-size: 40%;
  color: var(--dark-blue-color);
  margin: 2% 0 0 8%;
  text-align: left;
}

input[type="text"],
input[type="date"],
input[type="email"],
input[type="password"] {
  width: 80%;
  height: 40px;
  border-radius: 10px;
  border: 2px solid var(--dark-blue-color);
  background-color: var(--white-color);
  margin: 2% 0 2% 8%;
  font-size: 40%;
  color: var(--dark-blue-color);
}

select {
  width: 83%;
  height: 45px;
  border-radius: 10px;
  border: 2px solid var(--dark-blue-color);
  background-color: var(--white-color);
  color: var(--dark-blue-color);
  margin: 2% 0 2% 8%;
  font-size: 40%;
}

option {
  font-size: 100%;
}

.SignUp-form button {
  width: fit-content;
  padding: 2% 5%;
  border-radius: 10px;
  border: none;
  background-color: var(--pink-color);
  color: var(--white-color);
  font-size: 40%;
  margin-top: 3%;
  cursor: pointer;
}

.cta {
  margin: 5% 0 0 0;
  font-size: 40%;
  height: fit-content;
  color: var(--dark-blue-color);
  width: fit-content;
  text-align: center;
}

.cta span {
  height: fit-content;
}

.cta span a {
  text-decoration: none;
  color: var(--pink-color);
  font-weight: bold;
  height: fit-content;
  cursor: pointer;
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
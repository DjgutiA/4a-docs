<template>
  <div class="navbar">
    <ul>
      <li><a href="#vehicles-title">Vehículos</a></li>
      <li><a href="#about-us">Sobre Nosotros</a></li>
      <li><a href="#" @click="logout">Cerrar Sesión</a></li>
    </ul>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  methods: {
    logout: async function () {
      localStorage.clear();
      await Swal.fire({
        icon: "info",
        title: "Hasta Pronto",
        text: "Sesión Cerrada",
        confirmButtonColor: "#141e28",
      });
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  background-color: var(--dark-blue-color);
  opacity: 85%;
}

.navbar ul {
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100%;
  margin: 0 5% 0 40%;
}

.navbar ul li {
  list-style: none;
  margin-left: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar ul li a {
  font-size: 35%;
  text-decoration: none;
  color: var(--white-color);
}

.navbar ul li:nth-child(-n + 3) {
  padding-right: 3%;
  border-right: 2px solid var(--light-blue-color);
}

.navbar ul li a:hover {
  color: var(--pink-color);
}
</style>


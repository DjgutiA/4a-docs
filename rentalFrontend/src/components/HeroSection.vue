<template>
  <div class="body">
    <section class="hero-section">
      <div class="hero-heading">
        <img
          class="logo"
          src="../assets/images/logo_transparent.png"
          alt="Logo Six Rental"
        />
        <h1 class="hero-title">¿NECESITAS UN AUTO ECONÓMICO?</h1>
        <h2>¡Encontremos uno <span>perfecto para ti!</span></h2>
      </div>
      <img
        id="car"
        class="car"
        src="../assets/images/2019-mercedes-benz-gls-class-450-suv-angular-front.png"
        alt="Mercedes SUV 450"
      />
      <button id="submit" type="submit">Reserva Ya</button>
    </section>
    <h3 class="vehicles-title" id="vehicles-title">Nuestros vehículos</h3>

    <section class="cars-section" v-for="car in listCar" v-bind:key="car.id">
      <div class="card">
        <div class="container-info">
          <div class="vehicle-info">
            <h3 class="brand">{{ car.brand }}</h3>
            <h4 class="model">{{ car.model }}</h4>
            <div class="price-container">
              <p class="from">Desde</p>
              <p class="price">${{ car.price }}</p>
            </div>
          </div>

          <div class="vehicle-features">
            <div class="feature">
              <img
                src="../assets/images/cards/Caja-cambios.png"
                alt="LogSobre Nosotros cambios"
                class="engine"
              />
              <span>{{ car.transmission }}</span>
            </div>

            <div class="feature">
              <img
                src="../assets/images/cards/Maleta.png"
                alt="Logo caja"
                class="suitcase"
              />
              <span>{{ car.suitcase }}</span>
            </div>

            <div class="feature">
              <img
                src="../assets/images/cards/Aire.png"
                alt="Logo aire acondicionado"
                class="air-conditioning"
              />
              <span>Aire:{{ car.air_conditioning }}</span>
            </div>

            <div class="feature">
              <img
                src="../assets/images/cards/Silla.png"
                alt="Logo asiento vehiculo"
                class="passengers"
              />
              <span>{{ car.passengers }} asientos</span>
            </div>
          </div>
        </div>
        <img
          :src="'../assets/images/cars/' + car.model + '.png'"
          :alt="'Imagen ' + car.brand + ' ' + car.model"
          class="car-image"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import gql from "graphql-tag";

export default {
  name: "Home",
  data: function () {
    return {
      listCar: [],
    };
  },
  apollo: {
    listCar: {
      query: gql`
        query Query($idUser: Int!) {
          listCar(idUser: $idUser) {
            id_car
            license_plate
            passengers
            transmission
            suitcase
            air_conditioning
            category_id {
              id_category
              name_category
            }
            city_id {
              id_city
              name_city
            }
            price
            brand
            model
          }
        }
      `,
      variables() {
        return {
          idUser: parseInt(localStorage.getItem("userId"), 10),
        };
      },
    },
  },
};
</script>


<style scoped>
.hero-section {
  background-image: url("../assets/images/FondoPortada.png");
  background-size: cover;
}

.hero-section {
  width: 100%;
  height: 100vh;
}

.logo {
  position: absolute;
  width: 10%;
  top: 10%;
  left: 4%;
  margin: 0;
}

.hero-heading .hero-title,
h2 {
  margin-top: 0;
  position: absolute;
  top: 30%;
  left: 5%;
  width: 16ch;
  color: var(--white-color);
  font-size: 100%;
}

.hero-heading h2 {
  top: 50%;
  width: fit-content;
  font-weight: 400;
  font-size: 55%;
}

.hero-heading span {
  top: 45%;
  width: fit-content;
  font-weight: 400;
  font-size: 100%;
  color: var(--pink-color);
}

.hero-section .car {
  margin-left: 45%;
  margin-top: 7%;
  width: 50%;
}

img {
  font-size: 35%;
  font-weight: bold;
  color: var(--pink-color);
}

.hero-section button {
  position: absolute;
  left: 5%;
  top: 60%;
  font-size: 50%;
  font-weight: 700;
  width: fit-content;
  height: fit-content;
  border-radius: 25px;
  box-shadow: none;
  border: 2px solid var(--dark-blue-color);
  background-color: var(--pink-color);
  color: var(--dark-blue-color);
  outline: 2px solid var(--pink-color);
  padding: 3px 20px;
  cursor: pointer;
}

.hero-section button:hover {
  border: 2px solid var(--dark-blue-color);
  background-color: var(--white-color);
  outline: 2px solid var(--white-color);
}

.cars-section {
  margin: 0 3%;
  display: flex;
  flex-wrap: wrap;
}

.vehicles-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 75%;
  margin: 0;
  padding: 3% 0 0 0;
  color: var(--pink-color);
}

.card {
  width: 30%;
  height: 40%;
  background-color: var(--light-blue-color);
  margin-top: 3%;
  margin-left: 3%;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.75);
}

.card:hover {
  background-color: var(--pink-color);
}

.card:hover .price-container {
  background-color: var(--light-blue-color);
}

.container-info {
  display: flex;
  flex-direction: row;
}

.vehicle-info {
  width: 50%;
}

.vehicle-info .brand {
  font-size: 60%;
  margin: 15% 0 0 15%;
  height: fit-content;
  color: var(--white-color);
}

.vehicle-info .model {
  font-size: 50%;
  margin: 0 0 10% 15%;
  font-weight: 400;
  height: fit-content;
  color: var(--white-color);
}

.price-container {
  display: flex;
  flex-direction: column;
  background-color: var(--pink-color);
  border-radius: 12px;
  width: fit-content;
  margin-left: 15%;
  padding: 0 5% 0 0;
}

.from {
  margin: 5% 0 0 5%;
  font-size: 30%;
  color: var(--white-color);
}

.price {
  margin: 0 5%;
  font-size: 70%;
  color: var(--white-color);
  font-weight: 700;
}

.vehicle-features {
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  width: 50%;
}

.feature {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 50px;
}

.feature img {
  width: 20%;
  height: 75%;
  object-fit: contain;
  margin: 0 2% 0 20%;
}

.feature span {
  font-size: 20%;
  color: var(--white-color);
  margin: 0;
}

.car-image {
  height: 35%;
  width: 90%;
  margin: 5% 0 5% 5%;
}
</style>
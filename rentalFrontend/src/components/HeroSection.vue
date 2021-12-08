<template>
  <div class="body-home">
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
    <CarFilter></CarFilter>
    <h3 class="vehicles-title" id="vehicles-title">Nuestros vehículos</h3>

    <section v-if="listCar[0]" class="cars-section">
      <div
        class="card"
        v-for="index in 12"
        v-bind:key="index"
        @click="selectCar(index)"
      >
        <div class="container-info">
          <div class="vehicle-info">
            <h3 class="brand">{{ listCar[index].brand }}</h3>
            <h4 class="model">{{ listCar[index].model }}</h4>
            <div class="price-container">
              <p class="from">Desde</p>
              <p class="price">${{ formatterNumber(listCar[index].price) }}</p>
            </div>
          </div>

          <div class="vehicle-features">
            <div class="feature">
              <img
                src="../assets/images/cards/Caja-cambios.png"
                alt="LogSobre Nosotros cambios"
                class="engine"
              />
              <span v-if="listCar[index].transmission === 'M'">Manual</span>
              <span v-else>Automático</span>
            </div>

            <div class="feature">
              <img
                src="../assets/images/cards/Maleta.png"
                alt="Logo caja"
                class="suitcase"
              />
              <span v-if="listCar[index].suitcase === 'S'">Pequeño</span>
              <span v-else-if="listCar[index].suitcase === 'M'">Mediano</span>
              <span v-else>Grande</span>
            </div>

            <div class="feature">
              <img
                src="../assets/images/cards/Aire.png"
                alt="Logo aire acondicionado"
                class="air-conditioning"
              />
              <span>Aire: </span>
              <span v-if="listCar[index].air_conditioning">Si</span>
              <span v-else>No</span>
            </div>

            <div class="feature">
              <img
                src="../assets/images/cards/Silla.png"
                alt="Logo asiento vehiculo"
                class="passengers"
              />
              <span>{{ listCar[index].passengers }} asientos</span>
            </div>
          </div>
        </div>
        <img
          :src="require(`../assets/images/cars/${listCar[index].model}.png`)"
          :alt="'Imagen ' + listCar[index].brand + ' ' + listCar[index].model"
          class="car-image"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import gql from "graphql-tag";
import CarFilter from "@/components/CarFilter";

export default {
  name: "Home",
  data: function () {
    return {
      listCar: [],
    };
  },
  components: {
    CarFilter,
  },
  methods: {
    selectCar: function (indexcar) {
      localStorage.setItem("id_car", this.listCar[indexcar].id_car);
      localStorage.setItem(
        "license_plate",
        this.listCar[indexcar].license_plate
      );
      this.$router.push({ name: "carDetailed" });
    },
    formatterNumber: function (value) {
      var formatter = new Intl.NumberFormat("es-CO", {});
      return formatter.format(value);
    },
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
.body-home {
  padding-bottom: 10%;
}
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
  font-size: 40%;
  color: var(--white-color);
  margin: 0;
}

.car-image {
  height: 35%;
  width: 90%;
  margin: 5% 0 5% 5%;
}
</style>
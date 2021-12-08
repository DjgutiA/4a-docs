<template>
  <div>
    <Navbar></Navbar>
    <div class="body-car" v-if="getCar.id_car">
      <div class="container">
        <div class="addons-container">
          <div class="addon">
            <img
              src="../assets/images/Car_details/driver_addon_logo.png"
              alt=""
              class="addon-logo"
            />
            <p class="addon-title">
              Seguro total - ${{ formatterNumber(prices.secure) }}
            </p>
            <button class="select-addon" @click="changeStatus('secure')">
              <a v-if="status.secure">Quitar</a>
              <a v-else>Añadir</a>
            </button>
          </div>
          <div class="addon">
            <img
              src="../assets/images/Car_details/add_user_logo8.png"
              alt=""
              class="addon-logo"
            />
            <p class="addon-title">
              Conductor adicional - ${{ formatterNumber(prices.driver) }} día
            </p>
            <button class="select-addon" @click="changeStatus('driver')">
              <a v-if="status.driver">Quitar</a>
              <a v-else>Añadir</a>
            </button>
          </div>
          <div class="addon">
            <img
              src="../assets/images/Car_details/gps_logo8.png"
              alt=""
              class="addon-logo"
            />
            <p class="addon-title">
              GPS - ${{ formatterNumber(prices.gps) }} día
            </p>
            <button class="select-addon" @click="changeStatus('gps')">
              <a v-if="status.gps">Quitar</a>
              <a v-else>Añadir</a>
            </button>
          </div>
          <div class="addon">
            <img
              src="../assets/images/Car_details/remote_location_logo8.png"
              alt=""
              class="addon-logo"
            />
            <p class="addon-title">
              Entrega o recogida fuera de la ciudad de origen - ${{
                formatterNumber(prices.otherPlace)
              }}
            </p>
            <button class="select-addon" @click="changeStatus('otherPlace')">
              <a v-if="status.otherPlace">Quitar</a>
              <a v-else>Añadir</a>
            </button>
          </div>
        </div>
        <div class="detailed-info-container">
          <div class="car-info-container">
            <div class="car-model-category">
              <h2>{{ getCar.brand }} {{ getCar.model }}</h2>
              <p>{{ getCar.category_id.name_category }}</p>
            </div>
            <img
              :src="require(`../assets/images/cars/${getCar.model}.png`)"
              :alt="'Imagen ' + getCar.brand + ' ' + getCar.model"
            />
          </div>
          <div class="time-price-labels">
            <div class="time-price-subtotal">
              <p>Tiempo</p>
              <p>Tipo</p>
              <p>Subtotal</p>
            </div>
            <div class="bg-pink-border-rounded time-price-total-values">
              <p>{{ days }} días</p>
              <p>${{ formatterNumber(getCar.price) }}</p>
              <p>${{ formatterNumber(prices.totalCar) }}</p>
            </div>
          </div>
          <div>
            <p class="taxes-title">Impuestos y tarifas</p>
            <div class="bg-pink-border-rounded time-price-total-values">
              <p>IVA 19%</p>
              <p>${{ formatterNumber(prices.taxes) }}</p>
            </div>
            <div class="bg-pink-border-rounded time-price-total-values">
              <p>Total Estimado</p>
              <p>${{ formatterNumber(prices.total) }}</p>
            </div>
          </div>
          <button type="button">Reservar</button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gql from "graphql-tag";

export default {
  name: "CarDetailed",
  components: {
    Navbar,
    Footer,
  },

  data: function () {
    return {
      car: {
        license_plate: "",
        id_car: "",
      },
      getCar: {},
      days: 2,
      prices: {
        secure: 50000,
        driver: 15000,
        gps: 15000,
        otherPlace: 200000,
        carPrice: 0,
        totalCar: 0 * this.days,
        otherServices: 0,
        taxes: 0,
        total: 0,
      },
      status: {
        secure: false,
        driver: false,
        gps: false,
        otherPlace: false,
      },
    };
  },
  methods: {
    formatterNumber: function (value) {
      var formatter = new Intl.NumberFormat("es-CO", {});
      return formatter.format(value);
    },
    changeStatus: function (key) {
      this.status[key] ? (this.status[key] = false) : (this.status[key] = true);
      console.log(this.status);
      this.addValue();
      console.log(this.prices);
    },
    addValue: function () {
      let totalServices = 0;
      this.status.secure ? (totalServices += this.prices.secure) : null;
      this.status.driver
        ? (totalServices += this.prices.driver * this.days)
        : null;
      this.status.gps ? (totalServices += this.prices.gps * this.days) : null;
      this.status.otherPlace ? (totalServices += this.prices.otherPlace) : null;
      this.prices.otherServices = totalServices;

      this.prices.total = this.prices.totalCar + this.prices.otherServices;
      this.prices.taxes = this.prices.total - this.prices.total / 1.19;
    },
  },
  updated() {
    if (this.getCar.id_car) {
      this.prices.carPrice = this.getCar.price;
      this.prices.totalCar = this.getCar.price * this.days;
      this.addValue();
    }
  },
  apollo: {
    getCar: {
      query: gql`
        query Query($licensePlate: String!, $idUser: Int!) {
          getCar(license_plate: $licensePlate, idUser: $idUser) {
            id_car
            license_plate
            passengers
            transmission
            air_conditioning
            suitcase
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
          licensePlate: localStorage.getItem("license_plate"),
        };
      },
    },
  },
};
</script>

<style scoped>
.body-car {
  padding-top: 5%;
  background-color: var(--dark-blue-color);
  display: flex;
  height: 100vh;
  width: 100vw;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.addons-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--white-color);
  border-radius: 10px;
  width: 60%;
  height: 90%;
  padding: 0 0.5% 0 0.5%;
  margin: 0 2% 0 5%;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.5);
}

.addon {
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: var(--pink-color);
  color: var(--white-color);
  font-size: 40%;
  border-radius: 10px;
  width: 90%;
  height: 20%;
  padding-inline: 3%;
}

.addon img {
  height: 70%;
  margin-right: 5%;
}

.addon-title {
  color: var(--white-color);
  font-size: 100%;
  margin-right: auto;
}

.addon button {
  margin-left: 3%;
  background-color: var(--light-blue-color);
  height: 50%;
  width: fit-content;
  padding-inline: 2%;
  border: 1px solid var(--light-blue-color);
  border-radius: 10px;
  cursor: pointer;
  color: var(--white-color);
  font-weight: 500;
  opacity: 100%;
}

.addon button:hover {
  opacity: 85%;
}

.detailed-info-container {
  background-color: var(--white-color);
  font-size: 40%;
  border-radius: 10px;
  width: 30%;
  margin: 0% 4% auto 2%;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.5);
}

.car-model-category {
  flex-direction: column;
  color: var(--white-color);
}

.car-model-category h2 {
  font-size: 100%;
  margin: 5% 0 0 5%;
}

.car-model-category p {
  font-size: 100%;
  margin: 0 0 0 5%;
}

.car-info-container {
  display: flex;
  flex-direction: column;
  background-color: var(--pink-color);
  margin: 5% 5% 0 5%;
  padding-bottom: 5%;
  border-radius: 10px;
}

.car-info-container img {
  height: 80%;
  width: 80%;
  margin-left: 18%;
}

.time-price-labels {
  display: flex;
  flex-direction: column;
  margin-top: 2%;
}

.time-price-subtotal {
  display: flex;
  justify-content: space-between;
  margin-inline: 5%;
  padding-inline: 2%;
}

.time-price-subtotal p {
  font-size: 100%;
  font-weight: bold;
  margin-block: 2%;
  color: var(--pink-color);
}

.bg-pink-border-rounded {
  background-color: var(--pink-color);
  border-radius: 10px;
  color: var(--white-color);
  padding-block: 4%;
}

.time-price-total-values {
  display: flex;
  justify-content: space-between;
  margin: 2% 7% 2% 7%;
  padding-inline: 2%;
}

.time-price-total-values p {
  font-size: 100%;
  margin: 0;
}

.taxes-title {
  font-size: 100%;
  font-weight: bold;
  color: var(--pink-color);
  margin: 5% auto 2% 8%;
}

.detailed-info-container button {
  width: 86%;
  height: 2%;
  background-color: var(--light-blue-color);
  border: 1px solid var(--light-blue-color);
  border-radius: 10px;
  font-size: 100%;
  font-weight: bold;
  color: var(--white-color);
  padding: 4%;
  margin-left: 7%;
  margin-bottom: 5%;
  cursor: pointer;
}

.detailed-info-container button:hover {
  opacity: 85%;
}
</style>
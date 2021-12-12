<template>
  <div class="body-home">
    <div class="title">
      <h3 class="vehicles-title" id="vehicles-title">Vehículos</h3>
      <button @click="createCar()">Ingresar vehiculo</button>
    </div>

    <section v-if="listCar[0]" class="cars-section">
      <div
        class="card"
        v-for="car in listCar"
        v-bind:key="car.id_car"
        v-bind:id="car.id_car"
      >
        <div class="container-info">
          <div class="vehicle-info">
            <h3 class="brand">{{ car.brand }}</h3>
            <h4 class="model">{{ car.model }}</h4>
            <h4 class="model">{{ car.license_plate }}</h4>
            <div class="addon-logo">
              <img
                src="../../assets/images/Car_details/edit.svg"
                alt="Editar"
                @click="editCar(car)"
              />
              <img
                src="../../assets/images/Car_details/trash.svg"
                alt="Eliminar"
                @click="deleteCar(car.id_car)"
              />
              <i @click="loadCalendar(car.id_car)" class="fas fa-history"></i>
            </div>
          </div>

          <div class="vehicle-features">
            <div class="feature">
              <img
                src="../../assets/images/cards/Caja-cambios.png"
                alt="LogSobre Nosotros cambios"
                class="engine"
              />
              <span v-if="car.transmission === 'M'">Manual</span>
              <span v-else>Automático</span>
            </div>

            <div class="feature">
              <img
                src="../../assets/images/cards/Maleta.png"
                alt="Logo caja"
                class="suitcase"
              />
              <span v-if="car.suitcase === 'S'">Pequeño</span>
              <span v-else-if="car.suitcase === 'M'">Mediano</span>
              <span v-else>Grande</span>
            </div>

            <div class="feature">
              <img
                src="../../assets/images/cards/Aire.png"
                alt="Logo aire acondicionado"
                class="air-conditioning"
              />
              <span>Aire: </span>
              <span v-if="car.air_conditioning">Si</span>
              <span v-else>No</span>
            </div>

            <div class="feature">
              <img
                src="../../assets/images/cards/Silla.png"
                alt="Logo asiento vehiculo"
                class="passengers"
              />
              <span>{{ car.passengers }} asientos</span>
            </div>
          </div>
        </div>
        <img
          :src="require(`../../assets/images/cars/${car.model}.png`)"
          :alt="'Imagen ' + car.brand + ' ' + car.model"
          class="car-image"
        />
      </div>
    </section>
    <h1 v-else>Sin Resultados</h1>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import gql from "graphql-tag";
import CarFilter from "@/components/CarFilter";

export default {
  name: "CardCarsDetails",
  props: {
    listCar: Object,
  },
  data: function () {
    return {};
  },
  components: {
    CarFilter,
  },
  methods: {
    createCar: function () {
      this.$emit("createCar");
    },
    editCar: function (car) {
      this.$emit("editCar", car);
    },
    deleteCar: function (car) {
      Swal.fire({
        title: "¿Seguro que quiere eliminar el vehículo?",
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.processDeleteCar(car);
          document.getElementById(car).remove();
        }
      });
    },
    processDeleteCar: async function (car) {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation DeleteCar($idCar: Int!, $idUser: Int!) {
              deleteCar(id_car: $idCar, idUser: $idUser) {
                response
              }
            }
          `,
          variables: {
            idUser: parseInt(localStorage.getItem("userId"), 10),
            idCar: car,
          },
        })
        .then((result) => {
          Swal.fire({
            icon: "success",
            title: "Exito",
            text: "El vehiculo se Elimino con éxito",
            confirmButtonColor: "#141e28",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "ERROR: Fallo en la eliminación.",
            confirmButtonColor: "#141e28",
          });
        });
    },
    loadCalendar: function (id_car) {
      this.$router.push({ name: "availability" });
      localStorage.setItem("id_car", id_car);
    },
  },
  created: function () {},
};
</script>


<style scoped>
.body-home {
  padding: 5% 0 10%;
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

.title {
  display: flex;
}

.title h3 {
  width: 70%;
}

.title button {
  display: flex;
  height: 50%;
  background-color: var(--light-blue-color);
  border: 1px solid var(--light-blue-color);
  border-radius: 10px;
  font-weight: bold;
  font-size: 70%;
  color: var(--white-color);
  padding: 2%;
  cursor: pointer;
}

.title button:hover {
  background-color: var(--pink-color);
}

.addon-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.addon-logo img {
  height: 10%;
  width: 20%;
  margin-right: 5%;
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(203deg)
    brightness(102%) contrast(102%);
}
</style>
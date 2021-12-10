<template>
  <div class="filter">
    <div class="date-filter">
      <h3>Elige la fechas</h3>
      <label for="">Recogida</label>
      <input type="date" v-model="availabilityFilter.start_date" required />
      <label for="">Entrega</label>
      <input type="date" v-model="availabilityFilter.end_date" required />
      <button @click="filterDate">Seleccionar</button>
    </div>

    <div class="car-filter">
      <h3>Escoge las caracteristicas del vehículo</h3>
      <div class="car-groups">
        <div class="car-filter-group">
          <div class="filter-pair">
            <label>Pasajeros</label>
            <select v-model="carFilter.passengers">
              <option value=""></option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div class="filter-pair">
            <label>Aire acondicionado</label>
            <input type="checkbox" v-model="carFilter.air_conditioning" />
          </div>
        </div>
        <div class="car-filter-group">
          <div class="filter-pair">
            <label>Categoria</label>
            <select v-model="carFilter.category">
              <option value=""></option>
              <option
                v-for="category in listCategory"
                v-bind:key="category.id_category"
                :value="category.id_category"
              >
                {{ category.name_category }}
              </option>
            </select>
          </div>
          <div class="filter-pair">
            <label>Trasmisión</label>
            <select v-model="carFilter.transmission">
              <option value=""></option>
              <option value="A">Automático</option>
              <option value="M">Manual</option>
            </select>
          </div>
        </div>

        <div class="car-filter-group">
          <div class="filter-pair">
            <label>Maletero</label>
            <select v-model="carFilter.suitcase">
              <option value=""></option>
              <option value="S">Pequeño</option>
              <option value="M">Mediano</option>
              <option value="B">Grande</option>
            </select>
          </div>
          <div class="filter-pair">
            <label>Ciudad</label>
            <select v-model="carFilter.city">
              <option value=""></option>
              <option
                v-for="city in listCity"
                v-bind:key="city.id_city"
                :value="city.id_city"
              >
                {{ city.name_city }}
              </option>
            </select>
          </div>
        </div>

        <div class="car-filter-group">
          <div class="filter-pair">
            <label>Marca</label>
            <select v-model="carFilter.brand" @change="runQuery">
              <option value=""></option>
              <option v-for="brand in listBrands.brands" v-bind:key="brand">
                {{ brand }}
              </option>
            </select>
          </div>
          <div class="filter-pair">
            <label>Modelo</label>
            <select v-model="carFilter.model">
              <option value=""></option>
              <option v-for="model in listModel.models" v-bind:key="model">
                {{ model }}
              </option>
            </select>
          </div>
        </div>
        <div class="car-filter-group">
          <div class="filter-pair">
            <label>Precio Desde</label>
            <input type="number" v-model="carFilter.price__gte" />
          </div>
          <div class="filter-pair">
            <label>Hasta</label
            ><input type="number" v-model="carFilter.price__lte" />
          </div>
        </div>
      </div>
      <button @click="filter">Filtrar</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import gql from "graphql-tag";

export default {
  name: "Carfilter",
  data: function () {
    return {
      date: {
        start_date: "",
        end_date: "",
      },
      carFilter: {
        passengers: "",
        transmission: "",
        air_conditioning: "",
        suitcase: "",
        category: "",
        city: "",
        brand: "",
        model: "",
        price__lte: "",
        price__gte: "",
      },
      carFilterInput: {},
      listCategory: [],
      listCity: [],
      listBrands: "",
      listModel: "",
      filterCar: [],
      availabilityFilter: {
        car: [],
        start_date: "",
        end_date: "",
      },
    };
  },
  methods: {
    filter: async function () {
      this.carFilterInput = {};
      if (this.carFilter.passengers) {
        this.carFilter.passengers = parseInt(this.carFilter.passengers, 10);
      }
      for (const [key, value] of Object.entries(this.carFilter)) {
        if (value) this.carFilterInput[key] = value;
      }
      console.log(this.carFilter);
      this.$apollo.queries.filterCar.skip = false;
      const result = await this.$apollo.queries.filterCar.refetch();
      this.filterCar = result.data.filterCar;
      if (
        localStorage.getItem("start_date") &&
        localStorage.getItem("end_date")
      ) {
        this.filterDate();
      }
      {
        this.$emit("results", this.filterCar);
      }
    },
    runQuery: async function () {
      if (this.carFilter.brand != "") {
        this.$apollo.queries.listModel.skip = false;
        const result = await this.$apollo.queries.listModel.refetch();
        this.listModel = result.data.listModel;
      } else {
        this.carFilter.model = "";
        this.listModel = "";
      }
    },
    filterDate: async function () {
      let listCars = [];
      this.filterCar.forEach((car) => listCars.push(car.id_car));
      if (
        this.availabilityFilter.start_date != "" &&
        this.availabilityFilter.end_date != "" &&
        listCars.length > 0 &&
        Date.parse(this.availabilityFilter.start_date) <=
          Date.parse(this.availabilityFilter.end_date)
      ) {
        this.availabilityFilter.car = listCars;

        this.$apollo.queries.filterCarAvailability.skip = false;
        const result =
          await this.$apollo.queries.filterCarAvailability.refetch();
        localStorage.setItem("start_date", this.availabilityFilter.start_date);
        localStorage.setItem("end_date", this.availabilityFilter.end_date);
        this.$emit("results", result.data.filterCarAvailability);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Filtro incompleto",
          text: "Por favor agregue fecha de recogida y de entrega, validos",
          confirmButtonColor: "#141e28",
        });
      }
    },
  },
  updated() {},
  created() {
    this.filter();
    if (localStorage.getItem("start_date"))
      this.availabilityFilter.start_date = localStorage.getItem("start_date");
    if (localStorage.getItem("end_date"))
      this.availabilityFilter.end_date = localStorage.getItem("end_date");
  },
  apollo: {
    listCategory: {
      query: gql`
        query ListCategory($idUser: Int!) {
          listCategory(idUser: $idUser) {
            id_category
            name_category
          }
        }
      `,
      variables() {
        return {
          idUser: parseInt(localStorage.getItem("userId"), 10),
        };
      },
    },
    listCity: {
      query: gql`
        query ListCity($idUser: Int!) {
          listCity(idUser: $idUser) {
            id_city
            name_city
          }
        }
      `,
      variables() {
        return {
          idUser: parseInt(localStorage.getItem("userId"), 10),
        };
      },
    },
    listBrands: {
      query: gql`
        query ListCity($idUser: Int!) {
          listBrands(idUser: $idUser) {
            brands
          }
        }
      `,
      variables() {
        return {
          idUser: parseInt(localStorage.getItem("userId"), 10),
        };
      },
    },
    listModel: {
      query: gql`
        query ListCity($brand: String!, $idUser: Int!) {
          listModel(brand: $brand, idUser: $idUser) {
            models
          }
        }
      `,
      variables() {
        return {
          idUser: parseInt(localStorage.getItem("userId"), 10),
          brand: this.carFilter.brand,
        };
      },
      skip() {
        return this.skipQuery;
      },
    },
    filterCar: {
      query: gql`
        query FilterCar($carFilter: CarFilter!, $idUser: Int!) {
          filterCar(carFilter: $carFilter, idUser: $idUser) {
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
          carFilter: this.carFilterInput,
        };
      },
      skip() {
        return this.skipQuery;
      },
    },
    filterCarAvailability: {
      query: gql`
        query Query($idUser: Int!, $availabilityFilter: AvailabilityFilter) {
          filterCarAvailability(
            idUser: $idUser
            availabilityFilter: $availabilityFilter
          ) {
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
          availabilityFilter: this.availabilityFilter,
        };
      },
      skip() {
        return this.skipQuery;
      },
    },
  },
};
</script>

<style scoped>
.filter {
  display: flex;
  font-size: 45%;
  background-color: var(--pink-color);
  height: fit-content;
}
.filter h3 {
  color: var(--white-color);
}
.filter label {
  color: var(--white-color);
}

.date-filter {
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-left: 5%;
}

.date-filter h3 {
  text-align: center;
}

.date-filter label {
  margin-bottom: 2.5%;
}

.date-filter input[type="date"] {
  margin-bottom: 2.5%;
  color: var(--dark-blue-color);
  border: 1px solid var(--dark-blue-color);
  border-radius: 5px;
  padding: 2% 5%;
}
.date-filter button {
  width: 86%;
  background-color: var(--light-blue-color);
  border: 1px solid var(--light-blue-color);
  border-radius: 10px;
  font-weight: bold;
  color: var(--white-color);
  padding: 4%;
  margin: 10% 0 7% 7%;
  cursor: pointer;
}

.car-filter {
  width: 70%;
  margin-left: 2.5%;
  padding-left: 2.5%;
  border-left: 2px solid var(--light-blue-color);
  display: flex;
  flex-direction: column;
}

.car-filter h3 {
  text-align: center;
}

.car-filter-group {
  display: flex;
  align-items: center;
  margin-block: 1%;
}

.car-filter button {
  width: 50%;
  margin: 3% auto 3% 25%;
  background-color: var(--light-blue-color);
  border: 1px solid var(--light-blue-color);
  border-radius: 10px;
  font-weight: bold;
  color: var(--white-color);
  padding: 2%;
  cursor: pointer;
}

.car-groups {
  margin-inline: 5%;
}

.car-groups input[type="checkbox"] {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  background-color: var(--white-color);
  margin-left: 1%;
}

.car-groups input[type="checkbox"]:checked {
  background-color: var(--dark-blue-color);
}

.car-groups input[type="checkbox"]:checked::after {
  content: "✔";
  position: relative;
  top: 1px;
  left: 2.5px;
  width: 10px;
  height: 10px;
  color: var(--white-color);
}

.filter-pair {
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-left: 3%;
}
.filter-pair select {
  width: 55%;
  border: 1px solid var(--dark-blue-color);
  border-radius: 5px;
}
.filter-pair input {
  width: 53%;
  border: 1px solid var(--dark-blue-color);
  border-radius: 5px;
}
</style>
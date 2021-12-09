<template>
  <div class="filter">
    <div class="date-filter">
      <h3>Elige la fechas</h3>
      <label for="">Recogida</label>
      <input type="date" v-model="date.start_date" />
      <label for="">Entrega</label>
      <input type="date" v-model="date.end_date" />
      <button class="">Seleccionar</button>
    </div>

    <div class="car-filter">
      <h3>Escoge las caracteristicas del vehículo</h3>
      <div class="car-groups">
        <div class="car-filter-group">
          <label>Pasajeros</label>
          <select v-model="carFilter.passengers">
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <label>Trasmisión</label>
          <select v-model="carFilter.transmission">
            <option value="A">Automático</option>
            <option value="M">Manual</option>
          </select>
          <label>Aire acondicionado</label>
          <input type="checkbox" v-model="carFilter.air_conditioning" />
        </div>

        <div class="car-filter-group">
          <label>Maletero</label>
          <select v-model="carFilter.suitcase">
            <option value="S">Pequeño</option>
            <option value="M">Mediano</option>
            <option value="B">Grande</option>
          </select>
          <label>Categoria</label>
          <select v-model="carFilter.category">
            <option
              v-for="category in listCategory"
              v-bind:key="category.id_category"
            >
              {{ category.name_category }}
            </option>
          </select>
          <label>Ciudad</label>
          <select v-model="carFilter.city">
            <option v-for="city in listCity" v-bind:key="city.id_city">
              {{ city.name_city }}
            </option>
          </select>
        </div>

        <div class="car-filter-group">
          <label>Marca</label>
          <select v-model="carFilter.brand" @change="runQuery">
            <option v-for="brand in listBrands.brands" v-bind:key="brand">
              {{ brand }}
            </option>
          </select>
          <label>Modelo</label>
          <select v-model="carFilter.model">
            <option v-for="model in listModel.models" v-bind:key="model">
              {{ model }}
            </option>
          </select>
        </div>
        <div class="car-filter-group">
          <label>Precio entre</label>
          <input type="number" v-model="carFilter.price__gte" /><label>y</label
          ><input type="number" v-model="carFilter.price__lte" />
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
      listCategory: [],
      listCity: [],
      listBrands: "",
      listModel: "",
      filterCar: [],
    };
  },
  methods: {
    filter: function () {
      console.log(this.carFilter);
    },
    runQuery: async function () {
      this.$apollo.queries.listModel.skip = false;
      const result = await this.$apollo.queries.listModel.refetch();
      this.listModel = result.data.listModel;
    },
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
          }
        }
      `,
      variables() {
        return {
          idUser: parseInt(localStorage.getItem("userId"), 10),
          carFilter: this.carFilter,
        };
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
  border-radius: 10px;
  padding-inline: 5%;
}
.date-filter button {
  width: 86%;
  background-color: var(--light-blue-color);
  border: 1px solid var(--light-blue-color);
  border-radius: 10px;
  font-weight: bold;
  color: var(--white-color);
  padding: 4%;
  margin: 5% 0 7% 7%;
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
  margin-left: 7%;
}

.car-groups select {
  margin: 1% 3% 1% 1%;
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
</style>
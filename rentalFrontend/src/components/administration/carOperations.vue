<template>
  <div class="body-car">
    <div class="container">
      <div class="subContainer">
        <form @submit.prevent="processOperation(operation)">
          <div class="car-filter">
            <h3 v-if="operation == 'create'">Creación de un vehículo</h3>
            <h3 v-if="operation == 'update'">Modificación de un vehículo</h3>
            <div class="car-groups">
              <div class="car-filter-group">
                <div class="filter-pair">
                  <label>Placa</label>
                  <input type="text" v-model="car.license_plate" required />
                </div>
                <div class="filter-pair">
                  <label>Precio</label>
                  <input type="Number" v-model="car.price" required />
                </div>
              </div>
              <div class="car-filter-group">
                <div class="filter-pair">
                  <label>Pasajeros</label>
                  <select v-model="car.passengers">
                    <option value=""></option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div class="filter-pair">
                  <label>Aire acondicionado</label>
                  <input type="checkbox" v-model="car.air_conditioning" />
                </div>
              </div>
              <div class="car-filter-group">
                <div class="filter-pair">
                  <label>Categoria</label>
                  <select v-model="car.category" id="categorySelect">
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
                  <select v-model="car.transmission">
                    <option value=""></option>
                    <option value="A">Automático</option>
                    <option value="M">Manual</option>
                  </select>
                </div>
              </div>

              <div class="car-filter-group">
                <div class="filter-pair">
                  <label>Maletero</label>
                  <select v-model="car.suitcase">
                    <option value=""></option>
                    <option value="S">Pequeño</option>
                    <option value="M">Mediano</option>
                    <option value="B">Grande</option>
                  </select>
                </div>
                <div class="filter-pair">
                  <label>Ciudad</label>
                  <select v-model="car.city" id="citySelect">
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
                  <select v-model="car.brand" @change="runQuery">
                    <option value=""></option>
                    <option
                      v-for="brand in listBrands.brands"
                      v-bind:key="brand"
                    >
                      {{ brand }}
                    </option>
                  </select>
                </div>

                <div class="filter-pair">
                  <label>Modelo</label>
                  <select v-model="car.model">
                    <option value=""></option>
                    <option
                      v-for="model in listModel.models"
                      v-bind:key="model"
                    >
                      {{ model }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" v-if="operation == 'create'">Crear</button>
            <button type="submit" v-if="operation == 'update'">Modificar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import Swal from "sweetalert2";

export default {
  name: "carOperations",
  props: {
    carUpdate: Object,
  },
  data: function () {
    return {
      operation: "create",
      listCategory: [],
      listCity: [],
      listBrands: "",
      listModel: "",
      car: {
        id_car: "",
        license_plate: "",
        passengers: "",
        transmission: "",
        air_conditioning: false,
        suitcase: "",
        category: "",
        city: "",
        price: "",
        brand: "",
        model: "",
      },
    };
  },
  methods: {
    runQuery: async function () {
      if (this.car.brand != "") {
        this.$apollo.queries.listModel.skip = false;
        const result = await this.$apollo.queries.listModel.refetch();
        this.listModel = result.data.listModel;
      } else {
        this.car.model = "";
        this.listModel = "";
      }
    },

    processOperation: function (operation) {
      if (operation == "create") this.createCar();
      else this.updateCar();
    },

    createCar: async function () {
      delete this.car.id_car;

      this.car.passengers = parseInt(this.car.passengers, 10);
      this.car.price = parseInt(this.car.price, 10);

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateCar($carInput: CarInput!, $idUser: Int!) {
              createCar(carInput: $carInput, idUser: $idUser) {
                response
              }
            }
          `,
          variables: {
            idUser: parseInt(localStorage.getItem("userId"), 10),
            carInput: this.car,
          },
        })
        .then((result) => {
          this.$emit("CarRegisterComplete");
          Swal.fire({
            icon: "success",
            title: "Exito",
            text: "El vehiculo se creo con éxito",
            confirmButtonColor: "#141e28",
          });
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

    updateCar: async function () {
      const idCar = this.car.id_car
      delete this.car.id_car
      delete this.car.category_id
      delete this.car.city_id
      delete this.car.__typename

      this.car.passengers = parseInt(this.car.passengers, 10);
      this.car.price = parseInt(this.car.price, 10);

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UpdateCar(
              $idCar: Int!
              $carInput: CarInput!
              $idUser: Int!
            ) {
              updateCar(id_car: $idCar, carInput: $carInput, idUser: $idUser) {
                id_car
              }
            }
          `,
          variables: {
            idUser: parseInt(localStorage.getItem("userId"), 10),
            carInput: this.car,
            idCar: idCar
          },
        })
        .then((result) => {
          this.$emit("CarRegisterComplete");
          Swal.fire({
            icon: "success",
            title: "Exito",
            text: "El vehiculo se creo con éxito",
            confirmButtonColor: "#141e28",
          });
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
  },

  created: async function () {
    const result = await this.$apollo.queries.listCategory.refetch();
    this.listCategory = result.data.listCategory;

    const resultCitys = await this.$apollo.queries.listCity.refetch();
    this.listCity = resultCitys.data.listCity;

    const resultBrands = await this.$apollo.queries.listBrands.refetch();
    this.listBrands = resultBrands.data.listBrands;

    if (this.carUpdate.hasOwnProperty("license_plate")) {
      this.car = this.carUpdate;
      this.operation = "update";
      this.runQuery();
    }

    console.log(this.carUpdate);
    console.log(typeof this.carUpdate);
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
          brand: this.car.brand,
        };
      },
      skip() {
        return this.skipQuery;
      },
    },
  },
};
</script>
      
<style>
form {
  width: 100%;
}

.car-filter-group {
  display: flex;
  align-items: center;
  margin-block: 1%;
}

.car-filter button {
  width: 50%;
  margin: 1% auto 1% 25%;
  background-color: var(--light-blue-color);
  border: 1px solid var(--light-blue-color);
  border-radius: 10px;
  font-weight: bold;
  color: var(--white-color);
  padding: 2%;
  cursor: pointer;
}

.car-filter button:hover {
  background-color: var(--pink-color);
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

.car-filter h3{
  text-align: center;
}
</style>
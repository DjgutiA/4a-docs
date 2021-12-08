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
      <label>Maletero</label>
      <select v-model="carFilter.transmission">
        <option value="S">Pequeño</option>
        <option value="M">Mediano</option>
        <option value="B">Grande</option>
      </select>
      <label>Categoria</label>
      <select
        v-for="category in listCategory"
        v-bind:key="category.id_category"
        v-model="carFilter.category"
      >
        <option>{{ category.name_category }}</option>
      </select>
      <label>Ciudad</label>
      <select
        v-for="city in listCity"
        v-bind:key="city.id_city"
        v-model="carFilter.city"
      >
        <option>{{ city.name_city }}</option>
      </select>
      <label>Marca</label>
      <select
        v-for="brand in listBrands.brands"
        v-bind:key="brand"
        v-model="carFilter.brand"
      >
        <option>{{ brand }}</option>
      </select>
      <label>Modelo</label>
      <select
        v-for="model in listModel.models"
        v-bind:key="model"
        v-model="carFilter.model"
      >
        <option>{{ model }}</option>
      </select>
      <label>Precio entre</label>
      <input type="number" v-model="carFilter.price__gte" /><label>y</label
      ><input type="number" v-model="carFilter.price__lte" />
      <button class="">Filtrar</button>
    </div>
  </div>
</template>

<script>
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
    };
  },
};
</script>
<style scoped>
.filter button {
  width: 86%;
  height: 2%;
  background-color: var(--light-blue-color);
  border: 1 px solid var(--light-blue-color);
  border-radius: 10 px;
  font-size: 100%;
  font-weight: bold;
  color: var(--white-color);
  padding: 4%;
  margin-left: 7%;
  margin-bottom: 5%;
  cursor: pointer;
}
</style>
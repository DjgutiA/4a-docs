<template>
  <div>
    <div class="date-filter">
      <h3>Elige la fechas</h3>
      <label for="">Desde</label>
      <input type="date" v-model="availabilityInput.start_date" required />
      <label for="">Hasta</label>
      <input type="date" v-model="availabilityInput.end_date" required />
      <button @click="createAvailability">Crear</button>
    </div>
    <div class="rental-table">
      <table v-if="filterAvailabilityByCar[0]">
        <tbody>
          <tr>
            <th>Fecha</th>
            <th>Estatus</th>
            <th>Modificado</th>
          </tr>
        </tbody>
        <tr
          v-for="availability in filterAvailabilityByCar"
          :key="availability.id_availability"
        >
          <th>{{ availability.date }}</th>
          <th v-if="availability.is_availability">Disponible</th>
          <th v-else>Reservado</th>
          <th>{{ availability.modified.substr(0, 10) }}</th>
        </tr>
      </table>
      <h1 v-else>No hay información</h1>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import gql from "graphql-tag";

export default {
  name: "availability",
  data: function () {
    return {
      filterAvailabilityByCar: [],
      availabilityInput: {
        car: "",
        start_date: "",
        end_date: "",
        is_availability: "",
      },
    };
  },
  created: function () {},
  apollo: {
    filterAvailabilityByCar: {
      query: gql`
        query Query($idCar: Int!, $idUser: Int!) {
          filterAvailabilityByCar(id_car: $idCar, idUser: $idUser) {
            id_availability
            car
            date
            is_availability
            created
            modified
          }
        }
      `,
      variables() {
        return {
          idUser: parseInt(localStorage.getItem("userId"), 10),
          idCar: parseInt(localStorage.getItem("id_car"), 10),
        };
      },
    },
  },
};
</script>
<style>
</style>
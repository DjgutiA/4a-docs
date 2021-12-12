<template>
  <div class="rental-table">
    <table v-if="listRentalByUser[0]">
      <tbody>
        <tr>
          <th>No. Reserva</th>
          <th>Fecha de creación</th>
          <th>Fecha de recogida</th>
          <th>Fecha de entrega</th>
          <th>Precio</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </tbody>
      <tr v-for="rental in listRentalByUser" :key="rental.id">
        <th>{{ rental.id }}</th>
        <th>{{ rental.rentalDate.substr(0, 10) }}</th>
        <th>{{ rental.startDate }}</th>
        <th>{{ rental.finalDate }}</th>
        <th>{{ formatterNumber(rental.price) }}</th>
        <th>
          <button><i class="fas fa-edit"></i></button>
        </th>
        <th>
          <button @click="deleteRental(rental.id, rental.idUser)">
            <i class="fas fa-trash"></i>
          </button>
        </th>
      </tr>
    </table>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import gql from "graphql-tag";

export default {
  name: "rentalsTable",
  data: function () {
    return {
      listRentalByUser: [],
    };
  },
  methods: {
    formatterNumber: function (value) {
      var formatter = new Intl.NumberFormat("es-CO", {});
      return formatter.format(value);
    },
    deleteRental: async function (id, idUser) {
      Swal.fire({
        title: "¿Esta seguro de eliminar la reserva?",
        text: `Reserva ${id} se eliminará`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#141e28",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$apollo
            .mutate({
              mutation: gql`
                mutation Mutation($idRental: String!, $idUser: Int!) {
                  deleteRental(idRental: $idRental, idUser: $idUser) {
                    response
                  }
                }
              `,
              variables: {
                idRental: id,
                idUser: idUser,
              },
            })
            .then(async (result) => {
              await Swal.fire({
                icon: "success",
                title: "Reserva eliminada",
                text: `Reserva ${id} eliminada`,
                confirmButtonColor: "#141e28",
              });
              location.reload();
            })
            .catch(async (error) => {
              await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ERROR 401: No se pudo eliminar la reserva.",
                confirmButtonColor: "#141e28",
              });
              location.reload();
            });
        }
      });
    },
  },
  apollo: {
    listRentalByUser: {
      query: gql`
        query Query($idUser: Int!) {
          listRentalByUser(idUser: $idUser) {
            id
            idCar
            idUser
            rentalDate
            startDate
            finalDate
            price
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
<style>
.rental-table {
  margin-top: 10%;
}
table {
  width: 40%;
  border-collapse: collapse;
}
th {
  font-size: 70%;
  font-weight: bold;
  border: 1px solid black;
}

td {
  font-weight: normal;
  width: 10%;
  font-size: 60%;
}
</style>

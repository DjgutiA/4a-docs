<template>
  <div class="parent">
    <h2>Mis Reservas</h2>
    <div class="container">
      <table v-if="listRentalByUser[0]" class="rental-table">
        <tbody>
          <tr>
            <th>No. Reserva</th>
            <th>Fecha de creación</th>
            <th>Fecha de recogida</th>
            <th>Fecha de entrega</th>
            <th>Precio</th>
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
            <button @click="deleteRental(rental.id, rental.idUser)">
              <i class="fas fa-trash"></i>
            </button>
          </th>
        </tr>
      </table>
      <h1 v-else class="no-info-founded">Aún no tienes reservas</h1>
    </div>
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

<style scoped>
.parent {
  width: 100%;
  margin-top: 8%;
  margin-bottom: 5%;
}
.container {
  display: flex;
  justify-content: center;
}
.rental-table {
  width: 60%;
}
.rental-table {
  border: 2px solid var(--dark-blue-color);
  border-radius: 10px;
  font-size: 50%;
  width: 90%;
  font-weight: 400;
  color: var(--dark-blue-color);
  border-collapse: collapse;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.1);
}

tr {
  text-align: center;
}

tr:nth-child(even) {
  background-color: var(--light-blue-color);
  color: white;
}

h2 {
  color: var(--dark-blue-color);
  font-size: 90%;
  text-align: center;
  margin-bottom: 3%;
}

.fa-trash,
.fa-edit {
  color: var(--dark-blue-color);
  cursor: pointer;
}

.no-info-founded {
  font-size: 100%;
  color: var(--dark-blue-color);
}
</style>

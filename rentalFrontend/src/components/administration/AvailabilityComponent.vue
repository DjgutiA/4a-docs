<template>
  <div class="container">
    <div class="date-filter">
      <h3>Elige la fechas</h3>
      <div>
        <label for="">Desde</label>
        <input type="date" v-model="availabilityInput.start_date" required />
      </div>
      <div>
        <label for="">Hasta</label>
        <input type="date" v-model="availabilityInput.end_date" required />
      </div>
      <div>
        <label for="">Estado</label>
        <select v-model="availabilityInput.is_availability">
          <option value="true">Disponible</option>
          <option value="false">Reservado</option>
        </select>
      </div>
      <button @click="createAvailability">Crear</button>
    </div>
    <div class="rental-table">
      <table v-if="filterAvailabilityByCar[0]">
        <tbody>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Modificado</th>
          </tr>
        </tbody>
        <tr
          v-for="availability in filterAvailabilityByCar"
          :key="availability.id_availability"
        >
          <td>{{ availability.date }}</td>
          <td v-if="availability.is_availability">Disponible</td>
          <td v-else>Reservado</td>
          <td>{{ availability.modified.substr(0, 10) }}</td>
        </tr>
      </table>
      <h1 v-else class="no-info-founded">
        No hay disponibilidades para este vehículo
      </h1>
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
  methods: {
    createAvailability: async function () {
      if (
        this.availabilityInput.start_date != "" &&
        this.availabilityInput.end_date != "" &&
        this.availabilityInput.is_availability != "" &&
        Date.parse(this.availabilityInput.start_date) <=
          Date.parse(this.availabilityInput.end_date)
      ) {
        this.availabilityInput.car = parseInt(
          localStorage.getItem("id_car"),
          10
        );
        this.availabilityInput.is_availability == "true"
          ? (this.availabilityInput.is_availability = true)
          : (this.availabilityInput.is_availability = false);
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation CreateAvailability(
                $availabilityInput: AvailabilityInput!
                $idUser: Int
              ) {
                createAvailability(
                  availabilityInput: $availabilityInput
                  idUser: $idUser
                ) {
                  id_availability
                }
              }
            `,
            variables: {
              idUser: parseInt(localStorage.getItem("userId"), 10),
              availabilityInput: this.availabilityInput,
            },
          })
          .then((result) => {
            Swal.fire({
              icon: "success",
              title: "Exito",
              text: "Se creo el rango de fechas al vehiculo",
              confirmButtonColor: "#141e28",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "ERROR: Fallo en la creación de fechas." + error,
              confirmButtonColor: "#141e28",
            });
          });
        this.$apollo.queries.filterAvailabilityByCar.refetch();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Datos incorrectos",
          text: "Verifique las fechas y el estado seleccionado",
          confirmButtonColor: "#141e28",
        });
      }
    },
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin-top: 8%;
  margin-bottom: 5%;
}

.date-filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid var(--dark-blue-color);
  border-radius: 10px;
  width: 30%;
  margin-right: 3%;
  height: 35%;
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.1);
}

.date-filter h3 {
  color: var(--dark-blue-color);
  text-align: center;
  font-size: 90%;
  margin-bottom: 8%;
}

.date-filter input[type="date"],
select {
  background-color: var(--white-color);
  color: var(--dark-blue-color);
  border: 1px solid var(--dark-blue-color);
  border-radius: 5px;
  font-size: 50%;
  width: 80%;
  margin-left: 2%;
  margin-bottom: 5%;
}

.date-filter button {
  cursor: pointer;
  font-size: 50%;
  color: var(--white-color);
  background-color: var(--light-blue-color);
  border: 1px solid var(--light-blue-color);
  padding: 2%;
  width: 50%;
  margin-block: 5%;
  border-radius: 5px;
}

.date-filter button:hover {
  background-color: var(--pink-color);
}

.date-filter div {
  margin: 0;
  display: flex;
  justify-content: space-around;
  width: 90%;
}

.date-filter div label {
  font-size: 50%;
  margin: 0;
}
.rental-table {
  width: 60%;
}
.rental-table table {
  border: 2px solid var(--dark-blue-color);
  border-radius: 10px;
  font-size: 50%;
  width: 100%;
  font-weight: 400;
  color: var(--dark-blue-color);
  border-collapse: collapse;
}
.rental-table table {
  box-shadow: 4px 4px 9px 1px rgba(0, 0, 0, 0.25);
}

tr {
  text-align: center;
}

tr:nth-child(even) {
  background-color: var(--light-blue-color);
  color: white;
}

.no-info-founded {
  font-size: 90%;
  color: var(--dark-blue-color);
}
</style>
<template>
  <navbar />
  <CardCarsDetails :listCar="listCar" v-if="showListComponent" 
                    @createCar="createCar" @editCar="editCar" />
  <carOperations :carUpdate="car" v-if="showOperationsComponent" @CarRegisterComplete="CarRegisterComplete"/>
  <Footer />

  
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardCarsDetails from "@/components/administration/cardCarsDetails";
import HeroSection from "@/components/HeroSection";
import carOperations from "@/components/administration/carOperations";
import gql from "graphql-tag";


export default {
  components: { Navbar, Footer, CardCarsDetails, HeroSection, carOperations  },
  name: "carIndex",
  data: function () {
    return {
      listCar: [],
      showListComponent: false,
      showOperationsComponent: false,
      car: {}
    };
  },

  methods: {
    createCar: function(){
      this.showListComponent = false,
      this.showOperationsComponent= true
    },

    editCar: function(car){
      this.showListComponent = false
      this.car.category = car.category_id.id_category
      this.car.city =  car.city_id.id_city
      this.car = {...this.car, ...car};
      this.showOperationsComponent= true
    },

    CarRegisterComplete:function(){
      this.refreshCardCars("")
      this.showListComponent = true,
      this.showOperationsComponent= false
    },
    
    refreshCardCars: async function(license_plate){
      if(license_plate == ""){
         const result =  await this.$apollo.queries.getCars.refetch();
        this.listCar = result.data.listCar; 
        this.showListComponent = true
      }
    },


  },
  created: async function () {
   this.refreshCardCars("");
  },
  apollo: {
    getCars: {
      query: gql`
        query Query($idUser: Int!) {
          listCar(idUser: $idUser) {
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
        };
      },
    },
    
  },
};
</script>

<style scoped lang="css">
@import "../../assets/css/carStyle.css";
</style>
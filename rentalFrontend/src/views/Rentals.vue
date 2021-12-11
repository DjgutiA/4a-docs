<template>
  <div class="rental">
    <RentalsTable></RentalsTable>
    <Navbar></Navbar>
    <Footer></Footer>
  </div>
</template>

<script>
import RentalsTable from "@/components/RentalsTable";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "rentals",
  components: {
    RentalsTable,
    Navbar,
    Footer,
  },
};
</script>
<template>
  <div class="rental">
    <AvailabilityComponent></AvailabilityComponent>
    <Navbar></Navbar>
    <Footer></Footer>
  </div>
</template>

<script>
import AvailabilityComponent from "@/components/administration/AvailabilityComponent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "rentals",
  components: {
    AvailabilityComponent,
    Navbar,
    Footer,
  },
};
</script>
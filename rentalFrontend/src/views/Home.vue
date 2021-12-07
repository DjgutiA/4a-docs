<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    <Footer></Footer>
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    HeroSection,
    Navbar,
    Footer,
    Navbar,
  },
};
</script>

<template>
  <div class="home">
    <HeroSection></HeroSection>
    <Navbar></Navbar>
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
  },
};
</script>

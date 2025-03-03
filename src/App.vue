<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar: Navbar,
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}
</style>

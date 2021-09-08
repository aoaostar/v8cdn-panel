<template>
  <div class="layout">
    <Navbar :defaultActive="'login'" />
    <Login />
  </div>
</template>
<style scoped>
</style>
<script>
import Login from "@components/Login.vue";
import Navbar from "@components/Navbar.vue";
export default {
  name: "Home",
  components: {
    Login,
    Navbar,
  },
};
</script>

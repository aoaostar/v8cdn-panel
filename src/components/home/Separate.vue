<template>
  <div class="separate-panel"></div>
</template>
<style scoped>
.separate-panel {
  position: relative;
}
.separate-panel::before {
  content: "";
  display: block;
  position: absolute;
  top: -12rem;
  width: 100%;
  height: 15rem;
  background: #f8faff;
  box-shadow: 0 -0.3rem 1.5rem 0 #dfe1e6;
  transform: skewY(-4deg);
  background-color: #f5f7f9;
}
@media only screen and (max-width: 992px) {
  .separate-panel::before {
    top: -3rem;
  }
}
</style>
<script>
// Separate

export default {
  name: "Separate",
  components: {
  },
};
</script>

<template>
  <div class="prototype-screens">
    <div>
      <img src="@assets/images/prototype-1.png" alt="" />
    </div>
    <div>
      <img src="@assets/images/prototype-2.png" alt="" />
    </div>
    <div>
      <img src="@assets/images/prototype-3.png" alt="" />
    </div>
    <div>
      <img src="@assets/images/prototype-4.png" alt="" />
    </div>
  </div>
</template>
<style scoped>
.prototype-screens {
  display: flex;
}
.prototype-screens img {
  width: 100%;
  /* height: 100%; */
}
.prototype-screens > div {
  margin: 0 1rem;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 30px 0 rgb(223 225 230 / 50%);
}
.prototype-screens div:nth-child(1) {
  margin-top: 10rem;
}
.prototype-screens div:nth-child(2) {
  margin-top: 7.5rem;
}
.prototype-screens div:nth-child(3) {
  margin-top: 5rem;
}
.prototype-screens div:nth-child(4) {
  margin-top: 2.5rem;
}
@media only screen and (max-width: 992px) {
  .prototype-screens div:nth-child(1) {
    margin-top: 4rem;
  }
  .prototype-screens div:nth-child(2) {
    margin-top: 3rem;
  }
  .prototype-screens div:nth-child(3) {
    margin-top: 2rem;
  }
  .prototype-screens div:nth-child(4) {
    margin-top: 1rem;
  }
}
</style>
<script>
export default {
  name: "PrototypeScreens",
  components: {},
};
</script>
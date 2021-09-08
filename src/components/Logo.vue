<template>
  <router-link class="logo" to="/" tag="div">
    <div class="image">
      <img src="@assets/images/logo.png" alt="" srcset="" />
    </div>
    <div class="title">{{ $V8CDN.appName }}</div>
  </router-link>
</template>
<style scoped>
.logo {
  cursor: pointer;
  height: 100%;
  display: flex;
}
.logo .image {
  height: 60px;
  width: 60px;
}
.logo .image img {
  width: 100%;
  height: 100%;
}
.logo .title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  font-weight: bolder;
}
</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #f5f7f9;
  height: 100%;
  margin: 0;
  padding: 0;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
#app {
  
  background-color: #f5f7f9;
  height: 100vh;
}
</style>

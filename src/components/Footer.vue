<template>
  <div class="footer">
    <div class="logo">
      <Logo />
      <div class="copyright">
        © {{ new Date().getFullYear() }} Created by Pluto
      </div>
    </div>
    <div class="github" @click="openGithub">
      <img src="@assets/images/github.png" alt="" />
    </div>
  </div>
</template>
<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 2rem 5rem 4rem;
  background-color: #fff;
  margin: 3rem 0 0;

  color: #6190e8;
}
.footer .logo {
  height: 4rem;

  color: #6190e8;
}

.footer .logo .copyright {
  font-size: 0.9rem;
}
.footer .github {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
<script>
import { openGithub } from "@utils/functions";
import Logo from "@components/Logo.vue";
export default {
  name: "Footer",
  components: {
    Logo,
  },
  methods: {
    openGithub,
  },
};
</script>

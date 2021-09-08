<template>
  <el-container>
    <el-header class="header">
      <Navbar />
    </el-header>
    <el-main class="main">
      <div class="logo">
        <svg
          t="1631020364381"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4082"
          data-spm-anchor-id="a313x.7781069.0.i0"
          width="200"
          height="200"
        >
          <path
            d="M869.9904 447.044267C860.962133 293.444267 734.344533 170.666667 581.717333 170.666667c-92.672 0-182.408533 45.448533-238.011733 119.6032-1.28-0.6656-2.628267-1.1264-3.925333-1.7408a159.095467 159.095467 0 0 0-10.308267-4.590934 154.658133 154.658133 0 0 0-16.418133-5.410133c-1.962667-0.529067-3.908267-1.0752-5.888-1.518933a163.2768 163.2768 0 0 0-11.7248-2.133334c-1.723733-0.256-3.413333-0.597333-5.154134-0.785066A155.2384 155.2384 0 0 0 273.066667 273.066667c-84.701867 0-153.6 68.898133-153.6 153.6 0 2.167467 0.136533 4.3008 0.273066 6.434133v0.068267C48.759467 471.876267 0 552.942933 0 634.094933 0 754.978133 98.338133 853.333333 219.221333 853.333333h418.269867c1.774933 0 3.5328-0.1024 5.307733-0.238933l1.058134-0.136533 2.286933 0.136533c1.7408 0.136533 3.4816 0.238933 5.2736 0.238933h167.304533C931.908267 853.333333 1024 761.2416 1024 648.055467c0-93.678933-65.314133-177.698133-154.0096-201.0112zM818.722133 819.2h-167.304533c-1.006933 0-1.979733-0.085333-2.9696-0.1536l-4.625067-0.187733-3.3792 0.187733c-0.9728 0.068267-1.962667 0.1536-2.952533 0.1536H219.221333C117.162667 819.2 34.133333 736.170667 34.133333 634.094933 34.133333 563.2 80.298667 489.608533 143.9232 459.1104L153.6 454.485333V443.733333c0-2.167467 0.136533-4.369067 0.256-6.587733l0.1536-2.730667-0.2048-3.584C153.7024 429.448533 153.6 428.066133 153.6 426.666667c0-65.860267 53.6064-119.466667 119.466667-119.466667a119.381333 119.381333 0 0 1 19.626666 1.757867c4.5568 0.750933 9.045333 1.7408 13.4656 3.0208 0.597333 0.170667 1.211733 0.290133 1.809067 0.4608 4.864 1.4848 9.608533 3.362133 14.250667 5.4784 1.211733 0.546133 2.389333 1.143467 3.584 1.723733A119.381333 119.381333 0 0 1 392.533333 426.666667a17.066667 17.066667 0 1 0 34.133334 0 153.258667 153.258667 0 0 0-54.613334-117.265067C420.983467 245.4016 501.5552 204.8 581.717333 204.8c132.181333 0 241.954133 104.704 253.405867 237.021867-17.442133-1.2288-43.554133-1.860267-69.6832 2.116266a17.066667 17.066667 0 0 0 5.12 33.7408c38.007467-5.751467 77.6192-0.3584 79.940267-0.034133C929.962667 492.7488 989.866667 565.947733 989.866667 648.055467 989.866667 742.417067 913.083733 819.2 818.722133 819.2z"
            p-id="4083"
            fill="#6190e8"
          ></path>
        </svg>
      </div>
      <div class="desc">无限 DDOS 防御、全球 CDN</div>
      <div class="btn-group">
        <button class="btn btn-begin" @click="$router.push({ name: 'Login' })">
          开始使用
        </button>
        <button class="btn btn-github" @click="openGithub">GITHUB</button>
      </div>
      <Prototype-screens />
    </el-main>
    <Separate />
    <Navigation />
    <Footer />
  </el-container>
</template>
<style scoped>
.header {
  padding: 0;
}
.main {
  overflow: initial;
}
.main > .logo {
  margin-top: 8rem;
  text-align: center;
}
@media screen and (max-width: 992px) {
  .main > .logo {
    margin-top: 1rem;
  }
}
.main > .desc {
  margin: 5rem auto;
  color: #8994c6;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
@media screen and (max-width: 992px) {
  .main > .desc {
    margin: 2rem auto;
  }
}
.main .btn-group {
  text-align: center;
  /* margin: 5rem auto; */
}
.main .btn-group .btn {
  display: inline-block;
  width: 11rem;
  height: 3.5rem;
  margin: 1rem 2rem;
  font-size: 1rem;
  line-height: 3.5rem;
  border-radius: 2rem;
  transition: all 0.3s;
  cursor: pointer;
  border-style: none;
}
.main .btn-group .btn:hover {
  box-shadow: 0 4px 12px 0 rgb(51 105 231 / 40%);
}
.main .btn-group .btn-begin {
  color: #fff;
  background-image: linear-gradient(90deg, #00aeff 0%, #3369e7 100%);
  box-shadow: 0 2px 6px 0 rgb(51 105 231 / 40%);
  cursor: pointer;
  -webkit-transition: color 0.3s ease;
  transition: color 0.3s ease;
}
.main .btn-group .btn-github {
  color: #316de9;
  border: 1px solid #2f6ee9;
  background-color: #fff;
}
</style>
<script>
import { Container, Header, Main } from "element-ui";
import Navbar from "@components/Navbar.vue";
import Navigation from "@components/home/Navigation.vue";
import PrototypeScreens from "@components/home/PrototypeScreens.vue";
import Separate from "@components/home/Separate.vue";
import Footer from "@components/Footer.vue";
import { openGithub } from "@utils/functions";
export default {
  name: "Home",
  components: {
    ElContainer: Container,
    ElMain: Main,
    ElHeader: Header,

    Navbar,
    Navigation,
    PrototypeScreens,
    Separate,
    Footer,
  },
  methods: {
    openGithub,
  },
};
</script>

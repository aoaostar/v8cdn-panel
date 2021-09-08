<template>
  <el-container class="nav">
    <div class="left">
      <Logo />
      <div class="menu-btn" @click="navbarstatus = !navbarstatus">
        <i class="el-icon-more"></i>
      </div>
    </div>
    <transition name="fade">
      <div :class="navbarstatus ? 'right active' : 'right'">
        <el-menu
          v-if="isLogin()"
          mode="horizontal"
          :default-active="defaultActive"
        >
          <el-menu-item
            class="item"
            index="dashboard"
            @click="$router.push('/dashboard')"
            >控制台</el-menu-item
          >
          <el-menu-item
            class="item"
            index="createZone"
            @click="$router.push('/zone/create')"
            >添加域名</el-menu-item
          >
          <el-menu-item
            class="item"
            index="instructions"
            @click="openUrl($V8CDN.instructions)"
            >使用说明</el-menu-item
          >
          <el-submenu class="item" index="username">
            <template slot="title">{{ getUsername() }}</template>
            <el-menu-item index="logout" @click="logout">退出</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-menu v-else mode="horizontal" :default-active="defaultActive">
          <el-menu-item
            class="item"
            index="login"
            @click="$router.push('login')"
            >登录</el-menu-item
          >
          <el-menu-item
            class="item"
            index="register"
            @click="openUrl('https://www.cloudflare.com')"
            >注册</el-menu-item
          >
          <el-menu-item
            class="item"
            index="instructions"
            @click="openUrl($V8CDN.instructions)"
            >使用说明</el-menu-item
          >
        </el-menu>
      </div>
    </transition>
  </el-container>
</template>
    
<style>
.nav {
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 1px 1px #e6e6e6;
  padding: 0 5rem;
  height: 60px;
  position: relative;
}
.nav .menu-btn {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: #6190e8;
}
.nav .right {
  transition: all 1s ease;
}
@media only screen and (max-width: 992px) {
  .nav {
    justify-content: center;
  }
  .nav .menu-btn {
    display: inline-block;
    position: absolute;
    top: 25%;
    right: 4%;
  }
  .nav .right {
    position: absolute;
    z-index: 999;
    top: 100%;
    right: 0;
    height: 0;
    /* width: 0; */
    overflow: hidden;
  }
  .nav .right .item {
    float: none;
    min-width: 13rem;
  }
  .nav .right.active {
    height: 15rem;
  }
}
</style>
<script>
import { Menu, Submenu, MenuItem, Container } from "element-ui";
import { isLogin, getUsername, logout, openUrl } from "@utils/functions";
import Logo from "@components/Logo";

export default {
  components: {
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem,
    ElContainer: Container,
    Logo,
  },
  props: ["defaultActive"],
  data() {
    return {
      navbarstatus: false,
    };
  },
  methods: {
    isLogin,
    getUsername,
    openUrl,
    logout() {
      logout();
      this.$message.success("退出成功");
      this.$router.push("/");
    },
    changeTheme(type) {
      this.theme = type;
    },
  },
};
</script>
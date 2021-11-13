<template>
  <el-container class="nav">
    <div class="left">
      <Logo/>
      <div class="menu-btn" @click="navbarstatus = !navbarstatus">
        <svg t="1636803517171" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2432" width="100%" height="100%"><path d="M963.764706 180.705882v120.470589H60.235294V180.705882h903.529412zM60.235294 602.352941h903.529412V481.882353H60.235294v120.470588z m0 301.176471h903.529412v-120.470588H60.235294v120.470588z" p-id="2433"></path></svg>
      </div>
    </div>
    <transition name="fade">
      <div class="right" :class="{active:navbarstatus}">
        <el-menu
            v-if="isLogin()"
            mode="horizontal"
            :default-active="defaultActive"
            menu-trigger="click"
        >
          <el-menu-item
              class="item"
              index="dashboard"
              @click="$router.push('/dashboard')"
          >控制台
          </el-menu-item
          >
          <el-menu-item
              class="item"
              index="createZone"
              @click="$router.push('/zone/create')"
          >添加域名
          </el-menu-item
          >
          <el-menu-item
              class="item"
              index="instructions"
              @click="openUrl($V8CDN.instructions)"
          >使用说明
          </el-menu-item
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
          >登录
          </el-menu-item
          >
          <el-menu-item
              class="item"
              index="register"
              @click="openUrl('https://www.cloudflare.com')"
          >注册
          </el-menu-item
          >
          <el-menu-item
              class="item"
              index="instructions"
              @click="openUrl($V8CDN.instructions)"
          >使用说明
          </el-menu-item
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
.nav .menu-btn svg{
  width: 1.2rem;
}
.nav .right {
  transition: all 0.2s ease;
}

@media only screen and (max-width: 992px) {
  .nav {
    justify-content: center;
  }

  .nav .menu-btn {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 3rem;
    justify-content: center;
    align-items: center;
  }

  .nav .right {
    position: absolute;
    z-index: 999;
    top: 100%;
    right: 0;
    height: 0;
    /* width: 0; */
    overflow: hidden;
    border: 1px solid #e4e7ed;
    box-shadow: 0 0.2px 12px 0 rgb(0 0 0 / 10%);
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
import {Menu, Submenu, MenuItem, Container} from "element-ui";
import {isLogin, getUsername, logout, openUrl} from "@utils/functions";
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
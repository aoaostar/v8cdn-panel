<template>
  <div class="login-panel">
    <el-card class="card" :body-style="{ padding: 0 }" v-loading="loading">
      <div class="header">
        <div class="logo">
          <img src="@assets/images/logo.png" />
        </div>
      </div>
      <div class="content">
        <el-input
          class="item"
          placeholder="请输入您的cloudflare邮箱"
          v-model="user.email"
        >
          <template slot="prepend"><i class="el-icon-message"></i></template>
        </el-input>
        <el-input
            class="item"
            type="password"
            placeholder="请输入您的cloudflare密码"
            v-model="user.password"
            @keyup.enter.native="login"
            v-if="$V8CDN.authType==='partner'"
        >
          <template slot="prepend"><i class="el-icon-lock"></i></template>
        </el-input>
        <el-input
            class="item"
            type="password"
            placeholder="请输入您的cloudflare global key"
            v-model="user.user_api_key"
            @keyup.enter.native="login"
            v-else
        >
          <template slot="prepend"><i class="el-icon-lock"></i></template>
        </el-input>
        <el-button class="item" type="primary" @click="login">登录</el-button>
      </div>
    </el-card>
  </div>
</template>
<style scoped>
.login-panel {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.login-panel .card {
  max-width: 40rem;
  overflow: visible;
  margin: 0 .5rem;
}
.login-panel .header {
  display: flex;
  justify-content: center;
}
.login-panel .logo {
  width: 3rem;
  height: 3rem;
  position: relative;
  top: 25%;
  transform: translateY(-50%);
}
.login-panel .logo img {
  width: 100%;
  height: 100%;
}
.login-panel .content {
  padding: 0 2rem 2rem;
}
.login-panel .content .item {
  margin: 0.5rem auto;
}
.login-panel .content button {
  width: 100%;
}
</style>
<script>
import { Card, Input, Button } from "element-ui";
import { fetchPost } from "@utils/requests";
import { setToken, setUsername } from "@utils/functions";

export default {
  name: "Login",
  components: {
    ElCard: Card,
    ElInput: Input,
    ElButton: Button,
  },
  data() {
    return {
      loading: false,
      user:{
        email: "",
        password: "",
        user_api_key: "",
      },

    };
  },
  methods: {
    login() {
      this.loading = true;
      let params = Object.assign({},this.user)
      if (this.$V8CDN.authType === 'partner'){
        delete params['user_api_key']
      }else{
        delete params['password']
      }
      fetchPost("/auth/login", params)
        .then((res) => {
          if (res.status == "ok") {
            setToken(res.data.token);
            setUsername(this.user.email);
            this.$message.success("登录成功");
            this.$router.push("/dashboard");
          } else {
            localStorage.clear();
            this.$message.error(res.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

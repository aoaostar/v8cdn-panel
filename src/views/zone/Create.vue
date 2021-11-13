<template>
  <div class="layout">
    <Navbar :defaultActive="'createZone'" />
    <el-container>
      <el-main class="panel">
      <el-card class="card box-card" :body-style="{}">
        <div class="item">
          <div class="title">域名:</div>
          <div class="content">
            <el-input placeholder="请输入域名" v-model="zone_name" @keyup.enter.native="submit"> </el-input>
          </div>
        </div>
        <el-button
          class="btn"
          v-loading="submit_loading"
          type="primary"
          @click="submit"
          >提交</el-button
        >
      </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<style scoped>
.card {
  max-width: 40rem;
  margin: 0 auto;
}
.item {
  display: flex;
  margin: 1rem 0;
  /* box-sizing: border-box; */
}
.item .title {
  width: 7rem;
}
.item .content {
  width: 100%;
}
button.btn {
  text-align: center;
  width: 100%;
}
</style>
<script>
import Navbar from "@components/Navbar.vue";
import { Container, Card, Input, Button, Main } from "element-ui";
import { fetchPost } from "@utils/requests";
export default {
  name: "Edit",
  components: {
    Navbar,
    ElContainer: Container,
    ElCard: Card,
    ElInput: Input,
    ElButton: Button,
    ElMain: Main,
  },
  data() {
    return {
      submit_loading: false,
      zone_name: "",
    };
  },
  created() {},
  methods: {
    submit() {
      this.submit_loading = true;
      fetchPost("/api/zone", {
        zone_name: this.zone_name,
      })
        .then((res) => {
          if (res.status === "ok") {
            this.$message.success("添加成功");
            this.$router.push("/dashboard");
          } else {
            this.$message.error(res.message);
          }
        })
        .finally(() => {
          this.submit_loading = false;
        });
    },
  },
};
</script>

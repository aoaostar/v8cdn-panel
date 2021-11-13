<template>
  <div class="layout">
    <Navbar/>
    <el-container>
      <el-main class="panel">
        <el-card class="card box-card" :body-style="{}">
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }"
            >Home
            </el-breadcrumb-item
            >
            <el-breadcrumb-item
                :to="{
                name: 'ZoneDnsrecords',
                params: { id: $route.params.zone_id },
              }"
            >DNSRecords
            </el-breadcrumb-item
            >
            <el-breadcrumb-item>Create</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="form">
            <div class="item">
              <div class="title">记录名称:</div>
              <div class="content">
                <el-input placeholder="请输入记录名称" v-model="dnsrecord.name">
                </el-input>
              </div>
            </div>
            <div class="item">
              <div class="title">记录类型:</div>
              <div class="content">
                <el-select v-model="dnsrecord.type" placeholder="请选择记录类型">
                  <el-option
                      v-for="item in dnsrecord_types"
                      :key="item"
                      :label="item"
                      :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="item">
              <div class="title">记录内容:</div>
              <div class="content">
                <el-input
                    placeholder="请输入记录内容"
                    v-model="dnsrecord.content"
                    type="textarea"
                    :rows="5"
                >
                </el-input>
              </div>
            </div>
            <div class="item">
              <div class="title">TTL:</div>
              <div class="content">
                <el-select v-model="dnsrecord.ttl" placeholder="请选择TTL">
                  <el-option
                      v-for="item in dnsrecord_ttl"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="item">
              <div class="title">CDN:</div>
              <div class="content">
                <el-switch
                    v-model="dnsrecord.proxied"
                    active-text="加速"
                    inactive-text="回源"
                >
                </el-switch>
              </div>
            </div>
            <el-button
                class="btn"
                v-loading="submit_loading"
                type="primary"
                @click="submit"
            >提交
            </el-button
            >
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<style scoped>

.form {
  margin-top: 2rem;
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
import {
  Container,
  Card,
  Input,
  Button,
  Select,
  Option,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
  Main,
} from "element-ui";
import {fetchPost} from "@utils/requests";

export default {
  name: "Edit",
  components: {
    Navbar,
    ElContainer: Container,
    ElCard: Card,
    ElInput: Input,
    ElButton: Button,
    ElSelect: Select,
    ElOption: Option,
    ElSwitch: Switch,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem,
    ElMain: Main,
  },
  data() {
    return {
      submit_loading: false,
      zone_id: this.$route.params.zone_id,
      dnsrecord_types: [
        "A",
        "AAAA",
        "CNAME",
        "HTTPS",
        "TXT",
        "SRV",
        "LOC",
        "MX",
        "NS",
        "SPF",
        "CERT",
        "DNSKEY",
        "DS",
        "NAPTR",
        "SMIMEA",
        "SSHFP",
        "SVCB",
        "TLSA",
        "URI",
      ],
      dnsrecord_ttl: [
        {
          label: "Automatic",
          value: 1,
        },
        {
          label: "2 mins",
          value: 120,
        },
        {
          label: "5 mins",
          value: 300,
        },
        {
          label: "10 mins",
          value: 600,
        },
        {
          label: "15 mins",
          value: 900,
        },
        {
          label: "30 mins",
          value: 1800,
        },
        {
          label: "1 hour",
          value: 3600,
        },
        {
          label: "2 hour",
          value: 7200,
        },
        {
          label: "5 hour",
          value: 18000,
        },
        {
          label: "12 hours",
          value: 43200,
        },
        {
          label: "1 day",
          value: 86400,
        },
      ],
      dnsrecord: {
        content: "",
        created_on: "",
        id: "",
        meta: {
          auto_added: false,
          managed_by_apps: false,
          managed_by_argo_tunnel: false,
          source: "",
        },
        modified_on: "",
        name: "",
        proxiable: false,
        proxied: true,
        ttl: 1,
        type: "CNAME",
        zone_id: "",
        zone_name: "",
      },
    };
  },
  methods: {
    submit() {
      this.submit_loading = true;
      fetchPost("/api/dnsrecord", {
        zone_id: this.zone_id,
        dnsrecord: this.dnsrecord,
      })
          .then((res) => {
            if (res.status === "ok") {
              this.$message.success("添加成功");
              this.$router.push({
                name: "ZoneDnsrecords",
                params: {
                  zone_id: this.zone_id,
                },
              });
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

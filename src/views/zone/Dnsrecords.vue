<template>
  <div class="layout">
    <Navbar />
    <el-container>
      <el-main class="panel">
        <el-card shadow="always">
          <div class="header">
            <el-breadcrumb class="breadcrumb" separator="/">
              <el-breadcrumb-item :to="{ path: '/dashboard' }"
                >Home</el-breadcrumb-item
              >
              <el-breadcrumb-item>DNSRecords</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="btn">
              <el-button
                type="primary"
                plain
                @click="
                  $router.push({
                    name: 'DnsrecordCreate',
                    params: { zone_id: $route.params.zone_id },
                  })
                "
                >添加记录</el-button
              >
            </div>
          </div>
          <el-table
            height="30rem"
            border
            v-loading="loading"
            :data="dnsrecords"
          >
            <el-table-column prop="type" label="记录类型" sortable width="180">
            </el-table-column>
            <el-table-column prop="name" label="记录名" sortable>
            </el-table-column>
            <el-table-column prop="content" label="记录值" sortable>
            </el-table-column>
            <el-table-column prop="ttl" label="TTL" sortable width="100">
            </el-table-column>
            <el-table-column
              prop="proxied"
              label="CDN"
              sortable
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <i
                  v-if="scope.row.proxied"
                  class="el-icon-lightning proxied active"
                  @click="change_proxied(scope.row, $event)"
                ></i>
                <i
                  v-else
                  class="el-icon-lightning proxied"
                  @click="change_proxied(scope.row, $event)"
                ></i>
              </template>
            </el-table-column>
            <el-table-column prop="actions" label="操作" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    size="mini"
                    @click="
                      copy2clipboard(scope.row.name + '.cdn.cloudflare.net')
                    "
                    >Copy</el-button
                  >
                  <el-button
                    size="mini"
                    @click="
                      $router.push({
                        name: 'DnsrecordEdit',
                        params: {
                          zone_id: scope.row.zone_id,
                          record_id: scope.row.id,
                        },
                      })
                    "
                    >Manage</el-button
                  >
                  <el-popconfirm
                    :title="`确定删除${scope.row.name}吗？`"
                    @confirm="delete_dnsrecord(scope.row)"
                  >
                    <el-button size="mini" type="danger" slot="reference"
                      >Delete</el-button
                    >
                  </el-popconfirm>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<style scoped>
.panel {
  padding: 1rem 0.5rem;
}
.proxied {
  font-size: 2.3rem;
  cursor: pointer;
}
.proxied.active {
  color: #409eff;
}
.panel .header {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}
</style>
<script>
import Navbar from "@components/Navbar.vue";
import {
  Card,
  Table,
  TableColumn,
  Button,
  ButtonGroup,
  Container,
  Main,
  Breadcrumb,
  BreadcrumbItem,
  Popconfirm,
} from "element-ui";
import { fetchGet, fetchPut, fetchDelete } from "@utils/requests";

import { copy2clipboard } from "@utils/functions";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    ElCard: Card,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElContainer: Container,
    ElMain: Main,
    ElButton: Button,
    ElButtonGroup: ButtonGroup,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem,
    ElPopconfirm: Popconfirm,
  },
  data() {
    return {
      loading: true,
      limit: 10,
      dnsrecords: [],
    };
  },
  created() {
    this.get_dnsrecords(this.$route.params.zone_id, 1);
  },
  methods: {
    get_dnsrecords(zone_id, page) {
      fetchGet("/api/dnsrecords", {
        zone_id: zone_id,
        page: page,
        limit: this.limit,
      }).then((res) => {
        console.log(res);
        if (res.status == "ok") {
          this.dnsrecords = res.data;
          this.loading = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    page_change(page) {
      this.get_dnsrecords(this.$route.params.id, page);
    },
    copy2clipboard,
    change_proxied(zone, target) {
      let selectedBedDom = target.srcElement; //dom元素
      selectedBedDom = selectedBedDom.parentNode.parentNode.parentNode;
      const loading = this.$loading({
        lock: true,
        target: selectedBedDom,
        text: "Loading",
        spinner: "el-icon-loading",
      });
      fetchPut("/api/dnsrecord", {
        zone_id: zone.zone_id,
        record_id: zone.id,

        dnsrecord: {
          proxied: !zone.proxied,
        },
      })
        .then((res) => {
          if (res.status == "ok") {
            let index = this.dnsrecords.indexOf(zone);
            this.dnsrecords[index].proxied = !zone.proxied;
            this.$notify({
              message: "切换成功",
              type: "success",
            });
          } else {
            this.$notify({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((error) => {
          this.$notify({
            message: error.message,
            type: "error",
          });
        })
        .finally(function () {
          loading.close();
        });
    },
    delete_dnsrecord(dnsrecord) {
      this.loading = true;
      fetchDelete("/api/dnsrecord", {
        zone_id: dnsrecord.zone_id,
        record_id: dnsrecord.id,
      })
        .then((res) => {
          if (res.status == "ok") {
            this.remove(dnsrecord);
            this.$notify({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$notify({
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((error) => {
          this.$notify({
            message: error.message,
            type: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    remove(item) {
      let index = this.dnsrecords.indexOf(item);
      this.dnsrecords.splice(index, 1);
    },
  },
};
</script>

<template>
  <div class="layout">
    <Navbar :defaultActive="'dashboard'" />
    <el-container>
      <el-main class="panel">
        <el-card shadow="always">
          <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>Home</el-breadcrumb-item>
          </el-breadcrumb>
          <el-table
            height="30rem"
            border
            v-loading="loading"
            :data="zones"
            :default-sort="{}"
          >
            <el-table-column prop="name" label="域名" sortable >
            </el-table-column>
            <el-table-column prop="status" label="状态" sortable width="180" align="center">
              <template slot-scope="scope">
                <!-- active, pending, initializing, moved, deleted, deactivated -->
                <el-tag type="success" v-if="(scope.row.status = 'active')"
    effect="plain">{{
                  scope.row.status
                }}</el-tag>
                <el-tag
                  type="warning"
                  v-else-if="(scope.row.status = 'pending')"
                  >{{ scope.row.status }}</el-tag
                >
                <el-tag
                  type="info"
                  v-else-if="(scope.row.status = 'initializing')"
                  >{{ scope.row.status }}</el-tag
                >
                <el-tag type="danger" v-else>{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="actions" label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                      size="mini"
                      @click="
                      $router.push({
                        name: 'ZoneControl',
                        params: { zone_id: scope.row.id },
                      })
                    "
                  >Manage</el-button>
                  <el-button
                      size="mini"
                      @click="
                      $router.push({
                        name: 'ZoneDnsrecords',
                        params: { zone_id: scope.row.id },
                      })
                    "
                  >DNS Record</el-button>

                  <el-popconfirm
                    :title="`确定删除${scope.row.name}吗？`"
                    @confirm="delete_zone(scope.row)"
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
  Tag,
} from "element-ui";
import { fetchGet, fetchDelete } from "@utils/requests";

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
    ElTag: Tag,
  },
  data() {
    return {
      loading: true,
      limit: 10,
      zones: [],
    };
  },
  created() {
    this.get_zones(1, 10);
  },
  methods: {
    page_change(page) {
      this.get_zones(page, this.limit);
    },
    get_zones(page = 1, limit = 10) {
      fetchGet("/api/zones", { page: page, limit: limit }).then((res) => {
        if (res.status === "ok") {
          this.zones = res.data;
          this.loading = false;
        } else {
          this.$Message.error({
            message: res.message,
          });
        }
      });
    },
    delete_zone(zone) {
      this.loading = true;
      fetchDelete("/api/zone", {
        zone_id: zone.id,
      })
        .then((res) => {
          if (res.status == "ok") {
            this.$message.success("删除成功");
            this.remove(zone);
          } else {
            this.$message.success(res.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    remove(zone) {
      let index = this.zones.indexOf(zone);
      this.zones.splice(index, 1);
    },
  },
};
</script>

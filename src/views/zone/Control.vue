<template>
  <div class="layout">
    <Navbar/>
    <el-container>
      <el-main class="panel"
               v-loading="loading">
        <el-card class="card box-card" :body-style="{}">
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }"
            >Home
            </el-breadcrumb-item
            >
            <el-breadcrumb-item>Control</el-breadcrumb-item>
          </el-breadcrumb>

          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Overview" name="Overview">
              <el-card class="box-card setting-item">
                <div slot="header" class="clearfix">
                  <span>Under Attack 模式</span>
                </div>
                <div>
                  <div class="desc">在访问者访问您的站点时显示 JavaScript 质询。</div>
                  <div class="actions">
                    <el-select v-model="settings.security_level.value" placeholder="请选择">
                      <el-option
                          v-for="item in options.security_level"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-card>
              <el-card class="box-card setting-item">
                <div slot="header" class="clearfix">
                  <span>开发模式</span>
                </div>
                <div>
                  <div class="desc">暂时绕过我们的缓存。实时查看对您的源服务器进行的更改。</div>
                  <div class="actions">
                    <el-tooltip effect="dark" content="点击切换" placement="top">
                      <el-button @click="settings.development_mode.value='off'" plain type="success"
                                 v-if="settings.development_mode.value==='on'">
                        Active
                      </el-button>
                      <el-button @click="settings.development_mode.value='on'" plain type="info" v-else>
                        Disable
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="Cache" name="Cache">
              <el-card class="box-card setting-item">
                <div slot="header" class="clearfix">
                  <span>清除缓存</span>
                </div>
                <div>
                  <div class="desc">
                    清除缓存文件以强制 Cloudflare 从您的 Web 服务器中提取这些文件的最新版本。<br>
                    您可以选择性地清除文件，也可以同时清除所有文件。<br>
                    <strong>注意：</strong>清除缓存可能会使您的网站性能暂时降级，并延长在您的源服务器上加载文件的时间。
                  </div>
                  <div class="actions">
                    <el-button-group>
                      <el-button plain @click="dialog.clearCache.enable=true">自定义清除</el-button>
                      <el-button plain @click="handleClearCache(true)">清理全部</el-button>
                    </el-button-group>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="SSL-TLS" name="SSL-TLS">
              <el-card class="box-card setting-item">
                <div slot="header" class="clearfix">
                  <span>您的 SSL/TLS 加密模式为 {{ settings.ssl.value }}</span>
                </div>
                <div>
                  <div class="desc">
                    <img style="width: 100%;max-width: 600px" src="@assets/images/ssl-tls.png" alt="">
                  </div>
                  <div class="actions">
                    <el-button-group>
                      <el-button plain class="btn"
                                 :class="{'active':settings.ssl.value===item.value}"
                                 v-for="(item,index) in options.ssl" :key="index"
                                 @click="settings.ssl.value=item.value"
                      >
                        {{ item.label }}
                      </el-button>
                    </el-button-group>
                  </div>
                </div>
              </el-card>
              <el-card class="box-card setting-item">
                <div slot="header" class="clearfix">
                  <span>始终使用 HTTPS</span>
                </div>
                <div>
                  <div class="desc">将所有使用方案 “http” 的请求重定向到 “https”。这将应用于该区域的所有 http 请求。</div>
                  <div class="actions">

                    <el-tooltip effect="dark" content="点击切换" placement="top">
                      <el-button @click="settings.always_use_https.value='off'" plain type="success"
                                 v-if="settings.always_use_https.value==='on'">
                        Active
                      </el-button>
                      <el-button @click="settings.always_use_https.value='on'" plain type="info" v-else>
                        Disable
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog title="自定义清除" :visible.sync="dialog.clearCache.enable">
      <div class="clear-ache">
        <div class="desc">
          <p><span>目前进行单个 URL 清除时不支持通配符。您一次最多可以清除 30 个 URL。按照每行一个的方式分隔 URL。</span></p>
          <strong><span>示例：</span></strong>
          <ul>
            <li>https://www.v8cdn.xyz</li>
            <li>https://www.v8cdn.xyz/cat.jpg</li>
          </ul>
        </div>
        <div>
          <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 8}"
              placeholder="请输入内容"
              v-model="dialog.clearCache.value">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.clearCache.enable = false">取 消</el-button>
        <el-button type="primary" @click="handleClearCache()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>

.setting-item {
  margin: 1rem 0;
}

.setting-item .desc {
  text-align: center;
  margin: 1.5rem auto;
}

.setting-item .actions {
  text-align: center;
  margin: 1.5rem auto;
}

.clear-ache .desc {

}

.btn.active {
  background: #FFF;
  border-color: #409EFF;
  color: #409EFF;
  z-index: 1;
}
</style>
<script>
import Navbar from "@components/Navbar.vue";
import {
  Container,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Main,
  Tabs,
  TabPane,
  Option,
  Select,
  Button,
  ButtonGroup,
  Dialog,
  Input,
  Tooltip
} from "element-ui";
import {fetchGet} from "@utils/requests";
import {fetchPatch, fetchPost} from "../../utils/requests";

export default {
  name: "Edit",
  components: {
    Navbar,
    ElContainer: Container,
    ElCard: Card,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem,
    ElMain: Main,
    ElTabs: Tabs,
    ElTabPane: TabPane,
    ElOption: Option,
    ElSelect: Select,
    ElButton: Button,
    ElButtonGroup: ButtonGroup,
    ElDialog: Dialog,
    ElInput: Input,
    ElTooltip: Tooltip,
  },
  data() {
    return {
      activeName: 'Overview',
      loading: true,
      settings: {
        development_mode: {
          value: "off",
        },
        security_level: {
          value: "essentially_off",
        },
        ssl: {
          value: "off",
        },
        always_use_https: {
          value: "off",
        }
      },
      options: {
        security_level: [
          {
            label: "关（Enterprise）",
            value: "off",
            disabled: true,
          },
          {
            label: "基本（本质上为关）",
            value: "essentially_off",
            disabled: false,
          },
          {
            label: "低",
            value: "low",
            disabled: false,
          },
          {
            label: "中",
            value: "medium",
            disabled: false,
          },
          {
            label: "高",
            value: "high",
            disabled: false,
          },
          {
            label: "I'm Under Attack!",
            value: "under_attack",
            disabled: false,
          },
        ],
        ssl: [
          {
            label: "关闭（不安全）",
            value: "off",
            disabled: false,
          },
          {
            label: "灵活",
            value: "flexible",
            disabled: false,
          },
          {
            label: "完全",
            value: "full",
            disabled: false,
          },
          {
            label: "完全（严格）",
            value: "strict",
            disabled: false,
          },
        ]
      },
      dialog: {
        clearCache: {
          enable: false,
          value: ""
        }
      }
    }
  },
  created() {
    this.getSettings(this.$route.params.zone_id).then(() => {
      let settings = [
        'development_mode',
        'security_level',
        'ssl',
        'always_use_https',
      ]
      for (const k in settings) {
        this.$watch(`settings.${settings[k]}.value`, (n) => {
          this.updateSetting(settings[k], {
            value: n,
          })
        })
      }
    }).then(this.loading = false)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getSettings(zoneId) {
      return fetchGet("/api/settings", {
        zone_id: zoneId
      }).then((res) => {
        let settings = {}
        for (const key in res.data.result) {
          settings[res.data.result[key].id] = res.data.result[key]
        }
        this.settings = settings
        console.log(this.settings)
      })
    },
    updateSetting(settingName, setting) {
      return fetchPatch("/api/setting", {
        "zone_id": this.$route.params.zone_id,
        "setting_name": settingName,
        setting,
      }).then((res) => {
        if (res.status === "ok") {
          this.$message({
            message: "更新成功",
            type: "success",
          })
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          })
        }
      })
    },
    handleClearCache(everything = false) {
      let urls = []
      if (!everything) {
        let arr = this.dialog.clearCache.value.split("\n");
        for (const k in arr) {
          arr[k] = arr[k].trim()
          if (arr[k] !== "") {
            urls.push(arr[k])
          }
        }
        if (urls.length === 0) {
          this.$message({
            message: "url不得为空",
            type: "warning",
          })
          return
        }
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      return fetchPost("/api/cache", {
        zone_id: this.$route.params.zone_id,
        everything: everything,
        files: urls,
      }).then((res) => {
        console.log(res);
        if (res.status === "ok") {
          this.$message({
            message: "清理成功",
            type: "success",
          })
        } else {
          this.$message({
            message: res.message,
            type: "warning",
          })
        }
      }).finally(() => {
        loading.close()
      })

    },
  },
};
</script>

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import '@assets/style.css';
import V8CDN from "@/config"

Vue.config.productionTip = false
import {

  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.$V8CDN = V8CDN

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
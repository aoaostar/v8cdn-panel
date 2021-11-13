import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/Home.vue'
import Login from '@views/Login.vue'
import Dashboard from "@views/Dashboard"
import ZoneCreate from "@views/zone/Create"
import ZoneControl from "@views/zone/Control"
import ZoneDnsrecords from "@views/zone/Dnsrecords"
import DnsrecordEdit from "@views/dnsrecord/Edit"
import DnsrecordCreate from "@views/dnsrecord/Create"

import {
  isLogin
} from "@utils/functions"
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/zone/create',
    name: 'ZoneCreate',
    component: ZoneCreate
  },
  {
    path: '/zone/:zone_id/control',
    name: 'ZoneControl',
    component: ZoneControl
  },
  {
    path: '/zone/:zone_id/dnsrecords',
    name: 'ZoneDnsrecords',
    component: ZoneDnsrecords
  },
  {
    path: '/zone/:zone_id/dnsrecord/create',
    name: 'DnsrecordCreate',
    component: DnsrecordCreate
  },
  {
    path: '/zone/:zone_id/dnsrecord/:record_id',
    name: 'DnsrecordEdit',
    component: DnsrecordEdit
  }
]

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)

}

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (isLogin()) {
    if (to.path === '/login') {

      next('/dashboard')

    }
    //如果用户信息存在则往下执行。
    next()

  } else {
    //如果用户token不存在则跳转到login页面

    if (to.path === '/login' || to.path === '/') {
      next()

    } else {
      next('/login')

    }
  }
})
export default router
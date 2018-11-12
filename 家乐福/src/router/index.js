import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/components/Main"
import Detail from "@/components/Detail"

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Main, meta: { keepAlive: true } },
    { path: '/index', component: Main, meta: { keepAlive: true } },
    { path: '/detail/:id', component: Detail, meta: { keepAlive: false } }
  ]
})

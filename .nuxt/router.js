import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cff07dc6 = () => interopDefault(import('..\\pages\\join.vue' /* webpackChunkName: "pages_join" */))
const _2289ba86 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _58e2176f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/join",
      component: _cff07dc6,
      name: "join"
    }, {
      path: "/login",
      component: _2289ba86,
      name: "login"
    }, {
      path: "/",
      component: _58e2176f,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}

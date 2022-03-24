import Vue from 'vue';
import VueRouter, { RawLocation, Route, RouteConfig } from 'vue-router';
import store from '@/store/index'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  //首页
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/home.vue')
  },
  //游戏
  {
    path: '/game-play',
    name: 'GamePlay',
    component: () => import('../views/game/game.vue')
  },
  //历程
  {
    path: '/road-map',
    name: 'RoadMap',
    component: () => import('../views/road/road_map.vue')
  },
  //投资
  {
    path: '/investor',
    name: 'Investor',
    component: () => import('../views/investor/investor.vue')
  },
  //铸币
  {
    path: '/mint',
    name: 'Mint',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/mint/mint_view.vue')
  },
  //VIP
  {
    path: '/vip-pass',
    name: 'VipPass',
    component: () => import('../views/vip/vip_pass.vue')
  }
]
const originalPush = VueRouter.prototype.push as unknown as Promise<Route> 
VueRouter.prototype.push = function push(location: RawLocation) { return (originalPush as any).call(this, location).catch((err: Error) => err) }
const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('setTransiname', 'open-trans');
  setTimeout(() => {
    next()
  }, 200)
});

router.afterEach((to) => {
  store.commit('setTransiname', 'default-trans');
})

export default router

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import axios, { AxiosInstance } from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './styles/reset.css'
// import protobuf from 'protobufjs'
// import i18n from './lang/i18n'
Vue.use(Antd);
Vue.config.productionTip = false
Vue.use(v => {
  v.prototype.$axios = axios
})
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
};
new Vue({
  // i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

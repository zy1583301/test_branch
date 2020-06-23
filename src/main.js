import "babel-polyfill"
// hui = (function () {
//         return window.requestAnimationFrame ||
//               window.webkitRequestAnimationFrame ||
//               window.mozRequestAnimationFrame ||
//               function (callback) {
//                   window.setTimeout(callback, 6000 / 60);
//               };
//       })();
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './style/reset.less'
import 'ant-design-vue/dist/antd.less'; 
import './permission'
import echarts from 'echarts'
import './assets/iconfont/iconfont.css'
// import bx from './api/fp_h5.js'
// console.log(bx,'bx')
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

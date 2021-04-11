/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-09-23 14:08:17
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-30 14:23:53
 */
import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
console.log(store,'store')
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './style/reset.less'
import 'ant-design-vue/dist/antd.less'; 
import './permission'
import echarts from 'echarts'
import './assets/iconfont/iconfont.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
import sensorsTrack from './common/sensorsTrack'
import {message} from 'ant-design-vue'
import Directives from './directive'
import BxH5DevicePrint from '@/data/fp_h5.js'
// function get() {
//   let isonline = true;
//   let isonA = true;
//   let url = isonline
//     ? 'https://saq.aibank.com/nfp_api/h5/v1'
//     :(isonA
//       ? "http://10.4.94.57:3000/h5/v1"
//       : "http://10.4.94.58:3000/h5/v1" )
//     let then = new Date().getTime();
//     new BxH5DevicePrint({
//       version: "V1", // 业务系统version
//       // applyId: "applyId", //业务申请ID
//       // serNum1: "string1", //选填
//       // serNum2: "string2", //选填
//       // serNum3: "string3", //选填
//       // serialNumber1: "string1", //选填
//       // serialNumber2: "string2", //选填
//       // serialNumber3: "string3", //选填
//       systemNumber: "ASHD0001", //渠道类型+业务系统三位缩写+四位数字  渠道类型：浏览器为”A”,
//       url: url,
//     }).getTraceId(result => {
//       console.log(result,'result')
//       this.deviceId = result.deviceId;
//       this.traceId = result.traceId
//       let now = new Date().getTime();
//       this.time = now - then;
//     });
// }
let url = 'http://10.4.94.57:3000/h5/v1'
new Promise(function(resolve,reject){
  new BxH5DevicePrint({
    version: "V1", // 业务系统version
    // applyId: "applyId", //业务申请ID
    // serNum1: "string1", //选填
    // serNum2: "string2", //选填
    // serNum3: "string3", //选填
    // serialNumber1: "string1", //选填
    // serialNumber2: "string2", //选填
    // serialNumber3: "string3", //选填
    systemNumber: "ASHD0001", //渠道类型+业务系统三位缩写+四位数字  渠道类型：浏览器为”A”,
    url: url,
  }).getTraceId(result => {
    resolve(result)
    // console.log(result,'result')
    // this.deviceId = result.deviceId;
    // this.traceId = result.traceId
    // let now = new Date().getTime();
    // this.time = now - then;
  });


}

).then(res=>{
  console.log(res,'res0000')
})

console.log(BxH5DevicePrint,'ssss')
import print from 'print-js'
import { resolve } from "q"
// 全局配置
message.config({
  top: `20px`,
  duration: 2,
  maxCount: 3,
});
Vue.prototype.$video = Video
Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    // 确定是点击关闭按钮过来的   关闭的路由时可缓存的   
    if(from.meta.reload&&from.meta.keepAlive&&this.$vnode.componentOptions) {
      from.meta.reload = false
      var key = this.$vnode.key == null
                  ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                  : this.$vnode.key;
      var cache = this.$vnode.parent.componentInstance.cache;
      var keys  = this.$vnode.parent.componentInstance.keys;
      if (cache[key]) {
        if (keys.length) {
          var index = keys.indexOf(key);
          if (index > -1) {
          keys.splice(index, 1);
          }
        }
        delete cache[key];
      }
      this.$destroy();
    }               
    next();
  },
});
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$print= print
console.log(sensorsTrack,'sensorsTrack')
Vue.prototype.$sensors = sensorsTrack
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Directives)
Vue.use(ElementUI);

console.log(Vue.options.directives,'Vue.options.directives')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

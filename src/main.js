import "babel-polyfill"
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
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

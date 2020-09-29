import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
import Layout from '@/layout'
export const consutomRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '首页',
    icon: "iconfont icon-fangzilengjiao",
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home2'),
      meta: { title: '首页', icon: "iconfont icon-fangzilengjiao" }
    }]
  },
  {
    path: '/liness',
    component: Layout,
    name: '各类图',
    icon: "iconfont icon-tubiao",
    children: [{
      path: '/line',
      name: 'line',
      component: () => import('@/views/charts/line'),
      meta: { title: '折线图', icon: "iconfont icon-zhexiantu",keepAlive:true },
      // beforeEnter(from,to,next) {
      //   console.log(from,to,'tototo')
      //   next()
      // }
    },
    {
      path: '/pie',
      name: 'pie',
      component: () => import('@/views/charts/pie'),
      meta: { title: '饼状图', icon: "iconfont icon-bingzhuangtu",keepAlive:true }
    }
  ]
  },
  {
    path: '/picture',
    component: Layout,
    name: '图片编辑',
    icon: "iconfont icon-tupianbianji",
    children: [{
      path: '/picture',
      name: 'picture',
      component: () => import('@/views/pictureManager/waterMark'),
      meta: { title: '图片增加水印', icon: "iconfont icon-tupianbianji" }
    },
    {
      path: '/file',
      name: 'file',
      component: () => import('@/views/pictureManager/uploadFile'),
      meta: { title: '上传文件', icon: "iconfont icon-tupianbianji" }
    }
  ]
  },
  {
    path: '/excel',
    component: Layout,
    name: '各类表',
    icon: "iconfont icon-tubiao",
    children: [{
      path: '/onlyRead',
      name: 'onlyRea',
      component: () => import('@/views/charts/line'),
      meta: { title: '只读表格', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: '/writeRead',
      name: 'writeRead',
      component: () => import('@/views/charts/pie'),
      meta: { title: '读写表格', icon: "iconfont icon-bingzhuangtu" }
    }
  ]
  },
  {
    path: '/canvas',
    component: Layout,
    name: 'canvas小游戏',
    icon: "iconfont icon-tubiao",
    children: [{
      path: '/snow',
      name: 'snow',
      component: () => import('@/views/canvasGame/snow'),
      meta: { title: '雪花下落', icon: "iconfont icon-zhexiantu" }
    }
  ]
  },
  // {
  //   path:'*',
  //   redirect:'/404'
  // },

]

const router = new Router({
  mode: "history",
  routes: consutomRoutes,
  scrollBehavior: () => ({ y: 0 })
  // scrollBehavior: function (to, from, savedPosition) {
    
	// 	// console.log(to) // to：要进入的目标路由对象，到哪里去
	// 	// console.log(from) // from：离开的路由对象，哪里来
	// 	// console.log(savedPosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
  //   // 从第二页返回首页时savedPosition为undefined
  //   console.log(store.state,'state',savedPosition)
  //   store.commit('delcachePageName',from.name);

  //   return {x:0, y:0}
  //   // if (savedPosition || typeof savedPosition === 'undefined') {//后退
  //   //   // 判断是否是相邻得tab（tab跳转一定要replace跳转），如果是，那么每次打开都是获取最新页面
  //   //   if(typeof from.meta.tabs !== 'undefined' && from.meta.tabs.length > 0) { // 是tabs
  //   //   // 清空tabs之间切换缓存，tabs直接跳转是不需要缓存的，因为大家都是同级页面
  //   //   from.meta.tabs.map(function(vo) {
  //   //     console.log(vo,'vo')
  //   //     store.commit('delcachePageName',vo);
  //   //   })
  //   //   } else { 
  //   //     //不是tabs
  //   //     console.log('不是tab',from.name)
  //   //     //后退到缓存页面，那么这里需要删除上一个页面的缓存，因为你要是再次打开，肯定要获取最新的页面数据 A-B-C 如果从C返回B肯定要把C的缓存删除，不然你从B-C，那就显示C的缓存了
  //   //     if(from.name=='line') {
  //   //       console.log('不是tab','line')
          
  //   //       store.commit('delcachePageName',from.name);
  //   //     }

  //   //   }
  //   //   //后退滚动到上一次位置
  //   //   if (savedPosition) { return savedPosition }
	// 	// } else { //前进
  //   //   console.log('前进')
  //   //   //前进把前进的页面加入到要缓存的组件中
  //   //   store.commit('addcachePageName', to.name);
  //   //   //前进滚动到顶部
  //   //   return {x:0, y:0}
	// 	// }
	// }
})
export default  router
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
      component: () => import('@/views/home/home'),
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
      meta: { title: '折线图', icon: "iconfont icon-zhexiantu", keep: 'yes', }
    },
    {
      path: '/pie',
      name: 'pie',
      component: () => import('@/views/charts/pie'),
      meta: { title: '饼状图', icon: "iconfont icon-bingzhuangtu" }
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
})
export default  router
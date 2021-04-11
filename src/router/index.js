import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
import Layout from '@/layout'
export const consutomRoutes1 = [
  {
    path: '/',
    component: Layout,
    redirect: '/first/index',
  },
  {
    path: '*',
    component: () => import('@/views/404'),
    hidden: true
  },
]
export const consutomRoutes = [

  {
    path: '/first',
    component: Layout,
    redirect: '/first/index',
    name: '首页',
    icon: "iconfont icon-fangzilengjiao",
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/home/home2'),
      meta: { title: '首页', icon: "iconfont icon-fangzilengjiao" }
    },
    {
      path: 'home1',
      name: 'home1',
      component: () => import('@/views/home/home1'),
      meta: { title: '首页1', icon: "iconfont icon-fangzilengjiao" }
    },
    {
      path: 'home2',
      name: 'home2',
      component: () => import('@/views/home/home4'),
      meta: { title: '首页3', icon: "iconfont icon-fangzilengjiao" }
    },
    {
      path: 'home3',
      name: 'home3',
      component: () => import('@/views/home/home5'),
      meta: { title: '首页4', icon: "iconfont icon-fangzilengjiao" }
    },
    {
      path: 'grid',
      name: 'grid',
      component: () => import('@/views/home/grid'),
      meta: { title: '网格布局', icon: "iconfont icon-fangzilengjiao" }
    }
  ]
  },
  {
    path: '/liness',
    component: Layout,
    name: '各类图',
    icon: "iconfont icon-tubiao",
    children: [{
      path: 'line',
      name: 'line',
      component: () => import('@/views/charts/line'),
      meta: { title: '折线图', icon: "iconfont icon-zhexiantu",keepAlive:true },
      // beforeEnter(from,to,next) {
      //   console.log(from,to,'tototo')
      //   next()
      // }
    },
    {
      path: 'pie',
      name: 'pie',
      component: () => import('@/views/charts/pie'),
      meta: { title: '饼状图', icon: "iconfont icon-bingzhuangtu",keepAlive:true }
    },
    {
      path: 'map',
      name: 'chinamap',
      component: () => import('@/views/charts/map'),
      meta: { title: '地图', icon: "iconfont icon-bingzhuangtu"}
    }
  ]
  },
  {
    path: '/picture',
    component: Layout,
    name: '图片编辑',
    icon: "iconfont icon-tupianbianji",
    children: [{
      path: 'picture',
      name: 'picture',
      component: () => import('@/views/pictureManager/waterMark'),
      meta: { title: '图片增加水印', icon: "iconfont icon-tupianbianji" }
    },
    {
      path: 'file',
      name: 'file',
      component: () => import('@/views/pictureManager/uploadFile'),
      meta: { title: '上传文件', icon: "iconfont icon-tupianbianji" }
    },
    {
      path: 'ele-up',
      name: 'file-up',
      component: () => import('@/views/pictureManager/components/ele_up'),
      meta: { title: 'ele上传文件', icon: "iconfont icon-tupianbianji" }
    },
    {
      path: 'files',
      name: 'files',
      component: () => import('@/views/pictureManager/filesUPload'),
      meta: { title: '上传多个文件', icon: "iconfont icon-tupianbianji" }
    },
    {
      path: 'file-timeline',
      name: 'file-timeline',
      component: () => import('@/views/pictureManager/uploadFile_timeline'),
      meta: { title: '上传文件时间线', icon: "iconfont icon-tupianbianji" }
    },
  ]
  },
  {
    path: '/excel',
    component: Layout,
    name: '各类表',
    icon: "iconfont icon-tubiao",
    children: [{
      path: 'onlyRead',
      name: 'onlyRea',
      component: () => import('@/views/charts/line'),
      meta: { title: '只读表格', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'writeRead',
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
      path: 'snow',
      name: 'snow',
      component: () => import('@/views/canvasGame/snow'),
      meta: { title: '雪花下落', icon: "iconfont icon-zhexiantu" }
    }
  ]
  },
  {
    path: '/video',
    component: Layout,
    name: '视频播放',
    icon: "iconfont icon-tubiao",
    children: [{
      path: 'video',
      name: 'video',
      component: () => import('@/views/videos/video'),
      meta: { title: '视频播放', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'video2',
      name: 'video2',
      component: () => import('@/views/videos/video2'),
      meta: { title: '视频播放2', icon: "iconfont icon-zhexiantu" }
    }
  ]
  },
  {
    path: '/qrcode',
    component: Layout,
    name: '二维码',
    icon: "iconfont icon-tubiao",
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/qrcode/index'),
      meta: { title: '二维码', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'scan',
      name: 'scan',
      component: () => import('@/views/qrcode/scan'),
      meta: { title: '扫描结果', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'result',
      name: 'result',
      component: () => import('@/views/qrcode/result'),
      meta: { title: '支付结果', icon: "iconfont icon-zhexiantu" }
    }
  ]
  },
  {
    path: '/drag',
    component: Layout,
    name: '拖拽',
    icon: "iconfont icon-tubiao",
    children: [{
      path: 'drag',
      name: 'drag',
      component: () => import('@/views/drag/drag'),
      meta: { title: '拖拽', icon: "iconfont icon-zhexiantu" }
    }
  ]
  },
  {
    path: '/editor',
    component: Layout,
    name: '编辑器',
    icon: "iconfont icon-tubiao",
    //attack
    children: [{
      path: 'attack',
      name: 'attack',
      component: () => import('@/views/editor/attackBox'),
      meta: { title: '攻击计算', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'editor',
      name: 'editor',
      component: () => import('@/views/editor/editor'),
      meta: { title: '编辑器', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'json',
      name: 'json',
      component: () => import('@/views/editor/json1'),
      meta: { title: 'json解析', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'print',
      name: 'print',
      component: () => import('@/views/editor/print'),
      meta: { title: '打印', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'print-js',
      name: 'print-js',
      component: () => import('@/views/editor/print_js'),
      meta: { title: '打印-js', icon: "iconfont icon-zhexiantu" }
    },
    {
      path: 'ofd',
      name: 'ofd',
      component: () => import('@/views/editor/ofd'),
      meta: { title: 'ofd转化', icon: "iconfont icon-zhexiantu" }
    },
    // {
    //   path: 'pdf',
    //   name: 'pdf',
    //   component: () => import('@/views/editor/pdf'),
    //   meta: { title: 'pdf展示', icon: "iconfont icon-zhexiantu" }
    // },
    {
      path: 'pdfNew',
      name: 'pdfNew',
      component: () => import('@/views/editor/pdfNew'),
      meta: { title: 'pdfNew展示', icon: "iconfont icon-zhexiantu" }
    },
    {
      
      path: 'baidu',
      name: 'https://www.baidu.com',
      // component: () => import('@/views/editor/pdfNew'),
      meta: { title: '百度', icon: "iconfont icon-zhexiantu" }
    }
  ]
  }
  // {
  //   path:'*',
  //   redirect:'/404'
  // },

]

const router = new Router({
  mode: "history",
  routes: consutomRoutes1.concat(consutomRoutes),
  scrollBehavior: () => ({ y: 0 }),
  base:'/yuge'
})
export default  router
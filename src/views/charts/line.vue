<template>
  <div>
    <input type="text" v-model="data">
    <button @click="change">传递信息</button>
    <div id="line1" ref="line1" :style="{width: '600px', height: '600px'}"></div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'line1',
  inject:['reload'],
  computed:{
    ...mapState(['flag'])
  },
  data(){
    return {
    data:'',
    option: {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
}
    }
  },
  created() {
    // es7 求幂运算符
    // console.log('line重建',7**2)
    // // es8 
    // let obj = {
    //   name:'月光',
    //   age:18
    // }
    // let arr = [1,2,3]
    // let a = Object.entries(obj)
    // let b = Object.entries(arr)
    // console.log(a,'aaa',b)
    // var obj1 = {
    //     id:  1,
    //     name: '霖呆呆',
    //     get gender() {
    //         console.log('gender')
    //     },
    //     set grad(d) {
    //         console.log(d)
    //     }
    // }
    // console.log(Object.getOwnPropertyDescriptors(obj1))

  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
  },
  activated(){
  },
  deactivated(){
  },
  methods: {
    change() {
      console.log('sss')
      localStorage.setItem('a',Math.random()*1000)
    },
    init() {
     var chart = this.$echarts.init(this.$refs.line1);
     chart.setOption(this.option)
    },
    reclear() {
        console.log('sss')
        this.reload()
    }
  },
};
</script>

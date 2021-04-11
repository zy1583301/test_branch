<template>
    <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div>
</template>

<script>
import {data, geoCoordMap} from './data-source/data'
console.log(data, geoCoordMap)
export default {
    name:'chinamap',
    mounted() {
        this.drawLine();
    },
    methods:{

        drawLine(){
           



            // function convertData(data) {
            // var res = [];
            // for (var i = 0; i < data.length; i++) {
            //     var geoCoord = geoCoordMap[data[i].name];
            //     //console.log(geoCoord)
            //     if (geoCoord) {
            //         res.push({
            //             name: data[i].name,
            //             value: geoCoord.concat(data[i].value)
            //         });
            //     }
            // }
            // console.log(res)
            // return res;
            // }
            // 基于准备好的dom，初始化echarts实例
            var myChartContainer = document.getElementById('myChartChina');       
            var resizeMyChartContainer = function(){
            myChartContainer.style.width=(document.body.offsetWidth/2)+'px'//页面一半的大小
            } 
            resizeMyChartContainer();
            var myChartChina = this.$echarts.init(myChartContainer); 

            function randomData() {  
                return Math.round(Math.random()*500);  
            } 
            console.log(randomData)
            // 绘制图表
            var optionMap = {  
                tooltip: {},
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data:['']
                },      
                visualMap: {
                    min: 0,
                    max: 800,
                    left: '10%',
                    top: 'bottom',
                    text: ['高','低'], //以高低控制每个省份区域的颜色
                    calculable : true,
                    // seriesIndex: [1],
                    // color:['#0b50b9','#FFB6C1'], //'#c3e2f4',
                    inRange: {
                        color: ['#e0ffff', '#006edd']
                    },
                },   
                geo: {
                    map: 'china',
                    roam: true,
                    label: {
                        show: true,
                        color: 'rgba(0,0,0,0.4)'
                    },
                    itemStyle: {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis:{
                        itemStyle: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                selectedMode: 'single',
                series : [  
                                 
                    {
                        name: '哈哈', // 显示的标题
                        type: 'map',
                        mapType: 'china',
                        roam: true,//是否开启鼠标缩放和平移漫游
                        //geoIndex: 0,
                        scaleLimit: {
                            min: 0.5 ,
                            max: 2 ,
                            },
                        itemStyle: {
                            normal:{
                                // areaColor: "#FFB6C1",
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis:{
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        showLegendSymbol: false,//可以控制省会圆点的显示
                        //"selectedMode": true, //是否支持选中多个区域
                        label: {
                            // show: true,
                            normal: {
                                show: true//是否显示省份名称
                            },
                            emphasis: {
                                show: true
                            }
                        },
                       // 这个用于地图标点
                        // markPoint:{
                        // // symbol: 'circle',//标记形状
                        // "symbolSize": 20, //图形大小
                        // "data": markPointData,
                        // itemStyle: {
                        //     color: '#00FF00' ,
                        //     // borderColor: "#000" ,
                        //     // borderWidth: 0 ,
                        //     // borderType: 'solid' ,
                        //     // shadowBlur ... ,
                        //     // shadowColor ... ,
                        //     // shadowOffsetX: 0 ,
                        //     // shadowOffsetY: 0 ,
                        //     // opacity: 1
                        // }

                        // },
                        data:[           
                            {name: '北京',value: randomData(),
                            itemStyle: {
                            normal:{
                                areaColor: "#00FF00",
                            },
                            
                        }
                            },
                            {name: '天津',value: randomData()},
                            {name: '上海',value: randomData()},
                            {name: '重庆',value: randomData()},
                            {name: '河北',value: randomData()},
                            {name: '河南',value: randomData() },
                            {name: '云南',value: randomData() },
                            {name: '辽宁',value: randomData() },
                            {name: '黑龙江',value: randomData() },
                            {name: '湖南',value: randomData() },
                            {name: '安徽',value: randomData() },
                            {name: '山东',value: randomData() },
                            {name: '新疆',value: randomData() },
                            {name: '江苏',value: randomData() },
                            {name: '浙江',value: randomData() },
                            {name: '江西',value: randomData() },
                            {name: '湖北',value: randomData() },
                            {name: '广西',value: randomData() },
                            {name: '甘肃',value: randomData() },
                            {name: '山西',value: randomData() },
                            {name: '内蒙古',value: randomData() },
                            {name: '陕西',value: randomData() },
                            {name: '吉林',value: randomData() },
                            {name: '福建',value: randomData() },
                            {name: '贵州',value: randomData() },
                            {name: '广东',value: randomData() },
                            {name: '青海',value: randomData() },
                            {name: '西藏',value: randomData() },
                            {name: '四川',value: randomData() },
                            {name: '宁夏',value: randomData() },
                            {name: '海南',value: randomData() },
                            {name: '台湾',value: randomData() },
                            {name: '香港',value: randomData() },
                            {name: '澳门',value: randomData() },
                        ]
                    }
                ]
            }
            myChartChina.setOption(optionMap);
            window.onresize=function(){
                resizeMyChartContainer();
                myChartChina.resize();
            }
        }
    }
}
</script>

<style lang='css' scoped>
          p{
            color: #F06C00;
          }
</style>
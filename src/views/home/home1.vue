<template>
    <div>
        <svg width="1000" height="700">
            <g />
        </svg>
    </div>
</template>

<script>
import {getContext,con} from '@/utils/get'
    import dagreD3 from "dagre-d3";
    import * as d3 from "d3";
    export default {
        data() {
            return {
                a:111111,
                list: {
                    nodeInfos: [
                        {
                            id: "node1",
                            label: "节点1",
                        },
                        {
                            id: "node2",
                            label: "节点2",
                        },
                        {
                            id: "node3",
                            label: "节点3",
                        },
                        {
                            id: "node5",
                            label: "节点5",
                        },
                          {
                            id: "node6",
                            label: "节点6",
                        },
                         {
                            id: "node7",
                            label: "节点7",
                        },
                        {
                            id: "node8",
                            label: "节点8",
                        },
                        
                    ],
                    edges: [
                        {
                            source1: "node1",
                            target: "node2",
                        },
                        {
                            source1: "node2",
                            target: "node3",
                        },
                        {
                            source1: "node3",
                            target: "node5",
                        },
                        {
                            source1: "node3",
                            target: "node6",
                        },
                         {
                            source1: "node7",
                            target: "node8",
                        },
                         {
                            source1: "node8",
                            target: "node3",
                        },
                    ]
                }
            };
        },
        mounted() {
            //获取D3
            getContext(this)
            this.init()
            // svg.attr("height", g.graph().height * initialScale + 40);
        },
        methods:{
          init(){
            var g = new dagreD3.graphlib.Graph().setGraph({ranksep: 50, 
            rankdir: "LR", // 流程方向
            }
            );
            console.log(g,'g')
            // 添加节点
            this.list.nodeInfos.forEach((item) => {
                item.rx = item.ry = 5;//圆角
                g.setNode(item.id, item);
            });
            // 链接关系
            this.list.edges.forEach(item => {
                g.setEdge(item.source1, item.target, {});
            });
            g.nodes().forEach(function (v) {
                console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
            });
            g.edges().forEach(function (e) {
                console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
            });
            //绘制图形
            var svg = d3.select("svg"),
                inner = svg.select("g");
          // const svg = d3
          //     .select(this.$el)
          //     .select('svg.dagre')
          //     .attr('width', this.width)
          //     .attr('height', this.height)
            let container = svg.select('g')
            // transform
            const transform = d3.zoomIdentity.translate(50, 100).scale(0.8)
            // this.zoom = d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', this.zoomed)
            //缩放
            var zoom = d3.zoom().on("zoom", function () {
                inner.attr("transform", d3.event.transform);
            });
            console.log(zoom,'zoom')
              container.transition().duration(1000).call(zoom.transform, transform)
            let a = svg.call(zoom);
            // a.on('dbclick.zoom',null)
            console.log(a,'a')
            var render = new dagreD3.render();
            render(inner, g);
            let code;
            inner.selectAll("g.node").on("click", e => {
              console.log(e,'e')
              con()
              this.list.nodeInfos.push({
                  
                            id: "node4",
                            label: "节点4",
                        
              })
              this.list.edges.push( {
                            source1: "node4",
                            target: "node3",
                        },)
                        this.init()
                //点击事件
                code = this.list.nodeInfos.filter(item => {
                    return item.id == e;
                });
                console.log(code);
            });
            // var initialScale = 0.75;
            // svg.call(
            //     zoom.transform,
            //     d3.zoomIdentity
            //         .translate(
            //             (svg.attr("width") - g.graph().width * initialScale) / 2,
            //             20
            //         )
            //         .scale(initialScale)
            // );
          }
        }
    };
</script>

<style lang="less">

    svg {
        font-size: 14px;
    }

    .node rect {
        stroke: #606266;
        fill: #cccccc;
    }

    .edgePath path {
        stroke: #606266;
        fill: #333;
        stroke-width: 1.5px;
    }
</style>
<template>
    <div  style="height: 500px;overflow: auto;" >
        <p>test print</p>
        <div id="print" ref="print">
            <img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=225511697,4181826764&fm=26&gp=0.jpg" alt="" style="width:250mm;height:140mm">
        </div>
        <div class="print-div" id="print_area">
            <p class="red">世上本没有路，走的人多了，便有了路 ---- 鲁迅</p>
            <p class="green">世上本没有路，走的人多了，便有了路 ---- 鲁迅</p>
            <p>世上本没有路，走的人多了，便有了路 ---- 鲁迅</p>
            <p>世上本没有路，走的人多了，便有了路 ---- 鲁迅</p>
        </div>
        <!-- <button @click="printSomething">打印</button> -->
        <button @click="print(imgurl)">打印了</button>
    </div>
   
</template>

<script>
export default {
    data() {
        return {
            imgurl: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=225511697,4181826764&fm=26&gp=0.jpg'
        }
    },
    methods: {
        printSomething() {
            console.log(this.$print)
            this.$print('sss') 
        },
        print(ref, title, style, type, jsonData, borderHeadStyle, gridStyle, css) {
    this.$print({
      printable: ref,
      header: title || null,
      type: type || 'image',
      headerStyle: 'font-size:6px;font-weight:600;text-align:center;padding:15px 0 10px 0;',//标题设置
      properties: jsonData || [],//json数据元
      gridHeaderStyle: borderHeadStyle || 'font-size:6px;font-weight:400;height:40px;line-height:40px;border: 1px solid #ccc;padding:3px 5px 3px 5px;text-align:center;',//json格式表头样式
      gridStyle: gridStyle || 'font-size:1px;font-weight:200;border: 1px solid #ccc;padding:3px 5px 3px 5px;text-align:center;',//json各式表哥央视
      scanStyles: false,//不适用默认样式
      repeatTableHeader: false,//打印json表头只显示在第一页
      style: style || '@page{size:auto;margin: 0cm 1cm 0cm 1cm;color: red}',//去除页眉页脚
      css: css || null,//css url
      imageStyle: 'margin-top:20px;width:100%;'
    })
  }
    }
}
</script>
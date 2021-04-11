<template>
    <div class="print" ref="print">
        <!-- <p>{{msg}}</p>
        <button @click="printHTML">print</button> -->
        <div id="qrCode">
            <!-- <span>hello word!</span>    -->
            <img src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=225511697,4181826764&fm=26&gp=0.jpg" alt="" style="width:241mm;height:140mm">
    </div>
    
    <button  @click="printBtn()">打 印</button>
        <!-- <iframe style="display:none"  id="printIframe" frameBorder=0 scrolling=no width="100%"  src="./test.pdf"></iframe> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '这是要打印的内容'
        }
    },
    methods: {
        printBtn(){
       var newWin = window.open(""); //新打开一个空窗口
            var imageToPrint = document.getElementById("qrCode"); //将要被打印的图片
            newWin.document.write(imageToPrint.outerHTML); //将图片添加进新的窗口
            newWin.document.close(); //在IE浏览器中使用必须添加这一句
            newWin.focus(); //在IE浏览器中使用必须添加这一句
            setTimeout(function() {
                newWin.print(); //打印
                newWin.close(); //关闭窗口
            }, 100);
    },
        printHTML(_this) {
            // 获取当前页的html代码
            // var bdhtml = this.$refs.print
            var bdhtml = window.document.body.innerHTML;
           
            var printHtml =this.msg
            // 需要打印的页面
            window.document.body.innerHTML = printHtml;
            // if(!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
            //     remove_ie_header_and_footer();
            // }
            //调用打印
            window.print();
            // 还原界面
            window.document.body.innerHTML = bdhtml;
            window.location.reload();
        }
    }
}

</script>
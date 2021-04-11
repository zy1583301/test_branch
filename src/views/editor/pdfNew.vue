<template>
    <div> 
        <div class="selectBtn">
            <button class="cus" @click="getFile">请选择文件</button>
            <span :title="fileName">{{fileName}}</span>
            <form name="form1">
                <input type="file" name="picpath" id="picpath" style="display:none;" ref="file" @change="readFile">
            </form>
        </div>
        <div class="pdf-container" v-if="showPdf">
            <canvas v-for="page in pages" :id="'canvas' + page" :key="page"></canvas>
        </div>
  
    
        <a-button type="primary" @click="showModal">
            Open Modal
        </a-button>
        <a-button type="primary" @click="showTest">
                Open TEST
            </a-button>
    <Test v-if="false"></Test>
    <TestModal v-if="test" ref="testModal" @close="close"></TestModal>
</div>
    </template>

<script>
    import Test from './components/test'
    import TestModal from './components/modal'
// import PDF from 'pdfjs-dist'
//import { mapGetters } from 'vuex'
// const modulesFiles = require.context('../../assets/cmaps', true, /\.bcmap$/)

// let PDF = require('pdfjs-dist')
// import PDF from 'pdfjs-dist'
// import a from '../../assets/cmaps'
// let Cmaps = require('pdfjs-dist/cmaps')
// import Cmaps from 'pdfjs-dist/cmaps'
// console.log(modulesFiles,'==cpsmodulesFiles')
// PDF.disableWorker = true
export default {
    name: '',
    data () {
    return {
        t: false,
        test:false,
        width: 100,
        pdfDoc: null,
        pages: 0,
        showPdf: true,
        formData:{},
        fileName:'',
        bufferData:''
    }
    },
    components: {
        TestModal,
        Test
    },
    computed: {
        // ...mapGetters(['bufferData'])
    },
    created() {
        //this.loadFile('http://localhost:5000/已开票信息.pdf')
        
    },
    methods: {
    /*
    * 加载PDF文件
    * url：后台提供的pdf地址或者项目中public/pdf文件（test.pdf）
    * 在需要的位置调用 this.loadFile(url)
    * */
    showTest() {
        this.t = true
    },
    showModal() {
        this.test = true
        this.$nextTick(()=>{
            this.$refs.testModal.showModal()
        })
    },
    close() {
        this.test = false
    },
    getFile() {
      this.$refs.file.click();
    },
    readFile() {
        let file = this.$refs.file.files[0]
        var fr = new FileReader();
        this.formData = new FormData();
        this.formData.append('file',file);
        this.fileName = this.formData.get('file').name;
        fr.readAsArrayBuffer(file);
        fr.addEventListener("loadend",(e) => {
            var buf = e.target.result;
            this.bufferData = buf
            this.loadFile(this.bufferData)
        },false);
    },
    loadFile (url) {
        // //bufferData
        // let CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/'
        //let CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/'
        let CMAP_URL = '/cmaps/'
        //let CMAP_URL = 'http://172.19.26.37:4000/cmaps/'
        console.log(CMAP_URL,'CMAP_URL')
        // PDF.getDocument({
        //     url,
        //     cMapUrl: CMAP_URL,
        //     cMapPacked: true
        // })
         PDF.getDocument({
            data:url,
            cMapUrl: CMAP_URL,
            cMapPacked: true
        })
        .promise.then((pdf) => {
            this.pdfDoc = pdf
            this.pages = this.pdfDoc.numPages
            this.$nextTick(() => {
            this.renderPage(1)
            })
        })
    },
    /*
    * 渲染PDF文件
    * */
    renderPage (num) {
        this.pdfDoc.getPage(num)
        .then((page) => {
            let canvas = document.getElementById('canvas' + num)
            let ctx = canvas.getContext('2d')
            let dpr = window.devicePixelRatio || 1 // 设备像素比
            let bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1 // 浏览器在渲染canvas之前会用几个像素来来存储画布信息,类似img
            let ratio = dpr / bsr
            let viewport = page.getViewport(1.5)
            canvas.width = viewport.width * ratio // 画布大小,默认值是width:300px,height:150px
            canvas.height = viewport.height * ratio
            canvas.style.width = viewport.width + 'px' // 画布的框架大小
            canvas.style.height = viewport.height + 'px'
            let renderContext = {
            canvasContext: ctx,
            viewport: viewport
            }
            page.render(renderContext)
            if (this.pages > num) {
            this.renderPage(num + 1)
            } else {
            //this.closeServerLoadingHandle()
            }
        })
    },
    }
}
</script>
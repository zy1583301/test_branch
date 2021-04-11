<template>
    <input type="file" @change="upload" />  
</template>

<script>
    let pdfJs = require('pdfjs-dist')
    let pdfWorker = require("pdfjs-dist/build/pdf.worker")
    //import pdfWorker from "pdfjs-dist/build/pdf.worker";
    // import pdfJs from 'pdfjs-dist'
    console.log(pdfJs,pdfWorker,'ssssssss======')
export default {
    data() {
        return {
            curCourseItem:{
               pdfPage: ''
            }
        }
    },
    methods: {
        upload(e) {  
            let input = e.target
            console.log(input,'ssss')
            var file = input.files[0]; 
            //支持chrome IE10  
           this.GetPdfPages(file)
            // if (window.FileReader) {  
            //     var file = input.files[0]; 
            //     console.log(file,'sssss') 
            //     let filename = file.name.split(".")[0];  
            //     var reader = new FileReader();  
            //     reader.onload = function() {  
            //         console.log(this.result);  
            //     }  
            //     reader.readAsText(file);  
            // }   
            // //支持IE 7 8 9 10  
            // else if (typeof window.ActiveXObject != 'undefined'){  
            //     var xmlDoc;   
            //     xmlDoc = new ActiveXObject("Microsoft.XMLDOM");   
            //     xmlDoc.async = false;   
            //     xmlDoc.load(input.value);   
            //     console.log(xmlDoc.xml);   
            // }   
            // //支持FF  
            // else if (document.implementation && document.implementation.createDocument) {   
            //     var xmlDoc;   
            //     xmlDoc = document.implementation.createDocument("", "", null);   
            //     xmlDoc.async = false;   
            //     xmlDoc.load(input.value);   
            //     console.log(xmlDoc.xml);  
            // } else {   
            //     alert('error');   
            // }   
        },
        GetPdfPages(fileObj) {
            // song
            var that = this;

            //this.zhezhao = true;
            //this.isLoadingEnable = true;
            // 将本地文件B64序列化后传入Pdf parser，并获得总页码
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                console.log(e.target.result,'e.target.result')
                //this.test(e.target.result)
                console.log(pdfWorker,'pdfWorkerpdfWorker')
                var pdfLoadingTask = pdfJs.getDocument(e.target.result);
                pdfJs.GlobalWorkerOptions.workerSrc = pdfWorker.WorkerMessageHandler
                pdfLoadingTask.promise.then(function(pdf) {
                that.curCourseItem.pdfPages = pdf.numPages;
                console.log(that.curCourseItem.pdfPages,'that.curCourseItem.pdfPages')
               // that.isLoadingEnable = false;
                // that.zhezhao = false;
                });
            };
            fileReader.onerror = (e) => {
                //that.zhezhao = false;
                //that.isLoadingEnable = false;
                that.$message.error("加载文件" + fileObj.name + "出错，请重试。");
            };
            fileReader.readAsDataURL(fileObj);
            //reader.readAsText(fileObj);  
            },
            test(Base64Str) {
            let vm = this;
            pdfJs.getDocument( 
                    Base64Str,
                    // cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/',
                    // cMapPacked: true
                ).then(function(pdf) {
            var numPages = pdf.numPages;
            console.log(numPages,'numPages')
            var MAX_NUM_PAGES = 5;
            var ii = Math.min(MAX_NUM_PAGES, numPages);
            var promise = Promise.resolve();
            for (var i = 1; i <= ii; i++) {
                if(document.querySelector('[name="page='+i+'"]')){
                    let container = document.querySelector('[name="page='+i+'"]').children[0];
                    
                    var viewport = vm.pdfPage.getViewport(vm.scale);
                    document.querySelector('.pageContainer').children[0].width.baseVal.value = viewport.width;
                    document.querySelector('.pageContainer').children[0].height.baseVal.value = viewport.height;
                    container.style.width = viewport.width + 'px';
                    container.style.height = viewport.height + 'px';
                    document.querySelector('.scroll-content-info').style.width = document.querySelector('.pageContainer').getBoundingClientRect().width + 'px';
                    return;
                }
                var anchor = document.createElement('a');
                anchor.setAttribute('name', 'page=' + i);
                anchor.setAttribute('class', 'pdfATag');
                anchor.setAttribute('title', 'Page ' + i);
                document.getElementsByClassName("scroll-content-info")[0].appendChild(anchor);

                // Using promise to fetch and render the next page
                promise = promise.then(function (pageNum, anchor) {
                return pdf.getPage(pageNum).then(function (page) {
                    vm.pdfPage = page;
                    var viewport = page.getViewport(vm.scale);
                    var container = document.createElement('div');
                    container.id = 'pageContainer' + pageNum;
                    container.className = 'pageContainer';
                    container.style.width = viewport.width + 'px';
                    container.style.height = viewport.height + 'px';
                    anchor.appendChild(container);

                    return page.getOperatorList().then(function (opList) {
                    var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
                    return svgGfx.getSVG(opList, viewport).then(function (svg) {
                        container.appendChild(svg);
                        document.querySelector('.scroll-content-info').style.width = document.querySelector('.pageContainer').getBoundingClientRect().width + 'px';
                        vm.$refs.scroll.refresh();
                        Util.setLoading(!1);
                        !vm.pdfWaterMark && Util.getUserInfo(vm.addWaterMarker);
                    });
                    });
                });
                }.bind(null, i, anchor));
            }
            })
        },
    }
}


</script>
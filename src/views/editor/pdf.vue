<template>
        <div class="pdf" style="height:800px;">
          <div class="pdf-tab">
            <div 
              :class="['btn-def',{'btn-active':activeIndex==index}]"
              v-for="(item,index) in pdfList"
              @click.stop="pdfClick(item.pdfUrl,index)">{{item.title}}</div>
          </div>
          <pdf 
            v-for="i in numPages"
            :key="i"
            :src="pdfUrl"
            :page="i">
          </pdf>
        </div>
        </template>
        <script>
        import pdf from 'vue-pdf'
        export default {
          name: 'Pdf',
          components:{
              pdf
          },
          data(){
              return {
              pdfList:[
                {
                  pdfUrl:"https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-29/1546049718768.pdf",
                  title:"你好，2019年"
                },
                {
                  pdfUrl:"http://file.gp58.com/file/2018-11-14/111405.pdf",
                  title:"中信证券观点"
                },
                {
                  pdfUrl:"https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf",
                  title:"12月投资月刊"
                },
                {
                  pdfUrl:"https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003282521.pdf",
                  title:"丰岭资本观点"
                },
                {
                    pdfUrl:"http://localhost:5000/民法典.pdf",
                  title:"民法典"
                },
                {
                    pdfUrl:"http://localhost:5000/已开票信息.pdf",
                  title:"已开票信息"
                },
                {
                    pdfUrl:"http://localhost:5000/test.pdf",
                  title:"test"
                }
              ],
              pdfUrl: 'http://localhost:5000/民法典.pdf',

              numPages:1,
              activeIndex:0,
              }
          },
          mounted: function() {
            this.pdfTask(this.pdfList[0].pdfUrl)
            //this.pdfTask(this.pdfUrl)
          },
          methods: {
              pdfTask(pdfUrl){
                var self = this
                // cMapUrl: 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/',
                //   cMapPacked: true
                let CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/'
                var loadingTask = pdf.createLoadingTask(pdfUrl,{
                  cMapUrl: CMAP_URL,
                  cMapPacked: true
                })  
                console.log(loadingTask,'loadingTask')
                loadingTask.promise.then(pdf => {
                  self.pdfUrl = loadingTask
                  self.numPages = pdf.numPages
                }).catch((err) => {
                  console.error('pdf加载失败')
              })
              },
            pdfClick(pdfUrl,index){
              if(index == this.activeIndex)return
              this.activeIndex = index
              this.pdfUrl = null
              this.pdfTask(pdfUrl)
            },
          }
        }
        </script>
<template>
  <div class="outside" ref="outside" >
    <div class="handleBtns">
      <div class="selectBtn">
        <button class="cus"   @click="getFile">请选择文件</button>
        <span :title="fileName">{{fileName}}</span>
        <form name="form1">
          <input type="file" name="picpath" id="picpath" style="display:none;" ref="file" @change="readFile">
        </form>
      </div>
       <div class="handleBtn">
        <button class="cus" @click="uploadFile">上传</button>
        <button class="cus" @click="downloadFile">下载</button>
      </div>
      <div class="list">
        <div v-for="(item,index) in fileList" :key="index">
          {{item}}<button @click="downloadFile(item)">下载当前</button>
        </div>
      </div>
      <button @click="getVideos">xiazai</button>
    </div>
    <div class="modal" ref="modal">{{content}}</div>
    <div id="imgboxid">
      <img src="" alt="">
    </div>
    <TestModal ref="testModal"></TestModal>
  </div>
</template>

<script>
import {getFileList,uploadFile} from '@/api/file'
import axios from 'axios'
import TestModal from '@/views/editor/components/modal'
export default {
  data(){
    return {
      fileName: '',
      formData: {},
      sum: {},
      content: '弹窗',
      flag: false,
      fileList:[],
      loading: ""

    }
  },
  components: {
    TestModal
  },
  created(){
    this.getFileList()
  },
  methods: {
    getFile() {
      this.$refs.file.click();
    },
    readFile() {
      this.formData = new FormData();
      console.log(this.$refs.file.files[0],'ssss')
      this.formData.append('file',this.$refs.file.files[0]);
      this.fileName = this.formData.get('file').name;
      console.log(this.formData.get('file'),'fileee')
      this.xmTanUploadImg(this.$refs.file.files[0])
    },
    uploadFile() {
      if (!this.$refs.file.files[0]) {
        alert('请先选择文件');
        return;
      }
      console.log(this.formData,'this.formData')
      uploadFile(this.formData).then(res=>{
        console.log(res,'resssssssssssssssssssssss')
        this.getFileList()
      })
      // let url = 'http://localhost:4000/file/upload'
      // this.$axios.post(url, this.formData,{
      //   onUploadProgress (progress) {
      //     console.log(Math.round(progress.loaded / progress.total * 100) + '%');
      //   }}).then(res =>{
      //     console.log(res.data,'data')
      //     this.sum = res.data.sum
      //     this.content = '已上传成功'
      //     this.getFileList()
      //     this.handleModal()
      // })
    },
    downloadFile(path) {
      this.loading = this.$loading({
          lock: true,
          text: '正在下载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      console.log(path,'pathpath')
      this.download(path)
       //this.downloadFile_blob(path)
    },
    downloadFile_base64(data,name){
      var binary = '';
      let byte = new Uint8Array(data);
      console.log(byte)
      let len =  byte.length;
      for(let i = 0; i < len; i++) {
        binary += String.fromCharCode(byte[i]);
      }
      var src = window.btoa(binary);
      let link = document.createElement('a');
      link.href = 'data:'+ this.sum.mimetype + ';base64,' + src;
      link.download = name;
      link.click();
      link.remove();
    },
    download(path){
    let url = `${process.env.VUE_APP_DOWN_API}/file/download?path=${path}`;
    // this.setState({ visible: true, size: 0 });
    axios({
      method: "get",
      url,
      // responseType: "blob",
      // headers: { Authorization: token },
      onDownloadProgress: (evt) => {
        // console.log("progressEvent===",evt )
        // 对原生进度事件的处理
        console.log('evt.loaded / evt.total',evt.loaded , evt.total)
        if(evt.loaded / evt.total==1) {
          this.loading.close()
        }
        // this.setState({ progress: parseInt((evt.loaded / evt.total) * 100) });
      }
    })
      .then((res) => {
        // console.log("res===", res);
        let type = res.headers["content-type"]; //请求头中文件类型
        let name = path
        console.log(res,'res')
        // let name = JSON.parse(res.headers["content-disposition"].split(";")[1].split("=")[1]); //请求头中文件名
        // console.log("res===", res, type, name);
        console.log(this.$store,'ssss================........')
        this.$store.commit('editor/setBufferData',res.data.data.data)
        const buf = Buffer.from(res.data.data.data, 'binary')
        console.log(buf,'sdss')
        this.$refs.testModal.showModal(res.data.data.data)
      //   const blob = new Blob([buf]);
      //   if ("download" in document.createElement("a")) {
      //     // 非IE下载
      //     const elink = document.createElement("a");
      //     elink.download = name;
      //     elink.style.display = "none";
      //     elink.href = URL.createObjectURL(blob);
      //     document.body.appendChild(elink);
      //     elink.click();
      //     URL.revokeObjectURL(elink.href); // 释放URL 对象
      //     document.body.removeChild(elink);
      //   } else {
      //     // IE10+下载
      //     navigator.msSaveBlob(blob, name);
      //   }
 
      //   // setTimeout(() => {
      //   //   this.setState({ visible: false, progress: 0 });
      //   // }, 3000);
      // })
      // .catch((err) => {
      //   // this.setState({ visible: false });
      //   this.$message.error("下载错误");
      //   console.log("下载错误", err);
      });
    },
    downloadFile_blob(path){
      // console.log(data,name,'data')
      // // const buf = Buffer.from(data, 'binary')
      // // console.log(buf,'buf')
      // // 再输入到 Blob 生成文件
      // let blob = new Blob([data]);
      // let link = document.createElement('a');
      // link.href = URL.createObjectURL(blob)
      // link.download = name;
      // link.click();
      // link.remove();
      let api = 'http://192.168.1.9:4000'
      let link = document.createElement('a');
     //link.href = `${process.env.VUE_APP_DOWN_API}/file/downloadVideo?name=${path}`
      link.href = `${api}/file/downloadVideo?name=${path}`
      // link.download = 'my.mp4';
      link.click();
      link.remove();
      this.loading.close()
    },
    handleModal() {
      this.$refs.modal.style.display = 'block'
      this.$refs.modal.style.top = '42px';
      setTimeout(() => {
        this.$refs.modal.style.top = '-42px';
        this.$refs.modal.style.display = 'none'
      },1000)
    },
    xmTanUploadImg(file) {
      var reader = new FileReader();
      //读取文件过程方
      reader.onloadstart = function (e) {
        console.log("开始读取....",e);
      }
      reader.onprogress = function (e) {
        console.log(Math.round(e.loaded / e.total * 100) + '%');
        console.log("正在读取中....",e);
      }
      reader.onabort = function (e) {
        console.log("中断读取....",e);
      }
      reader.onerror = function (e) {
        console.log("读取异常....",e);
      }
      reader.onload = function (e) {
        console.log("成功读取....",e);
        var imgstr='<img style="width:100px;height:100px;" src="'+e.target.result+'"/>';
        var oimgbox=document.getElementById("imgboxid");
        var ndiv=document.createElement("div");
        ndiv.innerHTML=imgstr;
        ndiv.className="img-div";
        oimgbox.appendChild(ndiv);
      }
      reader.readAsDataURL(file);
    },
   
    async getFileList() {
      this.$axios.get('http://localhost:4000/file/getFileList').then(res=>{
          console.log(res.data,'‘fileListfileList')
          this.fileList = res.data.fileList
        })
      try {
       
        // let res = await getFileList({a:1})
        // this.fileList = res.fileList
      } catch(e) {
        console.log(e,'请求出错了')
      }
   
    },
    getVideos() {     
      let link = document.createElement('a');
      link.href = 'http://localhost:3000/downloadVideo?name=hh.mp4'
      link.download = 'my.mp4';
      link.click();
      link.remove();
    }
  }
}
</script>
<style lang="less" scoped>
  .outside{
    .handleBtns{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .selectBtn{
        width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 20px;
      }
      .handleBtn{
        width: 400px;
      }
      button.cus {
        padding: 5px;
        background-color: brown;
        font-size:30px;
        color: white;
        margin-right: 16px;
      }
    }
    .modal {
        display: none;
        line-height: 40px;
        border: 1px solid orange;
        transition: all 1s ease;
        font-size: 16px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top:-42px;
        background: yellow;

      }
  }
</style>
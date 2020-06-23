<template>
  <div class="outside" ref="outside">
    <div class="handleBtns">
      <div class="selectBtn">
        <button @click="getFile">请选择文件</button>
        <span :title="fileName">{{fileName}}</span>
        <form name="form1">
          <input type="file" name="picpath" id="picpath" style="display:none;" ref="file" @change="readFile">
        </form>
      </div>
       <div class="handleBtn">
        <button @click="uploadFile">上传</button>
        <button @click="downloadFile">下载</button>
      </div>
    </div>
    <div class="modal" ref="modal">{{content}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fileName: '',
      formData: {},
      sum: {},
      content: '弹窗',
      flag: false
    }
  },
  methods: {
    getFile() {
      this.$refs.file.click();
    },
    readFile() {
      this.formData = new FormData();
      this.formData.append('file',this.$refs.file.files[0]);
      this.fileName = this.formData.get('file').name;
      console.log(this.formData.get('file'),'fileee')
    },
    uploadFile() {
      if (!this.$refs.file.files[0]) {
        alert('请先选择文件');
        return;
      }
      let url = 'http://localhost:4000/file/upload'
      this.$axios.post(url, this.formData).then(res =>{
        this.sum = res.data.sum
        this.content = '已上传成功'
        this.handleModal()
      })
    },
    downloadFile() {
      if (!this.$refs.file.files[0]) {
        alert('先上传 再下载');
        return;
      }
      let url = 'http://localhost:4000/file/download';
      let splitArr = this.sum.path.split('/');
      let name = splitArr[splitArr.length-1];
      this.$axios.post(url, {path: this.sum.path}).then(res => {
        // this.downloadFile_base64(res.data.data.data,name)
        this.downloadFile_blob(res.data.data.data,name)
      })
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
    downloadFile_blob(data,name){
      const buf = Buffer.from(data, 'binary')
      // 再输入到 Blob 生成文件
      let blob = new Blob([buf]);
      let link = document.createElement('a');
      link.href = URL.createObjectURL(blob)
      link.download = name;
      link.click();
      link.remove();
    },
    handleModal() {
      this.$refs.modal.style.display = 'block'
      this.$refs.modal.style.top = '42px';
      setTimeout(() => {
        this.$refs.modal.style.top = '-42px';
        this.$refs.modal.style.display = 'none'
      },1000)
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
      button {
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
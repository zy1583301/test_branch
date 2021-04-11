<template>
    <div>
    <form enctype="multipart/form-data" id="form_example" ref="form_example" name="form">
        <input type="file" ref="files" id="files" multiple @change="renderFileList"/><br/>
        <input type="submit" value="提交" @click="sendFile($event)" />
    </form>
    <div id='fileListDisplay' ref="fileListDisplay">
        <p v-for="item in innerHTML" :key="item">{{item}}</p>
    </div>
    <button @click="getFileList">获取列表</button>
    <div class="modal" ref="modal">{{content}}</div>
    </div>  
</template>
      
<script>
export default {
data(){
    return {
    fileList:[],
    innerHTML:[],
    content:''
    }
},
methods: {
    renderFileList() {
        console.log(this,'this')
        let files = this.$refs.files
        for (var i = 0; i < files.files.length; i++) {
       this.fileList.push(files.files[i]);
      }
      this.innerHTML = [];
      this.fileList.forEach((file, index) =>{
       
       this.innerHTML.push((index + 1) + ":" + file.name);
    //    fileListDisplay.appendChild(fileDisplayEl);
      })
     },
     sendFile(e) {
        e.preventDefault();
      var formData = new FormData();
    //   var request = new XMLHttpRequest();
    //   //循环添加到formData中
    //   console.log(this.fileList,'file')
      this.fileList.forEach(function (file) {
       formData.append('files', file, file.name);
      })
    //   console.log(formData.get('files'),'formData')
    //   request.open("POST", "http://localhost:4000/file/uploads");
    //   request.send(formData);
        let url = 'http://localhost:4000/file/uploads'
      this.$axios.post(url, formData).then(res =>{
        this.sum = res.data.sum
        this.content = '已上传成功'
        this.fileList = []
        this.innerHTML = []
        this.handleModal()
      }).catch(e=>{
        this.content = '已上传失败'+e
        this.handleModal()
      })
     },
     getFileList() {
        this.$axios.get('http://localhost:4000/file/getFileList').then(res=>{
          console.log(res.data)
        })
     },
     handleModal() {
      this.$refs.modal.style.display = 'block'
      this.$refs.modal.style.top = '42px';
      setTimeout(() => {
        this.$refs.modal.style.top = '-42px';
        this.$refs.modal.style.display = 'none'
      },1000)
    },
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
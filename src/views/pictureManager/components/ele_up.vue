<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-19 14:00:47
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-19 16:32:16
-->
<template>
    <div>
        <!-- <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:4000/file/uploads"
        :multiple="true"
        :data="data"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="change"
        > -->
        <!-- <el-upload class="upload-element" 
        ref="upload"
        :headers="headers"
        :action ="action"
        :limit="1"
        :show-file-list="false"
        accept=".csv"
       
   
        :on-change="handleUploadChange"
        :before-upload="beforeupload"
        > -->
        <!-- :on-change="handleUploadChange" -->
        :before-upload="beforeupload"
        <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:4000/file/uploads"
        :multiple="true"
        
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="change"
        :auto-upload="false"
        >
        <!-- :auto-upload="false" -->
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传多个到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
  import {fileUpload,filesUpload} from '@/api/file'
  export default {
    data() {
      return {
          file:"",
        fileList: [],
        data: {
          
        }
      };
    },
    watch:{
        fileList(val) {
            console.log(val,'sss')
        }
    //     fileList:{
    //     handler:function(val,oldval){
    //       console.log(val)
    //     },
    //     deep:true//对象内部的属性监听，也叫深度监听
    //   },
    },
    methods: {
          // 阻止upload的自己上传，进行再操作
    // beforeupload(file) {
    //   return false
    // },
      //可以用这个方法 将所有参数加入formData 然后传给后端
    //   handleUploadChange(file) {
      
    //   let param = new FormData();
    //   let fileInfo = this.fileInfo
    //   Object.keys(fileInfo).forEach(function (key) {
    //     param.append(key, fileInfo[key]);
    //   });
    //   param.append('file',file.raw,file.name);
      
    //   transTaskUpload(param).then(res=>{
    //     // 如果成功 提示上传成功
    //     if(res.retCode == 1) {
    //       this.$message('上传成功')
    //     } else {
    //       this.$message('上传失败')
    //     }
    //   })
    // },
      submitUpload() {
        // this.$refs.upload.submit();
        fileUpload(this.file).then(res=>{
            console.log(res,'res')
        })
      },
      submit() {
        filesUpload(this.fileList).then(res=>{
            console.log(res,'res')
            if(res.code == '0000') {
                // 上传成功后清除列表
                this.fileList = []
                this.$message({
                    type: 'success',
                    message: '上传成功'
                })
            }
        }) 
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
        console.log(file, fileList,'remove');
      },
      handlePreview(file) {
        console.log(file,'re');
      },
      change(file,fileList) {
          console.log(file,fileList,'haha')
          this.fileList = fileList
         this.file = file
      },

    }
  }
</script>
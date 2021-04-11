<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-19 14:00:47
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-19 15:58:05
-->
<template>
        <div>
          <!-- action上传地址 -->
          <el-upload
            action="http://localhost/goods-service/goods/sku/file"
            list-type="picture-card"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
            :auto-upload="false"
          >
            <!-- 十字图标 -->
            <i slot="default" class="el-icon-plus"></i>
            <!-- 文件 -->
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </template>
      
      <script>
    //   import { fileDelete,fileDownload } from "@/api/goods/fileUpload.js";
      import { unescape } from "querystring";
      
      export default {
        data() {
          return {
            fileList: [],
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false
          };
        },
        methods: {
          handleRemove(file) {
            // 删除文件
            console.log(file.response.data);
            let fileNames = file.response.data.split("/");
            fileDelete(fileNames[fileNames.length - 1]).then(res => {
              if (res.data.code == "0000") {
                this.fileList.splice(file, 1);
              }
            });
          },
          handlePictureCardPreview(file) {
            // 预览文件
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          handleDownload(file) {
            console.log("下载成功");
            let fileNames = file.response.data.split("/");
            let fileName = fileNames[fileNames.length - 1];
            fileDownload(fileName).then(res => {
              if (res.data.code == "0000") {
                  this.downloadFile(fileName,res.data.data);
              }
            });
          },
          handleImageSuccess(res, file, fileList) {
            // 上传成功
            this.fileList = fileList;
            console.log("上传成功" + fileList.length);
          },
          beforeImageUpload(file) {
            // 上传前格式与大小校验
      
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 5;
      
            if (!isJPG) {
              this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
              this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
          },
          // 下载
          downloadFile(fileName, content) {
            let aLink = document.createElement("a");
            let blob = this.base64ToBlob(content); //new Blob([content]);
      
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
      
            // aLink.dispatchEvent(evt);
            aLink.click();
          },
          // base64转blob
          base64ToBlob(code) {
            let parts = code.split(";base64,");
            let contentType = parts[0].split(":")[1];
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
      
            let uInt8Array = new Uint8Array(rawLength);
      
            for (let i = 0; i < rawLength; ++i) {
              uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], { type: contentType });
          }
        }
      };
      </script>
      
<!-- <template>
    <div>
        <el-upload
        class="upload-demo"
        ref="upload"
        action
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="change"

        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传多个到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
  import {fileUpload} from '@/api/file'
  export default {
    data() {
      return {
          file:"",
        fileList: []
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
      submitUpload() {
        // this.$refs.upload.submit();
        // uploadFile()
        console.log(this.file,'aaa')
        fileUpload(this.file).then(res=>{
              console.log(res,'res')
          })
      },
      submit() {

      },
      handleRemove(file, fileList) {
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
</script> -->
<template>
  <div class="classify-container">
      <el-row >
        <el-col :span="14">
          <div class="classify-left">
            <!-- <ClassifyTree @getSelectedData="getSelectedData" /> -->
            <div class="classify-title">
              <span>已选分类</span>
            </div>
            <div class="checked-box">

            
              <div class="classify-checked">
                <!-- <span>已选分类</span> -->
                
                  <el-tag
                  v-for="tag in checkedItems"
                  :key="tag.paramValue"
                  closable
                  :type="tag.type"
                  effect="dark"
                  @close="handleClose(tag)">
                  {{tag.paramValue}}
                </el-tag>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10" class="classify-center">
          <TargetClassify></TargetClassify>
        </el-col>
        <!-- <el-col :span="3" class="classify-right">
            <el-button type="primary" @click="saveEdit" class="save-btn">保存修改</el-button>
        </el-col> -->
      </el-row>
  </div>
</template>
      
<script>
  // import ClassifyTree from '@/views/components/customClassify/classifyTree'
  // import TargetClassify from "@/views/components/customClassify/targetClassify"
    // import ClassifyTree from "./home3.vue"
  import TargetClassify from "@/views/home/component/targetClassify"
  import { mapGetters, mapMutations } from 'vuex'
  // import { saveCatalogInfo } from '@/api/tree'
  export default {
    components: {TargetClassify },
    computed: {
      ...mapGetters({
        checkedNodes: "checkedNodes",
        checkedItems: "checkedItems"
      })
    },
    methods: {
      ...mapMutations({
        setCheckedNodes:'tree/setCheckedNodes',
        delCheckedItem: "tree/delCheckedItem"
      }),
      getSelectedData(data) {
        this.setCheckedNodes(data)
      },
      handleClose(tag){
        console.log(tag,'tagtag')
        tag.checked = false
        this.delCheckedItem(tag)
      },
      saveEdit() {
        // saveCatalogInfo({ datas: this.checkedNodes }).then(res => {
        //   if(res.resp_code == 0) {
        //     this.$message({
        //       message: res.resp_msg,
        //       type: "success"
        //     })
        //   } else {
        //     this.$message({
        //       message: res.resp_msg,
        //       type: "warning"
        //     })
        //   }
        // })
      },
    }
  };
</script>

<style lang='less' scoped>
  .classify-container {
    .classify-left {
      width: 600px;
      height: 50px;
      display: flex;
      border: 1px solid #ccc;
      overflow: hidden;
      position: relative;
    }
    .classify-title {
      height: 50px;
      width: 100px;
      text-align: center;
      line-height: 50px;
      /* border-right:1px solid #ccc; */
      /* display: inline-block; */
    }
    .checked-box {
      /* display: inline-block; */
      width: 500px;
      height: 50px;
      overflow: hidden;
      position: relative;
    }
    .classify-checked {
      /* width: 500px;
      height: 50px; */
      position: absolute;
      left: -15px;
      top: 0;
      right: -15px;
      bottom: -10px;
      overflow-y: hidden;
      overflow-x: scroll;
      white-space: nowrap;


     
    
      line-height: 50px;
      /* overflow-x:auto;
      white-space: nowrap;
      overflow-y: hidden; */
      /* bottom: -17px; */
      .el-tag {
        margin-left: 10px;
        &:nth-child(1) {
          margin-left: 25px;
        }
        &:last-child {
          margin-right: 25px;
        }
      }
      
    }
    .classify-right {
      padding-top: 20px;
      .save-btn {
        margin-right: 20%;
        float: right;
      }
    }
   
  }
</style>
      
<template>
  <div class="classify-container">
      <el-row >
        <el-col :span="10">
          <div class="classify-left">
            <ClassifyTree @getSelectedData="getSelectedData" />
          </div>
        </el-col>
        <el-col :span="11" class="classify-center">
          <TargetClassify></TargetClassify>
        </el-col>
        <el-col :span="3" class="classify-right">
            <el-button type="primary" @click="saveEdit" class="save-btn">保存修改</el-button>
        </el-col>
      </el-row>
  </div>
</template>
      
<script>
  // import ClassifyTree from '@/views/components/customClassify/classifyTree'
  // import TargetClassify from "@/views/components/customClassify/targetClassify"
    import ClassifyTree from "./home3.vue"
  import TargetClassify from "@/views/home/component/targetClassify"
  import { mapGetters, mapMutations } from 'vuex'
  // import { saveCatalogInfo } from '@/api/tree'
  export default {
    components: { ClassifyTree, TargetClassify },
    computed: {
      ...mapGetters({
        checkedNodes: "checkedNodes"
      })
    },
    methods: {
      ...mapMutations({
        setCheckedNodes:'tree/setCheckedNodes'
      }),
      getSelectedData(data) {
        this.setCheckedNodes(data)
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
    .classify-right {
      padding-top: 20px;
      .save-btn {
        margin-right: 20%;
        float: right;
      }
    }
   
  }
</style>
      
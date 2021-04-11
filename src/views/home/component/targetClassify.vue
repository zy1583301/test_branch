<template>
    <div class="filter-sort">
        <div class="title">
        <h3>筛选标签自定义</h3>
        </div>
        <TargetItem v-for="(item,index) in checkedNodes"
            :targetItem="item"
            :key="index"
            @submit="submit"
        />
    </div>
</template>
<script>
import TargetItem from './targetItem'
import { mapGetters } from 'vuex'
export default {
    components:{ TargetItem },
    computed: {
        ...mapGetters({
            checkedNodes: "checkedNodes"
        })
    },
    methods: {
        submit() {
        const arr = []
        const length = this.checkedNodes.length
        const flag = this.checkedNodes.some(item=>{
          return item.order > length
        })
        this.checkedNodes.forEach(item => {
          if(arr.indexOf(item.order) == -1) {
            arr.push(item.order)
          }
        })
        let message = flag ? `请输入1-${length}数字` : '排序数字重复'
        if(flag || arr.length < length) {
          return  this.$message({
            message: message,
            type: 'warning'
          })
        }
        this.checkedNodes.sort((a,b) => {
          return a.order - b.order
        })
      },
        splitCatalogList(arr) {
        if (arr.length <= 4) {
          return arr
        } else {
          return arr.slice(0, 4)
        }
      },
    }
}
</script>
<style lang="less" scoped>
.filter-sort {
    margin-top: 60px;
.title{
    overflow: hidden;
    border: 1px solid #ccc;
    
    h3{
        line-height: 40px;
        padding-left: 20px;
        float: left;
    }
}
.first-catalog {
    h4 {
    background: #eee;
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    padding-left: 5px;
    }
    .second-catalog {
    padding-left: 10px;
    h5 {
        margin-bottom: 10px;
    }
    .third-catalog {
        margin: 10px 0;
        color: #409eff;
        font-weight: 700;
        font-size: 14px;
        .catalog-item {
        width: 19%;
        text-align: center;
        background-color: #fff;
        display: inline-block;
        line-height: 30px;
        font-size: 14px;
        color: #409eff;
        border: 1px solid #fff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        margin-bottom: 10px;
        margin-right: 3%;
        margin-left: 3%;
        }
        .activated {
        background-color: #409eff;
        color: #fff;
        border: 1px solid #409eff;
        }
        .more {
        padding-left: 10px;
        .el-button--text {
            text-decoration: underline;
        }
        }
    }
    }
}
}
</style>

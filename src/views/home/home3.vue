<template>
  <div class="classify-tree">
    <el-row :gutter="20" style="display: flex;align-items: center;">
      <el-col :span="16">
        <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          @check="check"
          :props="defaultProps">
        </el-tree>
    </el-col>
    <el-col :span="8">
        <div class="classify-add" @click="sendResult" :class="checked?'canUse':''">
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </el-col>
      <slot></slot>
    </el-row>
  </div>
</template>
<script>
  // import { getTreeInfo } from '@/api/tree'
  export default {
    data() {
      return {
        treeData: [
          {
            "id": 1,
            "fid": 0,
            "paramId": 18,
            "leavel": 1,
            "paramKey": "测试table1",
            "paramValue": "所属部门",
            "children": [
                {
                "id": 3,
                "fid": 1,
                "paramId": 21,
                "leavel": 2,
                "paramKey": "uop_table_label",
                "paramValue": "用户基础信息表",
                "children": [
                    {
                    "id": 4,
                    "fid": 3,
                    "paramId": 22,
                    "leavel": 3,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表",
                    "children": [
                    {
                    "id": 2000,
                    "fid": 4,
                    "paramId": 22,
                    "leavel": 4,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表222",
                    "children": []
                    },{
                    "id": 8,
                    "fid": 4,
                    "paramId": 26,
                    "leavel": 4,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表223",
                    "children": []
                    },{
                    "id": 1500,
                    "fid": 4,
                    "paramId": 29,
                    "leavel": 4,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表224",
                    "children": []
                    },{
                    "id": 1501,
                    "fid": 4,
                    "paramId": 30,
                    "leavel": 4,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表225",
                    "children": []
                    },{
                    "id": 1502,
                    "fid": 4,
                    "paramId": 31,
                    "leavel": 4,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表226",
                    "children": []
                    }

                    ]
                    },
                    {
                    "id": 500,
                    "fid": 3,
                    "paramId": 23,
                    "leavel": 3,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表1",
                    "children": []
                    },
                    {
                    "id": 501,
                    "fid": 3,
                    "paramId": 23,
                    "leavel": 3,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表12",
                    "children": []
                    },
                    {
                    "id": 502,
                    "fid": 3,
                    "paramId": 23,
                    "leavel": 3,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表14",
                    "children": []
                    },
                    {
                    "id": 503,
                    "fid": 3,
                    "paramId": 23,
                    "leavel": 3,
                    "paramKey": "uop_table_label",
                    "paramValue": "客户理财信息表15",
                    "children": []
                    }
                ]
                },
                {
                "id": 3020,
                "fid": 1,
                "paramId": 5000,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP2",
                "children": []
                },
                {
                "id": 3021,
                "fid": 1,
                "paramId": 5000,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP24",
                "children": []
                },
                {
                "id": 3022,
                "fid": 1,
                "paramId": 5000,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP223",
                "children": []
                },
                {
                "id": 3023,
                "fid": 1,
                "paramId": 5000,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP21",
                "children": []
                },
            ]
            },
            {
            "id": 2,
            "fid": 0,
            "paramId": 19,
            "leavel": 1,
            "paramKey": "测试table2",
            "paramValue": "承建部门",
            "children": [
                {
                "id": 5,
                "fid": 2,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_label",
                "paramValue": "客户APP登录信息表",
                "children": []
                }
            ]
            },
            {
            "id": 200,
            "fid": 0,
            "paramId": 19,
            "leavel": 1,
            "paramKey": "测试table2",
            "paramValue": "业务分类",
            "children": [
                {
                "id": 201,
                "fid": 200,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_label",
                "paramValue": "客户APP77",
                "children": []
                }
            ]
            },
            {
            "id": 2000,
            "fid": 0,
            "paramId": 19,
            "leavel": 1,
            "paramKey": "测试table2",
            "paramValue": "数据仓库主体域",
            "children": [
                {
                "id": 2010,
                "fid": 2000,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP55",
                "children": []
                },
                {
                "id": 2015,
                "fid": 2000,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP44",
                "children": []
                },
                {
                "id": 2019,
                "fid": 2000,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP3",
                "children": []
                },
                {
                "id": 2020,
                "fid": 2000,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP2",
                "children": []
                },
                {
                "id": 2021,
                "fid": 2000,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP1",
                "children": []
                },
                {
                "id": 2022,
                "fid": 2000,
                "paramId": 23,
                "leavel": 2,
                "paramKey": "uop_table_labe22222222222",
                "paramValue": "客户APP1",
                "children": []
                },
            ]
            }
        ],
        defaultProps: {
          children: 'children',
          label: 'paramValue'
        },
        allchecked: [],
        checked: false,
        leavel1: [],
        leavel2: [],
        leavel3: [],
        leavel4: [],
      };
    },
    created() {
      //this.getTreeData()
    },
    methods: {
      getTreeData() {
        // getTreeInfo().then(res => {
        //   if(res.resp_code == 0) {
        //     this.treeData = res.datas
        //   } else {
        //     this.$message({
        //       message: res.resp_msg,
        //       type: "warning"
        //     })
        //   }
        // })
      },
      check(item, nodes) {
        let allcheckedNodes = JSON.parse(JSON.stringify(nodes.checkedNodes.concat(nodes.halfCheckedNodes)))
        allcheckedNodes.forEach(item => {
          item.children = []
        });
        this.allchecked = JSON.parse(JSON.stringify(allcheckedNodes))
        if(this.allchecked.length) {
          this.checked = true
        } else {
          this.checked = false
        }
        this.allchecked.sort((a, b) => {
            return a.id - b.id
        })
        this.screenByLeavel()
        this.$nextTick(() => {
          this.getCheckedNodes(3,4)
        }) 
      },
      screenByLeavel() {
        this.leavel1 = []
        this.leavel2 = []
        this.leavel3 = []
        this.leavel4 = []
        this.allchecked.forEach((item) => {
          item.children = []
          item.checked = false
          switch (item.leavel) {
            case 1:
              this.leavel1.push(item)
              break;
            case 2:
            this.leavel2.push(item)
              break;
            case 3:
            this.leavel3.push(item)
              break;
            case 4:
            this.leavel4.push(item)
              break;
            default:
              break;
          }
        })
      },
      getCheckedNodes(small,big) {
        this[`leavel${big}`].forEach(item => {
          this[`leavel${small}`].forEach(i => {
            if(item.fid == i.id) {
              i.children.push(item)
              i.more = i.children.length>4?true: false
            }
          })
        })
        if(small > 1) {
          small--
          big--
          this.getCheckedNodes(small, big)
        }
      },
      sendResult() {
        if(!this.leavel1.length) {
          return this.$message({
            message: "请先选择后再同步配置",
            type: "warning"
          })
        }
       
        this.leavel1.forEach((item,index)=>{
          item.order = index+1
        })
        console.log(this.leavel1,'this.leavel1')
        this.$emit('getSelectedData',this.leavel1)
      }
    },
    
  };
</script>

<style lang="less">
  .classify-tree {
    .el-tree>.el-tree-node > .el-tree-node__content {
        background: #eee;
        border: none;
        position: relative;
        .el-tree-node__label {
          /* display: inline-block; */
          width:100%;
          position: absolute;
          left:0;
          /* flex: 1; */
          text-align: center;
        }
    }
    .el-tree>.el-tree-node > .el-tree-node__children {
      border-right: 1px solid #ccc;
    }
    .el-tree {
      border-bottom: 1px solid #ccc;
    }
    .classify-add {
      text-align: center;
      &.canUse {
        color:#169BD5;
      }
      .el-icon-d-arrow-right {
        font-size: 80px;
      }
    }
}
</style>
<template>
    <!-- <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
      type="selection"
      width="55" />
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot="header">
          物料编码
          <div v-if="flag">
            <button @click="changeFlag(1)">1111111</button>
          </div>
          <div v-if="flag2">
            <button @click="changeFlag(2)">2222222</button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" @click="handleIfResult(scope.row)" size="small" v-if="roles.indexOf('edit')!==-1 &&scope.row.can">编辑</el-button>
        </template>
      </el-table-column>
    </el-table> -->

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="roles"
          label="角色"
          width="180">
        </el-table-column>
        <el-table-column
          prop="preview"
          label="视屏预览"
          width="180">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.preview" v-if="!row.id" @change="change(row,1,'preview')"></el-checkbox>
            <el-checkbox v-model="row.preview" v-else  @change="change(row,2,'preview')"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="playback"
          label="视频回放" width="180">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.playback" v-if="!row.id" @change="change(row,1,'playback')"></el-checkbox>
            <el-checkbox v-model="row.playback" v-else @change="change(row,2,'playback')"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="alarm"
          label="报警查看" width="180">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.alarm" v-if="!row.id" @change="change(row,1,'alarm')"></el-checkbox>
            <el-checkbox v-model="row.alarm" v-else @change="change(row,2,'alarm')"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </template>
  
  <script>
      import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                roles: 'roles'
            })
        },
      methods: {
        handleClick(row) {
          console.log(row);
        },
        handleIfResult(row) {
          row.zip = 200333111
          this.$emit('total',this.tableData)
        },
        changeFlag(type) {
          console.log(type,'sss')
          if(type == 1) {
            this.flag = false
            this.flag2 = true
          } else {
            this.flag2 = false
            this.flag = true
          }
        },
        change(row,type,name){
          if(type==1) {
            this.tableData.forEach(item => {
                item[name] = row[name]
            });
          } else {
            let flag = 0
            this.tableData.forEach(item => {
               if(item.id&&item[name]) {
                flag++
               }
            });
            if(flag == this.tableData.length-1) {
              this.tableData[0][name] = true
            } else{
              this.tableData[0][name] = false
            }
          }

        },
       
      },
  
      data() {
        return {
          flag: false,
          flag2: true,
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
            can:true,
            disable: true
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1517 弄',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1519 弄',
            zip: 200333
          }, {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1516 弄',
            zip: 200333
          }]
        }
      },
      created() {
        this.tableData = [
        {
          roles: '全选',
          preview: false,
          playback: false,
          alarm: false
        },
        {
          id:1,
          roles: '超级管理员',
          preview: true,
          playback: true,
          alarm: true
        },
        {
          id:2,
          roles: '管理员',
          preview: false,
          playback: false,
          alarm: true
        },
        {
          id:3,
          roles: '安装工',
          preview: false,
          playback: false,
          alarm: false
        }]
        //this.$emit('total',this.tableData)
      },
     
    }
  </script>
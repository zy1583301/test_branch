<template>
    <div class="big">
        <div v-html="hh"></div>
        <img :src="imgurl" alt="">
        <!-- <div class="right" @click.right.prevent="right" style="width: 200px;height:200px;background:white">

        </div> -->
        <button @click="test">测试buffer</button>
        <button @click="send">发送机密文件</button>
        <button @click="goBaidu">go baidu</button>
        <input v-model="formData.num" placeholder="请输入要加密的信息"/>
        <div v-if="flag">
          <button @click="flag=!flag">1111111</button>
        </div>
        <div v-else>
          <button @click="flag=!flag">2222222</button>
        </div>
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="Name"
          >
            <a-input
              v-decorator="[
                'xxx',
                {rules: [{ required: true, message: '请输入ip' },{validator: handlePass}]}
              ]"
              placeholder="Please input ip"
              autocomplete="off"
            />
          </a-form-item>
    
        </a-form>
      <p v-copy="pValue" :style="{color: 'red'}">哈哈</p>
      <a-button type="primary" @click="showModal" >
            Open Modal
          </a-button>
          <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </a-modal>
          <!-- <Table1 @c='right'></Table1> -->
          <Table1 @total='info=$event'></Table1>
        </div>
    </template>
<script>

import Table1 from './component/table1'
import {nonce,aesEncrypt,createSecretKey,rsaEncrypt,rsaKeyEncrypt} from '@/utils/crypto'
import {crypto,upHistory} from '@/api/crypto'
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };
  export default {
    name:'home',
    data() {
      return {
        flag: false,
        visible: false,
        checkNick: false,
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        data:'',
        formData:{
          data:'',
          num: null
        },
        imgurl: "",
        info:{},
        pValue: 'haha',
        hh: '<h3>ssss</h3>'
      };
    },
    components:{
        Table1
    },
    watch:{
      // info(n) {
      //   console.log('info变化',n)
      // },
      info: {
        handler:function(val,oldval){
          console.log(val,'info变化')
        },
        deep: true,
      },
      "formData.num":{
        handler:function(val,oldval){
          console.log(val,'valeeeeeee')
        }
      }
    },
    mounted() {
      this.$sensors.trackPage("loginPage_show");
      // 这个页面传递的是两个不同窗口页面之间通信
      window.addEventListener('storage',(e)=>{
        console.log(e)
      })
      console.log(this.$sensor)
      // getHistory().then(res=>{
      //   console.log(res,'gethistory')
      //   this.imgurl = res.imgurl
      // })
      console.log('home mounted')
    },
    methods: {
      test() {
       let a = Buffer.from('Hello World!你好，世界！', 'utf8')
        // 375时 100px  400px时应该多少   400/375*100
       console.log(a,'aaaa')
       console.log(a.toString(),'aaa')
      },
      goBaidu() {
        this.$message({
          type:'fail',
          message: '失败了'
        })
        // let obj =  {"a": 1}
        // let {a:b} = obj
        // console.log(b,'bb')
        // upHistory({from: location.href,to:'http://172.19.181.97:9527/log'}).then(res=>{
        //   if(res.success) {
        //     window.location.href = res.two
        //   }
        // })
      },
      send() {
        console.log('11',this.formData.data)
        if(!this.formData.num) {
          return
        }
        this.$sensors.trackClick("loginPage_loginClick");
        this.$sensors.login("yuge");
        let data = JSON.stringify(this.formData)
        let m = rsaEncrypt(data)
        let key = createSecretKey(16)
        let a = aesEncrypt(aesEncrypt(data,nonce),key)
        crypto({text:a,key:rsaKeyEncrypt(key),m}).then(res=>{
          console.log(res,'res')
        })
      },
      check() {
        this.form.validateFields(err => {
          if (!err) {
            console.info('success');
          }
        });
      },
      handleChange(e) {
        let reg = /^(\d+).(\d+)$/g
        console.log(e.target.value,reg.test(e.target.value),'e.target')

        this.checkNick = e.target.checked;
        this.$nextTick(() => {
            this.form.validateFields(['xxx'], { force: true,message:'xxxxxxxxxxxxxx' });
            // this.form.validateFields(['xxx'], { force: false });
        });
      },
      handlePass(rule,value,callback){
            this.password = value
            // console.log(rule,value,'ss')
            if(!value) {
                callback()
                return
            }
            let reg1 = /^(\d+)\.(\d+)\.(\d+)\.(\d+):(\d+)$/g
            let reg2 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]).(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]).(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]).(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]).([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/g
            if(!reg1.test(value)) {
                console.log('符号有错误')
                callback('符号有错误')
            } else if(!reg2.test(value)) {
                console.log('数字过大')
                callback('数字过大')
            } else {
                console.log('无错误')
                callback(null)
            }

        },
        showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    right(e) {
      console.log('右击',e)
    }
    },
  };
  </script>

<style>
.big{
    height: 100%;
    overflow: auto;
    color: #0d0059
}
</style>

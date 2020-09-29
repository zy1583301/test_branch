<template>
    <div class="big">


    
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
      
      <a-button type="primary" @click="showModal">
            Open Modal
          </a-button>
          <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </a-modal>
          <Table1></Table1>
        </div>
    </template>
<script>
    import Table1 from './component/table'
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };
  export default {
    data() {
      return {
        visible: false,
        checkNick: false,
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      };
    },
    components:{
        Table1
    },
    mounted() {
        // document.body.style.position = 'relative'
    },
    methods: {
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
    },
  };
  </script>

<style>
.big{
    height: 1000px;
    overflow: auto;
}
</style>

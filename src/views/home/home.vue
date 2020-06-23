<template>
  <div>
    <!-- <div class="center">
      <div class="inner1">dfdfs</div>
      <div class="inner2">mmmmmmm</div>
    </div> -->
    <!-- <div class="right">
       <div class="inner">dfdfs</div>
    </div> -->
    <err1></err1>
    <home1></home1>
    <button @click="goLine">点击ffffff</button>
    <div style="float:right">{{a}}</div>
    <button @click="add">增加</button>
    <h2>彩票手动摇号系统</h2>
  <input type="button" @click="createRed('red',32,6)" value="摇红号" class="red">
  <input type="button" @click="createRed('blue',15,1)" value="摇蓝号" class="blue">
  <ul id="red">
    <li v-for="item in gather_red" :key="item">
      {{item}}
    </li>
  </ul>
  <ul id="blue">
    <li v-for="item in gather_blue" :key="item">
      {{item}}
    </li>
  </ul>
  </div>
</template>

<script>
// import Vue from 'vue'
import {getContext,con} from '@/utils/get'
import err1 from './component/err.vue'
import home1 from './home1'
// Vue.config.errorHandler = (err, vm, info) => {
//     console.log('进来啦~',err, vm, info);
// }
export default {
  name: 'home',
  data() {
    return {
      add: con,
      a:111111111,
      arr: [15,20,1, 5, 2, 7, 11, 9, 13],
      repeatArr: [1,2,1,2,5,6,7,8,11,9,5,8,7,'7','7',()=>{}],
      gather_red:[],
      gather_blue:[]
    }
  },
  components:{
    err1,home1
  },
  created() {
    this.cutRepeat()
  },
  mounted(){
    getContext(this)
  },
  beforeUpdate(){
    console.log('up')
  },
  updated(){
    console.log('upd')
  },
  errorCaptured(errObj,component, place){
    console.log(errObj,component, place,'sss')
  },
  methods: {
    goLine(){
      this.$router.push({name:'line',params:{m:'1111',n:'ddd'}})
    },
    createRed(color,num,n) {
      // let red = document.getElementById(color)
      // this[gather+'_'+color]
      // let gather = []
      this['gather'+'_'+color] = []
      for(let i=0;i<num;i++) {
        let m = Math.floor(Math.random()*(num+1))+1
        if(this['gather'+'_'+color].indexOf(m) == -1) {
          if(m<10) {
            m = 0 + "" +m
          }
          this['gather'+'_'+color].push(m)
        }
      }
      this['gather'+'_'+color] = this['gather'+'_'+color].slice(0,n)
      this['gather'+'_'+color].sort((a,b)=>{
        return a-b
      })
      // this[gather+'_'+color].forEach((item)=>{
      //   let li = document.createElement('li')
      //   li.innerHTML = item
      //   red.appendChild(li)
      // })
    },
    sort() {
      let arr = this.arr
      arr.sort((a,b)=>{
        console.log(a,'a',b,'b')
        return a-b
      })
      console.log(arr,'arr')
    },
    bubbling() { //冒泡
      let arr = this.arr
      // 挨个比较  只要大就换位置
      for(let i = 0; i<arr.length-1;i++) {
        for(let j = i+1;j<arr.length;j++){
          if(arr[i] > arr[j]) {
            let m = arr[i]
            arr[i] = arr[j]
            arr[j] = m
          }
        }
      }
       console.log(arr,'arr1')
    },
    choosing() {
      let arr = this.arr
       for(let i = 0; i<arr.length-1;i++) {
         let k = i //我们假定第k个是最小的
        for(let j = i+1;j<arr.length;j++){
          if(arr[k] > arr[j]) {
            k = j
          }
        }
        if(k!==i) {
          let m = arr[i]
          arr[i] = arr[k]
          arr[k] = m
        }
      }
      console.log(arr,'arr2')
    },
    cutRepeat() {
      let arr = this.repeatArr
      //利用es6的set集合
      // arr = [...new Set([...arr])]
      // console.log(arr,'repe1')
      // 循环比较相同的切除
      // for(let i = 0; i<arr.length-1;i++) {
      //   for(let j = i+1; j<arr.length;j++){
      //     if(arr[i] === arr[j]) {
      //       arr.splice(j,1)
      //       j--
      //     }
      //   }
      // }
      // let empty = []
      // for(let i = 0; i < arr.length; i++){
      //   if(empty.indexOf(arr[i])==-1) {
      //     empty.push(arr[i])
      //   }
      // }
      // arr = empty
      // let obj = {}
      // let empty = []
      // for(let i = 0;i<arr.length;i++) {
      //   let type = typeof arr[i]
      //     if(!obj[arr[i]] || obj[arr[i]] !==type) {
      //       obj[arr[i]] = type
      //       empty.push(arr[i])
      //     }
          
      // }
      // arr= empty
     
      console.log(arr,'repe1')

    }
  }
}
</script>

<style lang="less" scoped>
  // .center {
  //   width: 400px;
  //   // height:100px;
  //   // margin-right:20px;
  //   // display: inline-block;
  //    border:1px solid #ccc;
  //  background-color: green;
  //   // overflow: hidden;
  //   // float: left;
  //   position: absolute;
  //   .inner1 {
  //     float: left;
  //     width: 180px;
  //     height:100px;
   
       
  //   }
  //     .inner2{
  //     float: right;
  //     width: 200px;
  //     height:100px;
     
       
  //   }
  // }
  //  .right {
  //   width: 600px;
  //   height:300px;
  //   // border:1px solid #ccc;
  // background-color: gray;
  //  overflow: hidden;
  // .inner {
  //     width: 400px;
  //     height:100px;
  //     margin-top: 100px;
  //     background-color: gray;
      
  //   }
  // }
  input {
      margin:10px;
      padding: 5px;

    }
    .red {
      /* background-color: red; */
      background-image: linear-gradient(to right, blue ,orange, red);
      color: white;
    }
    .blue {
      /* background-color: blue; */
      background-image: linear-gradient(to right, red ,orange, blue);
      color: white;
    }
    ul{
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
    }
    li {
      margin: 10px;
      padding: 5px;
      border-radius: 50%;
    }
    #red li {
      color:red;
      border: 2px solid red;

    }
    #blue li {
      color:blue;
      border: 2px solid blue;
    }
    div{
      width: 400px;
      height:200px;
      border-left: 2px solid orange;
      border-top: 2px solid green;
      border-right: 2px solid red;
      border-bottom: 2px solid blue;
      margin: 0 auto;
    }
    h2{
      width: 300px;
      margin: 0 auto;
      background-image: linear-gradient(to right, blue ,orange, red);
      -webkit-background-clip: text;
      color:transparent
    }
</style>

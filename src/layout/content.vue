<template>
  <div class="content">
    <div class="header">
      <div  class="model_menu">
      <button @click="changeModel">收缩</button>
      <span>{{currentPath1}}</span>
      <span>{{currentPath2}}</span>
      </div>
      <button @click="reload">reload</button>
    </div>
    <div class="tabs">
      <div v-for="(tab,index) in tabs" :key="tab.name">
        <span class="tab"   @click="go(tab)">{{tab.meta.title}}</span>
        <span class="close"  @click="reduce(index,tab)">关闭</span>
      </div>
    </div>
    <div class="app_view">
      <app-View :isRouterAlive="isRouterAlive"></app-View>
    </div>
  </div>
</template>

<script>
import appView from './appview'
import { mapMutations, mapState } from 'vuex'
export default {
  data(){
    return {
      isRouterAlive: true,
      tabs: []
    }
  },
  provide (){
     return {
       reload: this.reload
     }
  },
  watch: {
    $route(n) {
      let flag = this.tabs.every(item=>{
        return item.name!== n.name
      })
      if(flag) {
        this.tabs.push(n)
      }
    },
  },
  components: {
    appView
  },
  computed: {
    ...mapState({
      currentPath1: state => state.frame.currentPath1,
      currentPath2: state => state.frame.currentPath2,
    })
  },
  methods: {
    ...mapMutations({ 
      changeOpenSide: 'changeOpenSide'
    }),
    changeModel() {
      this.changeOpenSide()
    },
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    },
    reduce(index) {
      if(index==0) {
        this.$message.warning('首页不能关闭');
        return 
      }
      this.tabs[index].meta.reload=true
      this.go(this.tabs[index])
      this.tabs.splice(index,1)
      let length = this.tabs.length
      if(this.tabs[length-1].name !== this.$route.name) {
        this.$router.push(this.tabs[length-1].fullPath)
      }
    },
    go(tab) {
      if(this.$route.name == tab.name ) {
        return
      }
      this.$router.push(tab.fullPath)
    }
   
  },
  created() {
    this.tabs.push({
      fullPath: "/home",
      path: "/home",
      name:'home',
      meta: {
        icon: 'iconfont icon-fangzilengjiao',
        title: '首页',
      }
    })
    let flag = this.tabs.every(item=>{
        return item.name!== this.$route.name
      })
      if(flag) {
        this.tabs.push(this.$route)
      }
  }

}
</script>

<style lang="less">
  .content {
    flex:1;
    height:100%;
    position: relative;
    overflow: hidden;
    /* display: flex;
    flex-direction: column; */
    background: white;
    .header{
      width: 100%;
      padding: 10px 0;
      background-color: red;
      position: relative;
      overflow: hidden;
      .model_menu {
        float: left;
        height:20px;

      }
    }
    .app_view {
      width: 100%;
      flex: 1;
      overflow-y: auto;
      //height: calc(100vh - 67px);
    }
    .tabs{
      display: flex;
      div{
        padding:0px 10px;
        border:1px solid red;
        .tab{
          color:black;
        }
        .close{
          color:pink
        }
      }
    }
  }
</style>
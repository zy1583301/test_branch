<template>
  <div class="left-side" :style="{width: leftWidth}">
    <div class="side">
    <ul class="menuBox">
      <li v-for="(item,index) in rous" :key="item.path" class="menu">
        <div v-if="item.children.length > 1" class="menuSon"  @mousemove="appear(index,$event)" @mouseout="noApper">
          <div @click="changeFlag(index)" class="menu_one">
            <i :class="item.icon"></i>
            {{item.name}}
          </div>
          <ul v-if="checkOpen(index)" class="menu_two_expand">
            <li v-for="(chil) in item.children" :key="chil.path">
              <router-link :to="item.path+'/'+chil.path">
                <i :class="chil.meta.icon"></i>
                {{chil.meta.title}}
              </router-link>
            </li>
          </ul>
          <ul v-show="index==hoverIndex && !isExpand" class="menu_two_expand_hover" :style="{top: top}">
            <li v-for="(chil) in item.children" :key="chil.path">
              <router-link :to="item.path+'/'+chil.path">
                <i :class="chil.meta.icon"></i>
                {{chil.meta.title}}
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else  class="menuSon"  @mousemove="appear(index,$event)" @mouseout="noApper">
          <ul class="menu_two_noexpand" >
            <li v-for="(chil) in item.children" :key="chil.path" class="menu_one1">
              <router-link :to="item.path+'/'+chil.path">
                <i :class="item.icon"></i>
                {{chil.meta.title}}
              </router-link>
              </li>
          </ul>
          <ul v-show="index==hoverIndex && !isExpand" class="menu_two_expand_hover" :style="{top: top}">
            <li v-for="(chil) in item.children" :key="chil.path">
              <router-link :to="item.path+'/'+chil.path">
                <i :class="chil.meta.icon"></i>
                {{chil.meta.title}}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <!-- <li><router-link to="line">line</router-link></li> -->
    </ul>
  </div>
  </div>
</template>

<script>
import { consutomRoutes } from '@/router'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      rous: consutomRoutes,
      flag: null,
      openGather: [],
      hoverIndex: -1,
      y: 0,
      top: ''
    }
  },
  computed: {
    ...mapState({
      width: state => { return state.frame.width },
      isExpand: state => { return state.frame.isExpand }
    }),
    leftWidth() {
      return this.width + 'px'
    },
    // style() {
    //   return {
    //     top: this.y + 'px'
    //   }
    // }
  },
  watch: {
    isExpand(newFlag) {
      if(!newFlag) {
        this.openGather = []
      }
    }
  },
  methods:{
    changeFlag(index) {
      if(!this.isExpand) {
        return
      }
      if(this.checkOpen(index)) {
        let i = this.openGather.indexOf(index)
        this.openGather.splice(i,1)
      } else {
        this.openGather.push(index)
      }
    },
    checkOpen(index) {
      if(this.openGather.indexOf(index) !== -1) {
        return true
      } else {
        false
      }
    },
    appear(index,$event) {
      // console.log(index,$event,'eeee')
      if(this.isExpand) {
        return false
      }
      // this.y = $event.clientY
     
      this.hoverIndex = index
      this.$nextTick(()=>{
        this.top = (index)*40+ 'px'
        // console.log(this.top,';wwww')
      })
    },
    noApper() {
      if(this.isExpand) {
        return false
      }
      this.hoverIndex = -1
    },
    testPath(path) {
      /^(https?:|mailto:|tel:)/.test(path)
    }
  },
  created(){
  }
}
</script>

<style lang="less" scoped>
  .left-side {
    /* width:200px; */
    height:100%;
    /* padding-top: 40px; */
    position: relative;
    border-right: 1px solid gray ;
    background-color: #3d424d;
    transition: all 0.4s ease;
    /* overflow: hidden; */
    color: white;
    font-size: 16px;
    white-space:nowrap;
    .side{
      position: absolute;
      left:0;
      top:0;
      right: -10px;
      bottom: 0;
      height:100%;
      overflow-y: auto;
      
      /* overflow: hidden; */
    }
    .menuBox{
      height:100%;
      /* overflow: auto; */
      background-color: rgb(48, 65, 86);
      .menu {
        background-color: rgb(48, 65, 86);
        position: relative;
        .menuSon{

          .menu_two_expand_hover{
           
            background-color: rgb(48, 65, 86);
            position: fixed;
            /* position: absolute; */
            top:0;
            padding-left: 5px;
            left:40px;
            /* width: 200px; */
            z-index: 20000;
            li:hover  {
              background-color: rgb(38, 52, 69);
            }
          }
         
        }
       
        div{
          line-height: 40px;
          background-color: rgb(48, 65, 86);
          text-align: left;
        }
        .menu_one {
          padding-left: 20px;
          overflow: hidden;
        }
        .menu_one1 {
          overflow: hidden;
        }
        .menu_two_noexpand li a{
          padding-left: 20px;
        }
        .menu_two_expand li a{
          padding-left: 40px;
        }
        .menu_two_expand_hover li:hover .menu_two_expand li:hover,.menu_two_noexpand li:hover, .menu_one:hover {
          background-color: rgb(38, 52, 69);
        }
        a{
          line-height: 40px;
          color: white;
          font-size: 16px;
          display: inline-block;
          width: 100%;
        }
        .router-link-active {
          color: orange
        }
      }
    }
  }
</style>

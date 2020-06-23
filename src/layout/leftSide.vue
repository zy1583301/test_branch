<template>
  <div class="left-side" :style="{width: leftWidth}">
    <ul class="menuBox">
      <li v-for="(item,index) in rous" :key="item.path" class="menu">
        <div v-if="item.children.length > 1" class="menuSon"  @mousemove="appear(index)" @mouseout="noApper">
          <div @click="changeFlag(index)" class="menu_one">
            <i :class="item.icon"></i>
            {{item.name}}
          </div>
          <ul v-if="checkOpen(index)" class="menu_two_expand">
            <li v-for="(chil) in item.children" :key="chil.path">
              <router-link :to="chil.path">
                <i :class="chil.meta.icon"></i>
                {{chil.meta.title}}
              </router-link>
            </li>
          </ul>
          <ul v-show="index==hoverIndex && !isExpand" class="menu_two_expand_hover">
            <li v-for="(chil) in item.children" :key="chil.path">
              <router-link :to="chil.path">
                <i :class="chil.meta.icon"></i>
                {{chil.meta.title}}
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else  class="menuSon">
          <ul class="menu_two_noexpand">
            <li v-for="(chil) in item.children" :key="chil.path" class="menu_one1">
              <router-link :to="chil.path">
                <i :class="item.icon"></i>
                {{chil.meta.title}}
              </router-link>
              </li>
          </ul>
        </div>
      </li>
      <!-- <li><router-link to="line">line</router-link></li> -->
    </ul>
  </div>
</template>

<script>
import { consutomRoutes } from '@/router'
import { mapState } from 'vuex'
console.log(consutomRoutes,'consutomRoutes')
export default {
  data(){
    return {
      rous: consutomRoutes,
      flag: null,
      openGather: [],
      hoverIndex: -1
    }
  },
  computed: {
    ...mapState({
      width: state => { return state.width },
      isExpand: state => { return state.isExpand }
    }),
    leftWidth() {
      return this.width + 'px'
    }
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
    appear(index) {
      if(this.isExpand) {
        return false
      }
      this.hoverIndex = index
    },
    noApper() {
      if(this.isExpand) {
        return false
      }
      this.hoverIndex = -1
    }
  },
  created(){
    console.log(this.rous,'rous')
  }
}
</script>

<style lang="less" scoped>
  .left-side {
    width:200px;
    height:100%;
    border-right: 1px solid gray ;
    background-color: #3d424d;
    transition: all 0.4s ease;
    // overflow: hidden;
    color: white;
    font-size: 16px;
    white-space:nowrap;
    .menuBox{
      background-color: rgb(48, 65, 86);
      .menu {
        background-color: rgb(48, 65, 86);
        .menuSon{
          position: relative;
          .menu_two_expand_hover{
            background-color: rgb(48, 65, 86);
            position: absolute;
            top:0;
            left:40px;
            z-index: 200;
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
        .menu_two_expand li:hover,.menu_two_noexpand li:hover, .menu_one:hover {
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

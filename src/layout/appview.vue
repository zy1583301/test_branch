<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-09-23 14:08:17
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-25 17:42:01
-->
<template>
  <div class="view">
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <keep-alive :include="include">
      <router-view ></router-view>
  </keep-alive>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  props:['isRouterAlive'],
  computed:{
    ...mapState({
      include: state=>state.frame.include,
      flag: state=>state.frame.flag
    })
  },
  watch:{
    // $route(n) {
    //   console.log(n,'appviewwatch',this.$vnode)
    // }
  },
  methods:{
    
  },
  created() {
    // console.log(this.$vnode,'c')
  }
}
</script>

<style >
  .view {
    flex:1;
    height:100%;
    overflow: auto;
    height: calc(100vh - 67);
  }
</style>
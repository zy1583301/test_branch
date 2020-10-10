<template>
  <div class="view">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  props:['isRouterAlive'],
  computed:{
    ...mapState(['include','flag'])
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

<style lang="less">
  .view {
    flex:1;
    height:100%;
    overflow: auto;
  }
</style>
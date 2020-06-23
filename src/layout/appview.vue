<template>
  <div class="view">
    <keep-alive include="line">
    <router-view></router-view>
    </keep-alive>
    <!-- <keep-alive> -->
    <!-- <router-view v-if="$route.meta.keep"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keep"></router-view> -->
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
  .view {
    flex:1;
    height:100%;
  }
</style>
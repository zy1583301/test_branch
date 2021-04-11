<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-09-23 14:08:17
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-10 18:18:06
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted() {
    // 开启埋点
    // this.$sensors.init();
    // this.$sensors.quick(); //用于采集 $pageview 事件。
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
  width:100%;
}
</style>

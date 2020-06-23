<template>
  <div class="app-content">
    <left-side></left-side>
    <app-view></app-view>
  </div>
</template>

<script>
import leftSide from './leftSide'
import appView from './content'
export default {
  data(){
    return {

    }
  },
  components: {
    appView,
    leftSide
  }
}
</script>

<style lang="less">
 .app-content {
   width: 100%;
   height:100%;
   overflow-y: auto;
   display: flex;
 }
</style>
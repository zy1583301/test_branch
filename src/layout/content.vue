<template>
  <div class="view">
    <div class="header">
      <div  class="model_menu">
      <button @click="changeModel">收缩</button>
      <span>{{currentPath1}}</span>
      <span>{{currentPath2}}</span>
      </div>
    </div>
    <div class="app_view">
      <app-View></app-View>
    </div>
  </div>
</template>

<script>
import appView from './appview'
import { mapMutations, mapState } from 'vuex'
export default {
  data(){
    return {

    }
  },
  components: {
    appView
  },
  computed: {
    ...mapState({
      currentPath1: state => state.currentPath1,
      currentPath2: state => state.currentPath2,
    })
  },
  methods: {
    ...mapMutations({ 
      changeOpenSide: 'changeOpenSide'
    }),
    changeModel() {
      this.changeOpenSide()
    }
  }

}
</script>

<style lang="less">
  .view {
    flex:1;
    height:100%;
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
    }
  }
</style>
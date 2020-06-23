<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <TreeSelect></TreeSelect> -->
    <router-view />
  </div>
</template>

<script>
// // import HelloWorld from './components/HelloWorld.vue'
// import TreeSelect from './views/tree_select'
// import Select from './views/select'
export default {
  name: 'App',
  components: {
  //  TreeSelect,
  //  Select
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

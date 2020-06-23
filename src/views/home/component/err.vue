<template>
  <div>
    <div v-html="a"></div>
  </div>
</template>

<script>
export default {
  name:'err',
  data(){
    return {
      a: '<div>s我是自定义de盒子</p>',
 
    }
  },
    errorCaptured(errObj,component, place){
    console.log(errObj,component, place,'ssswss')
  },
}
</script>
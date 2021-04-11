<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 15:08:57
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-26 11:51:52
-->
<template>
    <div ref="target"  @drop="drop" @dragover="ondragover" class="target">
        <Render :option="page"></Render>
    </div>
</template>

<script>
    import Render from '@/components/Render'
    import {mapState,mapGetters, mapMutations} from 'vuex'
    // import 
export default {
components:{Render},
computed:{
    ...mapGetters(["page"])
},
watch:{
    page(n) {
        console.log(n,'-----------------')
    }
},
methods: {
    ...mapMutations(['pushView']),
    drop(e) {
        event.preventDefault();
        event.stopPropagation();
        let data = event.dataTransfer.getData("dragInfo");
        // 获取当前拖拽的组件的信息  应该利用vuex将数据存起来 
        this.pushView({key: '000',data: JSON.parse(data)})
        console.log(JSON.parse(data),'JSON.parse(data)')
    },
    ondragover() {
      event.preventDefault();
    },
}
}
</script>

<style lang="less">
 .target {
    /* width: 500px; */
    height: 100%;
 }
</style>
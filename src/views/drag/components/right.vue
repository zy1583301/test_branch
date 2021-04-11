<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 15:09:07
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-30 14:04:57
-->
<template>
    <div class="origin">
        <div>
            <strong>拖拽组件</strong>
        </div>
        <a-list borderd>
            <a-list-item v-for="(item,i) in config" :key="i">
            <div style="width:100%;" @dragstart="ondragstart(item)" draggable="true">
                <Render :option="item" />
            </div>
            </a-list-item>
        </a-list>
    </div>

</template>

<script>
    import Render from '@/components/Render'
    import commonConfig from '@/viewsConfig/common'
    import iViewConfig from '@/viewsConfig/iViews/index'
    console.log(commonConfig,iViewConfig)
export default {
components:{Render},
data() {
    let obj = {
        ...iViewConfig,
        ...commonConfig,

    }
    return {
        config: obj
    }
},
watch: {
    config(n) {
        console.log(n,'>>>>>>>>>>>>>')
    }
},
methods: {
    ondragstart(item) {
        event.dataTransfer.setData("dragInfo", JSON.stringify(item));
        console.log(item,'t')
    }
   
}
}
</script>


<style lang="less">
    .origin {
        width: 200px;
        height: 100%;
        border-left: 1px solid #ccc;
    }
</style>
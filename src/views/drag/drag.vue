<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 11:52:03
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-26 10:34:12
-->
<template>
<div class='drag'>
    <div class="left">
        <Left></Left>
    </div>
    <div class="center">
        <Center1></Center1>
    </div>
    <div class="right" >
        <Right></Right>
    </div>
</div>
</template>

<script>
    import Left from './components/left'
    import Right from './components/right'
    import Center1 from './components/center'
export default {
    components:{Left,Right,Center1},
    methods:{

    
    }
}

</script>

<style lang="less">
.drag{
    width: 100%;
    height: 100%;
    display: flex;
    border-top: 1px solid #ccc ;
    .center{
        flex: 1
    }
}

</style>

<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 14:29:52
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-26 11:53:18
-->
<template>
  <component :is="option.name" :id="option.key"  v-bind="vbind" @click="onclick">
    <template v-if="option.slot && option.slot.text">{{ option.slot.text || '' }}</template>
    <template v-if="option.slot && option.slot.children">
      <template v-for="child in option.slot.children">
        <component is="Render" :option="child" @drop.native="ondrop(child)"></component>
      </template>
    </template>
  </component>
</template>

<script>
// import Emitter from "@/mixins/emitter";
import { mapMutations } from "vuex";

export default {
  name: "Render",
  // mixins: [Emitter],
  inject: [], // 多层父级组件传输过来的属性 todo
  props: {
    option: Object
  },
  watch: {
    option(n) {
      console.log(n,'nnnn====>')
    }
  },
  computed: {
    vbind() {
    
      const props = this.option.props;
      console.log(props,'props')
      let bindProps = {};
      for (const key in props) {
        const val = props[key];
        const isOwn = props.hasOwnProperty(key);
        const isBool = val.type === "boolean";
        const isCurrent = val.current !== false;
        if (isOwn && (isBool || (!isBool && isCurrent))) {
          bindProps[key] = val.current;
        }
      }
      console.log(bindProps,'bind')
      return bindProps;
    }
  },
  methods: {
    ...mapMutations(["setCurrentView"]),
    ondrop(child) {
      event.preventDefault();
      event.stopPropagation();
      let data = event.dataTransfer.getData("dragInfo");
      // this.dispatch("Control", "putChild", {
      //   key: child.key,
      //   data: JSON.parse(data)
      // });
    },
    onclick() {
      event.stopPropagation();
      this.setCurrentView(this.option);
    }
  }
};
</script>

<style>
</style>
<template>
    <VueDraggableResizable :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
        <slot></slot>
    </VueDraggableResizable>

</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
    data: function () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
    components:{
        VueDraggableResizable
    },
    methods: {
        onResize: function (x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
        },
        onDrag: function (x, y) {
        this.x = x
        this.y = y
        }
    }
}
</script>

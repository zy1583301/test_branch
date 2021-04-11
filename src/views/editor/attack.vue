<template>
  <div class="attack1" style="height: 400px;position: relative;" >
    <div style="border-bottom:1px solid black;" :style="{ height: computedHeight + 'px' }" ></div>
    <VueDraggableResizable  :handles="['tm']" :parent="parent" @dragging="onDrag"  :w="300" :h="height" :y="y" drag-handle=".terminalTab">
    <div class="attack" ref="terminalBox">
      <div style="height:30px;border:1px solid green;cursor: n-resize;" class="terminalTab">111</div>
      <div :style="{ height: terminalClientHeight + 'px' }">
      
      </div>   
    </div>
    </VueDraggableResizable>
</div>
</template>

<script>
  //import VueDraggableResizable from 'vue-draggable-resizable'
  import VueDraggableResizable from '../components/vueDraggableResizable1/components/vue-draggable-resizable'
  import TestSlot from './components/slot'
    export default {
      components: {TestSlot,VueDraggableResizable},
      data() {
        return {
          width: 100,
          height: 30,
          y: 30,
        parent: true,
          flag:false,
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          parentEl: null,
          terminalClientHeight: null,
          //computedHeight: null,
        }
      },
      computed: {
        computedHeight() {
          if(this.parentEl) {
            console.log(this.parentEl.offsetHeight - this.terminalClientHeight,'helle')
            return this.parentEl.offsetHeight - this.terminalClientHeight-30
          }
          
          
        }
      },
      mounted() {
        
      
        this.parentEl = document.getElementsByClassName('dev')[0]
        console.log(this.parentEl, this.$refs,'this.parentEl')
        
        const that = this
        window.onresize = () => {
          // if (that.activeStep === 0) {
            that.width = that.parentEl.offsetWidth
          //}
        }
      this.computerWindowSize()
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        // onDrag: function (x, y) {
        // this.x = x
        // this.y = y
        // },
        onDrag: function (x, y) {
          console.log('111')
        this.computedTerminalHeight(y)
      },
      computerWindowSize() {
        this.width = this.parentEl.offsetWidth
        // 初次机选一次Y，为了下方活动区域有初始高度
        this.y = this.parentEl.offsetHeight- 150 - this.height
        console.log(this.y,this.height,this.parentEl.offsetHeight,'1111=0--')
        this.$refs.terminalBox.style.height = this.parentEl.offsetHeight + 'px'
        this.computedTerminalHeight(this.y)
      },
      computedTerminalHeight(y) {
        //           400                        315  30
        console.log(this.parentEl.offsetHeight,y,this.height,'---')
        //this.$refs.terminalBox.style.height = this.parentEl.offsetHeight - y - this.height + 'px'
        this.terminalClientHeight = this.parentEl.offsetHeight - this.height -y
       
        console.log(this.terminalClientHeight,'this.terminalClientHeight')

        // this.computedHeight = this.parentEl.offsetHeight - this.terminalClientHeight-30
        // this.$store.commit('edit/setState', {
        //   key: 'terminalClientHeight',
        //   value: this.parentEl.offsetHeight - y - this.height
        // })
      },
        onResize: function (x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
        },
      }
    }
  </script>
<style>
.vdr {
  /* position:absolute;
  width:100px */
}
.handle {
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  background: #EEE;
  border: 1px solid #333;
  display: none!important
}
.handle-tm {
  top: -10px;
  left: 50%;
  margin-left: -5px;
  cursor: n-resize;
  display: none!important
}
</style>
<style lang='less' scoped>
  .attck1 {
    //margin-top:200px;
    //width:100px;
    position: relative;
  }
  .btn{
    background-color: lawngreen;
  }
</style>
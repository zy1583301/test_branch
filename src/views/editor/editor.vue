<template>
  <div>
    <el-button type="success" @click="getValue">获取</el-button>
   <el-button @click="openInNew">在新窗口打开</el-button>
    <el-button type="success" @click="format">格式化</el-button>
    <el-button type="success" @click="setValue">设置</el-button>
      <div ref="container" class="monaco-editor" :style="`height: ${editHeight}px`"></div>
  </div>
  
</template>

<script>
  import Editor from '@/views/components/edit/loader'
  import { mapGetters } from 'vuex'
  export default {
    name: "",
    data() {
      return {
        parentEl: null,
        // editHeight: 100
      }
    },
    mounted() {
      // this.parentEl = document.getElementsByClassName('taskDev')[0]

      this.init()
    },
    beforeDestroy(){
    },
    computed: {
      ...mapGetters([
        'monacoEditor',
      ]),
      editHeight() {
        return 500
        // if (this.parentEl) {
        //   return this.parentEl.offsetHeight - this.terminalClientHeight - 70
        // }
      }
    },
    watch: {
      // terminalClientHeight(val) {
      //   // val + 30
      //   // this.editHeight = (this.parentEl.offsetHeight  - 50) * 0.6
      //   this.editHeight = this.parentEl.offsetHeight - val - 70
      // }
    },
    methods: {
      init() {
        // this.editHeight = (this.parentEl.offsetHeight  - 50) * 0.6
        if (this.monacoEditor) {
          this.monacoEditor.distroy();
          this.$store.commit('editor/setState', {key: 'monacoEditor', value: null})
        }
        this.$refs.container.innerHTML = "";
        let monacoEditor = new Editor(this.$refs.container, {
          value: '',
          roundedSelection: false, // 右侧不显示编辑器预览框
          autoIndent: true,
          readOnly: false, // 是否可编辑
          language: 'hql', // 语言类型
          fontSize: 14,
          theme: 'GitHub', // 编辑器主题
          wordWrap: 'off', //自动换行，注意大小写
          wrappingIndent: 'indent',
          minimap: {
            enabled: true
          },
          contextmenu:true
        })
        console.log('monacoEditormonacoEditor',monacoEditor)
        monacoEditor.setValue('')
        this.$store.commit('editor/setState', {key: 'monacoEditor', value: monacoEditor})
      },
      getValue() {
        console.log(this.monacoEditor,'monacoEditor')
        let a = this.monacoEditor.getValue()
        console.log(a,'aaaa')
      },
      format() {
        this.monacoEditor.formatCode()
      },
      setValue() {
        this.monacoEditor.setValue('select * from table1')
      },
      openInNew() {
        window.open(location.href)
      }
    }
  }
</script>

<style>
  .monaco-editor {
    /*height: calc(100% - 120px);*/
    text-align: left;
    margin-top: 3px;
    /*flex: 1;*/
  }
  .vdr {
    border: none;
  }
  .glyphMarginClass {
    background-color: red;
  }
</style>

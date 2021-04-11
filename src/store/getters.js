/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 14:51:22
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-25 17:34:05
 */
const getters = {
   page(state) {
     console.log(state.drag.pages[state.drag.currentPage],'state.drag.pages[state.drag.pages.currentPage]')
     return state.drag.pages[state.drag.currentPage]
   },
   checkedNodes: state => state.tree.checkedNodes,
   checkedItems: state => state.tree.checkedItems,
   roles: state => state.tree.roles,
   monacoEditor: state => state.editor.monacoEditor,
   bufferData: state => state.editor.bufferData
}
  export default getters
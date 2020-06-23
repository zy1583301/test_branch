import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
 state:{
   width: 200,
   currentPath1: 'Home',
   currentPath2: '',
   closeHover: '',
   isExpand: true
 },
 mutations: {
   changeOpenSide(state) {
     console.log(state.width)
      state.isExpand = !state.isExpand
      if(state.isExpand) {
        state.width = 200
        state.closeHover = ""
      } else {
        state.width = 40
        state.closeHover = "closeHover"
      }
      
   },
   changeCurrentPath(state, currentPath){
     state.currentPath2 = currentPath
   }
 }
 
})

export default store
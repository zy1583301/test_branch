/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 14:46:08
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-25 14:47:03
 */
export default {

state:{
    width: 200,
    currentPath1: 'Home',
    currentPath2: '',
    closeHover: '',
    isExpand: true,
    cachePageName:'',
    include:['line','file','home','pie'],
    flag:true
  },
  mutations: {
    reduceInclude(state,flag) {
     // state.include.unshift(0)
     console.log(flag,'flagsssssssss')
     // state.flag = false
     state.flag = flag
    },
    addInclude(state) {
     // state.include.unshift('line')
     state.flag = !state.flag
    },
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
    },
    //重置缓存组件名称
    resetcachePageName(state, res){
     state.cachePageName = res;
 },
 //添加缓存组件名称
 addcachePageName(state, res){
   if(state.cachePageName == ''){
       state.cachePageName = res;
   }else{
       let arr = state.cachePageName.split(',');
       if (res && typeof res === 'string') {
           let i = arr.indexOf(res);
           if (i <= -1) {
               state.cachePageName = state.cachePageName+','+res;
           }
       }
   }
 },
 //删除缓存组件名称
 delcachePageName(state, res){
   let arr = state.cachePageName.split(',');
   if (res && typeof res === 'string') {
     let i = arr.indexOf(res);
     if (i > -1) {
         arr.splice(i, 1);
         state.cachePageName = arr.join();
     }
   }
 }
  }
}
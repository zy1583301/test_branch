import router from './router'
import store from './store'
// import {addRouter} from './utils/addRouter'
router.beforeEach((to,from,next)=>{
  console.log('this',this)
  document.title = to.meta.title
  // addRouter()
  let name
  if(to.path !== '/home') {
    name =  '/' + to.name
  } else {
    name = ""
  }
  
  store.commit('changeCurrentPath', name)
  // if(from.name == 'line') {
  //   console.log('permissionline')
  //   from.meta.keep = true
  // }
  next()

})

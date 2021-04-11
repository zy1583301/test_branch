
import router from './router'
import store from './store'
// import {addRouter} from './utils/addRouter'

router.beforeEach((to,from,next)=>{
  document.title = to.meta.title
  let name
  if(to.path !== '/home') {
    name =  '/' + to.name
  } else {
    name = ""
  }
  store.commit('changeCurrentPath', name)
  next()
})

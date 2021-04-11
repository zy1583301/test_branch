import copy from './vcopy'
import dir1 from './bg'
// 自定义指令
const directives = {
  copy,dir1
}
// 这种写法可以批量注册指令
export default {
  install (Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
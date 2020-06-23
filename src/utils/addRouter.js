// import Vue from 'vue'

export function addRouter() {

  const modulesFiles = require.context('@/views', true, /\.vue$/)


const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

  for(let attr in modules) {
    console.log(attr,modules[attr])
    
  }

}

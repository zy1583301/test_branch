/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 15:07:13
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-25 15:27:04
 */
let views = {}

const files = require.context('./', true, /\.js$/)
files.keys().forEach(key => {
    if (key === './index.js') return

    const name = key.replace(/\.\/|\.js/g, '')
    views[name] = files(key).default
})
console.log(views,'viwen')
export default views
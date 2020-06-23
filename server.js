const express = require('express') //引入express,用于开启服务器
const app = express()
const cors = require('cors')
const path = require('path') // 引入path 对路径进行操作
const  bodyParser = require('body-parser') // 引入它是为了解析post过来的数据
const music = require('./router/music')
const file = require('./router/file')
app.use(bodyParser.urlencoded({ extended: false }))  //解析表单格式
app.use(bodyParser.json()) //解析json 数据格式
app.use('/public',express.static(path.join(__dirname,'./public')))
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(cors())
app.use('/item',music)
app.use('/file',file)
app.listen(4000,()=>{
    console.log(`/**
    *
    * ━━━━━━神兽出没━━━━━━
    * 　　 ┏┓     ┏┓
    * 　　┏┛┻━━━━━┛┻┓
    * 　　┃　　　　　 ┃
    * 　　┃　　━　　　┃
    * 　　┃　┳┛　┗┳  ┃
    * 　　┃　　　　　 ┃
    * 　　┃　　┻　　　┃
    * 　　┃　　　　　 ┃
    * 　　┗━┓　　　┏━┛　Code is far away from bug with the animal protecting
    * 　　　 ┃　　　┃    神兽保佑,代码无bug
    * 　　　　┃　　　┃
    * 　　　　┃　　　┗━━━┓
    * 　　　　┃　　　　　　┣┓
    * 　　　　┃　　　　　　┏┛
    * 　　　　┗┓┓┏━┳┓┏┛
    * 　　　　 ┃┫┫ ┃┫┫
    * 　　　　 ┗┻┛ ┗┻┛
    *
    * ━━━━━━感觉萌萌哒━━━━━━
    */`)
  })
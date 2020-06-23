const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const multer=require('multer')

// 获取formData内容
router.post('/upload',multer({dest: 'uploads'}).single('file'),(req,res)=>{
    // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    let file = req.file;
    let fileInfo = {};
    let Year=new Date().getFullYear();  //年份
    let Month=new Date().getMonth();  //月份
    let Day=new Date().getDay();  //天
    let Hours=new Date().getHours();  //小时
    let Minutes=new Date().getMinutes();  //分钟
    let Seconds=new Date().getSeconds();   //秒数
    let Milliseconds=new Date().getMilliseconds();//毫秒
    let time=`${Year}-${Month}-${Day}-${Hours}-${Minutes}-${Seconds}-${Milliseconds}`;
    let exts=file.originalname.split('.');
    let ext=exts[exts.length-1];
    fs.renameSync('./uploads/' + file.filename, './uploads/' + time+'.'+ext);  //可以根据喜爱命名方式，更改文件名称
    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = '/uploads/' + time+'.'+ext;
    // 设置响应类型及编码
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });
    res.json({
      sum:fileInfo
    });
})
router.post('/download',function(req,res){
    let pathUrl = req.body.path
    pathUrl = '.' + pathUrl
   let filePath = path.resolve(pathUrl);  // 如果是本地文件
   let data = fs.readFileSync(filePath);
   let bufferData = new Buffer(data,'base64'); 
   res.send({data: bufferData})
});

module.exports = router


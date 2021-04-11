/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-10-14 14:47:18
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-19 16:25:33
 */
import request from '@/utils/request'



export function getFileList(data) {
    return request({
        url:'/file/getFileList',
        method: 'get',
        data: data
    })
}

export function uploadFile(data) {
    return request({
        url:'/file/upload',
        method: 'post',
        data,
        onUploadProgress (progress) {
            console.log(Math.round(progress.loaded / progress.total * 100) + '%','sss');
        }
    })
}

export function fileUpload(fileobj){
    let param = new FormData();
    // 上传文件对象 名称file与后台控制器参数要一致
    param.append('file',fileobj.raw);
    console.log(param.get('file'),'fileee')
    return request({
        method: 'post',
        // 上传地址
        url: '/file/upload',
        // 定义上传头
        headers: {'Content-Type':'multipart/form-data'},
        data: param,
        onUploadProgress (progress) {
            console.log(Math.round(progress.loaded / progress.total * 100) + '%','sss');
        }
      });
}


export function filesUpload(fileArr){
    console.log(fileArr,'arr')
    let param = new FormData();
    // 上传文件对象 名称file与后台控制器参数要一致
    fileArr.forEach(fileObj => {
        console.log(fileObj,'fileObj')
        param.append('files',fileObj.raw);
    });

    console.log(param.get('file'),'fileee')
    return request({
        method: 'post',
        // 上传地址
        url: '/file/uploads',
        // 定义上传头
        headers: {'Content-Type':'multipart/form-data'},
        data: param,
        onUploadProgress (progress) {
            console.log(Math.round(progress.loaded / progress.total * 100) + '%','sss');
        }
      });
}

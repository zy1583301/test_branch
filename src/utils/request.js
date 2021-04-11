/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-09-29 10:51:15
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-19 14:31:16
 */
import {message} from 'ant-design-vue'
console.log(message,'sss')
console.log(process.env.VUE_APP_BASE_API,'process.env.VUE_APP_BASE_API')

import axios from 'axios'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 * 5 // request timeout
  })

  service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  // response interceptor
  service.interceptors.response.use(
    response => {
      const res = response.data
      if (response.status !== 200) {
        return Promise.reject(new Error(res.message || 'Error'))

      } else {
        
        return res // 正常返回
      }
    },
    error => {
      message.error({
        content: '出错了',
      });
      // console.log('err' + JSON.stringify(error.response)) // for debug
      return Promise.reject(error)
    }
  )
  
  export default service
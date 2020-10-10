import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:4000/test', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 * 5 // request timeout
  })
  
  // request interceptor
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
      // console.log('err' + JSON.stringify(error.response)) // for debug
   
    
     
      return Promise.reject(error)
    }
  )
  
  export default service
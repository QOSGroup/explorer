import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from './auth'

// 创建axios实例
const service = axios.create({
  baseURL: '', // api 的 base_url
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['QToken'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (config.url.indexOf('://') === -1) {
      if (!store.getters.nodeInfo.baseUrl) {
        // eslint-disable-next-line no-throw-literal
        throw new axios.Cancel('cancel request')
      }
      config.url = store.getters.nodeInfo.baseUrl + config.url
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error) // for debug
    if (error.message === 'cancel request') {
      return Promise.resolve(null)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加认证token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理错误
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理认证错误
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    // 处理网络错误
    if (!error.response) {
      error.message = '网络连接失败，请检查网络设置'
    }
    
    return Promise.reject(error)
  }
)

export default api

// 导出所有API模块
export { authAPI } from './auth'
export { courseAPI } from './course'
export { resourceAPI } from './resource'
export { adminAPI } from './admin'
export { profileAPI } from './profile'
export { uploadAPI } from './upload'
export { notificationAPI } from './notification'
export { searchAPI } from './search'
export { statsAPI } from './stats'


import api from './index'

// 用户认证相关API
export const authAPI = {
  // 用户登录
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  // 用户注册
  register(userData) {
    return api.post('/auth/register', userData)
  },

  // 获取当前用户信息
  getCurrentUser() {
    return api.get('/auth/me')
  },

  // 刷新token
  refreshToken() {
    return api.post('/auth/refresh')
  },

  // 用户登出
  logout() {
    return api.post('/auth/logout')
  },

  // 修改密码
  changePassword(data) {
    return api.put('/auth/change-password', data)
  },

  // 忘记密码
  forgotPassword(email) {
    return api.post('/auth/forgot-password', { email })
  },

  // 重置密码
  resetPassword(data) {
    return api.post('/auth/reset-password', data)
  },

  // 更新用户信息
  updateProfile(userData) {
    return api.put('/auth/profile', userData)
  },

  // 上传用户头像
  uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.post('/auth/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}


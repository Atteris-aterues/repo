import api from './index'

// 个人资料相关API
export const profileAPI = {
  // 获取个人资料
  getProfile() {
    return api.get('/profile')
  },

  // 更新个人资料
  updateProfile(userData) {
    return api.put('/profile', userData)
  },

  // 上传个人头像
  uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // 获取我的课程
  getMyCourses() {
    return api.get('/profile/my-courses')
  },

  // 获取我的资源
  getMyResources() {
    return api.get('/profile/my-resources')
  },

  // 获取我的收藏
  getMyFavorites() {
    return api.get('/profile/favorites')
  }
}

import api from './index'

// 搜索相关API
export const searchAPI = {
  // 全局搜索
  globalSearch(keyword, params = {}) {
    return api.get('/search', {
      params: { keyword, ...params }
    })
  },

  // 获取搜索建议
  getSuggestions(keyword, limit = 10) {
    return api.get('/search/suggestions', {
      params: { keyword, limit }
    })
  },

  // 搜索课程
  searchCourses(keyword, filters = {}) {
    return api.get('/search/courses', {
      params: { keyword, ...filters }
    })
  },

  // 搜索资源
  searchResources(keyword, filters = {}) {
    return api.get('/search/resources', {
      params: { keyword, ...filters }
    })
  },

  // 搜索用户
  searchUsers(keyword, params = {}) {
    return api.get('/search/users', {
      params: { keyword, ...params }
    })
  }
}

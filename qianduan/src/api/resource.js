import api from './index'

// 资源相关API
export const resourceAPI = {
  // 获取资源列表
  getResources(params = {}) {
    return api.get('/resources', { params })
  },

  // 获取资源详情
  getResourceById(id) {
    return api.get(`/resources/${id}`)
  },

  // 搜索资源
  searchResources(keyword, filters = {}) {
    return api.get('/resources/search', {
      params: { keyword, ...filters }
    })
  },

  // 上传资源
  uploadResource(resourceData) {
    return api.post('/resources', resourceData)
  },

  // 更新资源信息
  updateResource(id, resourceData) {
    return api.put(`/resources/${id}`, resourceData)
  },

  // 删除资源
  deleteResource(id) {
    return api.delete(`/resources/${id}`)
  },

  // 下载资源
  downloadResource(id) {
    return api.get(`/resources/${id}/download`, {
      responseType: 'blob'
    })
  },

  // 获取资源评价
  getResourceReviews(resourceId, params = {}) {
    return api.get(`/resources/${resourceId}/reviews`, { params })
  },

  // 提交资源评价
  submitReview(resourceId, reviewData) {
    return api.post(`/resources/${resourceId}/reviews`, reviewData)
  },

  // 获取我的资源
  getMyResources() {
    return api.get('/resources/my-resources')
  },

  // 获取收藏的资源
  getFavoriteResources() {
    return api.get('/resources/favorites')
  },

  // 收藏/取消收藏资源
  toggleFavorite(resourceId) {
    return api.post(`/resources/${resourceId}/favorite`)
  },

  // 获取资源统计
  getResourceStats(resourceId) {
    return api.get(`/resources/${resourceId}/stats`)
  }
}


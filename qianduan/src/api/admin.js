import api from './index'

// 管理员相关API
export const adminAPI = {
  // 获取用户列表
  getUsers(params = {}) {
    return api.get('/admin/users', { params })
  },

  // 更新用户状态
  updateUserStatus(userId, status) {
    return api.put(`/admin/users/${userId}/status`, { status })
  },

  // 删除用户
  deleteUser(userId) {
    return api.delete(`/admin/users/${userId}`)
  },

  // 获取待审核资源
  getPendingResources(params = {}) {
    return api.get('/admin/resources/pending', { params })
  },

  // 审核资源
  reviewResource(resourceId, action, comment = '') {
    return api.post(`/admin/resources/${resourceId}/review`, {
      action, // 'approve' | 'reject'
      comment
    })
  },

  // 获取统计数据
  getStatistics() {
    return api.get('/admin/statistics')
  },

  // 获取系统日志
  getSystemLogs(params = {}) {
    return api.get('/admin/logs', { params })
  },

  // 获取课程管理列表
  getCoursesForAdmin(params = {}) {
    return api.get('/admin/courses', { params })
  },

  // 创建课程
  createCourse(courseData) {
    return api.post('/admin/courses', courseData)
  },

  // 更新课程
  updateCourse(courseId, courseData) {
    return api.put(`/admin/courses/${courseId}`, courseData)
  },

  // 删除课程
  deleteCourse(courseId) {
    return api.delete(`/admin/courses/${courseId}`)
  },

  // 获取资源管理列表
  getResourcesForAdmin(params = {}) {
    return api.get('/admin/resources', { params })
  },

  // 批量操作资源
  batchUpdateResources(resourceIds, action) {
    return api.post('/admin/resources/batch', {
      resourceIds,
      action
    })
  }
}


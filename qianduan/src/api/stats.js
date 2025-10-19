import api from './index'

// 统计相关API
export const statsAPI = {
  // 获取个人统计
  getPersonalStats() {
    return api.get('/stats/personal')
  },

  // 获取课程统计
  getCourseStats() {
    return api.get('/stats/courses')
  },

  // 获取资源统计
  getResourceStats() {
    return api.get('/stats/resources')
  },

  // 获取平台统计（管理员）
  getPlatformStats() {
    return api.get('/stats/platform')
  },

  // 获取用户活跃度统计
  getUserActivityStats(params = {}) {
    return api.get('/stats/user-activity', { params })
  },

  // 获取资源热度统计
  getResourceHeatStats(params = {}) {
    return api.get('/stats/resource-heat', { params })
  }
}

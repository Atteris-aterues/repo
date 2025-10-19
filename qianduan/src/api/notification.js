import api from './index'

// 通知相关API
export const notificationAPI = {
  // 获取通知列表
  getNotifications(params = {}) {
    return api.get('/notifications', { params })
  },

  // 标记通知为已读
  markAsRead(notificationId) {
    return api.put(`/notifications/${notificationId}/read`)
  },

  // 标记所有通知为已读
  markAllAsRead() {
    return api.put('/notifications/read-all')
  },

  // 删除通知
  deleteNotification(notificationId) {
    return api.delete(`/notifications/${notificationId}`)
  },

  // 获取未读通知数量
  getUnreadCount() {
    return api.get('/notifications/unread-count')
  }
}

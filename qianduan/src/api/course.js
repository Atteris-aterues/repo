import api from './index'

// 课程相关API
export const courseAPI = {
  // 获取课程列表
  getCourses(params = {}) {
    return api.get('/courses', { params })
  },

  // 获取课程详情
  getCourseById(id) {
    return api.get(`/courses/${id}`)
  },

  // 搜索课程
  searchCourses(keyword, filters = {}) {
    return api.get('/courses/search', {
      params: { keyword, ...filters }
    })
  },

  // 获取用户收藏的课程
  getFavoriteCourses() {
    return api.get('/courses/favorites')
  },

  // 收藏/取消收藏课程
  toggleFavorite(courseId) {
    return api.post(`/courses/${courseId}/favorite`)
  },

  // 获取课程评价
  getCourseReviews(courseId, params = {}) {
    return api.get(`/courses/${courseId}/reviews`, { params })
  },

  // 提交课程评价
  submitReview(courseId, reviewData) {
    return api.post(`/courses/${courseId}/reviews`, reviewData)
  },

  // 获取我的课程
  getMyCourses() {
    return api.get('/courses/my-courses')
  },

  // 选课
  enrollCourse(courseId) {
    return api.post(`/courses/${courseId}/enroll`)
  },

  // 退课
  dropCourse(courseId) {
    return api.delete(`/courses/${courseId}/enroll`)
  }
}


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 认证状态
    isAuthenticated: false,
    currentUser: null,
    token: localStorage.getItem('token') || null,
    
    // 用户信息
    user: {
      name: '张明同学',
      college: '计算机学院',
      grade: '2022级',
      creditScore: 86,
      contributions: 32,
      favorites: {
        courses: 7,
        resources: 45
      }
    },
    
    // 课程数据
    courses: [
      {
        id: 1,
        title: '计算机科学导论',
        instructor: '张教授',
        college: '计算机学院',
        rating: 4.2,
        credits: 3,
        description: '本课程介绍计算机科学的基本概念，包括算法、数据结构、编程基础等。',
        image: '/images/courses/computer-science.svg'
      },
      {
        id: 2,
        title: '数据结构与算法',
        instructor: '李教授',
        college: '计算机学院',
        rating: 4.7,
        credits: 4,
        description: '深入学习常用数据结构及其算法实现，掌握算法分析与设计的基本方法。',
        image: '/images/courses/data-structure.svg'
      },
      {
        id: 3,
        title: '宏观经济学',
        instructor: '王教授',
        college: '经济学院',
        rating: 3.5,
        credits: 2,
        description: '研究国民经济运行的整体结构及其内在规律，包括国民收入、就业、通货膨胀等。',
        image: '/images/courses/economics.svg'
      }
    ],
    
    // 资源数据
    resources: [
      {
        id: 1,
        title: '数据结构期末复习重点',
        course: '数据结构与算法',
        semester: '2023秋季',
        author: '李同学',
        downloads: 326,
        type: 'pdf',
        rating: 4.0
      },
      {
        id: 2,
        title: '算法实验报告参考',
        course: '数据结构与算法',
        semester: '实验二',
        author: '张同学',
        downloads: 287,
        type: 'word',
        rating: 4.5
      },
      {
        id: 3,
        title: '链表专题讲义',
        course: '数据结构与算法',
        semester: '第四章',
        author: '王同学',
        downloads: 142,
        type: 'presentation',
        rating: 4.2
      },
      {
        id: 4,
        title: '图算法总结',
        course: '数据结构与算法',
        semester: '第五章',
        author: '刘同学',
        downloads: 198,
        type: 'pdf',
        rating: 4.0
      },
      {
        id: 5,
        title: '作业数据集',
        course: '数据结构与算法',
        semester: '实验三',
        author: '陈同学',
        downloads: 156,
        type: 'excel',
        rating: 4.8
      },
      {
        id: 6,
        title: '树结构课件',
        course: '数据结构与算法',
        semester: '第六章',
        author: '赵同学',
        downloads: 134,
        type: 'presentation',
        rating: 3.7
      }
    ],
    
    // 评论数据
    comments: [
      {
        id: 1,
        author: '张同学',
        rating: 5,
        date: '2023-12-12',
        content: '李教授讲课非常清晰，课程内容很实用，编程作业虽然有一定难度但收获很大。推荐给所有想深入学习算法的同学！'
      },
      {
        id: 2,
        author: '王同学',
        rating: 4,
        date: '2023-12-05',
        content: '课程内容扎实，需要投入大量时间完成作业和实验。期末考试难度较高，建议提前准备。助教团队很负责，答疑及时。'
      }
    ],
    
    // 筛选条件
    filters: {
      college: '全部学院',
      major: '全部专业',
      grade: '全部年级',
      credits: '不限学分',
      rating: '全部评分',
      courseTitle: '全部课程', // 资源按课程筛选
      resourceType: '全部类型',
      resourceRating: '全部评分'
    },
    
    // 搜索关键词
    searchKeyword: '',
    
    // 当前选中的课程
    selectedCourse: null,
    
    // 用户评价
    userRating: {
      rating: 0,
      comment: ''
    },
    
    // 待审核资源
    pendingResources: [
      {
        id: 1,
        title: '操作系统实验报告',
        author: 'S20201234',
        date: '2023-12-13 14:23'
      },
      {
        id: 2,
        title: '计算机网络笔记',
        author: 'S20210876',
        date: '2023-12-12 09:45'
      }
    ],
    
    // 用户列表
    users: [
      {
        id: 'S20201234',
        name: '张明',
        college: '计算机学院',
        status: '正常'
      },
      {
        id: 'S20215678',
        name: '李华',
        college: '经济学院',
        status: '限制中'
      }
    ],
    
    // 统计数据
    statistics: {
      totalUsers: 8642,
      totalCourses: 327,
      totalResources: 12857,
      userGrowth: 12.5,
      courseGrowth: 5.2,
      resourceGrowth: 18.3
    }
  },
  
  mutations: {
    // 认证相关
    SET_AUTH(state, { user, token }) {
      state.isAuthenticated = true
      state.currentUser = user
      state.token = token
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },
    
    CLEAR_AUTH(state) {
      state.isAuthenticated = false
      state.currentUser = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    
    INIT_AUTH(state) {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        state.isAuthenticated = true
        state.currentUser = JSON.parse(user)
        state.token = token
      }
    },
    
    SET_FILTER(state, { key, value }) {
      state.filters[key] = value
    },
    
    SET_SEARCH_KEYWORD(state, keyword) {
      state.searchKeyword = keyword
    },
    
    SET_SELECTED_COURSE(state, course) {
      state.selectedCourse = course
    },
    
    SET_USER_RATING(state, { rating, comment }) {
      state.userRating.rating = rating
      state.userRating.comment = comment
    },
    
    ADD_COMMENT(state, comment) {
      state.comments.unshift(comment)
    },
    
    UPDATE_USER(state, user) {
      const index = state.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        state.users.splice(index, 1, user)
      }
    }
  },
  
  actions: {
    // 认证相关
    async login({ commit }, credentials) {
      try {
        // 模拟API调用
        const mockUsers = {
          'S20201234': { id: 'S20201234', name: '张明同学', role: 'student', college: '计算机学院', grade: '2022级' },
          'T20200001': { id: 'T20200001', name: '李教授', role: 'teacher', college: '计算机学院' },
          'admin': { id: 'admin', name: '管理员', role: 'admin', college: '系统管理' }
        }
        
        const user = mockUsers[credentials.username]
        if (user && credentials.password === '123456') {
          const token = 'mock-token-' + Date.now()
          commit('SET_AUTH', { user, token })
          return user
        } else {
          throw new Error('用户名或密码错误')
        }
      } catch (error) {
        throw error
      }
    },
    
    async register({ commit }, userData) {
      try {
        // 模拟注册
        const newUser = {
          id: userData.studentId,
          name: userData.username,
          role: userData.userType,
          college: '计算机学院',
          grade: '2023级'
        }
        const token = 'mock-token-' + Date.now()
        commit('SET_AUTH', { user: newUser, token })
        return newUser
      } catch (error) {
        throw error
      }
    },
    
    logout({ commit }) {
      commit('CLEAR_AUTH')
    },
    
    initAuth({ commit }) {
      commit('INIT_AUTH')
    },
    
    updateFilter({ commit }, { key, value }) {
      commit('SET_FILTER', { key, value })
    },
    
    updateSearchKeyword({ commit }, keyword) {
      commit('SET_SEARCH_KEYWORD', keyword)
    },
    
    selectCourse({ commit }, course) {
      commit('SET_SELECTED_COURSE', course)
    },
    
    submitRating({ commit }, { rating, comment }) {
      const newComment = {
        id: Date.now(),
        author: '当前用户',
        rating,
        date: new Date().toISOString().split('T')[0],
        content: comment
      }
      commit('ADD_COMMENT', newComment)
      commit('SET_USER_RATING', { rating: 0, comment: '' })
    },
    
    updateUser({ commit }, user) {
      commit('UPDATE_USER', user)
    }
  },
  
  getters: {
    // 认证相关
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.currentUser,
    token: (state) => state.token,
    
    filteredCourses: (state) => {
      let filtered = state.courses
      
      if (state.filters.college !== '全部学院') {
        filtered = filtered.filter(course => course.college === state.filters.college)
      }
      
      if (state.filters.credits !== '不限学分') {
        const credits = parseInt(state.filters.credits)
        filtered = filtered.filter(course => course.credits === credits)
      }
      
      if (state.filters.rating !== '全部评分') {
        const minRating = parseFloat(state.filters.rating.replace('分以上', ''))
        filtered = filtered.filter(course => course.rating >= minRating)
      }
      
      if (state.searchKeyword) {
        filtered = filtered.filter(course => 
          course.title.includes(state.searchKeyword) ||
          course.instructor.includes(state.searchKeyword) ||
          course.description.includes(state.searchKeyword)
        )
      }
      
      return filtered
    },
    
    filteredResources: (state) => {
      let filtered = state.resources

      // 课程筛选
      if (state.filters.courseTitle && state.filters.courseTitle !== '全部课程') {
        filtered = filtered.filter(resource => resource.course === state.filters.courseTitle)
      }

      // 类型筛选
      if (state.filters.resourceType && state.filters.resourceType !== '全部类型') {
        filtered = filtered.filter(resource => resource.type === state.filters.resourceType)
      }

      // 评分筛选
      if (state.filters.resourceRating && state.filters.resourceRating !== '全部评分') {
        const minRating = parseFloat(state.filters.resourceRating.replace('分以上', ''))
        filtered = filtered.filter(resource => resource.rating >= minRating)
      }

      // 关键词筛选
      if (state.searchKeyword) {
        filtered = filtered.filter(resource => 
          resource.title.includes(state.searchKeyword) ||
          resource.course.includes(state.searchKeyword) ||
          resource.author.includes(state.searchKeyword)
        )
      }
      
      return filtered
    }
  }
})

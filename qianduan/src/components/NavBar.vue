<template>
  <nav class="bg-white py-4 px-8 shadow-md flex items-center justify-between">
    <div class="flex items-center">
      <img 
        src="/images/icons/logo.svg" 
        alt="智慧选课平台"
        class="w-16 h-16 mr-4"
        @error="handleLogoError"
      />
      <div class="flex space-x-6">
        <router-link 
          v-for="item in visibleNavItems" 
          :key="item.name"
          :to="item.path" 
          class="font-medium text-gray-700 nav-link"
          :class="{ 'nav-active': $route.name === item.name }"
        >
          {{ item.label }}
        </router-link>
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input 
          type="text" 
          placeholder="搜索课程或资源..." 
          class="border border-gray-300 rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="searchKeyword"
          @input="updateSearch"
        />
      </div>
      <div class="flex items-center space-x-3">
        <!-- 未登录状态 -->
        <template v-if="!isAuthenticated">
          <button class="btn-secondary" @click="$router.push('/login')">登录</button>
          <button class="btn-primary" @click="$router.push('/login')">注册</button>
        </template>
        
        <!-- 已登录状态 -->
        <template v-else>
          <div class="flex items-center space-x-4">
            <!-- 用户信息 -->
            <div class="flex items-center space-x-2">
              <img 
                :src="getUserAvatar(currentUser.role)" 
                :alt="currentUser.name"
                class="w-8 h-8 rounded-full"
                @error="handleAvatarError"
              />
              <span class="text-sm font-medium text-gray-700">{{ currentUser.name }}</span>
            </div>
            
            <!-- 用户菜单 -->
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <span class="text-sm">{{ currentUser.role === 'student' ? '学生' : currentUser.role === 'teacher' ? '教师' : '管理员' }}</span>
                <span class="iconify" data-icon="mdi:chevron-down"></span>
              </button>
              
              <!-- 下拉菜单 -->
              <div 
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <router-link 
                  to="/profile" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  <span class="iconify mr-2" data-icon="mdi:account"></span>
                  个人中心
                </router-link>
                <router-link 
                  v-if="currentUser.role === 'admin'"
                  to="/admin" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  <span class="iconify mr-2" data-icon="mdi:cog"></span>
                  后台管理
                </router-link>
                <hr class="my-1">
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span class="iconify mr-2" data-icon="mdi:logout"></span>
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      searchKeyword: '',
      showUserMenu: false,
      navItems: [
        { name: 'Home', path: '/', label: '首页' },
        { name: 'MyCourses', path: '/my-courses', label: '我的选课' },
        { name: 'Resources', path: '/resources', label: '资源广场' },
        { name: 'Profile', path: '/profile', label: '个人中心' },
        { name: 'Admin', path: '/admin', label: '后台管理' }
      ]
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    visibleNavItems() {
      return this.navItems.filter(item => {
        // 我的选课需要登录
        if (item.name === 'MyCourses' && !this.isAuthenticated) {
          return false
        }
        // 个人中心需要登录
        if (item.name === 'Profile' && !this.isAuthenticated) {
          return false
        }
        // 后台管理需要管理员权限
        if (item.name === 'Admin' && (!this.isAuthenticated || this.currentUser?.role !== 'admin')) {
          return false
        }
        return true
      })
    }
  },
  methods: {
    ...mapActions(['updateSearchKeyword', 'logout']),
    updateSearch() {
      this.updateSearchKeyword(this.searchKeyword)
    },
    handleLogout() {
      this.logout()
      this.showUserMenu = false
      this.$router.push('/')
    },
    handleLogoError(event) {
      // Logo 加载失败时显示占位符
      event.target.style.display = 'none'
      const placeholder = document.createElement('div')
      placeholder.className = 'bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4'
      event.target.parentNode.insertBefore(placeholder, event.target)
    },
    getUserAvatar(role) {
      const avatars = {
        student: '/images/avatars/student.svg',
        teacher: '/images/avatars/teacher.svg',
        admin: '/images/avatars/admin.svg'
      }
      return avatars[role] || '/images/avatars/avatar-placeholder.svg'
    },
    handleAvatarError(event) {
      // 头像加载失败时显示占位符
      event.target.src = '/images/avatars/avatar-placeholder.svg'
    }
  },
  mounted() {
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showUserMenu = false
      }
    })
  }
}
</script>

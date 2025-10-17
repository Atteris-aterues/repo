<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo和标题 -->
      <div class="text-center">
        <img 
          src="/images/icons/logo.svg" 
          alt="教育资源共享平台" 
          class="w-20 h-20 mx-auto mb-4"
          @error="handleLogoError"
        />
        <h2 class="text-3xl font-bold text-gray-900">智慧选课平台</h2>
        <p class="mt-2 text-sm text-gray-600">请登录您的账户</p>
      </div>

      <!-- 登录表单 -->
      <div class="bg-white card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- 用户名输入 -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              用户名/学号
            </label>
            <input
              id="username"
              v-model="loginForm.username"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入用户名或学号"
            />
          </div>

          <!-- 密码输入 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full border border-gray-300 rounded-md py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入密码"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span 
                  class="iconify text-gray-400 hover:text-gray-600"
                  :data-icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
                ></span>
              </button>
            </div>
          </div>

          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="loginForm.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                记住我
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                忘记密码？
              </a>
            </div>
          </div>

          <!-- 登录按钮 -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <span class="iconify animate-spin mr-2" data-icon="mdi:loading"></span>
                登录中...
              </span>
              <span v-else>登录</span>
            </button>
          </div>

          <!-- 错误信息 -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <span class="iconify text-red-400 mr-2" data-icon="mdi:alert-circle"></span>
              <span class="text-sm text-red-700">{{ errorMessage }}</span>
            </div>
          </div>

          <!-- 注册链接 -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              还没有账户？
              <a href="#" @click.prevent="showRegister = true" class="font-medium text-blue-600 hover:text-blue-500">
                立即注册
              </a>
            </p>
          </div>
        </form>
      </div>

      <!-- 快速登录选项 -->
      <div class="bg-white card p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4 text-center">快速登录</h3>
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="quickLogin('student')"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span class="iconify mr-2 text-blue-600" data-icon="mdi:account"></span>
            学生登录
          </button>
          <button
            @click="quickLogin('admin')"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span class="iconify mr-2 text-red-600" data-icon="mdi:shield-crown"></span>
            管理员登录
          </button>
        </div>
      </div>
    </div>

    <!-- 注册模态框 -->
    <div v-if="showRegister" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">注册新账户</h3>
          <button @click="showRegister = false" class="text-gray-400 hover:text-gray-600">
            <span class="iconify text-xl" data-icon="mdi:close"></span>
          </button>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              v-model="registerForm.username"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">学号/工号</label>
            <input
              v-model="registerForm.studentId"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入学号或工号"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请再次输入密码"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">用户类型</label>
            <select
              v-model="registerForm.userType"
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">学生</option>
              <option value="teacher">教师</option>
              <option value="admin">管理员</option>
            </select>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="showRegister = false"
              class="flex-1 btn-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              class="flex-1 btn-primary"
            >
              注册
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      showRegister: false,
      isLoading: false,
      errorMessage: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      registerForm: {
        username: '',
        studentId: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'student'
      }
    }
  },
  methods: {
    ...mapActions(['login', 'register']),
    
    async handleLogin() {
      this.isLoading = true
      this.errorMessage = ''
      
      try {
        await this.login(this.loginForm)
        this.$router.push('/')
      } catch (error) {
        this.errorMessage = error.message || '登录失败，请检查用户名和密码'
      } finally {
        this.isLoading = false
      }
    },
    
    async handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.errorMessage = '两次输入的密码不一致'
        return
      }
      
      try {
        await this.register(this.registerForm)
        this.showRegister = false
        this.$router.push('/')
      } catch (error) {
        this.errorMessage = error.message || '注册失败，请重试'
      }
    },
    
    quickLogin(type) {
      if (type === 'student') {
        this.loginForm.username = 'S20201234'
        this.loginForm.password = '123456'
      } else if (type === 'admin') {
        this.loginForm.username = 'admin'
        this.loginForm.password = '123456'
      }
      this.handleLogin()
    },
    handleLogoError(event) {
      // Logo 加载失败时显示占位符
      event.target.style.display = 'none'
      const placeholder = document.createElement('div')
      placeholder.className = 'bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-4'
      event.target.parentNode.insertBefore(placeholder, event.target)
    }
  }
}
</script>

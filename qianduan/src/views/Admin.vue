<template>
  <div class="px-8 py-6">
    <div class="grid grid-cols-4 gap-6">
      <!-- 左侧菜单 -->
      <div class="col-span-1">
        <div class="card p-4">
          <h2 class="text-xl font-bold mb-4">管理面板</h2>
          <ul class="space-y-2">
            <li 
              v-for="menu in menuItems" 
              :key="menu.key"
              class="py-2 px-3 rounded-md font-medium flex items-center cursor-pointer"
              :class="activeMenu === menu.key ? 'bg-blue-100' : 'hover:bg-gray-100'"
              @click="activeMenu = menu.key"
            >
              <span class="iconify mr-2" :data-icon="menu.icon"></span>
              {{ menu.label }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="col-span-3">
        <!-- 数据统计 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div 
            v-for="stat in statistics" 
            :key="stat.key"
            class="stats-card"
          >
            <div class="flex justify-between">
              <h3 class="text-lg font-bold">{{ stat.title }}</h3>
              <div 
                class="rounded-md p-2"
                :class="stat.bgClass"
              >
                <span 
                  class="iconify text-xl"
                  :class="stat.colorClass"
                  :data-icon="stat.icon"
                ></span>
              </div>
            </div>
            <p class="text-3xl font-bold mt-4">{{ stat.value }}</p>
            <p class="text-green-500 mt-1 flex items-center">
              <span class="iconify" data-icon="mdi:arrow-top-right"></span>
              <span>{{ stat.growth }}% 增长率</span>
            </p>
          </div>
        </div>

        <!-- 审核队列 -->
        <div class="card p-6 mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">待审核资源</h2>
            <span class="text-sm text-gray-600">{{ pendingResources.length }}条待处理</span>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 text-gray-600 font-medium">资源名称</th>
                  <th class="text-left py-3 text-gray-600 font-medium">提交者</th>
                  <th class="text-left py-3 text-gray-600 font-medium">提交时间</th>
                  <th class="text-left py-3 text-gray-600 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="resource in pendingResources" 
                  :key="resource.id"
                  class="border-b border-gray-100"
                >
                  <td class="py-3 font-medium">{{ resource.title }}</td>
                  <td class="py-3 text-gray-600">{{ resource.author }}</td>
                  <td class="py-3 text-gray-600">{{ resource.date }}</td>
                  <td class="py-3">
                    <button class="btn-secondary text-sm mr-2">查看</button>
                    <button class="btn-primary text-sm">通过</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 用户管理 -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">用户管理</h2>
            <div class="flex space-x-2">
              <input 
                type="text" 
                placeholder="搜索用户..." 
                class="border border-gray-300 rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="userSearchKeyword"
              >
              <button class="btn-primary">添加用户</button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 text-gray-600 font-medium">用户ID</th>
                  <th class="text-left py-3 text-gray-600 font-medium">用户名</th>
                  <th class="text-left py-3 text-gray-600 font-medium">学院</th>
                  <th class="text-left py-3 text-gray-600 font-medium">账户状态</th>
                  <th class="text-left py-3 text-gray-600 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="user in filteredUsers" 
                  :key="user.id"
                  class="border-b border-gray-100"
                >
                  <td class="py-3">{{ user.id }}</td>
                  <td class="py-3 font-medium">{{ user.name }}</td>
                  <td class="py-3 text-gray-600">{{ user.college }}</td>
                  <td class="py-3">
                    <span 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :class="getStatusClass(user.status)"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="py-3">
                    <button class="btn-secondary text-sm">编辑</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  data() {
    return {
      activeMenu: 'overview',
      userSearchKeyword: '',
      menuItems: [
        { key: 'overview', label: '数据概览', icon: 'mdi:view-dashboard' },
        { key: 'users', label: '用户管理', icon: 'mdi:account-group' },
        { key: 'courses', label: '课程管理', icon: 'mdi:book-education' },
        { key: 'resources', label: '资源管理', icon: 'mdi:file-document' },
        { key: 'review', label: '内容审核', icon: 'mdi:check-decagram' },
        { key: 'settings', label: '系统设置', icon: 'mdi:cog' }
      ]
    }
  },
  computed: {
    ...mapState(['statistics', 'pendingResources', 'users']),
    filteredUsers() {
      if (!this.userSearchKeyword) {
        return this.users
      }
      return this.users.filter(user => 
        user.name.includes(this.userSearchKeyword) ||
        user.id.includes(this.userSearchKeyword) ||
        user.college.includes(this.userSearchKeyword)
      )
    }
  },
  methods: {
    getStatusClass(status) {
      const classes = {
        '正常': 'bg-green-100 text-green-800',
        '限制中': 'bg-yellow-100 text-yellow-800',
        '已禁用': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }
  }
}
</script>







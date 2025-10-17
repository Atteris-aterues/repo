<template>
  <div class="px-8 py-6">
    <!-- 用户信息面板 -->
            <div class="card p-8 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div class="flex items-center">
                    <img 
                        :src="getUserAvatar(user.role)" 
                        :alt="user.name"
                        class="w-20 h-20 mr-4 rounded-full"
                        @error="handleAvatarError"
                    />
        <div class="ml-6">
          <h1 class="text-2xl font-bold">{{ user.name }}</h1>
          <p class="text-gray-600 mb-2">{{ user.college }} · {{ user.grade }}</p>
          <div class="flex items-center">
            <span class="iconify mr-1 text-yellow-500" data-icon="mdi:star"></span>
            <span class="font-medium">信誉积分：</span>
            <span class="text-blue-600 font-bold ml-1">{{ user.creditScore }}</span>
            <div class="ml-4 w-48">
              <div class="progress-bar">
                <div class="progress-value" :style="{ width: user.creditScore + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能入口 -->
    <div class="custom-grid mb-8">
      <div class="card p-5 text-center hover:bg-blue-50 cursor-pointer">
        <div class="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="iconify text-2xl text-blue-700" data-icon="mdi:file-upload"></span>
        </div>
        <h3 class="font-bold mb-1">我的贡献</h3>
        <p class="text-sm text-gray-600">已上传{{ user.contributions }}份资源</p>
      </div>
      
      <div class="card p-5 text-center hover:bg-blue-50 cursor-pointer">
        <div class="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="iconify text-2xl text-yellow-700" data-icon="mdi:heart"></span>
        </div>
        <h3 class="font-bold mb-1">我的收藏</h3>
        <p class="text-sm text-gray-600">收藏课程{{ user.favorites.courses }}门，资源{{ user.favorites.resources }}份</p>
      </div>
      
      <div class="card p-5 text-center hover:bg-blue-50 cursor-pointer">
        <div class="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="iconify text-2xl text-green-700" data-icon="mdi:shield-lock"></span>
        </div>
        <h3 class="font-bold mb-1">账户安全</h3>
        <p class="text-sm text-gray-600">修改密码和安全设置</p>
      </div>
      
      <div class="card p-5 text-center hover:bg-blue-50 cursor-pointer">
        <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="iconify text-2xl text-purple-700" data-icon="mdi:gift"></span>
        </div>
        <h3 class="font-bold mb-1">兑换商城</h3>
        <p class="text-sm text-gray-600">使用积分兑换礼品</p>
      </div>
    </div>

    <!-- 最近贡献 -->
    <div class="card p-6">
      <h2 class="text-xl font-bold mb-4">最近贡献</h2>
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-3 text-gray-600 font-medium">资源名称</th>
            <th class="text-left py-3 text-gray-600 font-medium">课程</th>
            <th class="text-left py-3 text-gray-600 font-medium">上传时间</th>
            <th class="text-left py-3 text-gray-600 font-medium">下载量</th>
            <th class="text-left py-3 text-gray-600 font-medium">评分</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="contribution in userContributions" 
            :key="contribution.id"
            class="border-b border-gray-100"
          >
            <td class="py-3 font-medium">{{ contribution.title }}</td>
            <td class="py-3 text-gray-600">{{ contribution.course }}</td>
            <td class="py-3 text-gray-600">{{ contribution.date }}</td>
            <td class="py-3 text-gray-600">{{ contribution.downloads }}</td>
            <td class="py-3">
              <div class="star-rating flex">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  class="iconify star"
                  :class="{ active: star <= Math.floor(contribution.rating) }"
                  data-icon="mdi:star"
                ></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapState(['user']),
    userContributions() {
      return [
        {
          id: 1,
          title: '图算法总结',
          course: '数据结构与算法',
          date: '2023-12-10',
          downloads: 142,
          rating: 4.0
        },
        {
          id: 2,
          title: '实验五参考答案',
          course: '数据结构与算法',
          date: '2023-11-28',
          downloads: 201,
          rating: 4.5
        }
      ]
    }
  },
  methods: {
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
  }
}
</script>

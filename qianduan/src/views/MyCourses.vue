<template>
  <div class="px-8 py-6">
    <h1 class="text-3xl font-bold mb-6">我的选课</h1>
    
    <!-- 选课统计 -->
    <div class="grid grid-cols-4 gap-6 mb-8">
      <div class="stats-card">
        <div class="flex justify-between">
          <h3 class="text-lg font-bold">已选课程</h3>
          <div class="bg-blue-100 rounded-md p-2">
            <span class="iconify text-xl text-blue-700" data-icon="mdi:book-education"></span>
          </div>
        </div>
        <p class="text-3xl font-bold mt-4">{{ selectedCourses.length }}</p>
        <p class="text-gray-500 mt-1">门课程</p>
      </div>
      
      <div class="stats-card">
        <div class="flex justify-between">
          <h3 class="text-lg font-bold">总学分</h3>
          <div class="bg-green-100 rounded-md p-2">
            <span class="iconify text-xl text-green-700" data-icon="mdi:credit-card"></span>
          </div>
        </div>
        <p class="text-3xl font-bold mt-4">{{ totalCredits }}</p>
        <p class="text-gray-500 mt-1">学分</p>
      </div>
      
      <div class="stats-card">
        <div class="flex justify-between">
          <h3 class="text-lg font-bold">本周课程</h3>
          <div class="bg-orange-100 rounded-md p-2">
            <span class="iconify text-xl text-orange-700" data-icon="mdi:calendar-week"></span>
          </div>
        </div>
        <p class="text-3xl font-bold mt-4">{{ weeklyClasses }}</p>
        <p class="text-gray-500 mt-1">节</p>
      </div>
      
      <div class="stats-card">
        <div class="flex justify-between">
          <h3 class="text-lg font-bold">平均评分</h3>
          <div class="bg-purple-100 rounded-md p-2">
            <span class="iconify text-xl text-purple-700" data-icon="mdi:star"></span>
          </div>
        </div>
        <p class="text-3xl font-bold mt-4">{{ averageRating }}</p>
        <p class="text-gray-500 mt-1">分</p>
      </div>
    </div>

    <!-- 课程表 -->
    <div class="card p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">课程表</h2>
        <div class="flex space-x-2">
          <button 
            class="btn-secondary"
            @click="previousWeek"
          >
            <span class="iconify mr-1" data-icon="mdi:chevron-left"></span>
            上一周
          </button>
          <span class="px-4 py-2 text-sm font-medium text-gray-700">
            第 {{ currentWeek }} 周
          </span>
          <button 
            class="btn-secondary"
            @click="nextWeek"
          >
            下一周
            <span class="iconify ml-1" data-icon="mdi:chevron-right"></span>
          </button>
        </div>
      </div>
      
      <!-- 课程表网格 -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">时间</th>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">周一</th>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">周二</th>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">周三</th>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">周四</th>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">周五</th>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">周六</th>
              <th class="border border-gray-300 p-3 text-center font-medium bg-gray-50">周日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeSlot in timeSlots" :key="timeSlot.time">
              <td class="border border-gray-300 p-3 text-center font-medium bg-gray-50">
                {{ timeSlot.time }}
              </td>
              <td 
                v-for="day in days" 
                :key="day"
                class="border border-gray-300 p-2 min-w-[120px] h-20"
              >
                <div 
                  v-for="course in getCourseAtTime(day, timeSlot.time)"
                  :key="course.id"
                  class="bg-blue-100 border border-blue-300 rounded p-2 text-xs cursor-pointer hover:bg-blue-200"
                  @click="viewCourseDetail(course)"
                >
                  <div class="font-medium text-blue-800">{{ course.title }}</div>
                  <div class="text-blue-600">{{ course.instructor }}</div>
                  <div class="text-blue-500">{{ course.location }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 已选课程列表 -->
    <div class="card p-6">
      <h2 class="text-xl font-bold mb-4">已选课程列表</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="course in selectedCourses" 
          :key="course.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-bold text-lg">{{ course.title }}</h3>
            <button 
              class="text-red-500 hover:text-red-700"
              @click="dropCourse(course.id)"
            >
              <span class="iconify" data-icon="mdi:close"></span>
            </button>
          </div>
          <p class="text-sm text-gray-600 mb-2">{{ course.instructor }} · {{ course.college }}</p>
          <div class="flex justify-between items-center mb-3">
            <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ course.credits }}学分</span>
            <div class="star-rating flex">
              <span 
                v-for="star in 5" 
                :key="star"
                class="iconify star text-sm"
                :class="{ active: star <= Math.floor(course.rating) }"
                data-icon="mdi:star"
              ></span>
              <span class="ml-1 text-sm text-gray-600">{{ course.rating }}</span>
            </div>
          </div>
          <div class="text-sm text-gray-500 mb-3">
            <div v-for="schedule in course.schedule" :key="schedule.day">
              {{ getDayName(schedule.day) }} {{ schedule.time }} {{ schedule.location }}
            </div>
          </div>
          <button 
            class="btn-secondary w-full text-sm"
            @click="viewCourseDetail(course)"
          >
            查看详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MyCourses',
  data() {
    return {
      currentWeek: 1,
      timeSlots: [
        { time: '08:20-10:00' },
        { time: '10:20-12:00' },
        { time: '14:00-15:40' },
        { time: '15:50-17:30' },
        { time: '19:00-21:35' }
      ],
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  computed: {
    ...mapState(['courses']),
    ...mapGetters(['currentUser']),
    selectedCourses() {
      // 模拟已选课程数据
      return [
        {
          id: 1,
          title: '计算机科学导论',
          instructor: '张教授',
          college: '计算机学院',
          rating: 4.2,
          credits: 3,
          schedule: [
            { day: 'monday', time: '08:00-09:40', location: 'A101' },
            { day: 'wednesday', time: '08:00-09:40', location: 'A101' }
          ]
        },
        {
          id: 2,
          title: '数据结构与算法',
          instructor: '李教授',
          college: '计算机学院',
          rating: 4.7,
          credits: 4,
          schedule: [
            { day: 'tuesday', time: '10:00-11:40', location: 'B201' },
            { day: 'thursday', time: '10:00-11:40', location: 'B201' }
          ]
        },
        {
          id: 3,
          title: '宏观经济学',
          instructor: '王教授',
          college: '经济学院',
          rating: 3.5,
          credits: 2,
          schedule: [
            { day: 'friday', time: '14:00-15:40', location: 'C301' }
          ]
        }
      ]
    },
    totalCredits() {
      return this.selectedCourses.reduce((total, course) => total + course.credits, 0)
    },
    weeklyClasses() {
      return this.selectedCourses.reduce((total, course) => total + course.schedule.length, 0)
    },
    averageRating() {
      if (this.selectedCourses.length === 0) return 0
      const total = this.selectedCourses.reduce((sum, course) => sum + course.rating, 0)
      return (total / this.selectedCourses.length).toFixed(1)
    }
  },
  methods: {
    getCourseAtTime(day, time) {
      return this.selectedCourses.filter(course => 
        course.schedule.some(schedule => 
          schedule.day === day && schedule.time === time
        )
      )
    },
    getDayName(day) {
      const dayNames = {
        monday: '周一',
        tuesday: '周二',
        wednesday: '周三',
        thursday: '周四',
        friday: '周五',
        saturday: '周六',
        sunday: '周日'
      }
      return dayNames[day] || day
    },
    viewCourseDetail(course) {
      this.$store.commit('SET_SELECTED_COURSE', course)
      this.$router.push('/courses')
    },
    dropCourse(courseId) {
      if (confirm('确定要退选这门课程吗？')) {
        // 这里应该调用退选API
        console.log('退选课程:', courseId)
        alert('退选成功！')
      }
    },
    previousWeek() {
      if (this.currentWeek > 1) {
        this.currentWeek--
      }
    },
    nextWeek() {
      if (this.currentWeek < 20) {
        this.currentWeek++
      }
    }
  }
}
</script>

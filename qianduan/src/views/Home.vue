<template>
  <div class="px-8 py-6">
    <h1 class="text-3xl font-bold mb-6">欢迎使用智慧选课平台</h1>
    
    <!-- 搜索筛选区域 -->
    <div class="bg-white card p-5 mb-8">
      <h2 class="text-xl font-bold mb-4">课程筛选</h2>
      <div class="grid grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">学院</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="filters.college"
            @change="updateFilter('college', filters.college)"
          >
            <option>全部学院</option>
            <option>计算机学院</option>
            <option>经济学院</option>
            <option>医学院</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">专业</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="filters.major"
            @change="updateFilter('major', filters.major)"
          >
            <option>全部专业</option>
            <option>计算机科学</option>
            <option>软件工程</option>
            <option>电子信息</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">年级</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="filters.grade"
            @change="updateFilter('grade', filters.grade)"
          >
            <option>全部年级</option>
            <option>大一</option>
            <option>大二</option>
            <option>大三</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">学分</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="filters.credits"
            @change="updateFilter('credits', filters.credits)"
          >
            <option>不限学分</option>
            <option>1学分</option>
            <option>2学分</option>
            <option>3学分</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">评分</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="filters.rating"
            @change="updateFilter('rating', filters.rating)"
          >
            <option>全部评分</option>
            <option>4分以上</option>
            <option>3分以上</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 热门课程推荐 -->
    <h2 class="text-2xl font-bold mb-4">热门课程推荐</h2>
    <div class="custom-grid mb-12">
      <CourseCard 
        v-for="course in filteredCourses" 
        :key="course.id"
        :course="course"
        @view-details="viewCourseDetails"
      />
    </div>

    <!-- 最新资源 -->
    <h2 class="text-2xl font-bold mb-4">最新学习资源</h2>
    <div class="custom-grid">
      <ResourceCard 
        v-for="resource in latestResources" 
        :key="resource.id"
        :resource="resource"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CourseCard from '../components/CourseCard.vue'
import ResourceCard from '../components/ResourceCard.vue'

export default {
  name: 'Home',
  components: {
    CourseCard,
    ResourceCard
  },
  computed: {
    ...mapGetters(['filteredCourses', 'filteredResources']),
    filters() {
      return this.$store.state.filters
    },
    latestResources() {
      return this.filteredResources.slice(0, 3)
    }
  },
  methods: {
    ...mapActions(['updateFilter', 'selectCourse']),
    viewCourseDetails(course) {
      this.selectCourse(course)
      this.$router.push('/courses')
    }
  }
}
</script>







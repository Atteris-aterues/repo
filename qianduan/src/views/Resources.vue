<template>
  <div class="px-8 py-6">
    <!-- 资源筛选和上传 -->
    <div class="bg-white card p-5 mb-8">
      <h2 class="text-xl font-bold mb-4">资源筛选</h2>
      <div class="grid grid-cols-5 gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">课程</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="selectedCourseTitle"
            @change="onCourseFilterChange"
          >
            <option value="全部课程">全部课程</option>
            <option v-for="course in courseTitles" :key="course" :value="course">{{ course }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">类型</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="selectedType"
            @change="onTypeFilterChange"
          >
            <option>全部类型</option>
            <option value="pdf">讲义资料（PDF）</option>
            <option value="word">课程作业（Word）</option>
            <option value="excel">数据表（Excel）</option>
            <option value="presentation">课件（PPT）</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">评分</label>
          <select 
            class="w-full border border-gray-300 rounded-md py-2 px-3"
            v-model="selectedRating"
            @change="onRatingFilterChange"
          >
            <option>全部评分</option>
            <option>4分以上</option>
            <option>3分以上</option>
          </select>
        </div>
        <div class="col-span-2 flex justify-end">
          <button class="btn-primary flex items-center h-10">
            <span class="iconify mr-2" data-icon="mdi:upload"></span>
            上传资源
          </button>
        </div>
      </div>
    </div>

    <!-- 热门资源推荐 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">热门资源</h2>
      <div class="custom-grid">
        <ResourceCard 
          v-for="resource in hotResources" 
          :key="resource.id"
          :resource="resource"
        />
      </div>
    </div>

    <!-- 全部资源列表 -->
    <h2 class="text-xl font-bold mb-4">全部资源</h2>
    <div class="custom-grid">
      <div 
        v-for="resource in filteredResources" 
        :key="resource.id"
        class="card p-4 flex flex-col"
      >
        <div class="flex items-center mb-3">
          <div 
            class="rounded-md flex items-center justify-center p-2 mr-3"
            :class="getTypeClass(resource.type)"
          >
            <span 
              class="iconify text-2xl"
              :class="getTypeColor(resource.type)"
              :data-icon="getTypeIcon(resource.type)"
            ></span>
          </div>
          <h3 class="font-bold">{{ resource.title }}</h3>
        </div>
        <p class="text-sm text-gray-600 mb-3">{{ resource.course }} · {{ resource.semester }}</p>
        <div class="flex justify-between mt-auto">
          <div class="flex items-center text-sm">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6 mr-2"></div>
            <span>{{ resource.author }}</span>
          </div>
          <div class="flex items-center text-sm text-gray-500">
            <div class="star-rating flex mr-2">
              <span 
                v-for="star in 5" 
                :key="star"
                class="iconify star"
                :class="{ active: star <= Math.floor(resource.rating) }"
                data-icon="mdi:star"
              ></span>
            </div>
            <span>{{ resource.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ResourceCard from '../components/ResourceCard.vue'

export default {
  name: 'Resources',
  components: {
    ResourceCard
  },
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { key: 'all', label: '全部资源' },
        { key: 'handout', label: '讲义资料' },
        { key: 'homework', label: '课程作业' },
        { key: 'exam', label: '考试真题' }
      ],
      selectedCourseTitle: '全部课程',
      selectedType: '全部类型',
      selectedRating: '全部评分'
    }
  },
  computed: {
    ...mapGetters(['filteredResources']),
    courseTitles() {
      // 从资源列表提取课程名并去重
      const titles = this.filteredResources.map(r => r.course)
      return Array.from(new Set(titles))
    },
    hotResources() {
      return this.filteredResources.slice(0, 3)
    }
  },
  methods: {
    onCourseFilterChange() {
      this.$store.dispatch('updateFilter', { key: 'courseTitle', value: this.selectedCourseTitle })
    },
    onTypeFilterChange() {
      this.$store.dispatch('updateFilter', { key: 'resourceType', value: this.selectedType })
    },
    onRatingFilterChange() {
      this.$store.dispatch('updateFilter', { key: 'resourceRating', value: this.selectedRating })
    },
    getTypeClass(type) {
      const classes = {
        pdf: 'bg-blue-100',
        word: 'bg-orange-100',
        presentation: 'bg-purple-100',
        excel: 'bg-green-100',
        powerpoint: 'bg-yellow-100'
      }
      return classes[type] || 'bg-gray-100'
    },
    getTypeColor(type) {
      const colors = {
        pdf: 'text-blue-500',
        word: 'text-orange-500',
        presentation: 'text-purple-500',
        excel: 'text-green-500',
        powerpoint: 'text-yellow-500'
      }
      return colors[type] || 'text-gray-500'
    },
    getTypeIcon(type) {
      const icons = {
        pdf: 'mdi:file-pdf',
        word: 'mdi:file-word',
        presentation: 'mdi:file-presentation',
        excel: 'mdi:file-excel',
        powerpoint: 'mdi:file-powerpoint'
      }
      return icons[type] || 'mdi:file'
    }
  }
}
</script>


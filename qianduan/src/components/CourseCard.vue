<template>
  <div class="card overflow-hidden">
    <div class="w-full h-48 bg-gray-100 flex items-center justify-center">
      <img 
        v-if="course.image" 
        :src="course.image" 
        :alt="course.title"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <div v-else class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
        <span class="text-gray-500 text-sm">暂无图片</span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg mb-1">{{ course.title }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ course.instructor }} · {{ course.college }}</p>
      <div class="flex justify-between items-center mb-3">
        <div class="star-rating flex">
          <span 
            v-for="star in 5" 
            :key="star"
            class="iconify star"
            :class="{ active: star <= Math.floor(course.rating) }"
            data-icon="mdi:star"
          ></span>
          <span class="ml-2 text-sm text-gray-600">{{ course.rating }}</span>
        </div>
        <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ course.credits }}学分</span>
      </div>
      <p class="text-gray-600 text-sm mb-4">{{ course.description }}</p>
      <button class="btn-secondary w-full" @click="$emit('view-details', course)">查看详情</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleImageError(event) {
      // 图片加载失败时显示占位符
      event.target.style.display = 'none'
      event.target.nextElementSibling.style.display = 'flex'
    }
  }
}
</script>

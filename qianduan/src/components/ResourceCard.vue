<template>
  <div class="card p-4 flex">
    <div 
      class="rounded-md flex items-center justify-center p-3 mr-4"
      :class="getTypeClass(resource.type)"
    >
      <span 
        class="iconify text-3xl"
        :class="getTypeColor(resource.type)"
        :data-icon="getTypeIcon(resource.type)"
      ></span>
    </div>
    <div class="flex-1">
      <h3 class="font-bold mb-1">{{ resource.title }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ resource.course }} · {{ resource.semester }}</p>
      <div class="flex justify-between text-sm">
        <span>{{ resource.author }}</span>
        <div class="flex items-center">
          <span class="iconify mr-1" data-icon="mdi:download"></span>
          <span>{{ resource.downloads }}次下载</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceCard',
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  methods: {
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
        pdf: 'text-blue-600',
        word: 'text-orange-500',
        presentation: 'text-purple-600',
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

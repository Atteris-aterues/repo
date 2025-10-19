<template>
  <div v-if="error" class="fixed top-4 right-4 z-50 max-w-sm">
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <span class="iconify text-red-400 text-xl" data-icon="mdi:alert-circle"></span>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            {{ error.title || '发生错误' }}
          </h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error.message }}</p>
          </div>
          <div class="mt-4">
            <div class="-mx-2 -my-1.5 flex">
              <button
                @click="clearError"
                class="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ErrorHandler',
  computed: {
    ...mapState(['error'])
  },
  methods: {
    ...mapMutations(['CLEAR_ERROR']),
    clearError() {
      this.CLEAR_ERROR()
    }
  }
}
</script>


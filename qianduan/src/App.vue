<template>
  <div class="app-container">
    <NavBar />
    <router-view />
    <ErrorHandler />
    <LoadingSpinner 
      :loading="globalLoading" 
      :message="loadingMessage" 
    />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import ErrorHandler from './components/ErrorHandler.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    ErrorHandler,
    LoadingSpinner
  },
  computed: {
    ...mapState(['loading']),
    globalLoading() {
      return Object.values(this.loading).some(loading => loading)
    },
    loadingMessage() {
      if (this.loading.courses) return '加载课程中...'
      if (this.loading.resources) return '加载资源中...'
      if (this.loading.users) return '加载用户中...'
      if (this.loading.statistics) return '加载统计中...'
      return '加载中...'
    }
  }
}
</script>

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'

Vue.config.productionTip = false

// 初始化认证状态
store.dispatch('initAuth')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

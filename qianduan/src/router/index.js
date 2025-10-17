import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import MyCourses from '../views/MyCourses.vue'
import Resources from '../views/Resources.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/my-courses',
    name: 'MyCourses',
    component: MyCourses,
    meta: { requiresAuth: true }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  const user = store.getters.currentUser
  
  // 需要登录的路由
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }
  
  // 需要管理员权限的路由
  if (to.meta.requiresAdmin && (!isAuthenticated || user?.role !== 'admin')) {
    next('/')
    return
  }
  
  // 已登录用户访问登录页面
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
    return
  }
  
  next()
})

export default router

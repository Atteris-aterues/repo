<template>
  <div class="px-8 py-6">
    <div class="grid grid-cols-3 gap-8">
      <!-- 左侧课程信息 -->
                <div class="col-span-1">
                    <div class="card p-6">
                        <div class="w-full h-64 mb-4 bg-gray-100 flex items-center justify-center">
                            <img 
                                v-if="selectedCourse.image" 
                                :src="selectedCourse.image" 
                                :alt="selectedCourse.title"
                                class="w-full h-full object-cover rounded-lg"
                                @error="handleImageError"
                            />
                            <div v-else class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                                <span class="text-gray-500">暂无图片</span>
                            </div>
                        </div>
          <h1 class="text-2xl font-bold mb-2">{{ selectedCourse.title }}</h1>
          <p class="text-gray-600 mb-4">课程代码：CS201</p>
          <div class="flex items-center mb-4">
            <span class="iconify text-xl mr-1" data-icon="mdi:account"></span>
            <button 
              class="text-gray-700 hover:text-blue-600 hover:underline cursor-pointer"
              @click="showTeacherDetail = true"
            >
              {{ selectedCourse.instructor }}
            </button>
          </div>
          <div class="flex items-center mb-4">
            <span class="iconify text-xl mr-1" data-icon="mdi:school"></span>
            <span class="text-gray-700">{{ selectedCourse.college }}</span>
          </div>
          <div class="flex items-center mb-4">
            <span class="iconify text-xl mr-1" data-icon="mdi:credit-card"></span>
            <span class="text-gray-700">{{ selectedCourse.credits }}学分</span>
          </div>
          <div class="flex items-center mb-4">
            <span class="iconify text-xl mr-1" data-icon="mdi:calendar"></span>
            <span class="text-gray-700">秋季学期</span>
          </div>
          <div class="mt-6">
            <h3 class="font-bold mb-2">课程简介</h3>
            <p class="text-gray-600">{{ selectedCourse.description }}</p>
          </div>
        </div>

        <!-- 教师信息框 -->
        <div class="card p-6 mt-6">
          <h3 class="text-xl font-bold mb-4">授课教师</h3>
          <div class="flex items-center space-x-4">
            <img 
              :src="getTeacherAvatar(selectedCourse.instructor)" 
              :alt="selectedCourse.instructor"
              class="w-16 h-16 rounded-full object-cover"
              @error="handleTeacherAvatarError"
            />
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ selectedCourse.instructor }}</h4>
              <p class="text-gray-600 mb-2">{{ getTeacherInfo(selectedCourse.instructor).title }} · {{ selectedCourse.college }}</p>
              <p class="text-sm text-gray-500 mb-3">{{ getTeacherInfo(selectedCourse.instructor).research }}</p>
              <button 
                class="btn-primary text-sm"
                @click="showTeacherDetail = true"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧评分和评论 -->
      <div class="col-span-2">
        <!-- 综合评分卡 -->
        <div class="card p-6 mb-8">
          <h2 class="text-xl font-bold mb-4">课程评分</h2>
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-1">88%</div>
              <div class="text-sm text-gray-600">推荐度</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-500 mb-1">3.8</div>
              <div class="text-sm text-gray-600">难度</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-red-500 mb-1">4.1</div>
              <div class="text-sm text-gray-600">压力指数</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-500 mb-1">4.5</div>
              <div class="text-sm text-gray-600">实用性</div>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-bold mb-3">您的评价</h3>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">评分</label>
              <div class="star-rating flex space-x-1">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  class="iconify star text-2xl"
                  :class="{ active: star <= userRating.rating }"
                  data-icon="mdi:star"
                  @click="setRating(star)"
                ></span>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">评论</label>
              <textarea 
                class="w-full border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="userRating.comment"
                placeholder="请输入您的评价..."
              ></textarea>
            </div>
            <button class="btn-primary" @click="submitRating">提交评价</button>
          </div>
        </div>

        <!-- 评论列表 -->
        <div class="card p-6">
          <h2 class="text-xl font-bold mb-4">用户评价（{{ comments.length }}条）</h2>
          
          <div 
            v-for="comment in comments" 
            :key="comment.id"
            class="comment-item"
          >
            <div class="flex items-center mb-2">
              <div class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3"></div>
              <div>
                <h4 class="font-bold">{{ comment.author }}</h4>
                <div class="flex items-center">
                  <div class="star-rating flex mr-2">
                    <span 
                      v-for="star in 5" 
                      :key="star"
                      class="iconify star"
                      :class="{ active: star <= comment.rating }"
                      data-icon="mdi:star"
                    ></span>
                  </div>
                  <span class="text-gray-500 text-sm">{{ comment.date }}</span>
                </div>
              </div>
            </div>
            <p class="text-gray-700">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 教师详情浮窗 -->
    <div v-if="showTeacherDetail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">教师详情</h3>
          <button @click="showTeacherDetail = false" class="text-gray-400 hover:text-gray-600">
            <span class="iconify text-2xl" data-icon="mdi:close"></span>
          </button>
        </div>

        <div class="flex items-start space-x-6">
          <!-- 教师头像 -->
          <div class="flex-shrink-0">
            <img 
              :src="getTeacherAvatar(selectedCourse.instructor)" 
              :alt="selectedCourse.instructor"
              class="w-24 h-24 rounded-full object-cover"
              @error="handleTeacherAvatarError"
            />
          </div>

          <!-- 教师信息 -->
          <div class="flex-1">
            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ selectedCourse.instructor }}</h4>
            <p class="text-gray-600 mb-4">{{ selectedCourse.college }}</p>
            
            <!-- 基本信息 -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span class="text-sm font-medium text-gray-500">职称</span>
                <p class="text-gray-900">{{ getTeacherInfo(selectedCourse.instructor).title }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">研究方向</span>
                <p class="text-gray-900">{{ getTeacherInfo(selectedCourse.instructor).research }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">教龄</span>
                <p class="text-gray-900">{{ getTeacherInfo(selectedCourse.instructor).experience }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">邮箱</span>
                <p class="text-gray-900">{{ getTeacherInfo(selectedCourse.instructor).email }}</p>
              </div>
            </div>

            <!-- 教师简介 -->
            <div class="mb-6">
              <h5 class="text-lg font-semibold text-gray-900 mb-3">个人简介</h5>
              <p class="text-gray-700 leading-relaxed">{{ getTeacherInfo(selectedCourse.instructor).bio }}</p>
            </div>

            <!-- 教学成果 -->
            <div class="mb-6">
              <h5 class="text-lg font-semibold text-gray-900 mb-3">教学成果</h5>
              <ul class="space-y-2">
                <li v-for="achievement in getTeacherInfo(selectedCourse.instructor).achievements" :key="achievement" class="flex items-start">
                  <span class="iconify text-green-500 mr-2 mt-1" data-icon="mdi:check-circle"></span>
                  <span class="text-gray-700">{{ achievement }}</span>
                </li>
              </ul>
            </div>

            <!-- 联系方式 -->
            <div class="flex space-x-4">
              <button class="btn-primary flex items-center">
                <span class="iconify mr-2" data-icon="mdi:email"></span>
                发送邮件
              </button>
              <button class="btn-secondary flex items-center">
                <span class="iconify mr-2" data-icon="mdi:calendar"></span>
                预约咨询
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Courses',
  data() {
    return {
      showTeacherDetail: false
    }
  },
  computed: {
    ...mapState(['selectedCourse', 'comments', 'userRating'])
  },
  methods: {
    ...mapActions(['submitRating']),
    setRating(rating) {
      this.$store.commit('SET_USER_RATING', { 
        rating, 
        comment: this.userRating.comment 
      })
    },
    submitRating() {
      if (this.userRating.rating > 0 && this.userRating.comment.trim()) {
        this.$store.dispatch('submitRating', {
          rating: this.userRating.rating,
          comment: this.userRating.comment
        })
        alert('评价提交成功！')
      } else {
        alert('请选择评分并填写评论')
      }
    },
    handleImageError(event) {
      // 图片加载失败时显示占位符
      event.target.style.display = 'none'
      event.target.nextElementSibling.style.display = 'flex'
    },
    getTeacherAvatar(instructor) {
      // 根据教师姓名返回头像
      const avatars = {
        '张教授': '/images/avatars/teacher.svg',
        '李教授': '/images/avatars/teacher.svg',
        '王教授': '/images/avatars/teacher.svg'
      }
      return avatars[instructor] || '/images/avatars/teacher.svg'
    },
    getTeacherInfo(instructor) {
      // 模拟教师详细信息
      const teacherInfo = {
        '张教授': {
          title: '教授',
          research: '计算机科学、人工智能',
          experience: '15年',
          email: 'zhang@university.edu',
          bio: '张教授是计算机科学领域的知名专家，专注于人工智能和机器学习研究。在国内外顶级期刊发表论文50余篇，主持多项国家级科研项目。教学经验丰富，深受学生喜爱。',
          achievements: [
            '国家自然科学基金重点项目主持人',
            'IEEE Fellow',
            '获得国家教学成果奖',
            '指导学生获得国际竞赛金奖'
          ]
        },
        '李教授': {
          title: '副教授',
          research: '数据结构、算法设计',
          experience: '12年',
          email: 'li@university.edu',
          bio: '李教授在数据结构和算法设计方面有深入研究，编写了多本经典教材。注重理论与实践结合，培养学生的编程能力和算法思维。',
          achievements: [
            '编写《数据结构与算法》教材',
            'ACM竞赛金牌教练',
            '获得省级教学名师称号',
            '主持多项算法优化项目'
          ]
        },
        '王教授': {
          title: '教授',
          research: '宏观经济学、经济政策',
          experience: '18年',
          email: 'wang@university.edu',
          bio: '王教授是宏观经济学领域的权威专家，长期从事经济政策研究。曾担任政府经济顾问，在宏观经济调控方面有丰富经验。',
          achievements: [
            '政府经济政策顾问',
            '发表SSCI论文30余篇',
            '获得经济学杰出贡献奖',
            '主持国家社科基金重大项目'
          ]
        }
      }
      return teacherInfo[instructor] || {
        title: '教授',
        research: '相关领域研究',
        experience: '10年',
        email: 'teacher@university.edu',
        bio: '该教师在教学和科研方面都有丰富经验，致力于培养学生的专业能力和创新思维。',
        achievements: [
          '丰富的教学经验',
          '多项科研成果',
          '深受学生好评'
        ]
      }
    },
    handleTeacherAvatarError(event) {
      // 教师头像加载失败时显示占位符
      event.target.src = '/images/avatars/teacher.svg'
    }
  },
  async created() {
    try {
      // 加载课程列表
      await this.$store.dispatch('fetchCourses')
      
      // 如果没有选中的课程，默认选择第一个
      if (!this.selectedCourse && this.$store.state.courses.length > 0) {
        this.$store.commit('SET_SELECTED_COURSE', this.$store.state.courses[0])
      }
    } catch (error) {
      console.error('加载课程失败:', error)
      this.$store.commit('SET_ERROR', {
        title: '加载失败',
        message: '无法加载课程列表，请稍后重试'
      })
    }
  }
}
</script>

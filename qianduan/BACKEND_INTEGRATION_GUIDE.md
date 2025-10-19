# 后端对接指南

## 已完成的工作

### 1. API 基础架构
- ✅ 创建了 `src/api/` 目录结构
- ✅ 配置了 axios HTTP 客户端
- ✅ 实现了请求/响应拦截器
- ✅ 添加了认证 token 自动处理
- ✅ 实现了全局错误处理

### 2. API 接口模块
- ✅ `src/api/auth.js` - 用户认证相关接口（登录、注册、更新资料、上传头像等）
- ✅ `src/api/course.js` - 课程管理相关接口（课程列表、详情、搜索、选课、评价等）
- ✅ `src/api/resource.js` - 资源管理相关接口（资源列表、上传、下载、评价、收藏等）
- ✅ `src/api/admin.js` - 管理员功能相关接口（用户管理、资源审核、统计数据、系统日志等）
- ✅ `src/api/profile.js` - 个人资料相关接口（个人资料管理、我的课程、我的资源、收藏等）
- ✅ `src/api/upload.js` - 文件上传相关接口（通用文件上传、上传进度、文件管理等）
- ✅ `src/api/notification.js` - 通知相关接口（通知列表、标记已读、删除通知等）
- ✅ `src/api/search.js` - 搜索相关接口（全局搜索、搜索建议、分类搜索等）
- ✅ `src/api/stats.js` - 统计相关接口（个人统计、课程统计、资源统计等）

### 3. Vuex Store 更新
- ✅ 集成了所有 API 接口到 Vuex actions
- ✅ 添加了加载状态管理
- ✅ 添加了错误状态管理
- ✅ 更新了 mutations 以支持 API 数据

### 4. 组件更新
- ✅ 更新了 `App.vue` 添加全局错误处理和加载状态
- ✅ 创建了 `ErrorHandler.vue` 组件
- ✅ 创建了 `LoadingSpinner.vue` 组件
- ✅ 更新了 `Courses.vue` 使用真实 API

### 5. 环境配置
- ✅ 更新了 `vite.config.js` 支持环境变量
- ✅ 添加了 axios 依赖到 `package.json`

## 下一步需要做的工作

### 1. 安装依赖
```bash
npm install axios
# 或者
yarn add axios
```

### 2. 启动后端服务器
```bash
# 安装后端依赖
npm install express cors jsonwebtoken

# 运行后端服务器
node backend-server-example.js
```

### 3. 配置环境变量
创建 `.env` 文件：
```
VUE_APP_API_BASE_URL=http://localhost:3000/api
VUE_APP_ENV=development
```

### 4. 启动前端开发服务器
```bash
npm run dev
# 或者
yarn dev
```

## API 接口说明

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/auth/me` - 获取当前用户信息

### 课程接口
- `GET /api/courses` - 获取课程列表
- `GET /api/courses/:id` - 获取课程详情
- `GET /api/courses/search` - 搜索课程
- `POST /api/courses/:id/enroll` - 选课
- `DELETE /api/courses/:id/enroll` - 退课

### 资源接口
- `GET /api/resources` - 获取资源列表
- `GET /api/resources/:id` - 获取资源详情
- `POST /api/resources` - 上传资源
- `GET /api/resources/:id/download` - 下载资源

### 管理员接口
- `GET /api/admin/users` - 获取用户列表
- `GET /api/admin/resources/pending` - 获取待审核资源
- `POST /api/admin/resources/:id/review` - 审核资源
- `GET /api/admin/statistics` - 获取统计数据

## 使用示例

### 在组件中使用 API
```javascript
// 在 Vue 组件中
export default {
  async created() {
    try {
      // 加载课程列表
      await this.$store.dispatch('fetchCourses')
    } catch (error) {
      console.error('加载失败:', error)
    }
  }
}
```

### 直接调用 API
```javascript
import { authAPI, courseAPI } from '@/api'

// 登录
const result = await authAPI.login({
  username: 'S20201234',
  password: '123456'
})

// 获取课程
const courses = await courseAPI.getCourses({
  page: 1,
  limit: 10
})
```

## 错误处理

系统会自动处理以下错误：
- 网络连接错误
- 认证失败 (401)
- 权限不足 (403)
- 资源不存在 (404)
- 服务器错误 (500)

错误信息会通过全局错误处理组件显示给用户。

## 注意事项

1. **后端服务器**: 当前提供的是示例服务器，实际项目中需要连接真实数据库
2. **认证机制**: 使用 JWT token 进行身份验证
3. **跨域问题**: 后端已配置 CORS 支持
4. **文件上传**: 资源上传需要处理 multipart/form-data
5. **分页**: 所有列表接口都支持分页参数

## 测试建议

1. 先启动后端服务器
2. 启动前端开发服务器
3. 测试登录功能
4. 测试课程列表加载
5. 测试资源上传和下载
6. 测试管理员功能

## 后续优化

1. 添加请求缓存机制
2. 实现离线数据存储
3. 添加请求重试机制
4. 优化加载状态显示
5. 添加数据验证


# 教育资源共享平台

这是一个基于Vue 2和Vite构建的教育资源共享平台单页应用。

## 功能特性

- 🔐 **用户认证**: 登录、注册、权限管理
- 🏠 **首页**: 课程筛选、热门课程推荐、最新资源展示
- 📚 **课程信息**: 课程详情、评分系统、用户评价、教师详情
- 📅 **我的选课**: 课程表、选课统计、退课功能
- 📁 **资源广场**: 资源分类、搜索、上传功能
- 👤 **个人中心**: 用户信息、贡献记录、收藏管理
- ⚙️ **后台管理**: 数据统计、用户管理、内容审核
- 🖼️ **图片系统**: 课程封面、用户头像、Logo图标

## 技术栈

- **前端框架**: Vue 2.7.14
- **构建工具**: Vite 5.0.0
- **路由管理**: Vue Router 3.6.5
- **状态管理**: Vuex 3.6.2
- **样式框架**: Tailwind CSS 3.3.6
- **图标库**: Iconify
- **图表库**: ECharts 5.4.3

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── NavBar.vue      # 导航栏
│   ├── CourseCard.vue  # 课程卡片
│   └── ResourceCard.vue # 资源卡片
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── Login.vue       # 登录页
│   ├── Courses.vue     # 课程信息页
│   ├── MyCourses.vue   # 我的选课页
│   ├── Resources.vue   # 资源广场页
│   ├── Profile.vue    # 个人中心页
│   └── Admin.vue       # 后台管理页
├── router/             # 路由配置
│   └── index.js
├── store/              # Vuex状态管理
│   └── index.js
├── App.vue             # 根组件
├── main.js             # 入口文件
└── style.css           # 全局样式
public/
├── images/             # 图片资源
│   ├── courses/        # 课程封面
│   ├── avatars/        # 用户头像
│   ├── resources/      # 资源图标
│   └── icons/          # 系统图标
└── index.html          # 入口HTML
```

## 安装和运行

### 开发环境

#### 1. 安装依赖

```bash
# 使用npm安装
npm install

# 或使用yarn安装（推荐）
yarn install
```

#### 2. 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 生产环境部署

#### 1. 构建生产版本

```bash
npm run build
```

#### 2. 启动生产服务器

```bash
npm run serve
```

服务器将在 `http://0.0.0.0:3000` 启动，支持外部访问

#### 3. 使用Docker部署

```bash
# 构建Docker镜像
docker build -t education-platform .

# 运行容器
docker run -p 3000:80 education-platform

# 或使用docker-compose
docker-compose up -d
```

#### 4. 云服务器部署步骤

1. **上传代码到服务器**
   ```bash
   scp -r . user@your-server:/path/to/app
   ```

2. **在服务器上安装依赖**
   ```bash
   ssh user@your-server
   cd /path/to/app
   npm install
   # 或使用 yarn install
   ```

3. **构建和启动**
   ```bash
   npm run build
   npm run serve
   ```

4. **使用PM2管理进程（推荐）**
   ```bash
   npm install -g pm2
   pm2 start serve.js --name "education-platform"
   pm2 save
   pm2 startup
   ```

5. **配置Nginx反向代理（可选）**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 主要功能说明

### 用户认证系统
- 支持学生、教师、管理员三种角色
- 登录状态持久化存储
- 路由权限控制
- 导航栏权限过滤
- 快速登录功能（测试账号）

### 测试账号
- **学生账号**: 用户名 `S20201234`，密码 `123456`
- **教师账号**: 用户名 `T20200001`，密码 `123456`
- **管理员账号**: 用户名 `admin`，密码 `123456`

### 快速登录
登录页面提供两种快速登录按钮：
- 🔵 **学生登录**: 自动填入学生测试账号
- 🔴 **管理员登录**: 自动填入管理员测试账号

### 响应式数据管理
- 使用Vuex管理全局状态
- 课程、资源、用户等数据统一管理
- 支持搜索、筛选、评分等交互功能

### 组件化设计
- 按功能模块拆分为独立组件
- 可复用的卡片组件设计
- 统一的样式和交互规范

### 路由导航
- 使用Vue Router实现单页应用导航
- 支持浏览器前进后退
- 路由级别的组件懒加载

### 功能特性
- **课程跳转**: 首页点击课程卡片"查看详情"按钮跳转到课程信息页
- **教师详情**: 课程信息页面包含教师信息框和详情浮窗
  - 课程框下方独立的教师信息框
  - 教师基本信息（职称、研究方向、教龄、邮箱）
  - 个人简介和教学成果
  - 联系方式和预约咨询功能
- **课程表功能**: 我的选课页面包含完整的课程表展示
  - 周次切换（第1-20周）
  - 时间网格显示（周一至周日）
  - 课程信息展示（时间、地点、教师）
  - 选课统计（已选课程数、总学分、本周课程数、平均评分）
- **权限控制**: 导航栏根据用户角色显示不同菜单项
  - 未登录：首页、资源广场
  - 已登录：增加我的选课、个人中心
  - 管理员：增加后台管理

### 样式系统
- 保持原有Tailwind CSS样式
- 自定义CSS类与Tailwind结合
- 响应式设计适配不同屏幕

## 开发说明

### 添加新页面
1. 在 `src/views/` 创建新的Vue组件
2. 在 `src/router/index.js` 添加路由配置
3. 在 `src/components/NavBar.vue` 添加导航链接

### 添加新组件
1. 在 `src/components/` 创建组件文件
2. 在需要的页面中导入并使用
3. 遵循Vue 2组件开发规范

### 状态管理
- 在 `src/store/index.js` 中添加新的state、mutations、actions
- 使用mapState、mapGetters、mapActions等辅助函数
- 保持状态的单向数据流

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

// 这是一个简单的后端服务器示例
// 实际项目中应该使用 Express.js + 数据库

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = 3000
const JWT_SECRET = 'your-secret-key'

// 中间件
app.use(cors())
app.use(express.json())

// 模拟数据库
const users = [
  { id: 'S20201234', name: '张明同学', role: 'student', college: '计算机学院', grade: '2022级', password: '123456' },
  { id: 'T20200001', name: '李教授', role: 'teacher', college: '计算机学院', password: '123456' },
  { id: 'admin', name: '管理员', role: 'admin', college: '系统管理', password: '123456' }
]

const courses = [
  {
    id: 1,
    title: '计算机科学导论',
    instructor: '张教授',
    college: '计算机学院',
    rating: 4.2,
    credits: 3,
    description: '本课程介绍计算机科学的基本概念，包括算法、数据结构、编程基础等。',
    image: '/images/courses/computer-science.svg'
  },
  {
    id: 2,
    title: '数据结构与算法',
    instructor: '李教授',
    college: '计算机学院',
    rating: 4.7,
    credits: 4,
    description: '深入学习常用数据结构及其算法实现，掌握算法分析与设计的基本方法。',
    image: '/images/courses/data-structure.svg'
  }
]

// 认证中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ code: 401, message: '访问令牌缺失' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ code: 403, message: '访问令牌无效' })
    }
    req.user = user
    next()
  })
}

// 认证相关路由
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  
  const user = users.find(u => u.id === username && u.password === password)
  if (!user) {
    return res.status(401).json({ code: 401, message: '用户名或密码错误' })
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({
    code: 200,
    message: '登录成功',
    data: {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        college: user.college,
        grade: user.grade
      },
      token
    }
  })
})

app.post('/api/auth/register', (req, res) => {
  const { username, studentId, email, password, userType } = req.body
  
  // 检查用户是否已存在
  const existingUser = users.find(u => u.id === studentId)
  if (existingUser) {
    return res.status(400).json({ code: 400, message: '用户已存在' })
  }

  // 创建新用户
  const newUser = {
    id: studentId,
    name: username,
    role: userType,
    college: '计算机学院',
    grade: '2023级',
    password
  }
  users.push(newUser)

  const token = jwt.sign(
    { id: newUser.id, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({
    code: 200,
    message: '注册成功',
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
        role: newUser.role,
        college: newUser.college,
        grade: newUser.grade
      },
      token
    }
  })
})

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({ code: 404, message: '用户不存在' })
  }

  res.json({
    code: 200,
    message: '获取用户信息成功',
    data: {
      id: user.id,
      name: user.name,
      role: user.role,
      college: user.college,
      grade: user.grade
    }
  })
})

// 课程相关路由
app.get('/api/courses', (req, res) => {
  const { page = 1, limit = 10, college, credits, rating } = req.query
  
  let filteredCourses = [...courses]
  
  if (college && college !== '全部学院') {
    filteredCourses = filteredCourses.filter(course => course.college === college)
  }
  
  if (credits && credits !== '不限学分') {
    const creditsNum = parseInt(credits)
    filteredCourses = filteredCourses.filter(course => course.credits === creditsNum)
  }
  
  if (rating && rating !== '全部评分') {
    const minRating = parseFloat(rating.replace('分以上', ''))
    filteredCourses = filteredCourses.filter(course => course.rating >= minRating)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + parseInt(limit)
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

  res.json({
    code: 200,
    message: '获取课程列表成功',
    data: paginatedCourses,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredCourses.length,
      pages: Math.ceil(filteredCourses.length / limit)
    }
  })
})

app.get('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id)
  const course = courses.find(c => c.id === courseId)
  
  if (!course) {
    return res.status(404).json({ code: 404, message: '课程不存在' })
  }

  res.json({
    code: 200,
    message: '获取课程详情成功',
    data: course
  })
})

// 资源相关路由
app.get('/api/resources', (req, res) => {
  // 模拟资源数据
  const resources = [
    {
      id: 1,
      title: '数据结构期末复习重点',
      course: '数据结构与算法',
      semester: '2023秋季',
      author: '李同学',
      downloads: 326,
      type: 'pdf',
      rating: 4.0
    }
  ]

  res.json({
    code: 200,
    message: '获取资源列表成功',
    data: resources
  })
})

// 管理员相关路由
app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: '权限不足' })
  }

  const userList = users.map(user => ({
    id: user.id,
    name: user.name,
    college: user.college,
    status: '正常'
  }))

  res.json({
    code: 200,
    message: '获取用户列表成功',
    data: userList
  })
})

app.get('/api/admin/statistics', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: '权限不足' })
  }

  const statistics = {
    totalUsers: users.length,
    totalCourses: courses.length,
    totalResources: 12857,
    userGrowth: 12.5,
    courseGrowth: 5.2,
    resourceGrowth: 18.3
  }

  res.json({
    code: 200,
    message: '获取统计数据成功',
    data: statistics
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`后端服务器运行在 http://localhost:${PORT}`)
  console.log(`API基础URL: http://localhost:${PORT}/api`)
})

module.exports = app

# 教育资源共享平台 API 接口文档

## 基础信息

- **基础URL**: `http://localhost:3000/api`
- **认证方式**: Bearer Token
- **数据格式**: JSON

## 认证相关接口

### 1. 用户登录
- **URL**: `POST /auth/login`
- **描述**: 用户登录获取访问令牌
- **请求参数**:
  ```json
  {
    "username": "string", // 用户名或学号
    "password": "string"  // 密码
  }
  ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "登录成功",
    "data": {
      "user": {
        "id": "string",
        "name": "string",
        "role": "student|teacher|admin",
        "college": "string",
        "grade": "string"
      },
      "token": "string"
    }
  }
  ```

### 2. 用户注册
- **URL**: `POST /auth/register`
- **描述**: 新用户注册
- **请求参数**:
  ```json
  {
    "username": "string",
    "studentId": "string",
    "email": "string",
    "password": "string",
    "userType": "student|teacher|admin"
  }
  ```

### 3. 获取当前用户信息
- **URL**: `GET /auth/me`
- **描述**: 获取当前登录用户信息
- **请求头**: `Authorization: Bearer <token>`

## 课程相关接口

### 1. 获取课程列表
- **URL**: `GET /courses`
- **描述**: 获取课程列表，支持分页和筛选
- **查询参数**:
  - `page`: 页码 (默认: 1)
  - `limit`: 每页数量 (默认: 10)
  - `college`: 学院筛选
  - `credits`: 学分筛选
  - `rating`: 评分筛选

### 2. 获取课程详情
- **URL**: `GET /courses/:id`
- **描述**: 获取指定课程的详细信息

### 3. 搜索课程
- **URL**: `GET /courses/search`
- **描述**: 根据关键词搜索课程
- **查询参数**:
  - `keyword`: 搜索关键词
  - `filters`: 筛选条件

### 4. 选课
- **URL**: `POST /courses/:id/enroll`
- **描述**: 学生选课
- **请求头**: `Authorization: Bearer <token>`

### 5. 退课
- **URL**: `DELETE /courses/:id/enroll`
- **描述**: 学生退课

## 资源相关接口

### 1. 获取资源列表
- **URL**: `GET /resources`
- **描述**: 获取资源列表
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
  - `courseTitle`: 课程筛选
  - `resourceType`: 类型筛选
  - `resourceRating`: 评分筛选

### 2. 上传资源
- **URL**: `POST /resources`
- **描述**: 上传新资源
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "title": "string",
    "courseId": "string",
    "semester": "string",
    "type": "pdf|word|presentation|excel",
    "file": "file", // 文件上传
    "description": "string"
  }
  ```

### 3. 下载资源
- **URL**: `GET /resources/:id/download`
- **描述**: 下载资源文件

## 管理员相关接口

### 1. 获取用户列表
- **URL**: `GET /admin/users`
- **描述**: 获取所有用户列表（管理员权限）
- **请求头**: `Authorization: Bearer <token>`

### 2. 获取待审核资源
- **URL**: `GET /admin/resources/pending`
- **描述**: 获取待审核的资源列表

### 3. 审核资源
- **URL**: `POST /admin/resources/:id/review`
- **描述**: 审核资源（通过/拒绝）
- **请求参数**:
  ```json
  {
    "action": "approve|reject",
    "comment": "string"
  }
  ```

### 4. 获取统计数据
- **URL**: `GET /admin/statistics`
- **描述**: 获取平台统计数据

## 错误响应格式

```json
{
  "code": 400,
  "message": "错误描述",
  "error": "详细错误信息"
}
```

## 状态码说明

- `200`: 成功
- `400`: 请求参数错误
- `401`: 未授权/认证失败
- `403`: 权限不足
- `404`: 资源不存在
- `500`: 服务器内部错误

## 使用示例

### 前端调用示例

```javascript
// 登录
const loginData = await authAPI.login({
  username: 'S20201234',
  password: '123456'
})

// 获取课程列表
const courses = await courseAPI.getCourses({
  page: 1,
  limit: 10,
  college: '计算机学院'
})

// 上传资源
const formData = new FormData()
formData.append('title', '数据结构笔记')
formData.append('courseId', '1')
formData.append('file', file)
const result = await resourceAPI.uploadResource(formData)
```

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
- **响应**:
  ```json
  {
    "code": 200,
    "message": "获取用户信息成功",
    "data": {
      "id": "string",
      "name": "string",
      "role": "student|teacher|admin",
      "college": "string",
      "grade": "string",
      "email": "string",
      "avatar": "string",
      "phone": "string",
      "createdAt": "string"
    }
  }
  ```

### 4. 更新用户信息
- **URL**: `PUT /auth/profile`
- **描述**: 更新当前用户的基本信息
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "college": "string",
    "grade": "string"
  }
  ```

### 5. 上传用户头像
- **URL**: `POST /auth/avatar`
- **描述**: 上传用户头像
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**: `FormData` 格式
  - `avatar`: 头像文件 (image/*)

### 6. 修改密码
- **URL**: `PUT /auth/password`
- **描述**: 修改用户密码
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string",
    "confirmPassword": "string"
  }
  ```

### 7. 刷新Token
- **URL**: `POST /auth/refresh`
- **描述**: 刷新访问令牌
- **请求头**: `Authorization: Bearer <token>`

### 8. 用户登出
- **URL**: `POST /auth/logout`
- **描述**: 用户登出
- **请求头**: `Authorization: Bearer <token>`

### 9. 忘记密码
- **URL**: `POST /auth/forgot-password`
- **描述**: 发送密码重置邮件
- **请求参数**:
  ```json
  {
    "email": "string"
  }
  ```

### 10. 重置密码
- **URL**: `POST /auth/reset-password`
- **描述**: 通过验证码重置密码
- **请求参数**:
  ```json
  {
    "email": "string",
    "code": "string",
    "newPassword": "string"
  }
  ```

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

### 4. 获取资源详情
- **URL**: `GET /resources/:id`
- **描述**: 获取资源详细信息

### 5. 更新资源信息
- **URL**: `PUT /resources/:id`
- **描述**: 更新资源信息（仅资源上传者）
- **请求头**: `Authorization: Bearer <token>`

### 6. 删除资源
- **URL**: `DELETE /resources/:id`
- **描述**: 删除资源（仅资源上传者或管理员）
- **请求头**: `Authorization: Bearer <token>`

### 7. 获取资源评价
- **URL**: `GET /resources/:id/reviews`
- **描述**: 获取资源的用户评价
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量

### 8. 提交资源评价
- **URL**: `POST /resources/:id/reviews`
- **描述**: 对资源进行评价
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "rating": "number", // 1-5星评分
    "comment": "string" // 评价内容
  }
  ```

### 9. 获取我的资源
- **URL**: `GET /resources/my-resources`
- **描述**: 获取当前用户上传的资源
- **请求头**: `Authorization: Bearer <token>`

### 10. 获取收藏的资源
- **URL**: `GET /resources/favorites`
- **描述**: 获取用户收藏的资源
- **请求头**: `Authorization: Bearer <token>`

### 11. 收藏/取消收藏资源
- **URL**: `POST /resources/:id/favorite`
- **描述**: 收藏或取消收藏资源
- **请求头**: `Authorization: Bearer <token>`

### 12. 获取资源统计
- **URL**: `GET /resources/:id/stats`
- **描述**: 获取资源下载和评价统计

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

### 5. 更新用户状态
- **URL**: `PUT /admin/users/:id/status`
- **描述**: 更新用户状态（正常/限制/封禁）
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "status": "normal|limited|banned",
    "reason": "string" // 状态变更原因
  }
  ```

### 6. 删除用户
- **URL**: `DELETE /admin/users/:id`
- **描述**: 删除用户账户
- **请求头**: `Authorization: Bearer <token>`

### 7. 获取系统日志
- **URL**: `GET /admin/logs`
- **描述**: 获取系统操作日志
- **请求头**: `Authorization: Bearer <token>`
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
  - `type`: 日志类型
  - `startDate`: 开始日期
  - `endDate`: 结束日期

### 8. 批量操作资源
- **URL**: `POST /admin/resources/batch`
- **描述**: 批量审核或删除资源
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "resourceIds": ["string"],
    "action": "approve|reject|delete"
  }
  ```

## 个人资料相关接口

### 1. 获取个人资料
- **URL**: `GET /profile`
- **描述**: 获取当前用户的完整个人资料
- **请求头**: `Authorization: Bearer <token>`

### 2. 更新个人资料
- **URL**: `PUT /profile`
- **描述**: 更新个人资料信息
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "college": "string",
    "grade": "string",
    "bio": "string", // 个人简介
    "interests": ["string"] // 兴趣爱好
  }
  ```

### 3. 上传个人头像
- **URL**: `POST /profile/avatar`
- **描述**: 上传个人头像
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**: `FormData` 格式
  - `avatar`: 头像文件 (image/*)

### 4. 获取我的课程
- **URL**: `GET /profile/my-courses`
- **描述**: 获取我选的所有课程
- **请求头**: `Authorization: Bearer <token>`

### 5. 获取我的资源
- **URL**: `GET /profile/my-resources`
- **描述**: 获取我上传的所有资源
- **请求头**: `Authorization: Bearer <token>`

### 6. 获取我的收藏
- **URL**: `GET /profile/favorites`
- **描述**: 获取我收藏的课程和资源
- **请求头**: `Authorization: Bearer <token>`

## 文件上传相关接口

### 1. 上传文件
- **URL**: `POST /upload`
- **描述**: 通用文件上传接口
- **请求头**: `Authorization: Bearer <token>`
- **请求参数**: `FormData` 格式
  - `file`: 文件
  - `type`: 文件类型 (avatar|resource|document)

### 2. 获取上传进度
- **URL**: `GET /upload/:taskId/progress`
- **描述**: 获取文件上传进度
- **请求头**: `Authorization: Bearer <token>`

### 3. 删除已上传文件
- **URL**: `DELETE /upload/:fileId`
- **描述**: 删除已上传的文件
- **请求头**: `Authorization: Bearer <token>`

## 通知相关接口

### 1. 获取通知列表
- **URL**: `GET /notifications`
- **描述**: 获取用户通知列表
- **请求头**: `Authorization: Bearer <token>`
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
  - `type`: 通知类型
  - `read`: 是否已读

### 2. 标记通知为已读
- **URL**: `PUT /notifications/:id/read`
- **描述**: 标记单个通知为已读
- **请求头**: `Authorization: Bearer <token>`

### 3. 标记所有通知为已读
- **URL**: `PUT /notifications/read-all`
- **描述**: 标记所有通知为已读
- **请求头**: `Authorization: Bearer <token>`

### 4. 删除通知
- **URL**: `DELETE /notifications/:id`
- **描述**: 删除指定通知
- **请求头**: `Authorization: Bearer <token>`

## 搜索相关接口

### 1. 全局搜索
- **URL**: `GET /search`
- **描述**: 全局搜索课程和资源
- **查询参数**:
  - `keyword`: 搜索关键词
  - `type`: 搜索类型 (all|courses|resources)
  - `page`: 页码
  - `limit`: 每页数量

### 2. 搜索建议
- **URL**: `GET /search/suggestions`
- **描述**: 获取搜索建议
- **查询参数**:
  - `keyword`: 搜索关键词
  - `limit`: 建议数量

## 统计相关接口

### 1. 获取个人统计
- **URL**: `GET /stats/personal`
- **描述**: 获取个人统计数据
- **请求头**: `Authorization: Bearer <token>`

### 2. 获取课程统计
- **URL**: `GET /stats/courses`
- **描述**: 获取课程相关统计
- **请求头**: `Authorization: Bearer <token>`

### 3. 获取资源统计
- **URL**: `GET /stats/resources`
- **描述**: 获取资源相关统计
- **请求头**: `Authorization: Bearer <token>`

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

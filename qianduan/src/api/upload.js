import api from './index'

// 文件上传相关API
export const uploadAPI = {
  // 通用文件上传
  uploadFile(file, type = 'document') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        return percentCompleted
      }
    })
  },

  // 获取上传进度
  getUploadProgress(taskId) {
    return api.get(`/upload/${taskId}/progress`)
  },

  // 删除已上传文件
  deleteFile(fileId) {
    return api.delete(`/upload/${fileId}`)
  },

  // 上传资源文件
  uploadResourceFile(file, resourceData) {
    const formData = new FormData()
    formData.append('file', file)
    Object.keys(resourceData).forEach(key => {
      formData.append(key, resourceData[key])
    })
    return api.post('/resources', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

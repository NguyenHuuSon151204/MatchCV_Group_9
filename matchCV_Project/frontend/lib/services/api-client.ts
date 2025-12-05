import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 15000,
})

// Request interceptor: Add auth token and userId
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('matchcv-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add userId to query params if not already present
    const userId = window.localStorage.getItem('matchcv-userId')
    if (userId && !config.params?.userId) {
      config.params = { ...config.params, userId: parseInt(userId, 10) }
    }
  }
  return config
})

// Response interceptor: Unwrap BaseResponseDto and handle errors
apiClient.interceptors.response.use(
  (response) => {
    // Backend returns BaseResponseDto<T> with structure: { Success, Message, Data, Errors }
    const data = response.data
    
    // Check if response follows BaseResponseDto structure
    if (data && typeof data === 'object' && 'Success' in data && 'Data' in data) {
      if (data.Success) {
        // Return the unwrapped Data
        return { ...response, data: data.Data }
      } else {
        // Return error with message
        const error = new Error(data.Message || 'Request failed')
        return Promise.reject({
          ...error,
          response: {
            ...response,
            data: { message: data.Message, errors: data.Errors || [] },
          },
        })
      }
    }
    
    // If not BaseResponseDto structure, return as-is
    return response
  },
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('matchcv-token')
      window.localStorage.removeItem('matchcv-userId')
    }
    
    // Unwrap error response if it's BaseResponseDto
    if (error.response?.data && typeof error.response.data === 'object' && 'Message' in error.response.data) {
      error.message = error.response.data.Message || error.message
    }
    
    return Promise.reject(error)
  }
)

export default apiClient


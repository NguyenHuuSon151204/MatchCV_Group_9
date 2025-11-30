import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data || 'An error occurred')
    } else if (error.request) {
      // Request made but no response
      throw new Error('Network error. Please check your connection.')
    } else {
      // Something else happened
      throw new Error(error.message || 'An error occurred')
    }
  }
)

export default api


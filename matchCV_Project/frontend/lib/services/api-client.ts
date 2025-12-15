import axios from 'axios'

const resolveBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL

  // Default dev backend port
  const defaultBackend = 'http://localhost:5185/api'

  // If running in browser on port 3000, rewrite to backend port 5185
  if (typeof window !== 'undefined') {
    try {
      const url = new URL(window.location.origin)
      if (url.port === '3000') {
        url.port = '5185'
        url.pathname = '/api'
        return url.toString()
      }
    } catch {
      // ignore and fallback
    }
  }

  return defaultBackend
}

const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 15000,
  withCredentials: true, // send/receive auth cookies
})

// Request interceptor: Add auth token and userId (unless explicitly skipped)
apiClient.interceptors.request.use((config) => {
  // Opt-out flag for endpoints that should not filter by userId
  if (config.headers && (config.headers as any)['X-Skip-UserId']) {
    delete (config.headers as any)['X-Skip-UserId']
    return config
  }

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

// Response interceptor: Unwrap BaseResponseDto (camelCase or PascalCase) and handle errors
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data

    const hasCamelEnvelope = data && typeof data === 'object' && 'success' in data && 'data' in data
    const hasPascalEnvelope = data && typeof data === 'object' && 'Success' in data && 'Data' in data

    if (hasCamelEnvelope || hasPascalEnvelope) {
      const success = hasCamelEnvelope ? data.success : data.Success
      const payload = hasCamelEnvelope ? data.data : data.Data
      const message = hasCamelEnvelope ? data.message : data.Message
      const errors = hasCamelEnvelope ? data.errors : data.Errors

      if (success) {
        return { ...response, data: payload }
      }

      const error = new Error(message || 'Request failed')
      return Promise.reject({
        ...error,
        response: {
          ...response,
          data: { message, errors: errors || [] },
        },
      })
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

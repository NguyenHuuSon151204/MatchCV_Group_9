import apiClient from './api-client'

export const adminService = {
  async getSummary() {
    return apiClient.get('/admin/summary')
  },
  
  async getLogs(params?: { page?: number; limit?: number; from?: string; to?: string }) {
    return apiClient.get('/admin/logs', { params })
  },
  
  async updateRecruiter(id: number, data: { displayName?: string; email?: string }) {
    return apiClient.put(`/admin/users/${id}`, data)
  },
  
  async getRecruiters(params?: { page?: number; limit?: number; search?: string }) {
    return apiClient.get('/admin/recruiters', { params })
  },
  
  async getLicenses(params?: { page?: number; limit?: number }) {
    return apiClient.get('/admin/licenses', { params })
  },
  
  async getReports(params?: { from?: string; to?: string }) {
    // Use summary endpoint with date range params
    return apiClient.get('/admin/summary', { params })
  },
  
  async generateLicense(data: { plan: string; expiryDays?: number }) {
    return apiClient.post('/license/generate', data)
  },
  
  async deactivateLicense(id: number) {
    return apiClient.put(`/license/${id}/deactivate`)
  },
  
  async getAISettings() {
    return apiClient.get('/admin/ai-settings')
  },
  
  async updateAISettings(settings: any) {
    return apiClient.put('/admin/ai-settings', settings)
  },
  
  async getVerifications(params?: { status?: string }) {
    const endpoint = params?.status
      ? `/recruiter-verification/admin/all?status=${params.status}`
      : '/recruiter-verification/admin/all'
    return apiClient.get(endpoint)
  },
  
  async getVerificationDetail(id: number) {
    return apiClient.get(`/recruiter-verification/${id}`)
  },
  
  async updateVerificationStatus(id: number, adminId: number, data: { status: string; adminNotes?: string }) {
    return apiClient.put(`/recruiter-verification/admin/${id}/status?adminId=${adminId}`, data)
  },
}

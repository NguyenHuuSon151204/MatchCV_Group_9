import apiClient from './api-client'

export const adminService = {
  async getSummary() {
    return apiClient.get('/admin/summary')
  },

  async getCandidates(params?: { search?: string; status?: string }) {
    return apiClient.get('/admin/candidates', { params })
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

  async getLicenses(params?: { page?: number; limit?: number; search?: string; plan?: string }) {
    return apiClient.get('/admin/licenses', { params })
  },

  async getReports(params?: { from?: string; to?: string }) {
    return apiClient.get('/admin/reports', { params })
  },

  async generateLicense(data: { plan: string; expiryDays?: number }) {
    return apiClient.post('/admin/licenses/generate', data)
  },

  async deactivateLicense(id: number) {
    return apiClient.put(`/license/${id}/deactivate`)
  },

  async updateUserPlan(userId: number, data: { plan: string; expiryDays: number }) {
    return apiClient.put(`/admin/license/user/${userId}/plan`, data)
  },

  async getAISettings() {
    return apiClient.get('/admin/ai-settings')
  },

  async updateAISettings(settings: any) {
    return apiClient.put('/admin/ai-settings', settings)
  },

  async getVerifications(params?: { status?: string }) {
    return apiClient.get('/admin/verifications', { params })
  },

  async getVerificationDetail(id: number) {
    return apiClient.get(`/recruiter-verification/${id}`)
  },

  async updateVerificationStatus(id: number, adminId: number, data: { status: string; adminNotes?: string }) {
    return apiClient.put(`/recruiter-verification/admin/${id}/status?adminId=${adminId}`, data)
  },

  // Jobs Management
  async getAllJobs(params?: { search?: string }) {
    return apiClient.get('/admin/jobs', { params })
  },

  async deleteJob(id: number, reason: string) {
    return apiClient.delete(`/admin/jobs/${id}`, { params: { reason } })
  },

  // Applications Management
  async getAllApplications(params?: { search?: string; status?: string }) {
    return apiClient.get('/admin/applications', { params })
  },

  async updateApplicationStatus(id: number, data: { status: string; adminNotes?: string }) {
    return apiClient.put(`/admin/applications/${id}/status`, data)
  },

  // AI Status
  async getAIStatus() {
    return apiClient.get('/admin/ai-status')
  },

  async getUserLicense(userId: number) {
    return apiClient.get(`/license/user/${userId}`)
  },

  // Ban/Unban Recruiters
  async banRecruiter(id: number, data: { reason: string; durationDays?: number | null }) {
    return apiClient.post(`/admin/recruiters/${id}/ban`, data)
  },

  async unbanRecruiter(id: number) {
    return apiClient.post(`/admin/recruiters/${id}/unban`)
  },

  // License Management
  async deleteLicense(id: number) {
    return apiClient.delete(`/admin/licenses/${id}`)
  },

  // Document Operations
  async viewDocument(id: number) {
    return apiClient.get(`/documents/${id}/view`, { responseType: 'blob' })
  },

  async downloadDocument(id: number) {
    return apiClient.get(`/documents/${id}/download`, { responseType: 'blob' })
  },
}

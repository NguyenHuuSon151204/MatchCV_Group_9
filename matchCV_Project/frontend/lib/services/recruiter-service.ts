import apiClient from './api-client'

export const recruiterService = {
  async getDashboard() {
    const response = await apiClient.get('/recruiter/dashboard')
    // Backend returns data directly (not wrapped in BaseResponseDto)
    return response.data || response
  },
  
  async getJobs(params?: { q?: string; company?: string }) {
    const response = await apiClient.get('/recruiter/jobs', { params })
    // Backend returns array directly
    return response.data || response
  },
  
  async getJob(id: number) {
    const response = await apiClient.get(`/recruiter/jobs/${id}`)
    // Backend returns object directly
    return response.data || response
  },
  
  async createJob(jobData: any) {
    const response = await apiClient.post('/recruiter/jobs', jobData)
    return response.data
  },
  
  async updateJob(id: number, jobData: any) {
    const response = await apiClient.put(`/recruiter/jobs/${id}`, jobData)
    return response.data
  },
  
  async deleteJob(id: number) {
    await apiClient.delete(`/recruiter/jobs/${id}`)
  },
  
  async getApplications(jobId: number, params?: { status?: string; minScore?: number }) {
    const response = await apiClient.get(`/recruiter/jobs/${jobId}/applications`, { params })
    // Backend returns array directly
    return response.data || response
  },
  
  async getApplication(applicationId: number) {
    const response = await apiClient.get(`/recruiter/applications/${applicationId}`)
    // Backend returns object directly
    return response.data || response
  },
  
  async updateApplication(jobId: number, applicationId: number, data: { status: string }) {
    // Backend uses PATCH /api/recruiter/applications/{id}/status
    await apiClient.patch(`/recruiter/applications/${applicationId}/status`, { status: data.status })
  },
  
  async deleteApplication(jobId: number, applicationId: number) {
    // Backend uses DELETE /api/recruiter/applications/{id}
    await apiClient.delete(`/recruiter/applications/${applicationId}`)
  },
  
  async getVerificationStatus(recruiterId: number) {
    const response = await apiClient.get(`/recruiter-verification/status?recruiterId=${recruiterId}`)
    // Backend returns object directly
    return response.data || response
  },
  
  async submitVerification(recruiterId: number, formData: FormData) {
    const response = await apiClient.post(`/recruiter-verification/submit?recruiterId=${recruiterId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // Backend returns object directly
    return response.data || response
  },
}

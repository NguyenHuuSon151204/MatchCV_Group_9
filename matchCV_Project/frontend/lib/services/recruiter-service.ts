import apiClient from './api-client'

export const recruiterService = {
  async getDashboard() {
    return apiClient.get('/recruiter/dashboard')
  },
  
  async getJobs(params?: { q?: string; company?: string }) {
    return apiClient.get('/recruiter/jobs', { params })
  },
  
  async getJob(id: number) {
    return apiClient.get(`/recruiter/jobs/${id}`)
  },
  
  async createJob(jobData: any) {
    return apiClient.post('/recruiter/jobs', jobData)
  },
  
  async updateJob(id: number, jobData: any) {
    return apiClient.put(`/recruiter/jobs/${id}`, jobData)
  },
  
  async deleteJob(id: number) {
    return apiClient.delete(`/recruiter/jobs/${id}`)
  },
  
  async getApplications(jobId: number, params?: { status?: string; minScore?: number }) {
    return apiClient.get(`/recruiter/jobs/${jobId}/applications`, { params })
  },
  
  async updateApplication(jobId: number, applicationId: number, data: any) {
    return apiClient.put(`/recruiter/jobs/${jobId}/applications/${applicationId}`, data)
  },
  
  async deleteApplication(jobId: number, applicationId: number) {
    return apiClient.delete(`/recruiter/jobs/${jobId}/applications/${applicationId}`)
  },
  
  async getVerificationStatus(recruiterId: number) {
    return apiClient.get(`/recruiter-verification/status?recruiterId=${recruiterId}`)
  },
  
  async submitVerification(recruiterId: number, formData: FormData) {
    return apiClient.post(`/recruiter-verification/submit?recruiterId=${recruiterId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

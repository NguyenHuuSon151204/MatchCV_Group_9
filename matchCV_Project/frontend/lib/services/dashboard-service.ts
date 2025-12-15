import apiClient from '@/lib/services/api-client'
import { DashboardMetrics } from '@/lib/types'

const mockMetrics: DashboardMetrics = {
  totalCVs: 12,
  analyzedCVs: 8,
  exportedCVs: 5,
  averageScore: 82,
  activity: [
    {
      id: '1',
      title: 'Uploaded CV',
      description: 'Software Engineer Resume uploaded',
      timestamp: '10 min ago',
    },
    {
      id: '2',
      title: 'Analyzed CV',
      description: 'AI analyzed Product Manager Resume',
      timestamp: '35 min ago',
    },
    {
      id: '3',
      title: 'AI Rewrite',
      description: 'Summary rewritten for Marketing CV',
      timestamp: '1 hr ago',
    },
    {
      id: '4',
      title: 'Exported CV',
      description: 'Data Analyst Resume exported to PDF',
      timestamp: '2 hr ago',
    },
  ],
}

export const dashboardService = {
  async getMetrics(): Promise<DashboardMetrics> {
    try {
      // Backend only has recruiter dashboard route; call it and tolerate 401/404
      const response = await apiClient.get<DashboardMetrics>('/recruiter/dashboard')
      return response.data
    } catch (error: any) {
      const status = error?.response?.status
      if (status === 401 || status === 404) {
        console.info('[dashboardService] dashboard endpoint unavailable, using mock metrics')
      } else {
        console.warn('[dashboardService] fallback to mock metrics', error)
      }
      return mockMetrics
    }
  },
}

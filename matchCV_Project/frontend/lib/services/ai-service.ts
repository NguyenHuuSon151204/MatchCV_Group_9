import apiClient from '@/lib/services/api-client'
import { JDAnalysisResult, RewritePayload, RewriteResponse } from '@/lib/types'

const mockRewrite: RewriteResponse = {
  output:
    'Led multi-disciplinary teams to launch AI-powered resume intelligence, improving recruiter throughput by 32% and elevating candidate match quality across 120+ roles.',
  highlights: [
    'Quantified impact (32% recruiter throughput)',
    'Leadership and AI-product positioning',
    'Clear scope and scale (120+ roles)',
  ],
}

export const aiService = {
  async analyzeJD(description: string): Promise<JDAnalysisResult> {
    const response = await apiClient.post<JDAnalysisResult>('/ai/analyze-jd', { description })
    return response.data
  },

  async rewriteSection(payload: RewritePayload): Promise<RewriteResponse> {
    try {
      const userId = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
      const params = userId ? { userId: parseInt(userId, 10) } : {}
      const response = await apiClient.post<RewriteResponse>('/ai/rewrite', {
        documentId: parseInt(payload.cvId, 10),
        section: payload.section,
        instructions: payload.instructions,
      }, { params })
      return response.data
    } catch (error) {
      console.warn('[aiService.rewriteSection] fallback', error)
      return mockRewrite
    }
  },
}


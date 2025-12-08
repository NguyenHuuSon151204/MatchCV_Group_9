import apiClient from '@/lib/services/api-client'
import { JDAnalysisResult, RewritePayload, RewriteResponse } from '@/lib/types'

const mockJDAnalysis: JDAnalysisResult = {
  skills: ['React', 'Node.js', 'System Design', 'Team leadership'],
  priorities: ['5+ years experience', 'SaaS delivery', 'Cloud-native', 'Mentorship'],
  suggestions: [
    'Emphasize cloud architecture achievements.',
    'Highlight measurable impact for each role.',
    'Add certifications relevant to React or AWS.',
  ],
}

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
    try {
      const response = await apiClient.post<JDAnalysisResult>('/ai/analyze-jd', { description })
      return response.data
    } catch (error) {
      console.warn('[aiService.analyzeJD] falling back to mock data', error)
      return mockJDAnalysis
    }
  },

  async rewriteSection(payload: RewritePayload): Promise<RewriteResponse> {
    try {
      const response = await apiClient.post<RewriteResponse>('/ai/rewrite', payload)
      return response.data
    } catch (error) {
      console.warn('[aiService.rewriteSection] fallback', error)
      return mockRewrite
    }
  },
}


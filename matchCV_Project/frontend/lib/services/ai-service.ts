import apiClient from '@/lib/services/api-client'
import { JDAnalysisResult, RewriteResponse, ScoringResult } from '@/lib/types'

export const aiService = {
  async analyzeJD(payload: { description: string; cvText: string; industry?: string; level?: string }): Promise<ScoringResult> {
    try {
      const userId =
        typeof window !== 'undefined'
          ? Number.parseInt(window.localStorage.getItem('matchcv-userId') || '', 10) || undefined
          : undefined

      const response = await apiClient.post<{ data: ScoringResult }>('/ai/analyze-jd', {
        jobDescription: payload.description,
        cvText: payload.cvText,
        industry: payload.industry ?? 'IT',
        level: payload.level ?? 'Mid',
        userId,
      })
      return (response.data as any).data || (response as any).data
    } catch (error) {
      console.warn('[aiService.analyzeJD] failed', error)
      throw error
    }
  },

  async rewriteSection(payload: { text: string; section?: string; instructions?: string }): Promise<RewriteResponse> {
    try {
      const response = await apiClient.post<{ data: RewriteResponse }>('/ai/rewrite', {
        text: payload.text,
        section: payload.section,
        instructions: payload.instructions,
      })
      return (response.data as any).data || (response as any).data
    } catch (error) {
      console.warn('[aiService.rewriteSection] failed', error)
      throw error
    }
  },
}


import apiClient from '@/lib/services/api-client'
import { JDAnalysisResult, RewriteResponse, ScoringResult } from '@/lib/types'

export const aiService = {
  async analyzeJD(payload: { description: string; cvText: string; industry?: string; level?: string }): Promise<ScoringResult> {
    try {
      const userId =
        typeof window !== 'undefined'
          ? Number.parseInt(window.localStorage.getItem('matchcv-userId') || '', 10) || undefined
          : undefined

      const body = {
        jobDescription: payload.description,
        cvText: payload.cvText,
        industry: payload.industry ?? 'IT',
        level: payload.level ?? 'Mid',
        userId,
      }

      console.info('[aiService.analyzeJD] sending', {
        hasJobDescription: !!body.jobDescription,
        jobDescriptionLength: body.jobDescription?.length ?? 0,
        cvTextLength: body.cvText?.length ?? 0,
        industry: body.industry,
        level: body.level,
        userId: body.userId,
      })

      const response = await apiClient.post<{ data: ScoringResult }>('/ai/analyze-jd', body)
      console.info('[aiService.analyzeJD] response', response.status, response.data)

      const unwrapped = (response.data as any).data || (response as any).data
      if ((unwrapped as any)?.success === false) {
        throw new Error((unwrapped as any)?.message || 'Analyze JD failed')
      }

      return unwrapped
    } catch (error) {
      const axiosErr = error as any
      const msg =
        axiosErr?.response?.data?.message ||
        axiosErr?.response?.data?.error ||
        axiosErr?.message ||
        'Analyze JD failed'
      console.warn('[aiService.analyzeJD] failed', msg, axiosErr?.response?.data)
      throw new Error(msg)
    }
  },

  async rewriteSection(payload: { text: string; section?: string; instructions?: string }): Promise<RewriteResponse> {
    try {
      const userId =
        typeof window !== 'undefined'
          ? Number.parseInt(window.localStorage.getItem('matchcv-userId') || '', 10) || undefined
          : undefined

      const body = {
        text: payload.text,
        section: payload.section,
        instructions: payload.instructions,
        userId,
      }

      console.info('[aiService.rewriteSection] sending', {
        textLength: body.text?.length ?? 0,
        hasSection: !!body.section,
        hasInstructions: !!body.instructions,
        userId: body.userId,
      })

      const response = await apiClient.post<{ data: RewriteResponse }>('/ai/rewrite', body)
      console.info('[aiService.rewriteSection] response', response.status, response.data)

      const unwrapped = (response.data as any).data || (response as any).data
      if ((unwrapped as any)?.success === false) {
        throw new Error((unwrapped as any)?.message || 'Rewrite failed')
      }
      return unwrapped
    } catch (error) {
      const axiosErr = error as any
      const msg =
        axiosErr?.response?.data?.message ||
        axiosErr?.response?.data?.error ||
        axiosErr?.message ||
        'Rewrite failed'
      console.warn('[aiService.rewriteSection] failed', msg, axiosErr?.response?.data)
      throw new Error(msg)
    }
  },
}

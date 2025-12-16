'use client'

import { useState } from 'react'
import { aiService } from '@/lib/services/ai-service'
import type { JDAnalysisResult, RewriteResponse, ScoringResult } from '@/lib/types'

export function useAnalyze() {
  const [jdAnalysis, setJdAnalysis] = useState<JDAnalysisResult | null>(null)
  const [jdError, setJdError] = useState<string | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [rewriteLoading, setRewriteLoading] = useState(false)
  const [rewriteResult, setRewriteResult] = useState<RewriteResponse | null>(null)
  const [rewriteError, setRewriteError] = useState<string | null>(null)

  const analyzeJD = async (description: string, cvText: string, industry?: string, level?: string) => {
    setAnalysisLoading(true)
    setJdError(null)

    const normalizedCvText = (cvText ?? '').trim() || 'CV content placeholder'

    try {
      const data: ScoringResult = await aiService.analyzeJD({
        description,
        cvText: normalizedCvText,
        industry,
        level,
      })
      // Map scoring result to existing JDAnalysisResult shape for UI reuse
      const priorities = Object.entries(data.breakdown || {})
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}: ${v}%`)
        .slice(0, 6)

      const mapped: JDAnalysisResult = {
        skills: data.highlights || [],
        priorities,
        suggestions: data.warnings || [],
        totalScore: data.totalScore,
        label: data.label,
        color: data.color,
      }

      setJdAnalysis(mapped)
      return mapped
    } catch (error: any) {
      console.error('[useAnalyze] analyzeJD failed', error)
      setJdError(error?.message || 'Analyze JD failed')
      setJdAnalysis(null)
      return null
    } finally {
      setAnalysisLoading(false)
    }
  }

  const rewriteSection = async (payload: { text: string; section?: string; instructions?: string }) => {
    setRewriteLoading(true)
    setRewriteError(null)
    try {
      const data = await aiService.rewriteSection(payload)
      setRewriteResult(data)
      return data
    } catch (error: any) {
      console.error('[useAnalyze] rewrite failed', error)
      setRewriteResult(null)
      setRewriteError(error?.message || 'Rewrite failed')
      return null
    } finally {
      setRewriteLoading(false)
    }
  }

  return {
    jdAnalysis,
    jdError,
    analysisLoading,
    rewriteLoading,
    rewriteResult,
    rewriteError,
    clearRewriteError: () => setRewriteError(null),
    analyzeJD,
    rewriteSection,
  }
}

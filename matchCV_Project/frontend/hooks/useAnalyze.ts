'use client'

import { useState } from 'react'
import { aiService } from '@/lib/services/ai-service'
import type { JDAnalysisResult, RewritePayload, RewriteResponse } from '@/lib/types'

export function useAnalyze() {
  const [jdAnalysis, setJdAnalysis] = useState<JDAnalysisResult | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [jdError, setJdError] = useState<string | null>(null)
  const [rewriteLoading, setRewriteLoading] = useState(false)
  const [rewriteResult, setRewriteResult] = useState<RewriteResponse | null>(null)

  const analyzeJD = async (description: string) => {
    setAnalysisLoading(true)
    setJdError(null)
    try {
      const data = await aiService.analyzeJD(description)
      setJdAnalysis(data)
      return data
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Unable to analyze JD'
      setJdAnalysis(null)
      setJdError(message)
      return null
    } finally {
      setAnalysisLoading(false)
    }
  }

  const rewriteSection = async (payload: RewritePayload) => {
    setRewriteLoading(true)
    try {
      const data = await aiService.rewriteSection(payload)
      setRewriteResult(data)
      return data
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
    analyzeJD,
    rewriteSection,
  }
}


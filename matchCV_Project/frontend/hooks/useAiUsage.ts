'use client'

import { useEffect, useState } from 'react'
import apiClient from '@/lib/services/api-client'

type UsageData = {
  plan: string
  remainingRewrite: number
  remainingJdAnalyze: number
}

export function useAiUsage() {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = async () => {
    try {
      const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
      const userId = userIdStr ? parseInt(userIdStr, 10) : undefined
      await apiClient.post('/ai/usage/reset', null, { params: userId ? { userId } : undefined })
      await fetchUsage()
    } catch (err: any) {
      setError(err?.message || 'Failed to reset usage')
    }
  }

  const fetchUsage = async () => {
    setLoading(true)
    setError(null)
    try {
      const userIdStr = typeof window !== 'undefined' ? window.localStorage.getItem('matchcv-userId') : null
      const userId = userIdStr ? parseInt(userIdStr, 10) : undefined
      const response = await apiClient.get('/ai/usage', {
        params: userId ? { userId } : undefined,
      })
      const data = (response.data as any)?.data || response.data
      if (data) {
        setUsage({
          plan: data.plan || 'Free',
          remainingRewrite: data.remainingRewrite ?? 0,
          remainingJdAnalyze: data.remainingJdAnalyze ?? 0,
        })
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load usage')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsage()
  }, [])

  return { usage, loading, error, refresh: fetchUsage, reset }
}

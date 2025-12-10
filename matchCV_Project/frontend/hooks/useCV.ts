'use client'

import { useCallback, useEffect, useState } from 'react'
import { cvService } from '@/lib/services/cv-service'
import { activityService } from '@/lib/services/activity-service'
import type { AnalyzeResult, CreateCVInput, CV, UpdateCVInput } from '@/lib/types'
import { useToastContext } from '@/contexts/toast-context'

export function useCV() {
  const [cvs, setCvs] = useState<CV[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const toast = useToastContext()

  const fetchCVs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await cvService.getCVs()
      setCvs(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load CVs'
      setError(message)
      toast.error('Failed to load CVs', message)
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchCVs()
  }, [fetchCVs])

  const createCV = useCallback(
    async (payload: CreateCVInput) => {
      try {
        const created = await cvService.createCV(payload)
        toast.success('CV created successfully', `"${payload.name}" has been created`)
        // Refresh to get latest data from backend (includes the new CV)
        await fetchCVs()
        return created
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create CV'
        toast.error('Failed to create CV', message)
        throw err
      }
    },
    [toast, fetchCVs]
  )

  const deleteCV = useCallback(
    async (id: string) => {
      try {
        await cvService.deleteCV(id)
        setCvs((prev) => prev.filter((cv) => cv.id !== id))
        toast.success('CV deleted', 'The CV has been removed')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete CV'
        toast.error('Failed to delete CV', message)
        throw err
      }
    },
    [toast]
  )

  const analyzeCV = useCallback(
    async (id: string): Promise<AnalyzeResult> => {
      try {
        const targetName = cvs.find((cv) => cv.id === id)?.name || id
        const result = await cvService.analyzeCV(id)
        setCvs((prev) =>
          prev.map((cv) => (cv.id === id ? { ...cv, status: 'analyzed', score: result.score } : cv))
        )
        toast.success('CV analyzed', `Score: ${result.score}/100`)
        activityService.add({
          title: 'Analyzed CV',
          description: `AI analyzed "${targetName}"`,
        })
        return result
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to analyze CV'
        toast.error('Analysis failed', message)
        throw err
      }
    },
    [toast]
  )

  const viewCV = useCallback(
    async (id: string) => {
      try {
        const blob = await cvService.downloadCV(id)
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank', 'noopener,noreferrer')
        setTimeout(() => URL.revokeObjectURL(url), 30000)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to open CV'
        toast.error('View CV failed', message)
        throw err
      }
    },
    [toast]
  )

  const updateCV = useCallback(
    async (payload: UpdateCVInput) => {
      try {
        const updated = await cvService.updateCV(payload)
        setCvs((prev) =>
          prev.map((cv) => (cv.id === payload.id ? { ...cv, ...updated } : cv))
        )
        toast.success('CV updated', 'Changes applied')
        return updated
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update CV'
        toast.error('Update failed', message)
        throw err
      }
    },
    [toast]
  )

  const exportCV = useCallback(
    async (id: string, format: 'pdf' | 'docx' | 'json') => {
      try {
        const targetName = cvs.find((cv) => cv.id === id)?.name || id
        const blob = await cvService.exportCV(id, format)
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `cv-${id}.${format === 'json' ? 'json' : format}`
        link.click()
        URL.revokeObjectURL(url)
        toast.success('CV exported', `Downloaded as ${format.toUpperCase()}`)
        activityService.add({
          title: 'Exported CV',
          description: `Exported CV "${targetName}" as ${format.toUpperCase()}`,
        })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to export CV'
        toast.error('Export failed', message)
        throw err
      }
    },
    [toast]
  )

  return {
    cvs,
    loading,
    error,
    refresh: fetchCVs,
    createCV,
    deleteCV,
    analyzeCV,
    updateCV,
    viewCV,
    exportCV,
    setCvs,
  }
}


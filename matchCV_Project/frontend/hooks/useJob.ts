'use client'

import { useCallback, useEffect, useState } from 'react'
import { jobService } from '@/lib/services/job-service'
import type { CreateJobInput, Job, UpdateJobInput } from '@/lib/types'
import { useToastContext } from '@/contexts/toast-context'

export function useJob() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const toast = useToastContext()

  const fetchJobs = useCallback(
    async (searchTerm?: string, status?: string, userId?: number) => {
      setLoading(true)
      setError(null)
      try {
        const data = await jobService.getJobs(searchTerm, status, userId)
        setJobs(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to load jobs'
        setError(message)
        toast.error('Failed to load jobs', message)
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const fetchUserJobs = useCallback(
    async (userId: number) => {
      setLoading(true)
      setError(null)
      try {
        const data = await jobService.getUserJobs(userId)
        setJobs(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to load jobs'
        setError(message)
        toast.error('Failed to load jobs', message)
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const createJob = useCallback(
    async (payload: CreateJobInput) => {
      try {
        const created = await jobService.createJob(payload)
        toast.success('Job created successfully', `"${payload.title}" has been created`)
        await fetchJobs()
        return created
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create job'
        toast.error('Failed to create job', message)
        throw err
      }
    },
    [toast, fetchJobs]
  )

  const updateJob = useCallback(
    async (payload: UpdateJobInput) => {
      try {
        const updated = await jobService.updateJob(payload)
        toast.success('Job updated successfully', 'The job has been updated')
        await fetchJobs()
        return updated
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update job'
        toast.error('Failed to update job', message)
        throw err
      }
    },
    [toast, fetchJobs]
  )

  const deleteJob = useCallback(
    async (id: number) => {
      try {
        await jobService.deleteJob(id)
        setJobs((prev) => prev.filter((job) => job.id !== id))
        toast.success('Job deleted', 'The job has been removed')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete job'
        toast.error('Failed to delete job', message)
        throw err
      }
    },
    [toast]
  )

  const uploadJob = useCallback(
    async (file: File) => {
      try {
        const created = await jobService.uploadJob(file)
        toast.success('Job uploaded successfully', `"${created.title}" has been created from file`)
        await fetchJobs()
        return created
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to upload job'
        toast.error('Failed to upload job', message)
        throw err
      }
    },
    [toast, fetchJobs]
  )

  return {
    jobs,
    loading,
    error,
    refresh: fetchJobs,
    fetchUserJobs,
    createJob,
    updateJob,
    deleteJob,
    uploadJob,
    setJobs,
  }
}


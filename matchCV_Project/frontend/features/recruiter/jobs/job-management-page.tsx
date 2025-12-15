'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { recruiterService } from '@/lib/services/recruiter-service'
import { ArrowUp, ArrowDown, Eye, Trash2 } from 'lucide-react'
import { useToastContext } from '@/contexts/toast-context'
import { cn } from '@/lib/utils'

interface Job {
  id: number
  title: string
  company?: string
  description?: string
  topSkill?: string
  applications?: number
  avgScore?: number
  createdAt: string
}

export function JobManagementPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedJobs, setSelectedJobs] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    search: searchParams?.get('search') || '',
    company: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null)
  const toast = useToastContext()

  useEffect(() => {
    loadJobs()
  }, [filters, sortBy, sortOrder])

  useEffect(() => {
    const fetchVerification = async () => {
      try {
        const recruiterId =
          typeof window !== 'undefined'
            ? parseInt(localStorage.getItem('matchcv-userId') || localStorage.getItem('userId') || '0')
            : 0
        if (!recruiterId) return
        const statusRes = await recruiterService.getVerificationStatus(recruiterId)
        const status =
          statusRes?.status || statusRes?.Status || statusRes?.verificationStatus || statusRes?.VerificationStatus
        if (status) setVerificationStatus(status.toString())
      } catch (err: any) {
        console.warn('Unable to load verification status', err)
      }
    }
    fetchVerification()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = {}
      if (filters.search) params.q = filters.search
      if (filters.company) params.company = filters.company

      const response = await recruiterService.getJobs(params)
      // Handle response - backend returns array directly or wrapped
      let filtered = Array.isArray(response) ? response : (response?.data || response || [])

      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter((job: Job) =>
          job.title?.toLowerCase().includes(searchLower) ||
          job.company?.toLowerCase().includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.topSkill?.toLowerCase().includes(searchLower)
        )
      }

      if (filters.status) {
        filtered = filtered.filter((job: Job) => {
          const count = job.applications || 0
          if (filters.status === 'draft') return count === 0
          if (filters.status === 'open') return count > 0 && count < 5
          if (filters.status === 'reviewing') return count >= 5 && count < 15
          if (filters.status === 'closed') return count >= 15
          return true
        })
      }

      if (filters.dateFrom) {
        filtered = filtered.filter((job: Job) => {
          const jobDate = new Date(job.createdAt)
          const fromDate = new Date(filters.dateFrom)
          return jobDate >= fromDate
        })
      }

      if (filters.dateTo) {
        filtered = filtered.filter((job: Job) => {
          const jobDate = new Date(job.createdAt)
          const toDate = new Date(filters.dateTo)
          toDate.setHours(23, 59, 59, 999)
          return jobDate <= toDate
        })
      }

      filtered.sort((a: Job, b: Job) => {
        let aVal: any = a[sortBy as keyof Job]
        let bVal: any = b[sortBy as keyof Job]

        if (sortBy === 'createdAt') {
          aVal = aVal ? new Date(aVal).getTime() : 0
          bVal = bVal ? new Date(bVal).getTime() : 0
        }

        if (aVal == null) aVal = 0
        if (bVal == null) bVal = 0

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setJobs(filtered)
    } catch (err: any) {
      console.error('Failed to load jobs:', err)
      setError('Failed to load jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const canPostJob = !verificationStatus || verificationStatus.toLowerCase() === 'approved'

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelectJob = (jobId: number) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (jobs.length === 0) return
    if (e.target.checked) {
      setSelectedJobs(jobs.map((j) => j.id).filter((id) => id != null))
    } else {
      setSelectedJobs([])
    }
  }

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)?`)) {
      return
    }

    try {
      await Promise.all(selectedJobs.map((id) => recruiterService.deleteJob(id)))
      alert(`${selectedJobs.length} job(s) deleted successfully!`)
      setSelectedJobs([])
      loadJobs()
    } catch (error) {
      console.error('Failed to delete jobs:', error)
      alert('Failed to delete some jobs. Please try again.')
    }
  }

  const handleDelete = async (jobId: number) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return
    }

    try {
      await recruiterService.deleteJob(jobId)
      alert('Job deleted successfully!')
      loadJobs()
    } catch (error) {
      console.error('Failed to delete job:', error)
      alert('Failed to delete job. Please try again.')
    }
  }

  const handleExportCSV = () => {
    try {
      const csvRows = ['ID,Job Title,Company,Applicants,Avg Score,Top Skill,Status,Created Date']
      jobs.forEach((job) => {
        const status = getStatusBadge(job)
        const avgScore = job.avgScore != null ? Math.round(job.avgScore) : 'N/A'
        const created = job.createdAt
          ? new Date(job.createdAt).toLocaleDateString()
          : 'N/A'
        csvRows.push(
          `${job.id},"${job.title}","${job.company || ''}",${job.applications || 0},${avgScore},"${job.topSkill || 'N/A'}","${status.label}","${created}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `jobs-management-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
  }

  const getStatusBadge = (job: Job) => {
    const count = job.applications || 0
    if (count === 0) return { label: 'Draft', class: 'bg-gray-100 text-gray-800' }
    if (count < 5) return { label: 'Open', class: 'bg-green-100 text-green-800' }
    if (count < 15) return { label: 'Reviewing', class: 'bg-yellow-100 text-yellow-800' }
    return { label: 'Closed', class: 'bg-red-100 text-red-800' }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const companies = [...new Set(jobs.map((j) => j.company))].filter(Boolean).sort()

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / Jobs</div>
          <h1 className="text-2xl font-bold mb-2">Job Management</h1>
          <p className="text-muted-foreground">
            Manage all your job postings with advanced filtering, sorting, and bulk actions
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded hover:bg-accent text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? '↑ Hide Filters' : '↓ Show Filters'}
          </button>
          <button
            className="px-4 py-2 border rounded hover:bg-accent text-sm"
            onClick={handleExportCSV}
          >
            Export CSV
          </button>
          <Link
            href={canPostJob ? '/recruiter/jobs/create' : '#'}
            onClick={(e) => {
              if (!canPostJob) {
                e.preventDefault()
                toast.error('Verification required', 'You cannot post jobs while verification is pending.')
              }
            }}
            className={cn(
              'px-4 py-2 rounded text-sm',
              canPostJob
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            + Create New Job
          </Link>
        </div>
      </div>

      {!canPostJob && (
        <div className="mb-4 rounded-2xl border border-amber-300 bg-amber-100/60 px-4 py-3 text-sm text-amber-900">
          Verification pending or not approved. Please complete recruiter verification to post new jobs.
        </div>
      )}

      {selectedJobs.length > 0 && (
        <div className="mb-4 p-4 bg-accent rounded-lg flex justify-between items-center">
          <div>
            <strong>{selectedJobs.length}</strong> job(s) selected
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 text-sm"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </button>
            <button
              className="px-4 py-2 border rounded hover:bg-accent text-sm"
              onClick={() => setSelectedJobs([])}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {showFilters && (
        <div className="mb-6 p-6 bg-card border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Filters & Search</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use filters to quickly find the jobs you're looking for
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <input
                type="text"
                placeholder="Job title, description..."
                className="w-full px-3 py-2 border rounded"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <select
                className="w-full px-3 py-2 border rounded bg-background text-foreground"
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
              >
                <option value="">All Companies</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border rounded bg-background text-foreground"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="reviewing">Reviewing</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date From</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date To</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                className="w-full px-4 py-2 border rounded hover:bg-accent"
                onClick={() => {
                  setFilters({
                    search: '',
                    company: '',
                    status: '',
                    dateFrom: '',
                    dateTo: '',
                  })
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold">All Jobs</h3>
            <span className="text-sm text-muted-foreground">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by:</label>
            <select
              className="px-3 py-1 border rounded text-sm bg-background text-foreground"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Created Date</option>
              <option value="title">Title</option>
              <option value="company">Company</option>
              <option value="applications">Applicants</option>
              <option value="avgScore">Avg Score</option>
            </select>
            <button
              className="p-1 border rounded hover:bg-accent"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
          </div>
        </div>

        {error && <div className="p-4 text-destructive">{error}</div>}

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading jobs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={jobs.length > 0 && selectedJobs.length === jobs.length}
                      onChange={handleSelectAll}
                      aria-label="Select all jobs"
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium">ID</th>
                  <th className="p-3 text-left text-sm font-medium">JOB TITLE</th>
                  <th className="p-3 text-left text-sm font-medium">COMPANY</th>
                  <th className="p-3 text-left text-sm font-medium">APPLICANTS</th>
                  <th className="p-3 text-left text-sm font-medium">AVG SCORE</th>
                  <th className="p-3 text-left text-sm font-medium">TOP SKILL</th>
                  <th className="p-3 text-left text-sm font-medium">STATUS</th>
                  <th className="p-3 text-left text-sm font-medium">CREATED</th>
                  <th className="p-3 text-left text-sm font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-muted-foreground">
                      No jobs found.{' '}
                      <Link href="/recruiter/jobs/create" className="text-primary hover:underline">
                        Create your first job
                      </Link>
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => {
                    const status = getStatusBadge(job)
                    const isSelected = selectedJobs.includes(job.id)
                    return (
                      <tr
                        key={job.id}
                        className={`border-b hover:bg-accent/50 ${isSelected ? 'bg-accent' : ''}`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectJob(job.id)}
                            aria-label={`Select job ${job.title}`}
                          />
                        </td>
                        <td className="p-3 text-sm">#{job.id}</td>
                        <td className="p-3">
                          <Link
                            href={`/recruiter/jobs/${job.id}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {job.title}
                          </Link>
                        </td>
                        <td className="p-3 text-sm">{job.company || '–'}</td>
                        <td className="p-3 text-sm">{job.applications || 0}</td>
                        <td className="p-3 text-sm">
                          {job.avgScore != null ? `${Math.round(job.avgScore)}%` : '–'}
                        </td>
                        <td className="p-3">
                          {job.topSkill ? (
                            <span className="px-2 py-1 bg-secondary rounded text-xs">
                              {job.topSkill}
                            </span>
                          ) : (
                            '–'
                          )}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{formatDate(job.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Link
                              href={`/recruiter/jobs/${job.id}`}
                              className="p-1 hover:bg-accent rounded"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </Link>
                            <button
                              className="p-1 hover:bg-destructive/10 rounded text-destructive"
                              onClick={() => handleDelete(job.id)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

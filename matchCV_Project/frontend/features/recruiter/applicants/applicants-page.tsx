'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { recruiterService } from '@/lib/services/recruiter-service'
import { Eye, Trash2, ArrowUp, ArrowDown } from 'lucide-react'

interface Job {
  id: number
  title: string
  company?: string
}

interface Applicant {
  id: number
  candidateId?: number
  candidate?: {
    id?: number
    displayName?: string
    email?: string
    plan?: string
  }
  jobId?: number
  jobTitle?: string
  jobCompany?: string
  scoreSnapshot?: number
  status?: string
  matchingSkills?: string[]
  createdAt: string
  updatedAt?: string
  document?: {
    originalName?: string
  }
}

export function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    jobId: '',
    company: '',
    status: '',
    plan: '',
    minScore: '',
    dateFrom: '',
    dateTo: '',
  })
  const [sortBy, setSortBy] = useState('scoreSnapshot')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showApplicantModal, setShowApplicantModal] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [editForm, setEditForm] = useState({
    status: '',
    summary: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadJobs()
    loadApplicants()
  }, [filters, sortBy, sortOrder])

  const loadJobs = async () => {
    try {
      const data = await recruiterService.getJobs()
      setJobs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load jobs:', error)
    }
  }

  const loadApplicants = async () => {
    try {
      setLoading(true)
      setError(null)
      let allApplicants: Applicant[] = []

      if (filters.jobId) {
        const params: any = {}
        if (filters.status) params.status = filters.status
        if (filters.minScore) params.minScore = filters.minScore

        const data = await recruiterService.getApplications(parseInt(filters.jobId), params)
        const job = jobs.find((j) => j.id === parseInt(filters.jobId))
        allApplicants = (Array.isArray(data) ? data : []).map((app: any) => ({
          ...app,
          jobTitle: job?.title || 'Unknown',
          jobCompany: job?.company || '',
          jobId: job?.id,
        }))
      } else {
        const allJobs = await recruiterService.getJobs()
        const jobList = Array.isArray(allJobs) ? allJobs : []
        const promises = jobList.map((job) =>
          recruiterService
            .getApplications(job.id)
            .then((apps: any) =>
              (Array.isArray(apps) ? apps : []).map((app: any) => ({
                ...app,
                jobTitle: job.title,
                jobCompany: job.company,
                jobId: job.id,
              }))
            )
            .catch(() => [])
        )
        const results = await Promise.all(promises)
        allApplicants = results.flat()
      }

      if (filters.status) {
        allApplicants = allApplicants.filter((app) => app.status === filters.status)
      }
      if (filters.minScore) {
        allApplicants = allApplicants.filter(
          (app) =>
            app.scoreSnapshot != null &&
            app.scoreSnapshot >= parseInt(filters.minScore)
        )
      }
      if (filters.company) {
        allApplicants = allApplicants.filter(
          (app) => app.jobCompany === filters.company
        )
      }
      if (filters.plan) {
        allApplicants = allApplicants.filter(
          (app) => app.candidate?.plan === filters.plan
        )
      }
      if (filters.dateFrom) {
        allApplicants = allApplicants.filter((app) => {
          const appDate = new Date(app.createdAt)
          const fromDate = new Date(filters.dateFrom)
          return appDate >= fromDate
        })
      }
      if (filters.dateTo) {
        allApplicants = allApplicants.filter((app) => {
          const appDate = new Date(app.createdAt)
          const toDate = new Date(filters.dateTo)
          toDate.setHours(23, 59, 59, 999)
          return appDate <= toDate
        })
      }

      allApplicants.sort((a, b) => {
        let aVal: any = a[sortBy as keyof Applicant]
        let bVal: any = b[sortBy as keyof Applicant]

        if (sortBy === 'createdAt') {
          aVal = new Date(aVal || 0).getTime()
          bVal = new Date(bVal || 0).getTime()
        }

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setApplicants(allApplicants)
    } catch (error) {
      console.error('Failed to load applicants:', error)
      setError('Failed to load applicants. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === applicants.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(applicants.map((app) => app.id))
    }
  }

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedItems.length} applicant(s)?`
      )
    ) {
      return
    }

    try {
      // Note: API endpoint might need adjustment based on actual backend
      await Promise.all(
        selectedItems.map((id) =>
          recruiterService.deleteApplication(0, id) // jobId might be needed
        )
      )
      setSelectedItems([])
      loadApplicants()
      alert('Selected applicants deleted successfully!')
    } catch (error) {
      console.error('Failed to bulk delete:', error)
      alert('Failed to delete some applicants. Please try again.')
    }
  }

  const handleDeleteApplicant = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return
    }

    try {
      const applicant = applicants.find((a) => a.id === id)
      if (applicant?.jobId) {
        await recruiterService.deleteApplication(applicant.jobId, id)
        loadApplicants()
        alert('Application deleted successfully!')
      }
    } catch (error) {
      console.error('Failed to delete application:', error)
      alert('Failed to delete application. Please try again.')
    }
  }

  const handleViewApplicant = async (appId: number) => {
    try {
      const applicant = applicants.find((a) => a.id === appId)
      if (applicant) {
        setSelectedApplicant(applicant)
        setEditForm({
          status: applicant.status || 'Pending',
          summary: '', // Summary might need to be fetched separately
        })
        setShowApplicantModal(true)
      }
    } catch (error) {
      console.error('Failed to load applicant details:', error)
      alert('Failed to load applicant details. Please try again.')
    }
  }

  const handleSaveChanges = async () => {
    if (!selectedApplicant) return

    try {
      setSaving(true)
      if (selectedApplicant.jobId) {
        await recruiterService.updateApplication(
          selectedApplicant.jobId,
          selectedApplicant.id,
          {
            status: editForm.status,
          }
        )
        await loadApplicants()
        setSelectedApplicant({
          ...selectedApplicant,
          status: editForm.status,
        })
        alert('Applicant information updated successfully!')
        handleCloseModal()
      }
    } catch (error) {
      console.error('Failed to update applicant:', error)
      alert('Failed to update applicant information. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCloseModal = () => {
    setShowApplicantModal(false)
    setSelectedApplicant(null)
    setEditForm({ status: '', summary: '' })
  }

  const handleExportCSV = () => {
    try {
      const csvRows = [
        'Applicant,Email,Job,Company,AI Score,Matching Skills,Status,Applied Date',
      ]
      applicants.forEach((app) => {
        const score =
          app.scoreSnapshot != null ? Math.round(app.scoreSnapshot) : 'N/A'
        const skills =
          app.matchingSkills && app.matchingSkills.length > 0
            ? app.matchingSkills.join('; ')
            : 'None'
        const appliedDate = app.createdAt
          ? new Date(app.createdAt).toLocaleDateString()
          : 'N/A'
        csvRows.push(
          `"${app.candidate?.displayName || 'Unknown'}","${app.candidate?.email || ''}","${app.jobTitle || 'Unknown'}","${app.jobCompany || ''}",${score},"${skills}","${app.status || 'Pending'}","${appliedDate}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `applicants-report-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
  }

  const getStatusBadge = (status?: string) => {
    const badges: Record<string, { label: string; class: string }> = {
      Hired: { label: 'Hired', class: 'bg-green-100 text-green-800' },
      Rejected: { label: 'Rejected', class: 'bg-red-100 text-red-800' },
      Reviewed: { label: 'Reviewed', class: 'bg-yellow-100 text-yellow-800' },
      Pending: { label: 'Pending', class: 'bg-gray-100 text-gray-800' },
    }
    return badges[status || 'Pending'] || badges.Pending
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const companies = [...new Set(jobs.map((j) => j.company))].filter(Boolean).sort()

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / Applicants</div>
          <h1 className="text-2xl font-bold mb-2">Applicants Management</h1>
          <p className="text-muted-foreground">
            Manage all applicants with advanced filtering, sorting, and bulk actions
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
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="mb-4 p-4 bg-accent rounded-lg flex justify-between items-center">
          <div>
            <strong>{selectedItems.length}</strong> applicant(s) selected
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </button>
            <button
              className="px-4 py-2 border rounded hover:bg-accent"
              onClick={() => setSelectedItems([])}
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
            Use filters to quickly find the applicants you're looking for
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Job</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.jobId}
                onChange={(e) => handleFilterChange('jobId', e.target.value)}
              >
                <option value="">All Jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} ({job.company})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <select
                className="w-full px-3 py-2 border rounded"
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
                className="w-full px-3 py-2 border rounded"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Plan</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.plan}
                onChange={(e) => handleFilterChange('plan', e.target.value)}
              >
                <option value="">All Plans</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Min AI Score</label>
              <input
                type="number"
                placeholder="0-100"
                className="w-full px-3 py-2 border rounded"
                min="0"
                max="100"
                value={filters.minScore}
                onChange={(e) => handleFilterChange('minScore', e.target.value)}
              />
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
                    jobId: '',
                    company: '',
                    status: '',
                    plan: '',
                    minScore: '',
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
            <h3 className="font-semibold">All Applicants</h3>
            <span className="text-sm text-muted-foreground">
              {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by:</label>
            <select
              className="px-3 py-1 border rounded text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="scoreSnapshot">AI Score</option>
              <option value="createdAt">Applied Date</option>
              <option value="status">Status</option>
            </select>
            <button
              className="p-1 border rounded hover:bg-accent"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
          </div>
        </div>

        {error && <div className="p-4 text-destructive">{error}</div>}

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading applicants...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length === applicants.length && applicants.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium">APPLICANT</th>
                  <th className="p-3 text-left text-sm font-medium">JOB</th>
                  <th className="p-3 text-left text-sm font-medium">AI SCORE</th>
                  <th className="p-3 text-left text-sm font-medium">PLAN</th>
                  <th className="p-3 text-left text-sm font-medium">MATCHING SKILLS</th>
                  <th className="p-3 text-left text-sm font-medium">STATUS</th>
                  <th className="p-3 text-left text-sm font-medium">APPLIED</th>
                  <th className="p-3 text-left text-sm font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      No applicants found. Applicants will appear here once candidates apply to your
                      jobs.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => {
                    const status = getStatusBadge(app.status)
                    const isSelected = selectedItems.includes(app.id)
                    return (
                      <tr
                        key={app.id}
                        className={`border-b hover:bg-accent/50 ${isSelected ? 'bg-accent' : ''}`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(app.id)}
                          />
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="font-medium">
                              {app.candidate?.displayName || 'Unknown'}
                              {app.candidate?.id && (
                                <span className="text-xs text-muted-foreground">
                                  {' '}
                                  (#{app.candidate.id})
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {app.candidate?.email}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            {app.jobId ? (
                              <Link
                                href={`/recruiter/jobs/${app.jobId}`}
                                className="font-medium text-primary hover:underline"
                              >
                                {app.jobTitle || 'Unknown'}
                              </Link>
                            ) : (
                              <div className="font-medium">{app.jobTitle || 'Unknown'}</div>
                            )}
                            <div className="text-sm text-muted-foreground">{app.jobCompany}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          {app.scoreSnapshot != null ? (
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                              {Math.round(app.scoreSnapshot)}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              app.candidate?.plan?.toLowerCase() === 'pro'
                                ? 'bg-blue-100 text-blue-800'
                                : app.candidate?.plan?.toLowerCase() === 'enterprise'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {app.candidate?.plan || 'Free'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {app.matchingSkills && app.matchingSkills.length > 0 ? (
                              <>
                                {app.matchingSkills.slice(0, 3).map((skill, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-secondary rounded text-xs">
                                    {skill}
                                  </span>
                                ))}
                                {app.matchingSkills.length > 3 && (
                                  <span className="px-2 py-1 bg-secondary rounded text-xs">
                                    +{app.matchingSkills.length - 3}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-muted-foreground text-sm">None</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{formatDateTime(app.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              className="p-1 hover:bg-accent rounded"
                              title="View & Edit Details"
                              onClick={() => handleViewApplicant(app.id)}
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="p-1 hover:bg-destructive/10 rounded text-destructive"
                              title="Delete Application"
                              onClick={() => handleDeleteApplicant(app.id)}
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

      {/* Applicant Detail Modal */}
      {showApplicantModal && selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-card border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Applicant Details</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Candidate Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Name:</div>
                    <div className="font-medium">
                      {selectedApplicant.candidate?.displayName || 'Unknown'}
                      {selectedApplicant.candidate?.id && (
                        <span className="text-xs text-muted-foreground ml-1">
                          (#{selectedApplicant.candidate.id})
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email:</div>
                    <div>{selectedApplicant.candidate?.email || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Plan:</div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        selectedApplicant.candidate?.plan?.toLowerCase() === 'pro'
                          ? 'bg-blue-100 text-blue-800'
                          : selectedApplicant.candidate?.plan?.toLowerCase() === 'enterprise'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedApplicant.candidate?.plan || 'Free'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Job Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Job Title:</div>
                    <div className="font-medium">{selectedApplicant.jobTitle || 'Unknown'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Company:</div>
                    <div>{selectedApplicant.jobCompany || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">AI Score:</div>
                    {selectedApplicant.scoreSnapshot != null ? (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                        {Math.round(selectedApplicant.scoreSnapshot)}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Application Information</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status:</div>
                    <select
                      className="px-3 py-2 border rounded"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      disabled={saving}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Applied Date:</div>
                    <div>{formatDateTime(selectedApplicant.createdAt)}</div>
                  </div>
                  {selectedApplicant.updatedAt && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Last Updated:</div>
                      <div>{formatDateTime(selectedApplicant.updatedAt)}</div>
                    </div>
                  )}
                </div>
              </div>

              {selectedApplicant.matchingSkills && selectedApplicant.matchingSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant.matchingSkills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-secondary rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={handleCloseModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

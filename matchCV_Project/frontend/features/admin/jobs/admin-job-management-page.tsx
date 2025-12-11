'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Settings, Eye, Trash, ArrowUp, ArrowDown, FileText, X, Edit } from 'lucide-react'
import Link from 'next/link'

interface Job {
  id: number
  title: string
  company: string
  description?: string
  createdAt: string
  userId?: number
  recruiterName?: string
  recruiterEmail?: string
  applicationsCount?: number
  avgScore?: number
}

export function AdminJobManagementPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showJobModal, setShowJobModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [deleteReason, setDeleteReason] = useState('')
  const [editForm, setEditForm] = useState({
    title: '',
    company: '',
    description: '',
  })
  const [filters, setFilters] = useState({
    search: '',
    company: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    loadJobs()
  }, [filters, sortBy, sortOrder])

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = {}
      if (filters.search) params.search = filters.search

      const data = await adminService.getAllJobs(params)
      let jobsList = Array.isArray(data) ? data : []

      let filtered = jobsList.map((j: any) => ({
        id: j.id || j.Id,
        title: j.title || j.Title || '',
        company: j.company || j.Company || '',
        description: j.description || j.Description || '',
        createdAt: j.createdAt || j.CreatedAt,
        userId: j.userId || j.UserId,
        recruiterName: j.recruiterName || j.RecruiterName,
        recruiterEmail: j.recruiterEmail || j.RecruiterEmail,
        applicationsCount: j.applicationsCount || j.ApplicationsCount || 0,
        avgScore: j.avgScore || j.AvgScore,
      }))

      if (filters.company) {
        filtered = filtered.filter((j) =>
          j.company.toLowerCase().includes(filters.company.toLowerCase())
        )
      }

      filtered.sort((a, b) => {
        let aVal: any = a[sortBy as keyof Job]
        let bVal: any = b[sortBy as keyof Job]

        if (sortBy === 'createdAt') {
          aVal = aVal ? new Date(aVal).getTime() : 0
          bVal = bVal ? new Date(bVal).getTime() : 0
        }

        if (aVal == null) aVal = ''
        if (bVal == null) bVal = ''

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setJobs(filtered)
    } catch (err: any) {
      console.error('Failed to load jobs:', err)
      setError(err.message || 'Failed to load jobs. Please try again.')
      setJobs([])
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
    if (selectedItems.length === jobs.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(jobs.map((j) => j.id))
    }
  }

  const handleViewJob = (job: Job) => {
    setSelectedJob(job)
    setShowJobModal(true)
  }

  const handleEditJob = (job: Job) => {
    setSelectedJob(job)
    setEditForm({
      title: job.title,
      company: job.company,
      description: job.description || '',
    })
    setShowEditModal(true)
  }

  const handleUpdateJob = async () => {
    if (!selectedJob) return

    try {
      // Use recruiter service to update job
      const { recruiterService } = await import('@/lib/services/recruiter-service')
      await recruiterService.updateJob(selectedJob.id, {
        title: editForm.title,
        company: editForm.company,
        description: editForm.description,
        skills: [], // Keep existing skills
      })
      setShowEditModal(false)
      setSelectedJob(null)
      loadJobs()
      alert('Job updated successfully!')
    } catch (error: any) {
      console.error('Failed to update job:', error)
      alert('Failed to update job. Please try again.')
    }
  }

  const handleDeleteClick = (job: Job) => {
    setSelectedJob(job)
    setDeleteReason('')
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!selectedJob) return
    if (!deleteReason.trim()) {
      alert('Please provide a reason for deleting this job.')
      return
    }

    try {
      await adminService.deleteJob(selectedJob.id, deleteReason)
      setShowDeleteModal(false)
      setDeleteReason('')
      setSelectedJob(null)
      loadJobs()
      alert('Job deleted successfully!')
    } catch (error: any) {
      console.error('Failed to delete job:', error)
      alert('Failed to delete job. Please try again.')
    }
  }

  const handleBulkDelete = async () => {
    const reason = window.prompt(`Please provide a reason for deleting ${selectedItems.length} job(s):`)
    if (!reason || !reason.trim()) {
      alert('Delete reason is required.')
      return
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} job(s)?`)) {
      return
    }

    try {
      await Promise.all(
        selectedItems.map((id) => adminService.deleteJob(id, reason))
      )
      setSelectedItems([])
      loadJobs()
      alert('Selected jobs deleted successfully!')
    } catch (error) {
      console.error('Failed to bulk delete:', error)
      alert('Failed to delete some jobs. Please try again.')
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const companies = [...new Set(jobs.map((j) => j.company))].sort()

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / Jobs</div>
          <h1 className="text-2xl font-bold mb-2">Job Management</h1>
          <p className="text-muted-foreground">
            Manage all jobs posted by recruiters, view job descriptions
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded hover:bg-accent text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? '↑ Hide Filters' : '↓ Show Filters'}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-6 bg-card border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Job title or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
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
          </div>
        </div>
      )}

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      <div className="bg-card border rounded-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="font-semibold">All Jobs</h3>
              <span className="text-sm text-muted-foreground">
                {jobs.length} job{jobs.length !== 1 ? 's' : ''}
                {selectedItems.length > 0 && (
                  <span className="ml-2 text-primary">
                    ({selectedItems.length} selected)
                  </span>
                )}
              </span>
            </div>
            {selectedItems.length > 0 && (
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 text-sm"
                onClick={handleBulkDelete}
              >
                Delete Selected ({selectedItems.length})
              </button>
            )}
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by:</label>
            <select
              className="px-3 py-1 border rounded text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Created Date</option>
              <option value="title">Title</option>
              <option value="company">Company</option>
            </select>
            <button
              className="p-1 border rounded hover:bg-accent"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
          </div>
        </div>

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
                      checked={jobs.length > 0 && selectedItems.length === jobs.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium">ID</th>
                  <th className="p-3 text-left text-sm font-medium">TITLE</th>
                  <th className="p-3 text-left text-sm font-medium">COMPANY</th>
                  <th className="p-3 text-left text-sm font-medium">RECRUITER</th>
                  <th className="p-3 text-left text-sm font-medium">APPLICATIONS</th>
                  <th className="p-3 text-left text-sm font-medium">CREATED</th>
                  <th className="p-3 text-left text-sm font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => {
                    const isSelected = selectedItems.includes(job.id)
                    return (
                      <tr
                        key={job.id}
                        className={`border-b hover:bg-accent/50 ${isSelected ? 'bg-accent' : ''}`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(job.id)}
                          />
                        </td>
                        <td className="p-3 text-sm">#{job.id}</td>
                        <td className="p-3 font-medium">{job.title}</td>
                        <td className="p-3 text-sm">{job.company}</td>
                        <td className="p-3 text-sm">
                          {job.recruiterName ? (
                            <div>
                              <div>{job.recruiterName}</div>
                              <div className="text-xs text-muted-foreground">{job.recruiterEmail}</div>
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td className="p-3 text-sm">{job.applicationsCount || 0}</td>
                        <td className="p-3 text-sm">{formatDate(job.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-1 hover:bg-accent rounded"
                              onClick={() => handleViewJob(job)}
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="p-1 hover:bg-accent rounded"
                              onClick={() => handleEditJob(job)}
                              title="Edit Job"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="p-1 hover:bg-accent rounded text-destructive"
                              onClick={() => handleDeleteClick(job)}
                              title="Delete Job"
                            >
                              <Trash size={16} />
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

      {/* Job Detail Modal */}
      {showJobModal && selectedJob && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowJobModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-card">
              <h3 className="text-lg font-semibold">Job Description</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowJobModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-xl mb-2">{selectedJob.title}</h4>
                <p className="text-muted-foreground">{selectedJob.company}</p>
              </div>
              {selectedJob.recruiterName && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Posted by:</label>
                  <p>
                    {selectedJob.recruiterName} ({selectedJob.recruiterEmail})
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Job ID:</label>
                <p>#{selectedJob.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created:</label>
                <p>{formatDate(selectedJob.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Applications:</label>
                <p>{selectedJob.applicationsCount || 0}</p>
              </div>
              {selectedJob.description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Description:
                  </label>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded">
                      {selectedJob.description}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t flex justify-end">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => setShowJobModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedJob && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowEditModal(false)
            setSelectedJob(null)
            setEditForm({ title: '', company: '', description: '' })
          }}
        >
          <div
            className="bg-card border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit Job</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedJob(null)
                  setEditForm({ title: '', company: '', description: '' })
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="e.g., Senior Fullstack Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  placeholder="e.g., Tech Company Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Description *</label>
                <textarea
                  className="w-full px-3 py-2 border rounded min-h-[200px]"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Enter job description, requirements, responsibilities..."
                />
              </div>
              {selectedJob.recruiterName && (
                <div className="text-sm text-muted-foreground">
                  Posted by: <strong>{selectedJob.recruiterName}</strong> ({selectedJob.recruiterEmail})
                </div>
              )}
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedJob(null)
                  setEditForm({ title: '', company: '', description: '' })
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={handleUpdateJob}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedJob && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowDeleteModal(false)
            setDeleteReason('')
            setSelectedJob(null)
          }}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-destructive">Delete Job</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteReason('')
                  setSelectedJob(null)
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-destructive/10 border border-destructive/20 rounded p-4">
                <p className="text-sm font-medium text-destructive mb-2">Warning: This action cannot be undone!</p>
                <p className="text-sm text-muted-foreground">
                  You are about to permanently delete: <strong>{selectedJob.title}</strong> at {selectedJob.company}
                </p>
                {selectedJob.applicationsCount && selectedJob.applicationsCount > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    This job has {selectedJob.applicationsCount} application(s). Deleting it will affect all related applications.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Deletion *</label>
                <textarea
                  className="w-full px-3 py-2 border rounded min-h-[100px]"
                  placeholder="Enter the reason for deleting this job (e.g., inappropriate content, spam, violation of terms)..."
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteReason('')
                  setSelectedJob(null)
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                onClick={handleDelete}
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


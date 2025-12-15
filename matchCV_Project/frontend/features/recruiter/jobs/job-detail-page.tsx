'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { recruiterService } from '@/lib/services/recruiter-service'
import { SkillChipsInput } from '@/components/ui/skill-chips-input'
import { Edit, Trash2, X, Eye, Download } from 'lucide-react'

interface Job {
  id: number
  title: string
  company?: string
  rawText?: string
  description?: string
  skills?: string[]
  createdAt: string
}

interface Application {
  id: number
  candidateId?: number
  candidate?: {
    id?: number
    displayName?: string
    email?: string
  }
  document?: {
    id: number
    originalName?: string
    storagePath?: string
  }
  scoreSnapshot?: number
  status?: string
  createdAt: string
}

export function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [job, setJob] = useState<Job | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    company: '',
    rawText: '',
    skills: [] as string[],
  })
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null)
  const [showApplicantModal, setShowApplicantModal] = useState(false)

  useEffect(() => {
    if (id) {
      loadJob()
      loadApplications()
    }
  }, [id])

  const loadJob = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await recruiterService.getJob(parseInt(id))
      setJob(data)
      setEditForm({
        title: data.title || '',
        company: data.company || '',
        rawText: data.rawText || data.description || '',
        skills: data.skills || [],
      })
    } catch (err: any) {
      console.error('Failed to load job:', err)
      setError('Failed to load job details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadApplications = async () => {
    try {
      const data = await recruiterService.getApplications(parseInt(id))
      setApplications(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load applications:', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    if (job) {
      setEditForm({
        title: job.title || '',
        company: job.company || '',
        rawText: job.rawText || job.description || '',
        skills: job.skills || [],
      })
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const payload = {
        Title: editForm.title.trim(),
        Company: editForm.company.trim(),
        Description: editForm.rawText.trim(),
        Skills: editForm.skills || [],
      }
      const updated = await recruiterService.updateJob(parseInt(id), payload)
      // Backend returns with camelCase properties
      setJob({
        ...job!,
        title: updated.title || updated.Title || editForm.title,
        company: updated.company || updated.Company || editForm.company,
        rawText: updated.rawText || updated.RawText || updated.description || updated.Description || editForm.rawText,
        skills: updated.skills || updated.Skills || editForm.skills,
      })
      setEditForm({
        title: updated.title || updated.Title || editForm.title,
        company: updated.company || updated.Company || editForm.company,
        rawText: updated.rawText || updated.RawText || updated.description || updated.Description || editForm.rawText,
        skills: updated.skills || updated.Skills || editForm.skills,
      })
      setIsEditing(false)
      alert('Job updated successfully!')
    } catch (error) {
      console.error('Failed to update job:', error)
      alert('Failed to update job. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setSaving(true)
      await recruiterService.deleteJob(parseInt(id))
      alert('Job deleted successfully!')
      router.push('/recruiter/jobs')
    } catch (error) {
      console.error('Failed to delete job:', error)
      alert('Failed to delete job. Please try again.')
    } finally {
      setSaving(false)
      setShowDeleteConfirm(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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

  const handleViewApplicant = (app: Application) => {
    setSelectedApplicant(app)
    setShowApplicantModal(true)
  }

  const handleDownloadSingle = async (appId: number, originalName?: string) => {
    try {
      setDownloading(true)
      const blob = await recruiterService.downloadApplication(appId)
      if (!blob || (blob as any).size === 0) {
        alert('Không tìm thấy file ứng viên.')
        return
      }

      if (blob.type && blob.type.includes('application/json')) {
        const text = await blob.text()
        try {
          const parsed = JSON.parse(text)
          alert(parsed.message || parsed.Message || text || 'Không tìm thấy file ứng viên.')
        } catch {
          alert(text || 'Không tìm thấy file ứng viên.')
        }
        return
      }

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = originalName || `application-${appId}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error: any) {
      console.error('Failed to download applicant file:', error?.response || error)
      const data = error?.response?.data
      if (data instanceof Blob) {
        try {
          const text = await data.text()
          const parsed = JSON.parse(text)
          alert(parsed.message || parsed.Message || text || 'Tải file thất bại.')
          return
        } catch {
          const text = await data.text().catch(() => '')
          alert(text || 'Tải file thất bại.')
          return
        }
      }

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Tải file thất bại.'
      alert(typeof message === 'string' ? message : 'Tải file thất bại.')
    } finally {
      setDownloading(false)
    }
  }

  const handleDownloadAll = async () => {
    try {
      setDownloading(true)
      const blob = await recruiterService.downloadJobApplications(parseInt(id))
      if (!blob || (blob as any).size === 0) {
        alert('No applicant files available to download.')
        return
      }

      // If backend sent an error payload as JSON, show it instead of downloading
      if (blob.type && blob.type.includes('application/json')) {
        const text = await blob.text()
        try {
          const parsed = JSON.parse(text)
          alert(parsed.message || parsed.Message || 'No applicant files available.')
        } catch {
          alert(text || 'No applicant files available.')
        }
        return
      }

      const url = URL.createObjectURL(new Blob([blob], { type: 'application/zip' }))
      const link = document.createElement('a')
      link.href = url
      link.download = `job-${id}-applications.zip`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error: any) {
      console.error('Failed to download applicant files:', error?.response || error)

      // Try to surface meaningful error messages even when response is a Blob
      const data = error?.response?.data
      if (data instanceof Blob) {
        try {
          const text = await data.text()
          const parsed = JSON.parse(text)
          alert(parsed.message || parsed.Message || text || 'Failed to download applicant files.')
          return
        } catch {
          const text = await data.text().catch(() => '')
          alert(text || 'Failed to download applicant files.')
          return
        }
      }

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Failed to download applicant files.'
      alert(typeof message === 'string' ? message : 'Failed to download applicant files.')
    } finally {
      setDownloading(false)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading job details...</div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="p-6">
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
          {error || 'Job not found'}
        </div>
        <Link
          href="/recruiter/jobs"
          className="px-4 py-2 border rounded-lg hover:bg-accent inline-block"
        >
          Back to Jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">
          <Link href="/recruiter/jobs" className="hover:text-foreground">
            Home / Jobs
          </Link>{' '}
          / Job #{id}
        </div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                className="text-2xl font-bold w-full px-3 py-2 border rounded-lg bg-background mb-2"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            ) : (
              <h1 className="text-2xl font-bold mb-2">{job.title || 'Untitled Job'}</h1>
            )}
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>
                <strong>Company:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-background"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  />
                ) : (
                  job.company || 'N/A'
                )}
              </span>
              <span>
                <strong>Created:</strong> {formatDate(job.createdAt)}
              </span>
              <span>
                <strong>Applicants:</strong> {applications.length}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-accent"
                  onClick={handleCancelEdit}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-accent flex items-center gap-2 disabled:opacity-50"
                  onClick={handleDownloadAll}
                  disabled={downloading || applications.length === 0}
                  title={applications.length === 0 ? 'No applicants yet' : 'Download all applicant files'}
                >
                  <Download size={16} />
                  {downloading ? 'Downloading...' : 'Download All'}
                </button>
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-accent flex items-center gap-2"
                  onClick={handleEdit}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 flex items-center gap-2"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="bg-card border rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-accent"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 disabled:opacity-50"
                onClick={handleDelete}
                disabled={saving}
              >
                {saving ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Job Description</h2>
            {isEditing ? (
              <textarea
                className="w-full px-3 py-2 border rounded-lg bg-background min-h-[300px]"
                value={editForm.rawText}
                onChange={(e) => setEditForm({ ...editForm, rawText: e.target.value })}
                placeholder="Enter job description..."
              />
            ) : (
              <div className="prose max-w-none">
                {job.rawText || job.description || 'No description provided.'}
              </div>
            )}
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
            {isEditing ? (
              <SkillChipsInput
                skills={editForm.skills}
                onChange={(skills) => setEditForm({ ...editForm, skills })}
                placeholder="e.g., React, Node.js, SQL..."
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {job.skills && job.skills.length > 0 ? (
                  job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">No skills specified</span>
                )}
              </div>
            )}
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Applicants ({applications.length})</h2>
            {applications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No applicants yet.</div>
            ) : (
              <div className="space-y-2">
                {applications.slice(0, 10).map((app) => (
                  <div
                    key={app.id}
                    className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => handleViewApplicant(app)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">
                          {app.candidate?.displayName || 'Unknown'}
                          {app.candidate?.id && (
                            <span className="text-xs text-muted-foreground ml-1">
                              (#{app.candidate.id})
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {app.candidate?.email}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1 border rounded text-xs hover:bg-accent disabled:opacity-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadSingle(app.id, app.document?.originalName)
                          }}
                          disabled={downloading}
                          title="Tải CV ứng viên"
                        >
                          Download CV
                        </button>
                        {app.scoreSnapshot != null ? (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                            {Math.round(app.scoreSnapshot)}%
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-secondary rounded text-sm">N/A</span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(app.status).class}`}>
                          {app.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {applications.length > 10 && (
                  <div className="pt-4">
                    <Link
                      href="/recruiter/applicants"
                      className="px-4 py-2 border rounded-lg hover:bg-accent inline-block"
                    >
                      View All Applicants
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-4">Job Statistics</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Applicants</div>
                <div className="text-2xl font-bold">{applications.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Average Score</div>
                <div className="text-2xl font-bold">
                  {applications.length > 0
                    ? Math.round(
                        applications.reduce(
                          (sum, app) => sum + (app.scoreSnapshot || 0),
                          0
                        ) / applications.length
                      )
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Detail Modal */}
      {showApplicantModal && selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowApplicantModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Applicant Details</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowApplicantModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Name</div>
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
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div>{selectedApplicant.candidate?.email || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">AI Score</div>
                {selectedApplicant.scoreSnapshot != null ? (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                    {Math.round(selectedApplicant.scoreSnapshot)}%
                  </span>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(selectedApplicant.status).class}`}>
                  {selectedApplicant.status || 'Pending'}
                </span>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Applied Date</div>
                <div>{formatDateTime(selectedApplicant.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

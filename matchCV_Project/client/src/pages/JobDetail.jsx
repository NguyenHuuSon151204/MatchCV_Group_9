import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './JobDetail.css'
import '../components/Button.css'
import api from '../services/api'

function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    company: '',
    rawText: '',
  })
  const [saving, setSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
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
      const data = await api.get(`/recruiter/jobs/${id}`)
      setJob(data)
      setEditForm({
        title: data.title || '',
        company: data.company || '',
        rawText: data.rawText || '',
      })
    } catch (error) {
      console.error('Failed to load job:', error)
      setError('Failed to load job details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadApplications = async () => {
    try {
      const data = await api.get(`/recruiter/jobs/${id}/applications`)
      setApplications(data || [])
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
        rawText: job.rawText || '',
      })
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const updatedJob = {
        ...job,
        ...editForm,
      }
      await api.put(`/recruiter/jobs/${id}`, updatedJob)
      await loadJob()
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
      await api.delete(`/recruiter/jobs/${id}`)
      alert('Job deleted successfully!')
      navigate('/jobs')
    } catch (error) {
      console.error('Failed to delete job:', error)
      alert('Failed to delete job. Please try again.')
    } finally {
      setSaving(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleBan = async () => {
    try {
      // Tạm thời dùng update để set status, sau này có thể thêm IsActive field
      const updatedJob = {
        ...job,
        // Có thể thêm field IsActive hoặc Status vào model
      }
      await api.put(`/recruiter/jobs/${id}`, updatedJob)
      await loadJob()
      alert('Job status updated!')
    } catch (error) {
      console.error('Failed to update job status:', error)
      alert('Failed to update job status. Please try again.')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleViewApplicant = (app) => {
    setSelectedApplicant(app)
    setShowApplicantModal(true)
  }

  const getStatusBadge = (status) => {
    const badges = {
      Hired: { label: 'Hired', class: 'badge-success' },
      Rejected: { label: 'Rejected', class: 'badge-danger' },
      Reviewed: { label: 'Reviewed', class: 'badge-warning' },
      Pending: { label: 'Pending', class: 'badge-neutral' },
    }
    return badges[status] || { label: status, class: 'badge-neutral' }
  }

  if (loading) {
    return (
      <div className="job-detail">
        <div className="loading">Loading job details...</div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="job-detail">
        <div className="error-message">
          {error || 'Job not found'}
        </div>
        <button className="btn btn-outline" onClick={() => navigate('/jobs')}>
          Back to Jobs
        </button>
      </div>
    )
  }

  return (
    <div className="job-detail">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">
            <span onClick={() => navigate('/jobs')} className="breadcrumb-link">
              Home / Jobs
            </span>
            {' / '}
            <span>Job #{id}</span>
          </div>
          <div className="header-top">
            <h1 className="page-title">
              {isEditing ? (
                <input
                  type="text"
                  className="edit-input-title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              ) : (
                job.title || 'Untitled Job'
              )}
            </h1>
            <div className="header-actions">
              {isEditing ? (
                <>
                  <button
                    className="btn btn-outline"
                    onClick={handleCancelEdit}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline" onClick={handleEdit}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="job-meta">
            <span className="meta-item">
              <strong>Company:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  className="edit-input-meta"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                />
              ) : (
                job.company
              )}
            </span>
            <span className="meta-item">
              <strong>Created:</strong> {formatDate(job.createdAt)}
            </span>
            <span className="meta-item">
              <strong>Applicants:</strong> {applications.length}
            </span>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this job? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn btn-outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={saving}>
                {saving ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="job-content-grid">
        <div className="job-main">
          <div className="content-card">
            <h2 className="card-title">Job Description</h2>
            {isEditing ? (
              <textarea
                className="edit-textarea"
                value={editForm.rawText}
                onChange={(e) => setEditForm({ ...editForm, rawText: e.target.value })}
                rows={15}
                placeholder="Enter job description..."
              />
            ) : (
              <div className="job-description">
                {job.rawText || 'No description provided.'}
              </div>
            )}
          </div>

          <div className="content-card">
            <h2 className="card-title">Applicants ({applications.length})</h2>
            {applications.length === 0 ? (
              <div className="empty-state">No applicants yet.</div>
            ) : (
              <div className="applicants-list">
                {applications.slice(0, 10).map((app) => (
                  <div 
                    key={app.id} 
                    className="applicant-item"
                    onClick={() => handleViewApplicant(app)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="applicant-info">
                      <strong>
                        {app.candidate?.displayName || 'Unknown'}
                        {app.candidate?.id && <span className="applicant-id"> (#{app.candidate.id})</span>}
                      </strong>
                      <span className="applicant-email">{app.candidate?.email}</span>
                    </div>
                    <div className="applicant-score">
                      {app.scoreSnapshot != null ? (
                        <span className="score-badge">
                          {Math.round(app.scoreSnapshot)}%
                        </span>
                      ) : (
                        <span className="score-badge neutral">N/A</span>
                      )}
                    </div>
                  </div>
                ))}
                {applications.length > 10 && (
                  <div className="view-all">
                    <button className="btn btn-outline" onClick={() => navigate('/applicants')}>
                      View All Applicants
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="job-sidebar">
          <div className="content-card">
            <h3 className="card-title">Job Information</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Job ID</span>
                <span className="info-value">#{job.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value">
                  <span className="badge badge-success">Active</span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Created Date</span>
                <span className="info-value">{formatDate(job.createdAt)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Total Applicants</span>
                <span className="info-value">{applications.length}</span>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="action-buttons-vertical">
              <button className="btn btn-outline" onClick={() => navigate('/jobs')}>
                ← Back to Jobs
              </button>
              <button className="btn btn-outline" onClick={handleBan}>
                {job.isActive !== false ? 'Ban Job' : 'Unban Job'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Detail Modal */}
      {showApplicantModal && selectedApplicant && (
        <div className="modal-overlay" onClick={() => setShowApplicantModal(false)}>
          <div className="modal-content applicant-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Applicant Details</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowApplicantModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="applicant-detail-section">
                <h4>Candidate Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">
                      {selectedApplicant.candidate?.displayName || 'Unknown'}
                      {selectedApplicant.candidate?.id && <span className="id-badge"> (#{selectedApplicant.candidate.id})</span>}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedApplicant.candidate?.email || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Plan:</span>
                    <span className="detail-value">
                      <span className={`plan-badge plan-${(selectedApplicant.candidate?.plan || 'free').toLowerCase()}`}>
                        {selectedApplicant.candidate?.plan || 'Free'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="applicant-detail-section">
                <h4>Application Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">
                      <span className={`badge ${getStatusBadge(selectedApplicant.status).class}`}>
                        {getStatusBadge(selectedApplicant.status).label}
                      </span>
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">AI Score:</span>
                    <span className="detail-value">
                      {selectedApplicant.scoreSnapshot != null ? (
                        <span className="score-badge">
                          {Math.round(selectedApplicant.scoreSnapshot)}%
                        </span>
                      ) : (
                        <span className="score-badge neutral">N/A</span>
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Applied Date:</span>
                    <span className="detail-value">{formatDateTime(selectedApplicant.createdAt)}</span>
                  </div>
                </div>
              </div>

              {selectedApplicant.summary && (
                <div className="applicant-detail-section">
                  <h4>Summary</h4>
                  <p className="summary-text">{selectedApplicant.summary}</p>
                </div>
              )}

              {selectedApplicant.matchingSkills && selectedApplicant.matchingSkills.length > 0 && (
                <div className="applicant-detail-section">
                  <h4>Matching Skills</h4>
                  <div className="skills-container">
                    {selectedApplicant.matchingSkills.map((skill, idx) => (
                      <span key={idx} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedApplicant.document && (
                <div className="applicant-detail-section">
                  <h4>CV Document</h4>
                  <div className="detail-item">
                    <span className="detail-label">File Name:</span>
                    <span className="detail-value">{selectedApplicant.document.originalName || 'N/A'}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary" 
                onClick={() => setShowApplicantModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetail

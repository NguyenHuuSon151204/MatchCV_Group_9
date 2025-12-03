'use client'
import { useEffect, useState } from 'react'
import './VerificationManagement.css'
import '../components/Button.css'
import api from '../services/api'
import CircularProgress from '../components/CircularProgress'
import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from '../components/Icons'

function VerificationManagement() {
  const [verifications, setVerifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVerification, setSelectedVerification] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusForm, setStatusForm] = useState({
    status: 'Approved',
    adminNotes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [adminId, setAdminId] = useState(null)

  useEffect(() => {
    // Get admin ID from localStorage or context
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setAdminId(parseInt(storedUserId))
    } else {
      // Demo: use query param or default to 1
      const urlParams = new URLSearchParams(window.location.search)
      const id = urlParams.get('adminId') || '1'
      setAdminId(parseInt(id))
    }
    loadVerifications()
  }, [filterStatus])

  const loadVerifications = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const endpoint = filterStatus 
        ? `/recruiter-verification/admin/all?status=${filterStatus}`
        : '/recruiter-verification/admin/all'
      
      const data = await api.get(endpoint)
      const verificationsList = Array.isArray(data) ? data : (data?.data || data || [])
      
      // Normalize property names
      const normalized = verificationsList.map(v => ({
        id: v.id || v.Id,
        recruiterId: v.recruiterId || v.RecruiterId,
        recruiter: v.recruiter || v.Recruiter || {},
        companyName: v.companyName || v.CompanyName || '',
        companyEmail: v.companyEmail || v.CompanyEmail || '',
        companyPhone: v.companyPhone || v.CompanyPhone,
        status: v.status || v.Status || 'Pending',
        adminNotes: v.adminNotes || v.AdminNotes,
        reviewedBy: v.reviewedBy || v.ReviewedBy,
        reviewedAt: v.reviewedAt || v.ReviewedAt,
        createdAt: v.createdAt || v.CreatedAt
      }))

      // Sort
      normalized.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]

        if (sortBy === 'createdAt' || sortBy === 'reviewedAt') {
          aVal = aVal ? new Date(aVal).getTime() : 0
          bVal = bVal ? new Date(bVal).getTime() : 0
        }

        if (aVal == null) aVal = ''
        if (bVal == null) bVal = ''

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        return sortOrder === 'asc' ? comparison : -comparison
      })

      setVerifications(normalized)
    } catch (err) {
      console.error('Failed to load verifications:', err)
      setError(err.message || 'Failed to load verification requests.')
    } finally {
      setLoading(false)
    }
  }

  const loadVerificationDetail = async (id) => {
    try {
      const data = await api.get(`/recruiter-verification/${id}`)
      setSelectedVerification(data)
      setShowDetailModal(true)
    } catch (err) {
      console.error('Failed to load verification detail:', err)
      setError(err.message || 'Failed to load verification details.')
    }
  }

  const handleStatusChange = (verification) => {
    setSelectedVerification(verification)
    setStatusForm({
      status: verification.status === 'Pending' ? 'Approved' : verification.status,
      adminNotes: verification.adminNotes || ''
    })
    setShowStatusModal(true)
  }

  const handleSubmitStatus = async (e) => {
    e.preventDefault()
    
    if (!selectedVerification || !adminId) {
      setError('Missing verification or admin ID')
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      await api.put(
        `/recruiter-verification/admin/${selectedVerification.id}/status?adminId=${adminId}`,
        statusForm
      )

      setShowStatusModal(false)
      await loadVerifications()
    } catch (err) {
      console.error('Failed to update verification status:', err)
      setError(err.message || 'Failed to update verification status.')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-badge-approved'
      case 'rejected':
        return 'status-badge-rejected'
      case 'pending':
        return 'status-badge-pending'
      default:
        return 'status-badge-pending'
    }
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (column) => {
    if (sortBy !== column) return <ArrowUpDownIcon />
    return sortOrder === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />
  }

  if (loading) {
    return (
      <div className="verification-management">
        <div className="loading-container">
          <CircularProgress />
          <p>Loading verification requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="verification-management">
      <div className="breadcrumbs">Home / Admin / Verification Management</div>
      <div className="page-header">
        <div className="page-header-content">
          <h1>Recruiter Verification Management</h1>
          <p>Review and manage company verification requests from recruiters</p>
        </div>
        <div className="header-actions">
          <button
            className="btn btn-secondary"
            onClick={loadVerifications}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="verification-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable">
                ID {getSortIcon('id')}
              </th>
              <th onClick={() => handleSort('companyName')} className="sortable">
                Company {getSortIcon('companyName')}
              </th>
              <th onClick={() => handleSort('companyEmail')} className="sortable">
                Email {getSortIcon('companyEmail')}
              </th>
              <th>Recruiter</th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {getSortIcon('status')}
              </th>
              <th onClick={() => handleSort('createdAt')} className="sortable">
                Submitted {getSortIcon('createdAt')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {verifications.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  No verification requests found.
                </td>
              </tr>
            ) : (
              verifications.map((verification) => (
                <tr key={verification.id}>
                  <td>{verification.id}</td>
                  <td>{verification.companyName}</td>
                  <td>{verification.companyEmail}</td>
                  <td>
                    {verification.recruiter?.displayName || verification.recruiter?.DisplayName || 'N/A'}
                    <br />
                    <small className="text-muted">
                      {verification.recruiter?.email || verification.recruiter?.Email || ''}
                    </small>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(verification.status)}`}>
                      {verification.status}
                    </span>
                  </td>
                  <td>
                    {verification.createdAt
                      ? new Date(verification.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => loadVerificationDetail(verification.id)}
                      >
                        View
                      </button>
                      {verification.status === 'Pending' && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleStatusChange(verification)}
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedVerification && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Verification Details</h2>
              <button
                className="modal-close"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Company Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Company Name:</label>
                    <span>{selectedVerification.companyName}</span>
                  </div>
                  <div className="detail-item">
                    <label>Company Email:</label>
                    <span>{selectedVerification.companyEmail}</span>
                  </div>
                  {selectedVerification.companyPhone && (
                    <div className="detail-item">
                      <label>Company Phone:</label>
                      <span>{selectedVerification.companyPhone}</span>
                    </div>
                  )}
                  {selectedVerification.companyAddress && (
                    <div className="detail-item">
                      <label>Company Address:</label>
                      <span>{selectedVerification.companyAddress}</span>
                    </div>
                  )}
                  {selectedVerification.taxCode && (
                    <div className="detail-item">
                      <label>Tax Code:</label>
                      <span>{selectedVerification.taxCode}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h3>Documents</h3>
                <div className="document-list">
                  {selectedVerification.businessLicense && (
                    <div className="document-item">
                      <strong>Business License:</strong>
                      <span>{selectedVerification.businessLicense.originalName}</span>
                      <span className="file-size">
                        ({(selectedVerification.businessLicense.sizeBytes / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                  )}
                  {selectedVerification.companyProof && (
                    <div className="document-item">
                      <strong>Company Proof:</strong>
                      <span>{selectedVerification.companyProof.originalName}</span>
                      <span className="file-size">
                        ({(selectedVerification.companyProof.sizeBytes / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h3>Status Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className={`status-badge ${getStatusBadgeClass(selectedVerification.status)}`}>
                      {selectedVerification.status}
                    </span>
                  </div>
                  {selectedVerification.reviewedBy && (
                    <div className="detail-item">
                      <label>Reviewed By:</label>
                      <span>
                        {selectedVerification.reviewedBy.displayName || selectedVerification.reviewedBy.DisplayName}
                      </span>
                    </div>
                  )}
                  {selectedVerification.reviewedAt && (
                    <div className="detail-item">
                      <label>Reviewed At:</label>
                      <span>
                        {new Date(selectedVerification.reviewedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedVerification.adminNotes && (
                    <div className="detail-item full-width">
                      <label>Admin Notes:</label>
                      <span>{selectedVerification.adminNotes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {selectedVerification.status === 'Pending' && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowDetailModal(false)
                    handleStatusChange(selectedVerification)
                  }}
                >
                  Review & Update Status
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedVerification && (
        <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Verification Status</h2>
              <button
                className="modal-close"
                onClick={() => setShowStatusModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitStatus} className="status-form">
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={statusForm.status}
                  onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                  required
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="adminNotes">Admin Notes:</label>
                <textarea
                  id="adminNotes"
                  value={statusForm.adminNotes}
                  onChange={(e) => setStatusForm({ ...statusForm, adminNotes: e.target.value })}
                  rows="4"
                  placeholder="Optional notes about the verification decision..."
                  maxLength="500"
                />
                <small>{statusForm.adminNotes.length}/500 characters</small>
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Update Status'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowStatusModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationManagement


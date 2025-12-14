'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Eye, CheckCircle, X, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

interface Verification {
  id: number
  recruiterId: number
  recruiter?: {
    displayName?: string
    email?: string
  }
  companyName: string
  companyEmail: string
  companyPhone?: string
  companyAddress?: string
  taxCode?: string
  status: string
  adminNotes?: string
  reviewedBy?: {
    displayName?: string
  }
  reviewedAt?: string
  createdAt: string
  businessLicense?: {
    originalName: string
    sizeBytes: number
  }
  companyProof?: {
    originalName: string
    sizeBytes: number
  }
}

export function VerificationManagementPage() {
  const [verifications, setVerifications] = useState<Verification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusForm, setStatusForm] = useState({
    status: 'Approved',
    adminNotes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [adminId, setAdminId] = useState<number | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId') || localStorage.getItem('matchcv-userId')
    if (storedUserId) {
      setAdminId(parseInt(storedUserId))
    } else {
      setAdminId(1) // Default fallback
    }
    loadVerifications()
  }, [filterStatus])

  const loadVerifications = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = filterStatus ? { status: filterStatus } : undefined
      const response = await adminService.getVerifications(params)
      const verificationsList = Array.isArray(response.data) ? response.data : []

      const normalized = verificationsList.map((v: any) => ({
        id: v.id || v.Id,
        recruiterId: v.recruiterId || v.RecruiterId,
        recruiter: {
          displayName: v.recruiterName || v.RecruiterName || 'N/A',
          email: v.recruiterEmail || v.RecruiterEmail || ''
        },
        companyName: v.companyName || v.CompanyName || '',
        companyEmail: v.companyEmail || v.CompanyEmail || '',
        companyPhone: v.companyPhone || v.CompanyPhone,
        companyAddress: v.companyAddress || v.CompanyAddress,
        taxCode: v.taxCode || v.TaxCode,
        status: v.status || v.Status || 'Pending',
        adminNotes: v.adminNotes || v.AdminNotes,
        reviewedBy: v.reviewedBy || v.ReviewedBy,
        reviewedAt: v.reviewedAt || v.ReviewedAt,
        createdAt: v.submittedAt || v.SubmittedAt || v.createdAt || v.CreatedAt,
        businessLicense: v.businessLicense || v.BusinessLicense,
        companyProof: v.companyProof || v.CompanyProof,
      }))

      normalized.sort((a, b) => {
        let aVal: any = a[sortBy as keyof Verification]
        let bVal: any = b[sortBy as keyof Verification]

        if (sortBy === 'createdAt' || sortBy === 'reviewedAt') {
          aVal = aVal ? new Date(aVal).getTime() : 0
          bVal = bVal ? new Date(bVal).getTime() : 0
        }

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        return sortOrder === 'asc' ? comparison : -comparison
      })

      setVerifications(normalized)
    } catch (err: any) {
      console.error('Failed to load verifications:', err)
      setError(err.message || 'Failed to load verification requests.')
    } finally {
      setLoading(false)
    }
  }

  const loadVerificationDetail = async (id: number) => {
    try {
      const response = await adminService.getVerificationDetail(id)
      setSelectedVerification(response.data)
      setShowDetailModal(true)
    } catch (err: any) {
      console.error('Failed to load verification detail:', err)
      setError(err.message || 'Failed to load verification details.')
    }
  }

  const handleStatusChange = (verification: Verification) => {
    setSelectedVerification(verification)
    setStatusForm({
      status: verification.status === 'Pending' ? 'Approved' : verification.status,
      adminNotes: verification.adminNotes || '',
    })
    setShowStatusModal(true)
  }

  const handleSubmitStatus = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedVerification || !adminId) {
      setError('Missing verification or admin ID')
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      await adminService.updateVerificationStatus(selectedVerification.id, adminId, statusForm)

      setShowStatusModal(false)
      await loadVerifications()
    } catch (err: any) {
      console.error('Failed to update verification status:', err)
      setError(err.message || 'Failed to update verification status.')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadgeClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return <ArrowUpDown size={14} />
    return sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading verification requests...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / Admin / Verification Management</div>
          <h1 className="text-2xl font-bold mb-2">Recruiter Verification Management</h1>
          <p className="text-muted-foreground">
            Review and manage company verification requests from recruiters
          </p>
        </div>
        <button
          className="px-4 py-2 border rounded hover:bg-accent"
          onClick={loadVerifications}
        >
          Refresh
        </button>
      </div>

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      <div className="mb-6 p-4 bg-card border rounded-lg">
        <label className="block text-sm font-medium mb-2">Filter by Status:</label>
        <select
          className="px-3 py-2 border rounded bg-background"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-card border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th
                  className="p-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-2">
                    ID {getSortIcon('id')}
                  </div>
                </th>
                <th
                  className="p-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => handleSort('companyName')}
                >
                  <div className="flex items-center gap-2">
                    Company {getSortIcon('companyName')}
                  </div>
                </th>
                <th
                  className="p-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => handleSort('companyEmail')}
                >
                  <div className="flex items-center gap-2">
                    Email {getSortIcon('companyEmail')}
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium">Recruiter</th>
                <th
                  className="p-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th
                  className="p-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    Submitted {getSortIcon('createdAt')}
                  </div>
                </th>
                <th className="p-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {verifications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No verification requests found.
                  </td>
                </tr>
              ) : (
                verifications.map((verification) => (
                  <tr key={verification.id} className="border-b hover:bg-accent/50">
                    <td className="p-3 text-sm">{verification.id}</td>
                    <td className="p-3 font-medium">{verification.companyName}</td>
                    <td className="p-3 text-sm">{verification.companyEmail}</td>
                    <td className="p-3 text-sm">{verification.recruiter?.displayName || 'N/A'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusBadgeClass(verification.status)}`}>
                        {verification.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      {verification.createdAt
                        ? new Date(verification.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          className="p-1 hover:bg-accent rounded"
                          onClick={() => loadVerificationDetail(verification.id)}
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        {verification.status === 'Pending' && (
                          <button
                            className="p-1 hover:bg-green-100 rounded text-green-600"
                            onClick={() => handleStatusChange(verification)}
                            title="Review"
                          >
                            <CheckCircle size={16} />
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
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedVerification && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Verification Details</h2>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowDetailModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Company Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Company Name:</div>
                    <div className="font-medium">{selectedVerification.companyName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Company Email:</div>
                    <div>{selectedVerification.companyEmail}</div>
                  </div>
                  {selectedVerification.companyPhone && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Company Phone:</div>
                      <div>{selectedVerification.companyPhone}</div>
                    </div>
                  )}
                  {selectedVerification.companyAddress && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Company Address:</div>
                      <div>{selectedVerification.companyAddress}</div>
                    </div>
                  )}
                  {selectedVerification.taxCode && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Tax Code:</div>
                      <div>{selectedVerification.taxCode}</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Documents</h3>
                <div className="space-y-2">
                  {selectedVerification.businessLicense && (
                    <div className="p-3 bg-muted rounded">
                      <div className="font-medium">Business License:</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedVerification.businessLicense.originalName} (
                        {(selectedVerification.businessLicense.sizeBytes / 1024).toFixed(2)} KB)
                      </div>
                    </div>
                  )}
                  {selectedVerification.companyProof && (
                    <div className="p-3 bg-muted rounded">
                      <div className="font-medium">Company Proof:</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedVerification.companyProof.originalName} (
                        {(selectedVerification.companyProof.sizeBytes / 1024).toFixed(2)} KB)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Status Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadgeClass(selectedVerification.status)}`}>
                      {selectedVerification.status}
                    </span>
                  </div>
                  {selectedVerification.reviewedBy && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reviewed By:</span>
                      <span>{selectedVerification.reviewedBy.displayName}</span>
                    </div>
                  )}
                  {selectedVerification.reviewedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reviewed At:</span>
                      <span>{new Date(selectedVerification.reviewedAt).toLocaleString()}</span>
                    </div>
                  )}
                  {selectedVerification.adminNotes && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Admin Notes:</div>
                      <div className="p-3 bg-muted rounded">{selectedVerification.adminNotes}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedVerification && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowStatusModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Update Verification Status</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowStatusModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitStatus} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border rounded bg-background"
                  value={statusForm.status}
                  onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                  disabled={submitting}
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Admin Notes</label>
                <textarea
                  className="w-full px-3 py-2 border rounded bg-background min-h-[100px]"
                  value={statusForm.adminNotes}
                  onChange={(e) => setStatusForm({ ...statusForm, adminNotes: e.target.value })}
                  placeholder="Optional notes about this verification..."
                  disabled={submitting}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  className="px-4 py-2 border rounded hover:bg-accent"
                  onClick={() => setShowStatusModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

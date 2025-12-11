'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Settings, Ban, CheckCircle, ArrowUp, ArrowDown, Eye, X } from 'lucide-react'
import Link from 'next/link'

interface Candidate {
  id: number
  displayName: string
  email: string
  role: string
  createdAt: string
  cvCount?: number
  lastActive?: string
  isActive?: boolean
}

export function CandidateManagementPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showBanModal, setShowBanModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [editForm, setEditForm] = useState({
    displayName: '',
    email: '',
  })
  const [banReason, setBanReason] = useState('')
  const [deleteReason, setDeleteReason] = useState('')

  useEffect(() => {
    loadCandidates()
  }, [filters, sortBy, sortOrder])

  const loadCandidates = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = {}
      if (filters.search) params.search = filters.search
      if (filters.status) params.status = filters.status

      const data = await adminService.getCandidates(params)
      let candidatesList = Array.isArray(data) ? data : []

      let filtered = candidatesList.map((c: any) => ({
        id: c.id || c.Id,
        displayName: c.displayName || c.DisplayName || '',
        email: c.email || c.Email || '',
        role: c.role || c.Role || 'Candidate',
        createdAt: c.createdAt || c.CreatedAt,
        cvCount: c.cvCount || c.CvCount || 0,
        lastActive: c.lastActive || c.LastActive,
        isActive: c.isActive !== undefined ? c.isActive : (c.IsActive !== undefined ? c.IsActive : true),
      }))

      if (filters.status === 'active') {
        filtered = filtered.filter((c) => c.isActive !== false)
      } else if (filters.status === 'banned') {
        filtered = filtered.filter((c) => c.isActive === false)
      }

      filtered.sort((a, b) => {
        let aVal: any = a[sortBy as keyof Candidate]
        let bVal: any = b[sortBy as keyof Candidate]

        if (sortBy === 'createdAt' || sortBy === 'lastActive') {
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

      setCandidates(filtered)
    } catch (err: any) {
      console.error('Failed to load candidates:', err)
      setError(err.message || 'Failed to load candidates. Please try again.')
      setCandidates([])
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
    if (selectedItems.length === candidates.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(candidates.map((c) => c.id))
    }
  }

  const handleEditCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setEditForm({
      displayName: candidate.displayName || '',
      email: candidate.email || '',
    })
    setShowEditModal(true)
  }

  const handleUpdateCandidate = async () => {
    if (!selectedCandidate) return

    try {
      await adminService.updateRecruiter(selectedCandidate.id, editForm)
      alert('Candidate information updated successfully!')
      setShowEditModal(false)
      setSelectedCandidate(null)
      setEditForm({ displayName: '', email: '' })
      loadCandidates()
    } catch (error: any) {
      console.error('Failed to update candidate:', error)
      alert(error.message || 'Failed to update candidate. Please try again.')
    }
  }

  const handleBanClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setBanReason('')
    setShowBanModal(true)
  }

  const handleUnban = async (candidateId: number) => {
    if (!window.confirm('Are you sure you want to unban this candidate?')) {
      return
    }

    try {
      await adminService.unbanUser(candidateId)
      loadCandidates()
      alert('Candidate unbanned successfully!')
    } catch (error: any) {
      console.error('Failed to unban candidate:', error)
      alert('Failed to unban candidate. Please try again.')
    }
  }

  const handleBan = async () => {
    if (!selectedCandidate) return
    if (!banReason.trim()) {
      alert('Please provide a reason for banning this candidate.')
      return
    }

    try {
      await adminService.banUser(selectedCandidate.id, banReason)
      setShowBanModal(false)
      setBanReason('')
      setSelectedCandidate(null)
      loadCandidates()
      alert('Candidate banned successfully!')
    } catch (error: any) {
      console.error('Failed to ban candidate:', error)
      alert('Failed to ban candidate. Please try again.')
    }
  }

  const handleDeleteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setDeleteReason('')
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (!selectedCandidate) return
    if (!deleteReason.trim()) {
      alert('Please provide a reason for deleting this candidate.')
      return
    }

    try {
      await adminService.deleteUser(selectedCandidate.id, deleteReason)
      setShowDeleteModal(false)
      setDeleteReason('')
      setSelectedCandidate(null)
      loadCandidates()
      alert('Candidate deleted successfully!')
    } catch (error: any) {
      console.error('Failed to delete candidate:', error)
      alert('Failed to delete candidate. Please try again.')
    }
  }

  const handleViewDetail = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setShowDetailModal(true)
  }

  const handleBulkBan = async () => {
    const reason = window.prompt(`Please provide a reason for banning ${selectedItems.length} candidate(s):`)
    if (!reason || !reason.trim()) {
      alert('Ban reason is required.')
      return
    }

    if (!window.confirm(`Are you sure you want to ban ${selectedItems.length} candidate(s)?`)) {
      return
    }

    try {
      await Promise.all(
        selectedItems.map((id) => adminService.banUser(id, reason))
      )
      setSelectedItems([])
      loadCandidates()
      alert('Selected candidates banned successfully!')
    } catch (error) {
      console.error('Failed to bulk ban:', error)
      alert('Failed to ban some candidates. Please try again.')
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

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / Candidates</div>
          <h1 className="text-2xl font-bold mb-2">Candidate Management</h1>
          <p className="text-muted-foreground">
            Manage all candidates, their CVs, and account status
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
                placeholder="Name or email..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="mb-4 p-4 bg-accent rounded-lg flex justify-between items-center">
          <span className="font-medium">{selectedItems.length} candidate(s) selected</span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 text-sm"
              onClick={handleBulkBan}
            >
              Ban Selected
            </button>
            <button
              className="px-4 py-2 border rounded hover:bg-accent text-sm"
              onClick={() => setSelectedItems([])}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      <div className="bg-card border rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold">All Candidates</h3>
            <span className="text-sm text-muted-foreground">
              {candidates.length} candidate{candidates.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by:</label>
            <select
              className="px-3 py-1 border rounded text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Joined Date</option>
              <option value="displayName">Name</option>
              <option value="email">Email</option>
              <option value="cvCount">CV Count</option>
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
          <div className="p-8 text-center text-muted-foreground">Loading candidates...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={candidates.length > 0 && selectedItems.length === candidates.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium">ID</th>
                  <th className="p-3 text-left text-sm font-medium">NAME</th>
                  <th className="p-3 text-left text-sm font-medium">EMAIL</th>
                  <th className="p-3 text-left text-sm font-medium">CVs</th>
                  <th className="p-3 text-left text-sm font-medium">LAST ACTIVE</th>
                  <th className="p-3 text-left text-sm font-medium">JOINED</th>
                  <th className="p-3 text-left text-sm font-medium">STATUS</th>
                  <th className="p-3 text-left text-sm font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      No candidates found.
                    </td>
                  </tr>
                ) : (
                  candidates.map((candidate) => {
                    const isSelected = selectedItems.includes(candidate.id)
                    const isBanned = candidate.isActive === false
                    return (
                      <tr
                        key={candidate.id}
                        className={`border-b hover:bg-accent/50 ${isSelected ? 'bg-accent' : ''} ${isBanned ? 'opacity-60' : ''}`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(candidate.id)}
                          />
                        </td>
                        <td className="p-3 text-sm">#{candidate.id}</td>
                        <td className="p-3 font-medium">{candidate.displayName}</td>
                        <td className="p-3 text-sm">{candidate.email}</td>
                        <td className="p-3 text-sm">{candidate.cvCount || 0}</td>
                        <td className="p-3 text-sm">{formatDate(candidate.lastActive)}</td>
                        <td className="p-3 text-sm">{formatDate(candidate.createdAt)}</td>
                        <td className="p-3">
                          {isBanned ? (
                            <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">
                              Banned
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-1 hover:bg-accent rounded"
                              onClick={() => handleViewDetail(candidate)}
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="p-1 hover:bg-accent rounded"
                              onClick={() => handleEditCandidate(candidate)}
                              title="Edit"
                            >
                              <Settings size={16} />
                            </button>
                            {isBanned ? (
                              <button
                                className="p-1 hover:bg-accent rounded text-green-600"
                                onClick={() => handleUnban(candidate.id)}
                                title="Unban"
                              >
                                <CheckCircle size={16} />
                              </button>
                            ) : (
                              <button
                                className="p-1 hover:bg-accent rounded text-red-600"
                                onClick={() => handleBanClick(candidate)}
                                title="Ban"
                              >
                                <Ban size={16} />
                              </button>
                            )}
                            <button
                              className="p-1 hover:bg-accent rounded text-destructive"
                              onClick={() => handleDeleteClick(candidate)}
                              title="Delete"
                            >
                              <X size={16} />
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

      {/* Detail Modal */}
      {showDetailModal && selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowDetailModal(false)
            setSelectedCandidate(null)
          }}
        >
          <div
            className="bg-card border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Candidate Details</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setShowDetailModal(false)
                  setSelectedCandidate(null)
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">ID</label>
                  <p className="font-medium">#{selectedCandidate.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                  <p>
                    {selectedCandidate.isActive === false ? (
                      <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">Banned</span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Active</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Display Name</label>
                  <p className="font-medium">{selectedCandidate.displayName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <p>{selectedCandidate.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">CV Count</label>
                  <p>{selectedCandidate.cvCount || 0}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Last Active</label>
                  <p>{formatDate(selectedCandidate.lastActive)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Joined Date</label>
                  <p>{formatDate(selectedCandidate.createdAt)}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => {
                  handleEditCandidate(selectedCandidate)
                  setShowDetailModal(false)
                }}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => {
                  setShowDetailModal(false)
                  setSelectedCandidate(null)
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowEditModal(false)
            setSelectedCandidate(null)
            setEditForm({ displayName: '', email: '' })
          }}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit Candidate</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedCandidate(null)
                  setEditForm({ displayName: '', email: '' })
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedCandidate(null)
                  setEditForm({ displayName: '', email: '' })
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={handleUpdateCandidate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ban Modal */}
      {showBanModal && selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowBanModal(false)
            setBanReason('')
            setSelectedCandidate(null)
          }}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Ban Candidate</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setShowBanModal(false)
                  setBanReason('')
                  setSelectedCandidate(null)
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  You are about to ban: <strong>{selectedCandidate.displayName}</strong> ({selectedCandidate.email})
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Ban *</label>
                <textarea
                  className="w-full px-3 py-2 border rounded min-h-[100px]"
                  placeholder="Enter the reason for banning this candidate..."
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => {
                  setShowBanModal(false)
                  setBanReason('')
                  setSelectedCandidate(null)
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                onClick={handleBan}
              >
                Ban Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setShowDeleteModal(false)
            setDeleteReason('')
            setSelectedCandidate(null)
          }}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-destructive">Delete Candidate</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteReason('')
                  setSelectedCandidate(null)
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-destructive/10 border border-destructive/20 rounded p-4">
                <p className="text-sm font-medium text-destructive mb-2">Warning: This action cannot be undone!</p>
                <p className="text-sm text-muted-foreground">
                  You are about to permanently delete: <strong>{selectedCandidate.displayName}</strong> ({selectedCandidate.email})
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Deletion *</label>
                <textarea
                  className="w-full px-3 py-2 border rounded min-h-[100px]"
                  placeholder="Enter the reason for deleting this candidate..."
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
                  setSelectedCandidate(null)
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                onClick={handleDelete}
              >
                Delete Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


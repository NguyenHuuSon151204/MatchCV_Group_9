'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Settings, ArrowUp, ArrowDown, ArrowUpDown, Eye, X, Ban, Trash } from 'lucide-react'

interface Recruiter {
  id: number
  displayName: string
  email: string
  createdAt: string
  openJobsCount?: number
  plan?: string
  licenseExpiry?: string
  accountType?: string
}

export function RecruiterManagementPage() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    plan: '',
    accountType: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [editForm, setEditForm] = useState({
    displayName: '',
    email: '',
  })
  const [showBanModal, setShowBanModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [banReason, setBanReason] = useState('')
  const [deleteReason, setDeleteReason] = useState('')

  useEffect(() => {
    loadRecruiters()
  }, [filters, sortBy, sortOrder])

  const loadRecruiters = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = {}
      if (filters.search) params.search = filters.search
      if (filters.accountType) params.accountType = filters.accountType

      const response = await adminService.getRecruiters(params)
      let recruitersList = Array.isArray(response.data) ? response.data : []

      let filtered = recruitersList.map((r: any) => ({
        id: r.id || r.Id,
        displayName: r.displayName || r.DisplayName || '',
        email: r.email || r.Email || '',
        createdAt: r.createdAt || r.CreatedAt,
        openJobsCount: r.openJobsCount || r.OpenJobsCount || 0,
        plan: r.plan || r.Plan || 'Free',
        licenseExpiry: r.licenseExpiry || r.LicenseExpiry,
        accountType: r.accountType || r.AccountType,
      }))

      if (filters.plan) {
        filtered = filtered.filter((r) => r.plan === filters.plan)
      }

      // Note: Jobs loading removed - backend doesn't provide this endpoint via adminService
      // If needed, add a separate endpoint to get recruiter jobs

      filtered.sort((a, b) => {
        let aVal: any = a[sortBy as keyof Recruiter]
        let bVal: any = b[sortBy as keyof Recruiter]

        if (sortBy === 'createdAt' || sortBy === 'licenseExpiry') {
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

      setRecruiters(filtered)
    } catch (err: any) {
      console.error('Failed to load recruiters:', err)
      setError(err.message || 'Failed to load recruiters. Please try again.')
      setRecruiters([])
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
    if (selectedItems.length === recruiters.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(recruiters.map((r) => r.id))
    }
  }

  const handleEditRecruiter = (recruiter: Recruiter) => {
    setSelectedRecruiter(recruiter)
    setEditForm({
      displayName: recruiter.displayName || '',
      email: recruiter.email || '',
    })
    setShowEditModal(true)
  }

  const handleUpdateRecruiter = async () => {
    if (!selectedRecruiter) return

    try {
      await adminService.updateRecruiter(selectedRecruiter.id, editForm)
      alert('Recruiter information updated successfully!')
      setShowEditModal(false)
      setSelectedRecruiter(null)
      setEditForm({ displayName: '', email: '' })
      loadRecruiters()
    } catch (error: any) {
      console.error('Failed to update recruiter:', error)
      alert(error.message || 'Failed to update recruiter. Please try again.')
    }
  }

  const handleExportCSV = () => {
    try {
      const csvRows = ['ID,Name,Email,Open Jobs,Plan,License Expiry,Joined Date']
      recruiters.forEach((recruiter) => {
        csvRows.push(
          `"${recruiter.id}","${recruiter.displayName}","${recruiter.email}",${recruiter.openJobsCount || 0},"${recruiter.plan || 'Free'}","${formatDate(recruiter.licenseExpiry)}","${formatDate(recruiter.createdAt)}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `recruiters-report-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
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

  const handleBanRecruiter = async () => {
    if (!selectedRecruiter || !banReason.trim()) {
      alert('Please provide a reason for banning')
      return
    }

    try {
      // Implement ban API call when backend is ready
      alert(`Ban recruiter ${selectedRecruiter.displayName}: ${banReason}`)
      setShowBanModal(false)
      setBanReason('')
      setSelectedRecruiter(null)
      loadRecruiters()
    } catch (error: any) {
      console.error('Failed to ban recruiter:', error)
      alert(error.message || 'Failed to ban recruiter')
    }
  }

  const handleDeleteRecruiter = async () => {
    if (!selectedRecruiter || !deleteReason.trim()) {
      alert('Please provide a reason for deletion')
      return
    }

    try {
      // Implement delete API call when backend is ready
      alert(`Delete recruiter ${selectedRecruiter.displayName}: ${deleteReason}`)
      setShowDeleteModal(false)
      setDeleteReason('')
      setSelectedRecruiter(null)
      loadRecruiters()
    } catch (error: any) {
      console.error('Failed to delete recruiter:', error)
      alert(error.message || 'Failed to delete recruiter')
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / Recruiters</div>
          <h1 className="text-2xl font-bold mb-2">Recruiter Management</h1>
          <p className="text-muted-foreground">
            Manage all recruiters, their licenses, and job postings
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

      {showFilters && (
        <div className="mb-6 p-6 bg-card border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label className="block text-sm font-medium mb-1">Plan</label>
              <select
                className="w-full px-3 py-2 border rounded bg-background text-foreground"
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
              <label className="block text-sm font-medium mb-1">Account Type</label>
              <select
                className="w-full px-3 py-2 border rounded bg-background text-foreground"
                value={filters.accountType}
                onChange={(e) => handleFilterChange('accountType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      <div className="bg-card border rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold">All Recruiters</h3>
            <span className="text-sm text-muted-foreground">
              {recruiters.length} recruiter{recruiters.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by:</label>
            <select
              className="px-3 py-1 border rounded text-sm bg-background text-foreground"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Joined Date</option>
              <option value="displayName">Name</option>
              <option value="email">Email</option>
              <option value="openJobsCount">Open Jobs</option>
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
          <div className="p-8 text-center text-muted-foreground">Loading recruiters...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={recruiters.length > 0 && selectedItems.length === recruiters.length}
                      onChange={handleSelectAll}
                    />
                  </th>
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
                    onClick={() => handleSort('displayName')}
                  >
                    <div className="flex items-center gap-2">
                      NAME {getSortIcon('displayName')}
                    </div>
                  </th>
                  <th
                    className="p-3 text-left text-sm font-medium cursor-pointer"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center gap-2">
                      EMAIL {getSortIcon('email')}
                    </div>
                  </th>
                  <th
                    className="p-3 text-left text-sm font-medium cursor-pointer"
                    onClick={() => handleSort('openJobsCount')}
                  >
                    <div className="flex items-center gap-2">
                      OPEN JOBS {getSortIcon('openJobsCount')}
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium">PLAN</th>
                  <th className="p-3 text-left text-sm font-medium">LICENSE EXPIRY</th>
                  <th
                    className="p-3 text-left text-sm font-medium cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-2">
                      JOINED {getSortIcon('createdAt')}
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      No recruiters found.
                    </td>
                  </tr>
                ) : (
                  recruiters.map((recruiter) => {
                    const isSelected = selectedItems.includes(recruiter.id)
                    return (
                      <tr
                        key={recruiter.id}
                        className={`border-b hover:bg-accent/50 ${isSelected ? 'bg-accent' : ''}`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(recruiter.id)}
                          />
                        </td>
                        <td className="p-3 text-sm">#{recruiter.id}</td>
                        <td className="p-3 font-medium">{recruiter.displayName}</td>
                        <td className="p-3 text-sm">{recruiter.email}</td>
                        <td className="p-3 text-sm">{recruiter.openJobsCount || 0}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${recruiter.plan === 'Pro'
                              ? 'bg-blue-100 text-blue-800'
                              : recruiter.plan === 'Enterprise'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                              }`}
                          >
                            {recruiter.plan || 'Free'}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{formatDate(recruiter.licenseExpiry)}</td>
                        <td className="p-3 text-sm">{formatDate(recruiter.createdAt)}</td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button
                              className="p-1 hover:bg-accent rounded"
                              onClick={() => handleEditRecruiter(recruiter)}
                              title="Edit"
                            >
                              <Settings size={16} />
                            </button>
                            <button
                              className="p-1 hover:bg-orange-100 rounded text-orange-600"
                              onClick={() => {
                                setSelectedRecruiter(recruiter)
                                setShowBanModal(true)
                              }}
                              title="Ban"
                            >
                              <Ban size={16} />
                            </button>
                            <button
                              className="p-1 hover:bg-destructive/10 rounded text-destructive"
                              onClick={() => {
                                setSelectedRecruiter(recruiter)
                                setShowDeleteModal(true)
                              }}
                              title="Delete"
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

      {/* Edit Modal */}
      {showEditModal && selectedRecruiter && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit Recruiter</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowEditModal(false)}
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
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={handleUpdateRecruiter}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ban Modal */}
      {showBanModal && selectedRecruiter && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowBanModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-destructive">Ban Recruiter</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowBanModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-destructive/10 rounded">
                <p className="text-sm font-medium">Recruiter</p>
                <p className="font-semibold">{selectedRecruiter.displayName}</p>
                <p className="text-sm text-muted-foreground">{selectedRecruiter.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Banning *</label>
                <textarea
                  className="w-full px-3 py-2 border rounded bg-background min-h-[100px]"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Enter the reason for banning this recruiter..."
                />
              </div>
              <div className="text-xs text-muted-foreground">
                This action will prevent the recruiter from accessing the platform.
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => setShowBanModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                onClick={handleBanRecruiter}
              >
                Ban Recruiter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedRecruiter && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-destructive">Delete Recruiter</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowDeleteModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-destructive/10 rounded">
                <p className="text-sm font-medium">Recruiter</p>
                <p className="font-semibold">{selectedRecruiter.displayName}</p>
                <p className="text-sm text-muted-foreground">{selectedRecruiter.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Deletion *</label>
                <textarea
                  className="w-full px-3 py-2 border rounded bg-background min-h-[100px]"
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Enter the reason for deleting this recruiter..."
                />
              </div>
              <div className="p-3 bg-destructive/20 border border-destructive/30 rounded">
                <p className="text-sm font-semibold text-destructive">⚠️ Warning</p>
                <p className="text-xs text-destructive mt-1">
                  This action cannot be undone. All data associated with this recruiter will be permanently removed.
                </p>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                onClick={handleDeleteRecruiter}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

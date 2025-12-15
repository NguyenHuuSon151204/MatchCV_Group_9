'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { Key, X, Plus, Eye, EyeOff, Edit, Trash2 } from 'lucide-react'
import { NotificationModal } from '@/components/common/notification-modal'

interface License {
  id: number
  plan: string
  expiry?: string
  createdAt: string
  isActive?: boolean
  status?: string
  originalKey?: string
  daysRemaining?: number
  assignedUser?: {
    id: number
    displayName: string
    email: string
  }
}

export function LicenseManagementPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [freePlanUsers, setFreePlanUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    plan: '',
    status: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [generateForm, setGenerateForm] = useState({
    plan: 'Pro',
    expiryDays: 365,
  })
  const [visibleKeys, setVisibleKeys] = useState<number[]>([])
  const [showEditPlanModal, setShowEditPlanModal] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)
  const [editPlanForm, setEditPlanForm] = useState({
    plan: 'Pro',
    expiryDays: 365,
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [licenseToDelete, setLicenseToDelete] = useState<License | null>(null)
  const [notification, setNotification] = useState<{
    isOpen: boolean
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
  }>({ isOpen: false, type: 'success', title: '', message: '' })

  useEffect(() => {
    loadLicenses()
  }, [filters, sortBy, sortOrder])

  const loadLicenses = async () => {
    try {
      setLoading(true)
      setError(null)

      const params: any = {}
      if (filters.search) params.search = filters.search

      const response = await adminService.getLicenses(params)
      const responseData = response.data
      let licensesList = Array.isArray(responseData) ? responseData : (Array.isArray(responseData?.data) ? responseData.data : (Array.isArray(responseData?.licenses) ? responseData.licenses : []))

      let filteredData = licensesList.map((license: any) => ({
        id: license.id || license.Id,
        plan: license.plan || license.Plan,
        expiry: license.expiry || license.Expiry,
        createdAt: license.createdAt || license.CreatedAt,
        isActive: license.isActive !== undefined ? license.isActive : license.IsActive,
        status: license.status || license.Status,
        originalKey: license.originalKey || license.OriginalKey,
        daysRemaining: license.daysRemaining !== undefined ? license.daysRemaining : license.DaysRemaining,
        assignedUser: license.assignedUser || license.AssignedUser,
      }))

      if (filters.plan) {
        filteredData = filteredData.filter((license: License) => license.plan === filters.plan)
      }

      if (filters.status) {
        filteredData = filteredData.filter((license: License) => license.status === filters.status)
      }

      filteredData.sort((a: License, b: License) => {
        let aVal: any = a[sortBy as keyof License]
        let bVal: any = b[sortBy as keyof License]

        if (sortBy === 'createdAt' || sortBy === 'expiry') {
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

      setLicenses(filteredData)
    } catch (err: any) {
      console.error('Failed to load licenses:', err)
      setError('Failed to load licenses. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateLicense = async () => {
    try {
      const response = await adminService.generateLicense({
        plan: generateForm.plan,
        expiryDays: generateForm.expiryDays,
      })

      // Extract the key from response - backend returns {message, license: {id, key, plan, ...}}
      const data = response.data
      const licenseKey = data.license?.key || data.License?.Key || ''

      setGeneratedKey(licenseKey)
      setShowGenerateModal(false)
      setGenerateForm({ plan: 'Pro', expiryDays: 365 })
      loadLicenses()

      setNotification({
        isOpen: true,
        type: 'success',
        title: 'License Generated!',
        message: `New ${generateForm.plan} license created successfully!`,
      })
    } catch (error: any) {
      console.error('Failed to generate license:', error)
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to generate license. Please try again.',
      })
    }
  }

  const handleDeactivateLicense = async (id: number) => {
    try {
      await adminService.deactivateLicense(id)
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'License deactivated successfully.',
      })
      loadLicenses()
    } catch (error) {
      console.error('Failed to deactivate license:', error)
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to deactivate license. Please try again.',
      })
    }
  }

  const handleDeleteLicense = async () => {
    if (!licenseToDelete) return

    try {
      await adminService.deleteLicense(licenseToDelete.id)
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'License deleted successfully.',
      })
      setShowDeleteModal(false)
      setLicenseToDelete(null)
      loadLicenses()
    } catch (error: any) {
      console.error('Failed to delete license:', error)
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete license.',
      })
    }
  }

  const handleEditPlan = async () => {
    if (!selectedLicense || !selectedLicense.assignedUser) {
      alert('No user assigned to this license')
      return
    }

    try {
      // Update user plan via backend
      await adminService.updateUserPlan(selectedLicense.assignedUser.id, {
        plan: editPlanForm.plan,
        expiryDays: editPlanForm.expiryDays,
      })

      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'User plan updated successfully!',
      })
      setShowEditPlanModal(false)
      setSelectedLicense(null)
      setEditPlanForm({ plan: 'Pro', expiryDays: 365 })
      loadLicenses()
    } catch (error: any) {
      console.error('Failed to update plan:', error)
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to update plan. Please try again.',
      })
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
          <div className="text-sm text-muted-foreground mb-1">Home / Licenses</div>
          <h1 className="text-2xl font-bold mb-2">License Management</h1>
          <p className="text-muted-foreground">
            Generate, manage, and track license keys for recruiters
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
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-sm flex items-center gap-2"
            onClick={() => setShowGenerateModal(true)}
          >
            <Plus size={16} />
            Generate License
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
                placeholder="License key or user..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Plan</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.plan}
                onChange={(e) => handleFilterChange('plan', e.target.value)}
              >
                <option value="">All Plans</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
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
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      <div className="bg-card border rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold">All Licenses</h3>
            <span className="text-sm text-muted-foreground">
              {licenses.length} license{licenses.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading licenses...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left text-sm font-medium">ID</th>
                  <th className="p-3 text-left text-sm font-medium">PLAN</th>
                  <th className="p-3 text-left text-sm font-medium">ASSIGNED TO</th>
                  <th className="p-3 text-left text-sm font-medium">LICENSE KEY</th>
                  <th className="p-3 text-left text-sm font-medium">EXPIRY</th>
                  <th className="p-3 text-left text-sm font-medium">DAYS REMAINING</th>
                  <th className="p-3 text-left text-sm font-medium">STATUS</th>
                  <th className="p-3 text-left text-sm font-medium">CREATED</th>
                  <th className="p-3 text-left text-sm font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {licenses.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      No licenses found.
                    </td>
                  </tr>
                ) : (
                  licenses.map((license) => (
                    <tr key={license.id} className="border-b hover:bg-accent/50">
                      <td className="p-3 text-sm">#{license.id}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${license.plan === 'Enterprise'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                            }`}
                        >
                          {license.plan}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        {license.assignedUser ? (
                          <div>
                            <div className="font-medium">{license.assignedUser.displayName}</div>
                            <div className="text-muted-foreground text-xs">
                              {license.assignedUser.email}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </td>
                      <td className="p-3 text-sm">
                        {license.originalKey ? (
                          <div className="flex items-center gap-2">
                            <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                              {visibleKeys.includes(license.id)
                                ? license.originalKey
                                : '••••••••••••••••'}
                            </code>
                            <button
                              className="p-1 hover:bg-accent rounded"
                              onClick={() => {
                                setVisibleKeys(prev =>
                                  prev.includes(license.id)
                                    ? prev.filter(id => id !== license.id)
                                    : [...prev, license.id]
                                )
                              }}
                              title={visibleKeys.includes(license.id) ? 'Hide' : 'Show'}
                            >
                              {visibleKeys.includes(license.id) ? (
                                <EyeOff size={14} />
                              ) : (
                                <Eye size={14} />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs">N/A</span>
                        )}
                      </td>
                      <td className="p-3 text-sm">{formatDate(license.expiry)}</td>
                      <td className="p-3 text-sm">
                        {license.daysRemaining != null ? (
                          <span
                            className={
                              license.daysRemaining < 30
                                ? 'text-red-600 font-semibold'
                                : license.daysRemaining < 90
                                  ? 'text-yellow-600'
                                  : ''
                            }
                          >
                            {license.daysRemaining} days
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${license.status === 'Active' || license.isActive
                            ? 'bg-green-100 text-green-800'
                            : license.status === 'Expired'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {license.status || (license.isActive ? 'Active' : 'Inactive')}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{formatDate(license.createdAt)}</td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {license.assignedUser && (
                            <button
                              className="p-1 hover:bg-accent rounded"
                              onClick={() => {
                                setSelectedLicense(license)
                                setEditPlanForm({
                                  plan: license.plan || 'Pro',
                                  expiryDays: 365,
                                })
                                setShowEditPlanModal(true)
                              }}
                              title="Edit Plan"
                            >
                              <Edit size={14} />
                            </button>
                          )}
                          {license.isActive && (
                            <button
                              className="px-2 py-1 text-xs border rounded hover:bg-accent text-destructive"
                              onClick={() => handleDeactivateLicense(license.id)}
                            >
                              Deactivate
                            </button>
                          )}
                          <button
                            className="p-1 hover:bg-destructive/10 rounded text-destructive"
                            onClick={() => {
                              setLicenseToDelete(license)
                              setShowDeleteModal(true)
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generate License Modal */}
      {showGenerateModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowGenerateModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Generate License</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowGenerateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Plan</label>
                <select
                  className="w-full px-3 py-2 border rounded bg-background"
                  value={generateForm.plan}
                  onChange={(e) => setGenerateForm({ ...generateForm, plan: e.target.value })}
                >
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Days</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded"
                  value={generateForm.expiryDays || ''}
                  onChange={(e) =>
                    setGenerateForm({ ...generateForm, expiryDays: parseInt(e.target.value) || 1 })
                  }
                  min="1"
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => setShowGenerateModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={handleGenerateLicense}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Key Modal */}
      {generatedKey && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setGeneratedKey(null)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">License Generated</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setGeneratedKey(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Copy this license key:</p>
              <div className="p-3 bg-muted rounded font-mono text-sm break-all">{generatedKey}</div>
              <button
                className="mt-4 w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={() => {
                  navigator.clipboard.writeText(generatedKey)
                  alert('License key copied to clipboard!')
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showEditPlanModal && selectedLicense && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowEditPlanModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit User Plan</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowEditPlanModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-muted/50 rounded">
                <p className="text-sm text-muted-foreground">User</p>
                <p className="font-semibold">{selectedLicense.assignedUser?.displayName}</p>
                <p className="text-sm text-muted-foreground">{selectedLicense.assignedUser?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Plan</label>
                <select
                  className="w-full px-3 py-2 border rounded bg-background"
                  value={editPlanForm.plan}
                  onChange={(e) => setEditPlanForm({ ...editPlanForm, plan: e.target.value })}
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Extend Expiry (Days)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded bg-background"
                  value={editPlanForm.expiryDays}
                  onChange={(e) =>
                    setEditPlanForm({ ...editPlanForm, expiryDays: parseInt(e.target.value) })
                  }
                  min="1"
                  placeholder="365"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Number of days to extend the license from today
                </p>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-accent"
                onClick={() => setShowEditPlanModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                onClick={handleEditPlan}
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && licenseToDelete && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-card border rounded-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-destructive">Delete License</h3>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setShowDeleteModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-destructive/10 rounded">
                <p className="text-sm font-medium">License #{licenseToDelete.id}</p>
                <p className="font-semibold">{licenseToDelete.plan} Plan</p>
                {licenseToDelete.assignedUser && (
                  <p className="text-sm text-muted-foreground">
                    Assigned to: {licenseToDelete.assignedUser.displayName}
                  </p>
                )}
              </div>
              <div className="p-3 bg-destructive/20 border border-destructive/30 rounded">
                <p className="text-sm font-semibold text-destructive">⚠️ Warning</p>
                <p className="text-xs text-destructive mt-1">
                  This action cannot be undone. The license will be permanently deleted.
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
                onClick={handleDeleteLicense}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </div>
  )
}

import { useEffect, useState } from 'react'
import './LicenseManagement.css'
import '../components/Button.css'
import api from '../services/api'

function LicenseManagement() {
  const [licenses, setLicenses] = useState([])
  const [freePlanUsers, setFreePlanUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [generatedKey, setGeneratedKey] = useState(null)
  const [showUserPlanModal, setShowUserPlanModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    plan: '',
    status: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [generateForm, setGenerateForm] = useState({
    plan: 'Pro',
    expiryDays: 365,
  })
  const [userPlanForm, setUserPlanForm] = useState({
    plan: 'Pro',
    expiryDays: 365,
  })

  useEffect(() => {
    loadLicenses()
  }, [filters, sortBy, sortOrder])

  const loadLicenses = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)

      const data = await api.get(`/license/all?${params.toString()}`)
      let filteredData = data || []

      // Apply plan filter client-side
      if (filters.plan) {
        filteredData = filteredData.filter(license => license.plan === filters.plan)
      }

      // Apply client-side status filter
      if (filters.status) {
        filteredData = filteredData.filter(license => license.status === filters.status)
      }

      // Sort
      filteredData.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]

        if (sortBy === 'createdAt' || sortBy === 'expiry') {
          aVal = new Date(aVal || 0).getTime()
          bVal = new Date(bVal || 0).getTime()
        }

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setLicenses(filteredData)

      // Build free plan users list
      try {
        const assignedIds = new Set((data || [])
          .map(license => license.assignedUser?.id)
          .filter(Boolean))

        const [recruiters = [], candidates = []] = await Promise.all([
          api.get('/admin/recruiters').catch(() => []),
          api.get('/admin/candidates').catch(() => []),
        ])

        const userMap = new Map()
        ;[...recruiters, ...candidates].forEach(user => {
          if (!userMap.has(user.id)) {
            userMap.set(user.id, user)
          }
        })

        const freeUsers = Array.from(userMap.values()).filter(user => !assignedIds.has(user.id))
        setFreePlanUsers(freeUsers)
      } catch (userError) {
        console.error('Failed to load free plan users:', userError)
        setFreePlanUsers([])
      }
    } catch (error) {
      console.error('Failed to load licenses:', error)
      setError('Failed to load licenses. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === licenses.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(licenses.map(license => license.id))
    }
  }

  const handleGenerateLicense = async () => {
    try {
      const response = await api.post('/license/generate', {
        plan: generateForm.plan,
        expiryDays: generateForm.expiryDays || null,
      })
      
      setGeneratedKey(response)
      setShowGenerateModal(false)
      setGenerateForm({ plan: 'Pro', expiryDays: 365 })
      loadLicenses()
    } catch (error) {
      console.error('Failed to generate license:', error)
      alert('Failed to generate license. Please try again.')
    }
  }

  const handleDeactivateLicense = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this license?')) {
      return
    }

    try {
      await api.put(`/license/${id}/deactivate`)
      loadLicenses()
    } catch (error) {
      console.error('Failed to deactivate license:', error)
      alert('Failed to deactivate license. Please try again.')
    }
  }

  const handleDeleteLicense = async (id) => {
    if (!window.confirm('Are you sure you want to delete this license? This action cannot be undone.')) {
      return
    }

    try {
      await api.delete(`/license/${id}`)
      loadLicenses()
    } catch (error) {
      console.error('Failed to delete license:', error)
      alert('Failed to delete license. Please try again.')
    }
  }

  const handleBulkDeactivate = async () => {
    if (!window.confirm(`Are you sure you want to deactivate ${selectedItems.length} license(s)?`)) {
      return
    }

    try {
      await Promise.all(selectedItems.map(id => api.put(`/license/${id}/deactivate`)))
      setSelectedItems([])
      loadLicenses()
    } catch (error) {
      console.error('Failed to bulk deactivate:', error)
      alert('Failed to deactivate some licenses. Please try again.')
    }
  }

  const handleUpdateUserPlan = async () => {
    if (!selectedUser) return

    try {
      const response = await api.put(`/license/user/${selectedUser.id}/plan`, {
        plan: userPlanForm.plan,
        expiryDays: userPlanForm.expiryDays || null,
      })
      
      alert(`User plan updated successfully! ${response.licenseKey ? `New license key: ${response.licenseKey}` : ''}`)
      setShowUserPlanModal(false)
      setSelectedUser(null)
      setUserPlanForm({ plan: 'Pro', expiryDays: 365 })
      loadLicenses()
    } catch (error) {
      console.error('Failed to update user plan:', error)
      alert('Failed to update user plan. Please try again.')
    }
  }

  const handleViewKey = (license) => {
    setSelectedLicense(license)
    setShowKeyModal(true)
  }

  const openPlanModal = (user, currentPlan = 'Free', daysRemaining = null) => {
    setSelectedUser({
      id: user.id,
      name: user.displayName || user.name,
      email: user.email,
      plan: currentPlan,
      daysRemaining: daysRemaining,
    })
    setUserPlanForm({
      plan: currentPlan === 'Free' ? 'Pro' : currentPlan,
      expiryDays: daysRemaining && daysRemaining > 0 ? daysRemaining : 365,
    })
    setShowUserPlanModal(true)
  }

  const getStatusBadge = (status) => {
    const badges = {
      Active: { label: 'Active', class: 'badge-success' },
      Expired: { label: 'Expired', class: 'badge-warning' },
      Inactive: { label: 'Inactive', class: 'badge-neutral' },
    }
    return badges[status] || { label: status, class: 'badge-neutral' }
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDaysRemaining = (days) => {
    if (days === null || days === undefined) return 'Unlimited'
    if (days <= 0) return 'Expired'
    if (days === 1) return '1 day'
    return `${days} days`
  }

  const getDisplayRole = (role) => {
    if (role === 'Candidate') return 'Applicant'
    if (role === 'Recruiter') return 'Recruiter'
    return role || 'User'
  }

  const showBulkActions = selectedItems.length > 0

  const filteredFreeUsers = freePlanUsers
    .filter(user => {
      if (filters.search) {
        const keyword = filters.search.toLowerCase()
        const name = (user.displayName || user.name || '').toLowerCase()
        const email = (user.email || '').toLowerCase()
        if (!name.includes(keyword) && !email.includes(keyword)) {
          return false
        }
      }
      if (filters.plan && filters.plan !== 'Free') {
        return false
      }
      if (filters.status && filters.status !== '' && filters.status !== 'Active') {
        return false
      }
      return true
    })
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))

  return (
    <div className="license-management">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / License Management</div>
          <h1 className="page-title">License Management</h1>
          <p className="page-subtitle">
            Manage Pro licenses, generate new keys, and monitor usage
          </p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => setShowGenerateModal(true)}
          >
            ✨ Generate License
          </button>
        </div>
      </div>

      {showBulkActions && (
        <div className="bulk-actions-bar">
          <div className="bulk-info">
            <strong>{selectedItems.length}</strong> license(s) selected
          </div>
          <div className="bulk-buttons">
            <button className="btn btn-warning" onClick={handleBulkDeactivate}>
              Deactivate Selected
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setSelectedItems([])}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      <div className="filter-card">
        <h3 className="filter-title">Filters & Search</h3>
        <p className="filter-description">
          Find licenses by user, plan, or status
        </p>
        <div className="filter-grid">
          <div className="filter-group">
            <label>Search User</label>
            <input
              type="text"
              placeholder="Name or email..."
              className="filter-input"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Plan</label>
            <select
              className="filter-select"
              value={filters.plan}
              onChange={(e) => handleFilterChange('plan', e.target.value)}
            >
              <option value="">All Plans</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="filter-group">
            <label>&nbsp;</label>
            <button
              className="btn btn-outline"
              onClick={() => {
                setFilters({ search: '', plan: '', status: '' })
              }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header-bar">
          <div className="table-info">
            <h3 className="table-title">All Licenses</h3>
            <span className="table-count">
              {licenses.length} license{licenses.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="sort-controls">
            <label>Sort by:</label>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Created Date</option>
              <option value="expiry">Expiry Date</option>
              <option value="plan">Plan</option>
              <option value="status">Status</option>
            </select>
            <button
              className="btn-icon"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading licenses...</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === licenses.length && licenses.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>User</th>
                  <th onClick={() => setSortBy('plan')} className="sortable">
                    Plan {getSortIcon('plan')}
                  </th>
                  <th onClick={() => setSortBy('status')} className="sortable">
                    Status {getSortIcon('status')}
                  </th>
                  <th onClick={() => setSortBy('expiry')} className="sortable">
                    Expiry {getSortIcon('expiry')}
                  </th>
                  <th>Days Remaining</th>
                  <th>License Key</th>
                  <th onClick={() => setSortBy('createdAt')} className="sortable">
                    Created {getSortIcon('createdAt')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {licenses.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="empty-state">
                      No licenses found. Generate new licenses to get started.
                    </td>
                  </tr>
                ) : (
                  licenses.map((license) => {
                    const status = getStatusBadge(license.status)
                    const isSelected = selectedItems.includes(license.id)
                    return (
                      <tr key={license.id} className={isSelected ? 'selected' : ''}>
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(license.id)}
                          />
                        </td>
                        <td>
                          {license.assignedUser ? (
                            <div className="user-info">
                              <div className="user-name-row">
                                <strong>{license.assignedUser.displayName}</strong>
                                <span className="user-role">
                                  {getDisplayRole(license.assignedUser.role)}
                                </span>
                              </div>
                              <span className="user-email">{license.assignedUser.email}</span>
                              {license.assignedUser && (
                                <button 
                                  className="btn btn-outline btn-manage-plan"
                                  onClick={() => openPlanModal(license.assignedUser, license.plan, license.daysRemaining)}
                                  title="Manage User Plan"
                                >
                                  ⚙️ Manage
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted">Unassigned</span>
                          )}
                        </td>
                        <td>
                          <span className={`plan-badge plan-${license.plan.toLowerCase()}`}>
                            {license.plan}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td>{formatDateTime(license.expiry)}</td>
                        <td>
                          <span className={`days-remaining ${license.daysRemaining <= 7 && license.daysRemaining > 0 ? 'warning' : ''}`}>
                            {formatDaysRemaining(license.daysRemaining)}
                          </span>
                        </td>
                        <td>
                          {license.originalKey ? (
                            <button 
                              className="btn-view-key"
                              onClick={() => handleViewKey(license)}
                              title="View License Key"
                            >
                              🔑 View Key
                            </button>
                          ) : (
                            <span className="text-muted">N/A</span>
                          )}
                        </td>
                        <td>{formatDateTime(license.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            {license.isActive && (
                              <button
                                className="btn-action btn-warning"
                                title="Deactivate License"
                                onClick={() => handleDeactivateLicense(license.id)}
                              >
                                ⏸️
                              </button>
                            )}
                            <button
                              className="btn-action btn-delete"
                              title="Delete License"
                              onClick={() => handleDeleteLicense(license.id)}
                            >
                              🗑️
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

      <div className="table-card secondary-card">
        <div className="table-header-bar">
          <div className="table-info">
            <h3 className="table-title">Free Plan Users</h3>
            <span className="table-count">
              {filteredFreeUsers.length} user{filteredFreeUsers.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="table-description">
            Users currently on the Free plan. Upgrade them directly from here.
          </p>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFreeUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No free plan users found.
                  </td>
                </tr>
              ) : (
                filteredFreeUsers.map((user) => (
                  <tr key={`free-${user.id}`}>
                    <td>
                      <strong>{user.displayName || user.name || 'Unnamed User'}</strong>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge badge-neutral">
                        {getDisplayRole(user.role)}
                      </span>
                    </td>
                    <td>{formatDateTime(user.createdAt)}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-upgrade"
                        onClick={() => openPlanModal(user, 'Free', null)}
                      >
                        ⚙️ Upgrade Plan
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate License Modal */}
      {showGenerateModal && (
        <div className="modal-overlay" onClick={() => setShowGenerateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Generate New License</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowGenerateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Plan</label>
                <select
                  className="form-input"
                  value={generateForm.plan}
                  onChange={(e) => setGenerateForm(prev => ({ ...prev, plan: e.target.value }))}
                >
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div className="form-group">
                <label>Expiry (Days)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="365"
                  min="1"
                  max="3650"
                  value={generateForm.expiryDays}
                  onChange={(e) => setGenerateForm(prev => ({ ...prev, expiryDays: parseInt(e.target.value) || null }))}
                />
                <small className="form-hint">Leave empty for unlimited duration</small>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowGenerateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleGenerateLicense}
              >
                Generate License
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View License Key Modal */}
      {showKeyModal && selectedLicense && (
        <div className="modal-overlay" onClick={() => setShowKeyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔑 License Key Details</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowKeyModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="key-details">
                <div className="detail-item">
                  <span className="detail-label">User:</span>
                  <span className="detail-value">
                    {selectedLicense.assignedUser ? (
                      <div className="user-detail-info">
                        <div>
                          <strong>{selectedLicense.assignedUser.displayName}</strong>
                          <span className="user-role">
                            {getDisplayRole(selectedLicense.assignedUser.role)}
                          </span>
                        </div>
                        <div className="user-email">{selectedLicense.assignedUser.email}</div>
                      </div>
                    ) : (
                      'Unassigned'
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Plan:</span>
                  <span className="detail-value">{selectedLicense.plan}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{selectedLicense.status}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Expires:</span>
                  <span className="detail-value">
                    {selectedLicense.expiry ? formatDateTime(selectedLicense.expiry) : 'Never'}
                  </span>
                </div>
              </div>
              <div className="generated-key-display">
                <label>License Key</label>
                <div className="key-container">
                  <code className="license-key">{selectedLicense.originalKey}</code>
                  <button 
                    className="btn-copy"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedLicense.originalKey)
                      alert('License key copied to clipboard!')
                    }}
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary" 
                onClick={() => setShowKeyModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage User Plan Modal */}
      {showUserPlanModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowUserPlanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚙️ Manage User Plan</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowUserPlanModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-plan-info">
                <h4>{selectedUser.name}</h4>
                <p className="user-email">{selectedUser.email}</p>
                <p className="current-plan">Current Plan: <strong>{selectedUser.plan || 'Free'}</strong></p>
              </div>
              <div className="form-group">
                <label>New Plan</label>
                <select
                  className="form-input"
                  value={userPlanForm.plan}
                  onChange={(e) => setUserPlanForm(prev => ({ ...prev, plan: e.target.value }))}
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              {userPlanForm.plan !== 'Free' && (
                <div className="form-group">
                  <label>Expiry (Days)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="365"
                    min="1"
                    max="3650"
                    value={userPlanForm.expiryDays}
                    onChange={(e) => setUserPlanForm(prev => ({ ...prev, expiryDays: parseInt(e.target.value) || null }))}
                  />
                  <small className="form-hint">Leave empty for unlimited duration</small>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowUserPlanModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleUpdateUserPlan}
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Key Modal */}
      {generatedKey && (
        <div className="modal-overlay" onClick={() => setGeneratedKey(null)}>
          <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>✅ License Generated Successfully</h3>
              <button 
                className="modal-close" 
                onClick={() => setGeneratedKey(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="generated-key-display">
                <label>License Key</label>
                <div className="key-container">
                  <code className="license-key">{generatedKey.licenseKey}</code>
                  <button 
                    className="btn-copy"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedKey.licenseKey)
                      alert('License key copied to clipboard!')
                    }}
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="key-details">
                <div className="detail-item">
                  <span className="detail-label">Plan:</span>
                  <span className="detail-value">{generatedKey.plan}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Expires:</span>
                  <span className="detail-value">
                    {generatedKey.expiry ? formatDateTime(generatedKey.expiry) : 'Never'}
                  </span>
                </div>
              </div>
              <div className="key-instructions">
                <p><strong>Important:</strong> Share this key with the user to activate their Pro license. This key will only be shown once.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary" 
                onClick={() => setGeneratedKey(null)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LicenseManagement

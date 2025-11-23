import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './RecruiterManagement.css'
import '../components/Button.css'
import api from '../services/api'

function RecruiterManagement() {
  const [recruiters, setRecruiters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [selectedRecruiter, setSelectedRecruiter] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    plan: '',
    accountType: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [editForm, setEditForm] = useState({
    displayName: '',
    email: '',
  })
  const [planForm, setPlanForm] = useState({
    plan: 'Pro',
    expiryDays: 365,
  })

  useEffect(() => {
    loadRecruiters()
  }, [filters, sortBy, sortOrder])

  const loadRecruiters = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.accountType) params.append('accountType', filters.accountType)

      const data = await api.get(`/admin/recruiters?${params.toString()}`)
      let filtered = data || []

      // Apply client-side plan filter
      if (filters.plan) {
        filtered = filtered.filter(r => r.plan === filters.plan)
      }

      // Sort
      filtered.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]

        if (sortBy === 'createdAt' || sortBy === 'licenseExpiry') {
          aVal = new Date(aVal || 0).getTime()
          bVal = new Date(bVal || 0).getTime()
        }

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setRecruiters(filtered)
    } catch (error) {
      console.error('Failed to load recruiters:', error)
      setError('Failed to load recruiters. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelectItem = (id) => {
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

  const handleEditRecruiter = (recruiter) => {
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
      await api.put(`/admin/users/${selectedRecruiter.id}`, {
        displayName: editForm.displayName,
        email: editForm.email,
      })
      
      alert('Recruiter information updated successfully!')
      setShowEditModal(false)
      setSelectedRecruiter(null)
      setEditForm({ displayName: '', email: '' })
      loadRecruiters()
    } catch (error) {
      console.error('Failed to update recruiter:', error)
      alert(error.response?.data?.message || 'Failed to update recruiter. Please try again.')
    }
  }

  const handleManagePlan = (recruiter) => {
    setSelectedRecruiter(recruiter)
    setPlanForm({
      plan: recruiter.plan || 'Pro',
      expiryDays: recruiter.licenseExpiry ? 
        Math.ceil((new Date(recruiter.licenseExpiry) - new Date()) / (1000 * 60 * 60 * 24)) : 
        365
    })
    setShowPlanModal(true)
  }

  const handleUpdatePlan = async () => {
    if (!selectedRecruiter) return

    try {
      const response = await api.put(`/license/user/${selectedRecruiter.id}/plan`, {
        plan: planForm.plan,
        expiryDays: planForm.expiryDays || null,
      })
      
      alert(`Recruiter plan updated successfully! ${response.licenseKey ? `New license key: ${response.licenseKey}` : ''}`)
      setShowPlanModal(false)
      setSelectedRecruiter(null)
      setPlanForm({ plan: 'Pro', expiryDays: 365 })
      loadRecruiters()
    } catch (error) {
      console.error('Failed to update plan:', error)
      alert('Failed to update recruiter plan. Please try again.')
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const getPlanBadge = (plan) => {
    const badges = {
      Free: { label: 'Free', class: 'badge-neutral' },
      Pro: { label: 'Pro', class: 'badge-success' },
      Enterprise: { label: 'Enterprise', class: 'badge-warning' },
    }
    return badges[plan] || { label: plan || 'Free', class: 'badge-neutral' }
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  const showBulkActions = selectedItems.length > 0

  return (
    <div className="recruiter-management">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Recruiter Management</div>
          <h1 className="page-title">Recruiter Management</h1>
          <p className="page-subtitle">
            Manage all recruiters, their subscription plans, and job postings
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExportCSV}>
            📥 Export CSV
          </button>
        </div>
      </div>

      {showBulkActions && (
        <div className="bulk-actions-bar">
          <div className="bulk-info">
            <strong>{selectedItems.length}</strong> recruiter(s) selected
          </div>
          <div className="bulk-buttons">
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
          Use filters to quickly find the recruiters you're looking for
        </p>
        <div className="filter-grid">
          <div className="filter-group">
            <label>Search</label>
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
            <label>Account Type</label>
            <select
              className="filter-select"
              value={filters.accountType}
              onChange={(e) => handleFilterChange('accountType', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
          </div>
          <div className="filter-group">
            <label>&nbsp;</label>
            <button
              className="btn btn-outline"
              onClick={() => {
                setFilters({ search: '', plan: '', accountType: '' })
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
            <h3 className="table-title">All Recruiters</h3>
            <span className="table-count">
              {recruiters.length} recruiter{recruiters.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="sort-controls">
            <label>Sort by:</label>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Joined Date</option>
              <option value="licenseExpiry">License Expiry</option>
              <option value="plan">Plan</option>
              <option value="openJobsCount">Open Jobs</option>
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
          <div className="loading">Loading recruiters...</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === recruiters.length && recruiters.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('openJobsCount')}
                  >
                    Open Jobs {getSortIcon('openJobsCount')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('plan')}
                  >
                    Plan {getSortIcon('plan')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('licenseExpiry')}
                  >
                    License Expiry {getSortIcon('licenseExpiry')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('createdAt')}
                  >
                    Joined {getSortIcon('createdAt')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="empty-state">
                      No recruiters found.
                    </td>
                  </tr>
                ) : (
                  recruiters.map((recruiter) => {
                    const planBadge = getPlanBadge(recruiter.plan)
                    const isSelected = selectedItems.includes(recruiter.id)
                    return (
                      <tr key={recruiter.id} className={isSelected ? 'selected' : ''}>
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(recruiter.id)}
                          />
                        </td>
                        <td>#{recruiter.id}</td>
                        <td>
                          <strong>{recruiter.displayName}</strong>
                        </td>
                        <td>{recruiter.email}</td>
                        <td>
                          <span className="badge badge-neutral">
                            {recruiter.openJobsCount || 0} job{recruiter.openJobsCount !== 1 ? 's' : ''}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${planBadge.class}`}>
                            {planBadge.label}
                          </span>
                        </td>
                        <td>{formatDate(recruiter.licenseExpiry)}</td>
                        <td>{formatDate(recruiter.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-action btn-edit"
                              title="Edit Recruiter"
                              onClick={() => handleEditRecruiter(recruiter)}
                            >
                              ⚙️
                            </button>
                            <button
                              className="btn-action btn-plan"
                              title="Manage Plan"
                              onClick={() => handleManagePlan(recruiter)}
                            >
                              🔑
                            </button>
                            <Link
                              to={`/jobs?recruiter=${recruiter.id}`}
                              className="btn-action btn-view"
                              title="View Jobs"
                            >
                              👁️
                            </Link>
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

      {/* Edit Recruiter Modal */}
      {showEditModal && selectedRecruiter && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚙️ Edit Recruiter Information</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-plan-info">
                <h4>Recruiter ID: #{selectedRecruiter.id}</h4>
                <p className="current-plan">Current Plan: <strong>{selectedRecruiter.plan || 'Free'}</strong></p>
                <p className="current-plan">Open Jobs: <strong>{selectedRecruiter.openJobsCount || 0}</strong></p>
              </div>
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter display name"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter email address"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleUpdateRecruiter}
              >
                Update Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Plan Modal */}
      {showPlanModal && selectedRecruiter && (
        <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚙️ Manage Recruiter Plan</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowPlanModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-plan-info">
                <h4>{selectedRecruiter.displayName}</h4>
                <p className="user-email">{selectedRecruiter.email}</p>
                <p className="current-plan">Current Plan: <strong>{selectedRecruiter.plan || 'Free'}</strong></p>
                <p className="current-plan">Open Jobs: <strong>{selectedRecruiter.openJobsCount || 0}</strong></p>
              </div>
              <div className="form-group">
                <label>New Plan</label>
                <select
                  className="form-input"
                  value={planForm.plan}
                  onChange={(e) => setPlanForm(prev => ({ ...prev, plan: e.target.value }))}
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              {planForm.plan !== 'Free' && (
                <div className="form-group">
                  <label>Expiry (Days)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="365"
                    min="1"
                    max="3650"
                    value={planForm.expiryDays}
                    onChange={(e) => setPlanForm(prev => ({ ...prev, expiryDays: parseInt(e.target.value) || null }))}
                  />
                  <small className="form-hint">Leave empty for unlimited duration</small>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowPlanModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleUpdatePlan}
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecruiterManagement
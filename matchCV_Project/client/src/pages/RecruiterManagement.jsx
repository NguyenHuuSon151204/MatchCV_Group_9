import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './RecruiterManagement.css'
import '../components/Button.css'
import api from '../services/api'
import { SettingsIcon, ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from '../components/Icons'

function RecruiterManagement() {
  const [recruiters, setRecruiters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRecruiter, setSelectedRecruiter] = useState(null)
  const [recruiterJobs, setRecruiterJobs] = useState({})
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
      
      // Handle both array and object responses
      let recruitersList = Array.isArray(data) ? data : (data?.data || data || [])
      
      // Normalize property names (handle both PascalCase and camelCase)
      let filtered = recruitersList.map(r => ({
        id: r.id || r.Id,
        displayName: r.displayName || r.DisplayName || '',
        email: r.email || r.Email || '',
        createdAt: r.createdAt || r.CreatedAt,
        openJobsCount: r.openJobsCount || r.OpenJobsCount || 0,
        plan: (r.plan || r.Plan || 'Free'),
        licenseExpiry: r.licenseExpiry || r.LicenseExpiry,
        accountType: r.accountType || r.AccountType
      }))

      // Apply client-side plan filter
      if (filters.plan) {
        filtered = filtered.filter(r => r.plan === filters.plan)
      }

      // Load jobs for each recruiter (optimized: use dedicated endpoint)
      try {
        const jobsPromises = filtered.map(async (recruiter) => {
          try {
            const recruiterJobs = await api.get(`/admin/recruiters/${recruiter.id}/jobs`)
            const jobsList = Array.isArray(recruiterJobs) ? recruiterJobs : (recruiterJobs?.data || [])
            return { recruiterId: recruiter.id, jobs: jobsList || [] }
          } catch (error) {
            // If endpoint doesn't exist or fails, return empty array
            console.warn(`Failed to load jobs for recruiter ${recruiter.id}:`, error.message)
            return { recruiterId: recruiter.id, jobs: [] }
          }
        })
        
        const jobsResults = await Promise.all(jobsPromises)
        const jobsMap = {}
        jobsResults.forEach(({ recruiterId, jobs }) => {
          jobsMap[recruiterId] = jobs
        })
        setRecruiterJobs(jobsMap)
      } catch (error) {
        console.error('Failed to load jobs:', error)
        setRecruiterJobs({})
      }

      // Sort
      filtered.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]

        if (sortBy === 'createdAt' || sortBy === 'licenseExpiry') {
          aVal = aVal ? new Date(aVal).getTime() : 0
          bVal = bVal ? new Date(bVal).getTime() : 0
        }

        // Handle null/undefined values
        if (aVal == null) aVal = ''
        if (bVal == null) bVal = ''

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setRecruiters(filtered)
    } catch (error) {
      console.error('Failed to load recruiters:', error)
      const errorMessage = error?.message || error?.response?.data?.message || 'Failed to load recruiters. Please try again.'
      setError(errorMessage)
      setRecruiters([])
      setRecruiterJobs({})
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
    if (sortBy !== field) {
      return <ArrowUpDownIcon size={14} className="sort-icon" />
    }
    return sortOrder === 'asc' ? (
      <ArrowUpIcon size={14} className="sort-icon sort-active" />
    ) : (
      <ArrowDownIcon size={14} className="sort-icon sort-active" />
    )
  }

  const showBulkActions = selectedItems.length > 0

  return (
    <div className="recruiter-management">
      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumbs">Home / Recruiter Management</div>
          <h1 className="page-title">Recruiter Management</h1>
          <p className="page-subtitle">
            Manage all recruiters, their subscription plans, and job postings
          </p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? '↑ Hide Filters' : '↓ Show Filters'}
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleExportCSV}>
            Export CSV
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

      {showFilters && (
        <div className="filter-section">
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
        </div>
      )}

      <div className="table-section">
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
              aria-label={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
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
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('openJobsCount')}
                  >
                    <span>OPEN JOBS</span>
                    {getSortIcon('openJobsCount')}
                  </th>
                  <th>JOBS</th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('plan')}
                  >
                    <span>PLAN</span>
                    {getSortIcon('plan')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('licenseExpiry')}
                  >
                    <span>LICENSE EXPIRY</span>
                    {getSortIcon('licenseExpiry')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('createdAt')}
                  >
                    <span>JOINED</span>
                    {getSortIcon('createdAt')}
                  </th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="empty-state">
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
                          <div className="jobs-list">
                            {recruiterJobs[recruiter.id] && Array.isArray(recruiterJobs[recruiter.id]) && recruiterJobs[recruiter.id].length > 0 ? (
                              <>
                                {recruiterJobs[recruiter.id].slice(0, 3).map((job) => {
                                  const jobTitle = job.title || job.Title || 'Untitled Job'
                                  const jobId = job.id || job.Id || Math.random()
                                  return (
                                    <span key={jobId} className="job-tag" title={jobTitle}>
                                      {jobTitle}
                                    </span>
                                  )
                                })}
                                {recruiterJobs[recruiter.id].length > 3 && (
                                  <span className="job-more">
                                    +{recruiterJobs[recruiter.id].length - 3} more
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-muted">No jobs</span>
                            )}
                          </div>
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
                              title="Edit Recruiter Information"
                              onClick={() => handleEditRecruiter(recruiter)}
                            >
                              <SettingsIcon size={18} />
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
              <div className="recruiter-detail-section">
                <h4>Recruiter Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Recruiter ID:</span>
                    <span className="detail-value">#{selectedRecruiter.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Current Plan:</span>
                    <span className="detail-value">
                      <span className={`plan-badge plan-${(selectedRecruiter.plan || 'free').toLowerCase()}`}>
                        {selectedRecruiter.plan || 'Free'}
                      </span>
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Open Jobs:</span>
                    <span className="detail-value">
                      <strong>{selectedRecruiter.openJobsCount || 0}</strong>
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">License Expiry:</span>
                    <span className="detail-value">{formatDate(selectedRecruiter.licenseExpiry)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Joined Date:</span>
                    <span className="detail-value">{formatDate(selectedRecruiter.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="recruiter-detail-section">
                <h4>Edit Information</h4>
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

    </div>
  )
}

export default RecruiterManagement
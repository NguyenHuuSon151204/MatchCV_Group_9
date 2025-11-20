import { useEffect, useState } from 'react'
import './RecruiterManagement.css'
import '../components/Button.css'
import api from '../services/api'

function RecruiterManagement() {
  const [recruiters, setRecruiters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
  })

  useEffect(() => {
    loadRecruiters()
  }, [])

  const loadRecruiters = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)

      const data = await api.get(`/admin/recruiters?${params.toString()}`)
      setRecruiters(data || [])
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

  const handleSearch = () => {
    loadRecruiters()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getPlanBadge = (plan) => {
    const badges = {
      Free: { label: 'Free', class: 'badge-neutral' },
      Basic: { label: 'Basic', class: 'badge-info' },
      Pro: { label: 'Pro', class: 'badge-success' },
      Enterprise: { label: 'Enterprise', class: 'badge-warning' },
    }
    return badges[plan] || { label: plan, class: 'badge-neutral' }
  }

  const handleExportCSV = () => {
    try {
      const csvRows = ['Name,Email,Open Jobs,Plan,License Expiry,Joined Date']
      recruiters.forEach((recruiter) => {
        csvRows.push(
          `"${recruiter.displayName}","${recruiter.email}",${recruiter.openJobsCount || 0},"${recruiter.plan || 'Free'}","${formatDate(recruiter.licenseExpiry)}","${formatDate(recruiter.createdAt)}"`
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

  return (
    <div className="recruiter-management">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Account Management / Recruiter Management</div>
          <h1 className="page-title">Recruiter Management</h1>
          <p className="page-subtitle">
            View and manage all recruiters and their subscription plans
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="filter-card">
        <h3 className="filter-title">Search & Filter</h3>
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="filter-input"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setFilters({ search: '' })
              loadRecruiters()
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">All Recruiters</h3>
          <span className="table-count">
            {recruiters.length} recruiter{recruiters.length !== 1 ? 's' : ''}
          </span>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading recruiters...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Open Jobs</th>
                <th>Plan</th>
                <th>License Expiry</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No recruiters found.
                  </td>
                </tr>
              ) : (
                recruiters.map((recruiter) => {
                  const planBadge = getPlanBadge(recruiter.plan)
                  return (
                    <tr key={recruiter.id}>
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
                          <button className="btn-action btn-view">View</button>
                          <button className="btn-action btn-edit">Edit</button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default RecruiterManagement



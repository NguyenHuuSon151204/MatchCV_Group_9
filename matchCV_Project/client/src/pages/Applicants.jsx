import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Applicants.css'
import '../components/Button.css'
import api from '../services/api'

function Applicants() {
  const [applicants, setApplicants] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [filters, setFilters] = useState({
    jobId: '',
    company: '',
    status: '',
    plan: '',
    minScore: '',
    dateFrom: '',
    dateTo: '',
  })
  const [sortBy, setSortBy] = useState('scoreSnapshot')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    loadJobs()
    loadApplicants()
  }, [filters, sortBy, sortOrder])

  const loadJobs = async () => {
    try {
      const data = await api.get('/recruiter/jobs')
      setJobs(data || [])
    } catch (error) {
      console.error('Failed to load jobs:', error)
    }
  }

  const loadApplicants = async () => {
    try {
      setLoading(true)
      setError(null)
      let allApplicants = []

      if (filters.jobId) {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.minScore) params.append('minScore', filters.minScore)

        const data = await api.get(
          `/recruiter/jobs/${filters.jobId}/applications?${params.toString()}`
        )
        const job = jobs.find((j) => j.id === parseInt(filters.jobId))
        allApplicants = (data || []).map((app) => ({
          ...app,
          jobTitle: job?.title || 'Unknown',
          jobCompany: job?.company || '',
          jobId: job?.id,
        }))
      } else {
        const allJobs = await api.get('/recruiter/jobs')
        const promises = allJobs.map((job) =>
          api
            .get(`/recruiter/jobs/${job.id}/applications`)
            .then((apps) =>
              apps.map((app) => ({
                ...app,
                jobTitle: job.title,
                jobCompany: job.company,
                jobId: job.id,
              }))
            )
            .catch(() => [])
        )
        const results = await Promise.all(promises)
        allApplicants = results.flat()
      }

      // Apply client-side filters
      if (filters.status) {
        allApplicants = allApplicants.filter(
          (app) => app.status === filters.status
        )
      }
      if (filters.minScore) {
        allApplicants = allApplicants.filter(
          (app) =>
            app.scoreSnapshot != null &&
            app.scoreSnapshot >= parseInt(filters.minScore)
        )
      }
      if (filters.company) {
        allApplicants = allApplicants.filter(
          (app) => app.jobCompany === filters.company
        )
      }
      if (filters.plan) {
        allApplicants = allApplicants.filter(
          (app) => app.candidate?.plan === filters.plan
        )
      }
      if (filters.dateFrom) {
        allApplicants = allApplicants.filter((app) => {
          const appDate = new Date(app.createdAt)
          const fromDate = new Date(filters.dateFrom)
          return appDate >= fromDate
        })
      }
      if (filters.dateTo) {
        allApplicants = allApplicants.filter((app) => {
          const appDate = new Date(app.createdAt)
          const toDate = new Date(filters.dateTo)
          toDate.setHours(23, 59, 59, 999)
          return appDate <= toDate
        })
      }

      // Sort
      allApplicants.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]

        if (sortBy === 'createdAt') {
          aVal = new Date(aVal || 0).getTime()
          bVal = new Date(bVal || 0).getTime()
        }

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setApplicants(allApplicants)
    } catch (error) {
      console.error('Failed to load applicants:', error)
      setError('Failed to load applicants. Please try again.')
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
    if (selectedItems.length === applicants.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(applicants.map((app) => app.id))
    }
  }

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedItems.length} applicant(s)?`
      )
    ) {
      return
    }

    try {
      await Promise.all(selectedItems.map(id => api.delete(`/recruiter/applications/${id}`)))
      setSelectedItems([])
      loadApplicants()
      alert('Selected applicants deleted successfully!')
    } catch (error) {
      console.error('Failed to bulk delete:', error)
      alert('Failed to delete some applicants. Please try again.')
    }
  }

  const handleDeleteApplicant = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return
    }

    try {
      await api.delete(`/recruiter/applications/${id}`)
      loadApplicants()
      alert('Application deleted successfully!')
    } catch (error) {
      console.error('Failed to delete application:', error)
      alert('Failed to delete application. Please try again.')
    }
  }

  const handleEditStatus = async (id, newStatus) => {
    try {
      await api.patch(`/recruiter/applications/${id}/status`, { status: newStatus })
      loadApplicants()
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update application status. Please try again.')
    }
  }

  const handleExportCSV = () => {
    try {
      const csvRows = [
        'Applicant,Email,Job,Company,AI Score,Matching Skills,Status,Applied Date',
      ]
      applicants.forEach((app) => {
        const score =
          app.scoreSnapshot != null ? Math.round(app.scoreSnapshot) : 'N/A'
        const skills =
          app.matchingSkills && app.matchingSkills.length > 0
            ? app.matchingSkills.join('; ')
            : 'None'
        const appliedDate = app.createdAt
          ? new Date(app.createdAt).toLocaleDateString()
          : 'N/A'
        csvRows.push(
          `"${app.candidate?.displayName || 'Unknown'}","${app.candidate?.email || ''}","${app.jobTitle || 'Unknown'}","${app.jobCompany || ''}",${score},"${skills}","${app.status}","${appliedDate}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `applicants-report-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
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

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
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

  const showBulkActions = selectedItems.length > 0

  // Get unique companies for quick filter
  const companies = [...new Set(jobs.map((j) => j.company))].sort()

  return (
    <div className="applicants">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Applicants</div>
          <h1 className="page-title">Applicants Management</h1>
          <p className="page-subtitle">
            Manage all applicants with advanced filtering, sorting, and bulk actions
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
            <strong>{selectedItems.length}</strong> applicant(s) selected
          </div>
          <div className="bulk-buttons">
            <button className="btn btn-danger" onClick={handleBulkDelete}>
              Delete Selected
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
          Use filters to quickly find the applicants you're looking for
        </p>
        <div className="filter-grid">
          <div className="filter-group">
            <label>Job</label>
            <select
              className="filter-select"
              value={filters.jobId}
              onChange={(e) => handleFilterChange('jobId', e.target.value)}
            >
              <option value="">All Jobs</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.company})
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Company</label>
            <select
              className="filter-select"
              value={filters.company || ''}
              onChange={(e) => handleFilterChange('company', e.target.value)}
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
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
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
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
            <label>Min AI Score</label>
            <input
              type="number"
              placeholder="0-100"
              className="filter-input"
              min="0"
              max="100"
              value={filters.minScore}
              onChange={(e) => handleFilterChange('minScore', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Date From</label>
            <input
              type="date"
              className="filter-input"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Date To</label>
            <input
              type="date"
              className="filter-input"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>&nbsp;</label>
            <button
              className="btn btn-outline"
              onClick={() => {
                setFilters({
                  jobId: '',
                  company: '',
                  status: '',
                  plan: '',
                  minScore: '',
                  dateFrom: '',
                  dateTo: '',
                })
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
            <h3 className="table-title">All Applicants</h3>
            <span className="table-count">
              {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="sort-controls">
            <label>Sort by:</label>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="scoreSnapshot">AI Score</option>
              <option value="createdAt">Applied Date</option>
              <option value="status">Status</option>
            </select>
            <button
              className="btn-icon"
              onClick={() =>
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
              }
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading applicants...</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length === applicants.length &&
                        applicants.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Applicant</th>
                  <th>Job</th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('scoreSnapshot')}
                  >
                    AI Score {getSortIcon('scoreSnapshot')}
                  </th>
                  <th>Plan</th>
                  <th>Matching Skills</th>
                  <th>Status</th>
                  <th
                    className="sortable"
                    onClick={() => setSortBy('createdAt')}
                  >
                    Applied {getSortIcon('createdAt')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="empty-state">
                      No applicants found. Applicants will appear here once
                      candidates apply to your jobs.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => {
                    const status = getStatusBadge(app.status)
                    const isSelected = selectedItems.includes(app.id)
                    return (
                      <tr key={app.id} className={isSelected ? 'selected' : ''}>
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(app.id)}
                          />
                        </td>
                        <td>
                          <div className="applicant-info">
                            <strong>
                              {app.candidate?.displayName || 'Unknown'}
                              {app.candidate?.id && <span className="applicant-id"> (#{app.candidate.id})</span>}
                            </strong>
                            <span className="applicant-email">
                              {app.candidate?.email}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="job-info">
                            {app.jobId ? (
                              <Link
                                to={`/jobs/${app.jobId}`}
                                className="job-title-link"
                              >
                                <strong>
                                  {app.jobTitle || 'Unknown'}
                                  {app.jobId && <span className="job-id"> (#{app.jobId})</span>}
                                </strong>
                              </Link>
                            ) : (
                              <strong>
                                {app.jobTitle || 'Unknown'}
                                {app.jobId && <span className="job-id"> (#{app.jobId})</span>}
                              </strong>
                            )}
                            <span className="job-company">{app.jobCompany}</span>
                          </div>
                        </td>
                        <td>
                          {app.scoreSnapshot != null ? (
                            <span className="score-badge">
                              {Math.round(app.scoreSnapshot)}%
                            </span>
                          ) : (
                            <span className="score-badge neutral">N/A</span>
                          )}
                        </td>
                        <td>
                          <span className={`plan-badge plan-${(app.candidate?.plan || 'free').toLowerCase()}`}>
                            {app.candidate?.plan || 'Free'}
                          </span>
                        </td>
                        <td>
                          <div className="skills-container">
                            {app.matchingSkills && app.matchingSkills.length > 0 ? (
                              <>
                                {app.matchingSkills.slice(0, 3).map((skill, idx) => (
                                  <span key={idx} className="skill-pill">
                                    {skill}
                                  </span>
                                ))}
                                {app.matchingSkills.length > 3 && (
                                  <span className="skill-more">
                                    +{app.matchingSkills.length - 3}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-muted">None</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td>{formatDateTime(app.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            {app.jobId && (
                              <Link
                                to={`/jobs/${app.jobId}`}
                                className="btn-action btn-view"
                                title="View Job"
                              >
                                👁️
                              </Link>
                            )}
                            <select
                              className="status-select"
                              value={app.status}
                              onChange={(e) => handleEditStatus(app.id, e.target.value)}
                              title="Change Status"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Hired">Hired</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                            <button
                              className="btn-action btn-delete"
                              title="Delete Application"
                              onClick={() => handleDeleteApplicant(app.id)}
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
    </div>
  )
}

export default Applicants

import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './JobManagement.css'
import '../components/Button.css'
import api from '../services/api'
import { ViewIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from '../components/Icons'

function JobManagement() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedJobs, setSelectedJobs] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    company: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [showBulkActions, setShowBulkActions] = useState(false)

  useEffect(() => {
    loadJobs()
  }, [filters, sortBy, sortOrder])

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (filters.search) params.append('q', filters.search)
      if (filters.company) params.append('company', filters.company)

      const response = await api.get(`/recruiter/jobs?${params.toString()}`)
      
      // Handle both array and object responses
      let filtered = Array.isArray(response) ? response : (response?.data || response || [])
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filtered = filtered.filter(job => 
          job.title?.toLowerCase().includes(searchLower) ||
          job.company?.toLowerCase().includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.topSkill?.toLowerCase().includes(searchLower)
        )
      }
      
      if (filters.status) {
        filtered = filtered.filter(job => {
          const count = job.applications || 0
          if (filters.status === 'draft') return count === 0
          if (filters.status === 'open') return count > 0 && count < 5
          if (filters.status === 'reviewing') return count >= 5 && count < 15
          if (filters.status === 'closed') return count >= 15
          return true
        })
      }

      if (filters.dateFrom) {
        filtered = filtered.filter(job => {
          const jobDate = new Date(job.createdAt)
          const fromDate = new Date(filters.dateFrom)
          return jobDate >= fromDate
        })
      }

      if (filters.dateTo) {
        filtered = filtered.filter(job => {
          const jobDate = new Date(job.createdAt)
          const toDate = new Date(filters.dateTo)
          toDate.setHours(23, 59, 59, 999)
          return jobDate <= toDate
        })
      }

      // Sort
      filtered.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]
        
        if (sortBy === 'createdAt') {
          aVal = aVal ? new Date(aVal).getTime() : 0
          bVal = bVal ? new Date(bVal).getTime() : 0
        }
        
        // Handle null/undefined values
        if (aVal == null) aVal = 0
        if (bVal == null) bVal = 0
        
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      setJobs(filtered)
    } catch (error) {
      console.error('Failed to load jobs:', error)
      setError('Failed to load jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const handleSelectJob = (jobId) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleSelectAll = (e) => {
    if (jobs.length === 0) return
    if (e?.target?.checked !== undefined) {
      if (e.target.checked) {
        setSelectedJobs(jobs.map((j) => j.id).filter(id => id != null))
      } else {
        setSelectedJobs([])
      }
    } else {
      // Fallback for direct function call
      if (selectedJobs.length === jobs.length) {
        setSelectedJobs([])
      } else {
        setSelectedJobs(jobs.map((j) => j.id).filter(id => id != null))
      }
    }
  }

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)?`)) {
      return
    }

    try {
      const promises = selectedJobs.map((id) => api.delete(`/recruiter/jobs/${id}`))
      await Promise.all(promises)
      alert(`${selectedJobs.length} job(s) deleted successfully!`)
      setSelectedJobs([])
      loadJobs()
    } catch (error) {
      console.error('Failed to delete jobs:', error)
      alert('Failed to delete some jobs. Please try again.')
    }
  }

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return
    }

    try {
      await api.delete(`/recruiter/jobs/${jobId}`)
      alert('Job deleted successfully!')
      loadJobs()
    } catch (error) {
      console.error('Failed to delete job:', error)
      alert('Failed to delete job. Please try again.')
    }
  }

  const handleExportCSV = () => {
    try {
      const csvRows = ['ID,Job Title,Company,Applicants,Avg Score,Top Skill,Status,Created Date']
      jobs.forEach((job) => {
        const status = getStatusBadge(job)
        const avgScore = job.avgScore != null ? Math.round(job.avgScore) : 'N/A'
        const created = job.createdAt
          ? new Date(job.createdAt).toLocaleDateString()
          : 'N/A'
        csvRows.push(
          `${job.id},"${job.title}","${job.company}",${job.applications || 0},${avgScore},"${job.topSkill || 'N/A'}","${status.label}","${created}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `jobs-management-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
  }

  const getStatusBadge = (job) => {
    const count = job.applications || 0
    if (count === 0) return { label: 'Draft', class: 'badge-neutral' }
    if (count < 5) return { label: 'Open', class: 'badge-success' }
    if (count < 15) return { label: 'Reviewing', class: 'badge-warning' }
    return { label: 'Closed', class: 'badge-danger' }
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  useEffect(() => {
    setShowBulkActions(selectedJobs.length > 0)
  }, [selectedJobs])

  // Sync with URL search params
  useEffect(() => {
    const searchParam = searchParams.get('search')
    if (searchParam !== null && searchParam !== filters.search) {
      setFilters(prev => ({ ...prev, search: searchParam }))
      setShowFilters(true)
    }
  }, [searchParams])

  // Update URL when search filter changes
  useEffect(() => {
    if (filters.search) {
      setSearchParams({ search: filters.search }, { replace: true })
    } else {
      const current = searchParams.get('search')
      if (current) {
        const newParams = new URLSearchParams(searchParams)
        newParams.delete('search')
        setSearchParams(newParams, { replace: true })
      }
    }
  }, [filters.search])

  // Get unique companies for filter
  const companies = [...new Set(jobs.map((j) => j.company))].sort()

  return (
    <div className="job-management">
      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumbs">Home / Jobs</div>
          <h1 className="page-title">Job Management</h1>
          <p className="page-subtitle">
            Manage all your job postings with advanced filtering, sorting, and bulk actions
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
          <Link to="/jobs/create" className="btn btn-primary btn-sm">
            + Create New Job
          </Link>
        </div>
      </div>

      {showBulkActions && (
        <div className="bulk-actions-bar">
          <div className="bulk-info">
            <strong>{selectedJobs.length}</strong> job(s) selected
          </div>
          <div className="bulk-buttons">
            <button className="btn btn-danger btn-sm" onClick={handleBulkDelete}>
              Delete Selected
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setSelectedJobs([])}
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
              Use filters to quickly find the jobs you're looking for
            </p>
            <div className="filter-grid">
              <div className="filter-group filter-group-search">
                <label>Search</label>
                <input
                  type="text"
                  placeholder="Job title, description..."
                  className="filter-input"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Company</label>
                <select
                  className="filter-select"
                  value={filters.company}
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
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="closed">Closed</option>
                </select>
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
                      search: '',
                      company: '',
                      status: '',
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
        </div>
      )}

      <div className="table-section">
        <div className="table-header-bar">
          <div className="table-info">
            <h3 className="table-title">All Jobs</h3>
            <span className="table-count">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''}
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
              <option value="title">Title</option>
              <option value="company">Company</option>
              <option value="applications">Applicants</option>
              <option value="avgScore">Avg Score</option>
            </select>
            <button
              className="btn-icon"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={jobs.length > 0 && selectedJobs.length === jobs.length}
                      onChange={handleSelectAll}
                      aria-label="Select all jobs"
                    />
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('id')}
                  >
                    <span>ID</span>
                    {getSortIcon('id')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('title')}
                  >
                    <span>JOB TITLE</span>
                    {getSortIcon('title')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('company')}
                  >
                    <span>COMPANY</span>
                    {getSortIcon('company')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('applications')}
                  >
                    <span>APPLICANTS</span>
                    {getSortIcon('applications')}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('avgScore')}
                  >
                    <span>AVG SCORE</span>
                    {getSortIcon('avgScore')}
                  </th>
                  <th>TOP SKILL</th>
                  <th>STATUS</th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('createdAt')}
                  >
                    <span>CREATED</span>
                    {getSortIcon('createdAt')}
                  </th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="empty-state">
                      No jobs found. <Link to="/jobs/create">Create your first job</Link>
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => {
                    const status = getStatusBadge(job)
                    const isSelected = selectedJobs.includes(job.id)
                    return (
                      <tr key={job.id} className={isSelected ? 'selected' : ''}>
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectJob(job.id)}
                            aria-label={`Select job ${job.title}`}
                          />
                        </td>
                        <td>#{job.id}</td>
                        <td>
                          <Link to={`/jobs/${job.id}`} className="job-title-link">
                            <strong>
                              {job.title}
                              <span className="job-id-inline"> (#{job.id})</span>
                            </strong>
                          </Link>
                        </td>
                        <td>{job.company}</td>
                        <td>{job.applications || 0}</td>
                        <td>
                          {job.avgScore != null
                            ? `${Math.round(job.avgScore)}%`
                            : '–'}
                        </td>
                        <td>
                          {job.topSkill ? (
                            <span className="pill">{job.topSkill}</span>
                          ) : (
                            '–'
                          )}
                        </td>
                        <td>
                          <span className={`badge ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td>{formatDate(job.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              to={`/jobs/${job.id}`}
                              className="btn-action btn-view"
                              title="View Details"
                            >
                              <ViewIcon size={18} />
                            </Link>
                            <button
                              className="btn-action btn-delete"
                              onClick={() => handleDelete(job.id)}
                              title="Delete"
                            >
                              <TrashIcon size={18} />
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

export default JobManagement


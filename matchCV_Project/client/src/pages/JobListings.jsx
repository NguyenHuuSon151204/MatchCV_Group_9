import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './JobListings.css'
import '../components/Button.css'
import api from '../services/api'

function JobListings() {
  const [jobs, setJobs] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    company: '',
  })

  useEffect(() => {
    loadJobs()
    loadCompanies()
  }, [])

  // Load unique companies from jobs
  const loadCompanies = async () => {
    try {
      const data = await api.get('/recruiter/jobs')
      const uniqueCompanies = [...new Set(data.map(job => job.company))].sort()
      setCompanies(uniqueCompanies)
    } catch (error) {
      console.error('Failed to load companies:', error)
    }
  }

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (filters.search) params.append('q', filters.search)
      if (filters.company) params.append('company', filters.company)

      const data = await api.get(`/recruiter/jobs?${params.toString()}`)
      setJobs(data || [])
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

  const handleSearch = () => {
    loadJobs()
  }

  const handleExportCSV = () => {
    try {
      const csvRows = ['Job Title,Company,Applicants,Avg Score,Top Skill,Status,Created']
      jobs.forEach((job) => {
        const status = getStatusBadge(job)
        const avgScore = job.avgScore != null ? Math.round(job.avgScore) : 'N/A'
        const created = job.createdAt 
          ? new Date(job.createdAt).toLocaleDateString() 
          : 'N/A'
        csvRows.push(
          `"${job.title}","${job.company}",${job.applications || 0},${avgScore},"${job.topSkill || 'N/A'}","${status.label}","${created}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `jobs-report-${new Date().toISOString().split('T')[0]}.csv`
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

  return (
    <div className="job-listings">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Job Listings</div>
          <h1 className="page-title">Job Listings</h1>
          <p className="page-subtitle">
            Manage your job postings, create new jobs, and export reports
          </p>
        </div>
        <div className="header-actions">
          <Link to="/jobs/create" className="btn btn-primary">
            + Post New Job
          </Link>
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
            placeholder="Job title, company, recruiter..."
            className="filter-input"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
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
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setFilters({ search: '', company: '' })
              loadJobs()
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">All Jobs</h3>
          <span className="table-count">{jobs.length} job{jobs.length !== 1 ? 's' : ''}</span>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Applicants</th>
                <th>Avg. Score</th>
                <th>Top Skill</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No jobs found. <Link to="/jobs/create">Create your first job</Link>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => {
                  const status = getStatusBadge(job)
                  return (
                    <tr key={job.id}>
                      <td>#{job.id}</td>
                      <td>
                        <strong>{job.title}</strong>
                      </td>
                      <td>{job.company}</td>
                      <td>{job.applications || 0}</td>
                      <td>
                        {job.avgScore != null
                          ? `${Math.round(job.avgScore)}%`
                          : '–'}
                      </td>
                      <td>
                        <span className="pill">{job.topSkill || '–'}</span>
                      </td>
                      <td>
                        <span className={`badge ${status.class}`}>
                          {status.label}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/jobs/${job.id}`}
                            className="btn-action btn-view"
                          >
                            View
                          </Link>
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

export default JobListings


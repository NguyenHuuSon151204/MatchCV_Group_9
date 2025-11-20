import { useEffect, useState } from 'react'
import './Applicants.css'
import '../components/Button.css'
import api from '../services/api'

function Applicants() {
  const [applicants, setApplicants] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    jobId: '',
    status: '',
    minScore: '',
  })

  useEffect(() => {
    loadJobs()
    loadApplicants()
  }, [])

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
      if (filters.jobId) {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.minScore) params.append('minScore', filters.minScore)

        const data = await api.get(
          `/recruiter/jobs/${filters.jobId}/applications?${params.toString()}`
        )
        const job = jobs.find((j) => j.id === parseInt(filters.jobId))
        setApplicants(
          (data || []).map((app) => ({
            ...app,
            jobTitle: job?.title || 'Unknown',
            jobCompany: job?.company || '',
          }))
        )
      } else {
        // Load from all jobs
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
        let allApplicants = results.flat()

        // Apply filters
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

        allApplicants.sort(
          (a, b) => (b.scoreSnapshot || 0) - (a.scoreSnapshot || 0)
        )
        setApplicants(allApplicants)
      }
    } catch (error) {
      console.error('Failed to load applicants:', error)
      setError('Failed to load applicants. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    try {
      const csvRows = ['Applicant,Email,Job,Company,AI Score,Matching Skills,Status,Applied Date']
      applicants.forEach((app) => {
        const score = app.scoreSnapshot != null ? Math.round(app.scoreSnapshot) : 'N/A'
        const skills = (app.matchingSkills && app.matchingSkills.length > 0)
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

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    loadApplicants()
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

  return (
    <div className="applicants">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Applicants</div>
          <h1 className="page-title">Applicants</h1>
          <p className="page-subtitle">
            View and manage all applicants across all jobs
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
          <input
            type="number"
            placeholder="Min Score"
            className="filter-input"
            min="0"
            max="100"
            value={filters.minScore}
            onChange={(e) => handleFilterChange('minScore', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setFilters({ jobId: '', status: '', minScore: '' })
              loadApplicants()
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">All Applicants</h3>
          <span className="table-count">
            {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}
          </span>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {loading ? (
          <div className="loading">Loading applicants...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job</th>
                <th>AI Score</th>
                <th>Matching Skills</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    Không tìm thấy applicants nào.
                  </td>
                </tr>
              ) : (
                applicants.map((app) => {
                  const status = getStatusBadge(app.status)
                  return (
                    <tr key={app.id}>
                      <td>
                        <div>
                          <strong>{app.candidate?.displayName || 'Unknown'}</strong>
                          <br />
                          <span className="text-muted">
                            {app.candidate?.email || ''}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{app.jobTitle || 'Unknown'}</strong>
                          <br />
                          <span className="text-muted">{app.jobCompany || ''}</span>
                        </div>
                      </td>
                      <td>
                        <span className="pill score-pill">
                          {app.scoreSnapshot != null
                            ? `${Math.round(app.scoreSnapshot)}%`
                            : '–'}
                        </span>
                      </td>
                      <td>
                        <div className="skills-container">
                          {app.matchingSkills && app.matchingSkills.length > 0 ? (
                            app.matchingSkills.map((skill, idx) => (
                              <span key={idx} className="pill skill-pill">
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">No matching skills</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${status.class}`}>
                          {status.label}
                        </span>
                      </td>
                      <td>
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString('vi-VN')
                          : '–'}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action btn-view">View CV</button>
                          {app.jobId && (
                            <button className="btn-action btn-edit">View Job</button>
                          )}
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

export default Applicants


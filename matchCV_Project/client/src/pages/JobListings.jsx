import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './JobListings.css'
import '../components/Button.css'
import api from '../services/api'

function JobListings() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    company: '',
  })

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.search) params.append('q', filters.search)
      if (filters.company) params.append('company', filters.company)

      const data = await api.get(`/recruiter/jobs?${params.toString()}`)
      setJobs(data || [])
    } catch (error) {
      console.error('Failed to load jobs:', error)
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
          <div className="breadcrumbs">Trang chủ / Job Listings</div>
          <h1 className="page-title">Job Listings</h1>
        </div>
        <div className="header-actions">
          <Link to="/jobs/create" className="btn btn-primary">
            + Post New Job
          </Link>
          <button className="btn btn-outline">Export CSV</button>
        </div>
      </div>

      <div className="filter-card">
        <h3 className="filter-title">Tìm kiếm</h3>
        <div className="filter-row">
          <input
            type="text"
            placeholder="Tên công ty, recruiter..."
            className="filter-input"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <select
            className="filter-select"
            value={filters.company}
            onChange={(e) => handleFilterChange('company', e.target.value)}
          >
            <option value="">Tất cả công ty</option>
          </select>
          <button className="btn btn-primary" onClick={handleSearch}>
            Tìm kiếm
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              setFilters({ search: '', company: '' })
              loadJobs()
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">Danh sách Jobs</h3>
          <span className="table-count">{jobs.length} jobs</span>
        </div>

        {loading ? (
          <div className="loading">Đang tải...</div>
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
                    Không tìm thấy jobs nào. <Link to="/jobs/create">Tạo job mới</Link>
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


import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './RecruiterDashboard.css'
import '../components/Button.css'
import api from '../services/api'

function RecruiterDashboard() {
  const [summary, setSummary] = useState(null)
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [recentApplicants, setRecentApplicants] = useState([])
  const [topSkills, setTopSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    loadDashboard()
  }, [])

  useEffect(() => {
    filterAndSortJobs()
  }, [jobs, searchQuery, sortBy, sortOrder])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.get('/recruiter/dashboard')
      setSummary(data.summary || {})
      setJobs(data.jobs || [])
      setRecentApplicants(data.recentApplicants || [])
      setTopSkills(data.topSkills || [])
    } catch (err) {
      console.error('Failed to load recruiter dashboard:', err)
      setError(err.message || 'Failed to load dashboard.')
    } finally {
      setLoading(false)
    }
  }

  const highlightJob = useMemo(() => {
    if (!jobs.length) return null
    return jobs.reduce((prev, current) => {
      const prevScore = prev.avgScore || 0
      const currentScore = current.avgScore || 0
      return currentScore > prevScore ? current : prev
    })
  }, [jobs])

  const formatDate = (value) => {
    if (!value) return 'N/A'
    return new Date(value).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatDateTime = (value) => {
    if (!value) return 'N/A'
    return new Date(value).toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getScoreClass = (score) => {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'good'
    if (score >= 40) return 'fair'
    return 'poor'
  }

  const filterAndSortJobs = () => {
    let filtered = [...jobs]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query) ||
          job.topSkill?.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      if (sortBy === 'createdAt') {
        aVal = new Date(aVal).getTime()
        bVal = new Date(bVal).getTime()
      } else if (sortBy === 'avgScore') {
        aVal = aVal ?? 0
        bVal = bVal ?? 0
      } else if (sortBy === 'applicants') {
        aVal = a.applicants ?? 0
        bVal = b.applicants ?? 0
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    setFilteredJobs(filtered)
  }

  const handleExportCSV = () => {
    try {
      const csvRows = [
        'ID,Title,Company,Applicants,Avg Score,Top Skill,Created Date',
      ]
      filteredJobs.forEach((job) => {
        csvRows.push(
          `${job.id},"${job.title}","${job.company || 'N/A'}",${job.applicants || 0},${job.avgScore != null ? Math.round(job.avgScore) : 'N/A'},"${job.topSkill || 'N/A'}","${formatDate(job.createdAt)}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `recruiter-jobs-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
  }

  return (
    <div className="recruiter-dashboard">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Recruiter Dashboard</div>
          <h1 className="page-title">Recruiter Dashboard</h1>
          <p className="page-subtitle">
            Track JD performance, candidate scores, and create new JDs in just a few steps.
          </p>
        </div>
        <div className="header-actions">
          <Link to="/jobs/create" className="btn btn-primary">
            + New JD
          </Link>
          <button className="btn btn-outline" onClick={loadDashboard}>
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading recruiter data...</div>
      ) : (
        <>
          <div className="summary-grid">
            <div className="summary-card">
              <span className="summary-label">Total JDs</span>
              <strong className="summary-value">{summary?.totalJobs ?? 0}</strong>
              <span className="summary-meta">JDs you are managing</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Active JDs</span>
              <strong className="summary-value">{summary?.activeJobs ?? 0}</strong>
              <span className="summary-meta">Currently receiving CVs</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Total Applicants</span>
              <strong className="summary-value">{summary?.totalApplicants ?? 0}</strong>
              <span className="summary-meta">CVs evaluated</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Avg Score</span>
              <strong className="summary-value">
                {summary?.averageScore != null ? `${summary.averageScore}%` : 'N/A'}
              </strong>
              <span className="summary-meta">Average score across all candidates</span>
            </div>
            <div className="summary-card highlight">
              <span className="summary-label">New Applications (7d)</span>
              <strong className="summary-value">{summary?.newApplications ?? 0}</strong>
              <span className="summary-meta">New CVs this week</span>
            </div>
          </div>

          {highlightJob && (
            <div className="featured-card">
              <div>
                <span className="featured-label">Top Performing JD</span>
                <h3>{highlightJob.title}</h3>
                <p>
                  {highlightJob.company} • Avg Score:{' '}
                  {highlightJob.avgScore != null ? `${highlightJob.avgScore}%` : 'N/A'} • Applicants:{' '}
                  {highlightJob.applicants}
                </p>
              </div>
              <Link to={`/jobs/${highlightJob.id}`} className="btn btn-outline">
                View Details
              </Link>
            </div>
          )}

          <div className="dashboard-grid">
            <div className="dashboard-card full">
              <div className="card-header">
                <div>
                  <h2>Job Descriptions</h2>
                  <p>Click a JD to view candidates and their scores</p>
                </div>
                <div className="header-actions-group">
                  <Link to="/jobs" className="btn btn-outline">
                    Manage All
                  </Link>
                  {filteredJobs.length > 0 && (
                    <button className="btn btn-outline" onClick={handleExportCSV}>
                      📥 Export CSV
                    </button>
                  )}
                </div>
              </div>

              {jobs.length > 0 && (
                <div className="dashboard-filters">
                  <div className="filter-group">
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="Search by title, company, or skill..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="filter-group sort-group">
                    <label className="sort-label">Sort by:</label>
                    <div className="sort-controls">
                      <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="createdAt">Created Date</option>
                        <option value="avgScore">Avg Score</option>
                        <option value="applicants">Applicants</option>
                        <option value="title">Title</option>
                      </select>
                      <button
                        className="btn-sort-toggle"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                      >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {jobs.length === 0 ? (
                <div className="empty-state">
                  No JDs yet. <Link to="/jobs/create">Create your first JD now</Link>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="empty-state">
                  No JDs match your search. <button
                    className="link-button"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="job-table">
                  <div className="job-table-header">
                    <span>JD</span>
                    <span>Applicants</span>
                    <span>Avg Score</span>
                    <span>Top Skill</span>
                    <span>Top Candidates</span>
                  </div>

                  {filteredJobs.map((job) => (
                    <Link
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      className="job-row"
                    >
                      <div className="job-main">
                        <span className="job-title">
                          {job.title}
                        </span>
                        <span className="job-meta">
                          {job.company} • {formatDate(job.createdAt)}
                        </span>
                      </div>
                      <div className="job-count">
                        <span className="count-badge">{job.applicants || 0}</span>
                      </div>
                      <div className="job-score">
                        {job.avgScore != null ? (
                          <span className={`score-display score-${getScoreClass(job.avgScore)}`}>
                            {Math.round(job.avgScore)}%
                          </span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </div>
                      <div className="job-skill">
                        {job.topSkill ? (
                          <span className="pill">{job.topSkill}</span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </div>
                      <div className="job-candidates">
                        {job.topCandidates && job.topCandidates.length > 0 ? (
                          job.topCandidates.map((candidate) => (
                            <span key={candidate.id} className="candidate-pill">
                              {candidate.name || 'Unknown'}{' '}
                              {candidate.score != null && (
                                <span className="candidate-score">{Math.round(candidate.score)}%</span>
                              )}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">Waiting for CVs</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <div>
                  <h2>Recent Applicants</h2>
                  <p>The most recent CVs submitted to your JDs</p>
                </div>
                {recentApplicants.length > 0 && (
                  <Link to="/applicants" className="btn btn-outline btn-small">
                    View All
                  </Link>
                )}
              </div>
              {recentApplicants.length === 0 ? (
                <div className="empty-state small">No recent CVs.</div>
              ) : (
                <div className="recent-list">
                  {recentApplicants.map((app) => (
                    <Link
                      key={app.id}
                      to={`/jobs/${app.jobId}`}
                      className="recent-item clickable"
                    >
                      <div className="recent-info">
                        <strong>{app.candidateName || 'Unknown'}</strong>
                        <span>{app.jobTitle}</span>
                        <small>{formatDateTime(app.createdAt)}</small>
                      </div>
                      <div className="recent-score">
                        {app.score != null ? (
                          <span className="score-badge">{Math.round(app.score)}%</span>
                        ) : (
                          <span className="score-badge neutral">N/A</span>
                        )}
                        <span className={`status-pill status-${(app.status || 'pending').toLowerCase()}`}>
                          {app.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <div>
                  <h2>Top Required Skills</h2>
                  <p>Most frequently required skills across your JDs</p>
                </div>
              </div>
              {topSkills.length === 0 ? (
                <div className="empty-state small">No skills data yet.</div>
              ) : (
                <div className="skills-list">
                  {topSkills.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name || skill.skill || skill}</span>
                        <span className="skill-count">{skill.count || skill.jobCount || 0} JD{skill.count !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{
                            width: `${Math.min(100, ((skill.count || skill.jobCount || 0) / (topSkills[0]?.count || topSkills[0]?.jobCount || 1)) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RecruiterDashboard

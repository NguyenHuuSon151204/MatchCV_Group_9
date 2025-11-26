import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './RecruiterDashboard.css'
import '../components/Button.css'
import api from '../services/api'

function RecruiterDashboard() {
  const [summary, setSummary] = useState(null)
  const [jobs, setJobs] = useState([])
  const [recentApplicants, setRecentApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.get('/recruiter/dashboard')
      setSummary(data.summary || {})
      setJobs(data.jobs || [])
      setRecentApplicants(data.recentApplicants || [])
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
                <Link to="/jobs" className="btn btn-outline">
                  Manage All
                </Link>
              </div>

              {jobs.length === 0 ? (
                <div className="empty-state">
                  No JDs yet. <Link to="/jobs/create">Create your first JD now</Link>
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

                  {jobs.map((job) => (
                    <div key={job.id} className="job-row">
                      <div className="job-main">
                        <Link to={`/jobs/${job.id}`} className="job-title">
                          {job.title}
                        </Link>
                        <span className="job-meta">
                          {job.company} • {formatDate(job.createdAt)}
                        </span>
                      </div>
                      <div className="job-count">{job.applicants}</div>
                      <div className="job-score">
                        {job.avgScore != null ? `${Math.round(job.avgScore)}%` : 'N/A'}
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
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Recent Applicants</h2>
                <p>The most recent CVs submitted to your JDs</p>
              </div>
              {recentApplicants.length === 0 ? (
                <div className="empty-state small">No recent CVs.</div>
              ) : (
                <div className="recent-list">
                  {recentApplicants.map((app) => (
                    <div key={app.id} className="recent-item">
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

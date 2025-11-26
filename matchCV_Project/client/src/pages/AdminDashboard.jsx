import { useEffect, useState } from 'react'
import './AdminDashboard.css'
import '../components/Button.css'
import api from '../services/api'

function AdminDashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = async () => {
    try {
      setError(null)
      const data = await api.get('/admin/summary')
      setSummary(data)
    } catch (error) {
      console.error('Failed to load admin summary:', error)
      setError(error.message || 'Failed to load admin summary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Đang tải...</div>
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="page-header">
          <div>
            <div className="breadcrumbs">Trang chủ / Admin Dashboard</div>
            <h1 className="page-title">Admin Dashboard</h1>
          </div>
        </div>
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={loadSummary}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Trang chủ / Admin Dashboard</div>
          <h1 className="page-title">Admin Dashboard</h1>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Users</div>
          <div className="stat-value">
            {summary?.totals?.users || 0}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">CVs</div>
          <div className="stat-value">
            {summary?.totals?.cvs || 0}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Jobs</div>
          <div className="stat-value">
            {summary?.totals?.jobs || 0}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Applications</div>
          <div className="stat-value">
            {summary?.totals?.apps || 0}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">AI Calls</div>
          <div className="stat-value">
            {summary?.aiCalls || 0}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="card-title">Top Skills</h2>
          <div className="skills-list">
            {summary?.topSkills && summary.topSkills.length > 0 ? (
              summary.topSkills.map((skill, idx) => (
                <span key={idx} className="pill">
                  {skill.skill} ({skill.count})
                </span>
              ))
            ) : (
              <span className="text-muted">No data yet</span>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Recent Admin Logs</h2>
          <div className="logs-list">
            {summary?.logs && summary.logs.length > 0 ? (
              summary.logs.slice(0, 10).map((log, idx) => (
                <div key={idx} className="log-item">
                  <div className="log-time">
                    {new Date(log.createdAt).toLocaleString('vi-VN')}
                  </div>
                  <div className="log-text">
                    {log.actor} - {log.action} {log.entity}#{log.entityId || ''}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-muted">No logs yet. Logs are loaded from /api/admin/logs endpoint.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


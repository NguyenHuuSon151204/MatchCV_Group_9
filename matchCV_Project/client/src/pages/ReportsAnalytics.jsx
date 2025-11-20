import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './ReportsAnalytics.css'
import '../components/Button.css'
import api from '../services/api'

function ReportsAnalytics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    loadReports()
  }, [dateRange])

  const loadReports = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (dateRange.from) params.append('from', dateRange.from)
      if (dateRange.to) params.append('to', dateRange.to)

      const data = await api.get(`/admin/summary?${params.toString()}`)
      setStats(data)
    } catch (error) {
      console.error('Failed to load reports:', error)
      setError('Failed to load reports. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }))
  }

  const formatNumber = (num) => {
    if (!num) return '0'
    return num.toLocaleString()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="reports-analytics">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Reports & Analytics</div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">
            Comprehensive insights and statistics about your recruitment platform
          </p>
        </div>
      </div>

      <div className="filter-card">
        <h3 className="filter-title">Date Range</h3>
        <div className="filter-row">
          <div className="date-input-group">
            <label>From</label>
            <input
              type="date"
              className="date-input"
              value={dateRange.from}
              onChange={(e) => handleDateChange('from', e.target.value)}
            />
          </div>
          <div className="date-input-group">
            <label>To</label>
            <input
              type="date"
              className="date-input"
              value={dateRange.to}
              onChange={(e) => handleDateChange('to', e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={loadReports}>
            Apply Filter
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading reports...</div>
      ) : stats ? (
        <>
          <div className="stats-grid">
            <div className="stat-card stat-card-blue">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-title">Total Users</div>
                <div className="stat-value">{formatNumber(stats.totals?.users)}</div>
                <div className="stat-label">All registered users</div>
              </div>
            </div>

            <div className="stat-card stat-card-green">
              <div className="stat-icon">📄</div>
              <div className="stat-content">
                <div className="stat-title">Total CVs</div>
                <div className="stat-value">{formatNumber(stats.totals?.cvs)}</div>
                <div className="stat-label">Uploaded CVs</div>
              </div>
            </div>

            <div className="stat-card stat-card-orange">
              <div className="stat-icon">💼</div>
              <div className="stat-content">
                <div className="stat-title">Total Jobs</div>
                <div className="stat-value">{formatNumber(stats.totals?.jobs)}</div>
                <div className="stat-label">Job postings</div>
              </div>
            </div>

            <div className="stat-card stat-card-purple">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-title">Total Applications</div>
                <div className="stat-value">{formatNumber(stats.totals?.apps)}</div>
                <div className="stat-label">All applications</div>
              </div>
            </div>
          </div>

          <div className="reports-grid">
            <div className="report-card">
              <h3 className="card-title">Top Skills</h3>
              <div className="skills-list">
                {stats.topSkills && stats.topSkills.length > 0 ? (
                  stats.topSkills.map((item, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-name">{item.skill}</span>
                      <span className="skill-count">{item.count} mentions</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-text">No skills data available</div>
                )}
              </div>
            </div>

            <div className="report-card">
              <h3 className="card-title">AI Performance</h3>
              <div className="ai-stats">
                <div className="ai-stat-item">
                  <div className="ai-stat-label">Total AI Calls</div>
                  <div className="ai-stat-value">{formatNumber(stats.aiCalls)}</div>
                </div>
                <div className="ai-stat-item">
                  <div className="ai-stat-label">Date Range</div>
                  <div className="ai-stat-value">
                    {formatDate(stats.range?.start)} - {formatDate(stats.range?.end)}
                  </div>
                </div>
              </div>
            </div>

            <div className="report-card chart-card">
              <h3 className="card-title">Average Score Trend</h3>
              {stats.avgScoreByDay && stats.avgScoreByDay.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={stats.avgScoreByDay.map((item) => ({
                      date: formatDate(item.day),
                      score: Math.round(item.avg),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                    <XAxis
                      dataKey="date"
                      stroke="var(--text-muted)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="var(--text-muted)"
                      style={{ fontSize: '12px' }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius)',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      name="Match Score (%)"
                      dot={{ fill: 'var(--accent)', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-text">No score data available</div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ReportsAnalytics


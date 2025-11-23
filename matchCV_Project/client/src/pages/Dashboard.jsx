import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './Dashboard.css'
import '../components/Button.css'
import api from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalRecruiters: 0,
    openJobs: 0,
    aiMatchesToday: 0,
  })
  const [chartData, setChartData] = useState([])
  const [topSkills, setTopSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const data = await api.get('/admin/summary')
      console.log('Dashboard API response:', data)
      console.log('Recruiters count:', data.totals?.recruiters)
      setStats({
        totalCandidates: data.totals?.users || 0,
        totalRecruiters: data.totals?.recruiters || 0,
        openJobs: data.totals?.jobs || 0,
        aiMatchesToday: data.totals?.apps || 0,
      })

      // Prepare chart data
      if (data.avgScoreByDay && data.avgScoreByDay.length > 0) {
        const formatted = data.avgScoreByDay.map((item) => ({
          date: new Date(item.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          score: Math.round(item.avg),
        }))
        setChartData(formatted)
      }

      // Prepare top skills data
      if (data.topSkills && data.topSkills.length > 0) {
        setTopSkills(data.topSkills.slice(0, 5))
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'TOTAL CANDIDATES',
      value: stats.totalCandidates.toLocaleString(),
      change: '+12% vs last week',
      icon: '👥',
      color: 'blue',
    },
    {
      title: 'TOTAL RECRUITERS',
      value: stats.totalRecruiters.toLocaleString(),
      change: '+5% vs last week',
      icon: '🏢',
      color: 'purple',
    },
    {
      title: 'OPEN JOBS',
      value: stats.openJobs.toLocaleString(),
      change: '+8% vs last week',
      icon: '💼',
      color: 'orange',
    },
    {
      title: 'AI MATCHES TODAY',
      value: stats.aiMatchesToday.toLocaleString(),
      change: '+3% vs yesterday',
      icon: '🤖',
      color: 'teal',
    },
  ]

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Dashboard</div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Overview of your recruitment activities and AI-powered insights
          </p>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className={`stat-card stat-card-${card.color}`}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-content">
              <div className="stat-title">{card.title}</div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-change positive">{card.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h2 className="card-title">Average Match Score Trend</h2>
          {loading ? (
            <div className="loading-text">Loading chart data...</div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
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
            <div className="empty-chart">No chart data available</div>
          )}
        </div>

        <div className="dashboard-card chart-card">
          <h2 className="card-title">Top Skills</h2>
          {loading ? (
            <div className="loading-text">Loading skills data...</div>
          ) : topSkills.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSkills} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" stroke="var(--text-muted)" style={{ fontSize: '12px' }} />
                <YAxis
                  dataKey="skill"
                  type="category"
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="count" fill="var(--accent)" name="Mentions" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">No skills data available</div>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="card-title">Recent Activity</h2>
          <div className="activity-list">
            {loading ? (
              <div className="loading-text">Loading activities...</div>
            ) : (
              <>
                <div className="activity-item">
                  <div className="activity-time">10 minutes ago</div>
                  <div className="activity-text">
                    Candidate uploaded new CV
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">25 minutes ago</div>
                  <div className="activity-text">
                    Recruiter created new job posting (Senior Developer)
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">1 hour ago</div>
                  <div className="activity-text">AI matched 12 CVs to Job #123</div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">2 hours ago</div>
                  <div className="activity-text">
                    Candidate applied for Job #456
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-time">3 hours ago</div>
                  <div className="activity-text">
                    System backup completed successfully
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">AI System Status</h2>
          <div className="ai-status">
            <div className="status-info">
              <div className="status-label">Status:</div>
              <div className="status-value online">ONLINE • Stable</div>
            </div>
            <div className="status-info">
              <div className="status-label">Last sync:</div>
              <div className="status-value">2 minutes ago</div>
            </div>
            <div className="status-info">
              <div className="status-label">Model:</div>
              <div className="status-value">gpt-4.x</div>
            </div>
            <div className="status-info">
              <div className="status-label">Response Time:</div>
              <div className="status-value">234ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


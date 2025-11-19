import { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const data = await api.get('/admin/summary')
      setStats({
        totalCandidates: data.totals?.users || 0,
        totalRecruiters: 0, // TODO: Add recruiter count endpoint
        openJobs: data.totals?.jobs || 0,
        aiMatchesToday: data.totals?.apps || 0,
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'TỔNG SỐ CANDIDATE',
      value: stats.totalCandidates.toLocaleString(),
      change: '+12% vs tuần trước',
      icon: '👥',
      color: 'blue',
    },
    {
      title: 'TỔNG SỐ RECRUITER',
      value: stats.totalRecruiters.toLocaleString(),
      change: '+5% vs tuần trước',
      icon: '🏢',
      color: 'purple',
    },
    {
      title: 'JD ĐANG MỞ',
      value: stats.openJobs.toLocaleString(),
      change: '+8% vs tuần trước',
      icon: '💼',
      color: 'orange',
    },
    {
      title: 'MATCH AI HÔM NAY',
      value: stats.aiMatchesToday.toLocaleString(),
      change: '+3% vs hôm qua',
      icon: '🤖',
      color: 'teal',
    },
  ]

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Trang chủ / Dashboard</div>
          <h1 className="page-title">Dashboard</h1>
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
        <div className="dashboard-card">
          <h2 className="card-title">Hoạt động gần đây</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-time">10 phút trước</div>
              <div className="activity-text">
                Candidate Nguyễn A upload CV mới
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">25 phút trước</div>
              <div className="activity-text">
                Recruiter Tech Corp tạo JD mới (Senior Developer)
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">1 giờ trước</div>
              <div className="activity-text">AI matched 12 CVs to JD #123</div>
            </div>
            <div className="activity-item">
              <div className="activity-time">2 giờ trước</div>
              <div className="activity-text">
                Candidate Trần B apply cho JD #456
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">3 giờ trước</div>
              <div className="activity-text">
                System backup completed successfully
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Trạng thái AI</h2>
          <div className="ai-status">
            <div className="status-info">
              <div className="status-label">Status:</div>
              <div className="status-value online">ONLINE • Ổn định</div>
            </div>
            <div className="status-info">
              <div className="status-label">Last sync:</div>
              <div className="status-value">2 phút trước</div>
            </div>
            <div className="status-info">
              <div className="status-label">MODEL:</div>
              <div className="status-value">gpt-4.x</div>
            </div>
            <div className="status-info">
              <div className="status-label">THỜI GIAN PHẢN HỒI:</div>
              <div className="status-value">234ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


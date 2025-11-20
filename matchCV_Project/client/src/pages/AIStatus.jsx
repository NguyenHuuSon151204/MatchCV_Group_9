import { useEffect, useState } from 'react'
import './AIStatus.css'
import '../components/Button.css'
import api from '../services/api'

function AIStatus() {
  const [status, setStatus] = useState({
    isOnline: true,
    model: 'gpt-4.x',
    lastSync: new Date(),
    responseTime: 234,
    totalCalls: 0,
    successRate: 98.5,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAIStatus()
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadAIStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadAIStatus = async () => {
    try {
      setError(null)
      // Simulate API call - replace with actual endpoint when available
      const data = await api.get('/admin/summary')
      
      setStatus({
        isOnline: true,
        model: 'gpt-4.x',
        lastSync: new Date(),
        responseTime: Math.floor(Math.random() * 100) + 200, // Simulated
        totalCalls: data?.aiCalls || 0,
        successRate: 98.5,
      })
    } catch (error) {
      console.error('Failed to load AI status:', error)
      setStatus((prev) => ({ ...prev, isOnline: false }))
      setError('Failed to connect to AI service')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getStatusColor = (isOnline) => {
    return isOnline ? 'var(--success)' : 'var(--danger)'
  }

  return (
    <div className="ai-status-page">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / AI Status</div>
          <h1 className="page-title">AI System Status</h1>
          <p className="page-subtitle">
            Monitor AI service health, performance, and usage statistics
          </p>
        </div>
        <button className="btn btn-outline" onClick={loadAIStatus}>
          Refresh
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="status-grid">
        <div className="status-card status-card-main">
          <div className="status-header">
            <h3 className="status-title">System Status</h3>
            <div
              className="status-indicator"
              style={{ backgroundColor: getStatusColor(status.isOnline) }}
            >
              <span className="status-dot"></span>
              {status.isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>
          <div className="status-details">
            <div className="status-detail-item">
              <span className="detail-label">Model:</span>
              <span className="detail-value">{status.model}</span>
            </div>
            <div className="status-detail-item">
              <span className="detail-label">Last Sync:</span>
              <span className="detail-value">{formatTime(status.lastSync)}</span>
            </div>
            <div className="status-detail-item">
              <span className="detail-label">Response Time:</span>
              <span className="detail-value">{status.responseTime}ms</span>
            </div>
          </div>
        </div>

        <div className="status-card">
          <h3 className="card-title">Total AI Calls</h3>
          <div className="stat-number">{status.totalCalls.toLocaleString()}</div>
          <div className="stat-label">All time</div>
        </div>

        <div className="status-card">
          <h3 className="card-title">Success Rate</h3>
          <div className="stat-number">{status.successRate}%</div>
          <div className="stat-label">Last 30 days</div>
        </div>

        <div className="status-card">
          <h3 className="card-title">Average Response</h3>
          <div className="stat-number">{status.responseTime}ms</div>
          <div className="stat-label">Current average</div>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3 className="card-title">AI Service Information</h3>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Provider:</span>
              <span className="info-value">OpenAI</span>
            </div>
            <div className="info-item">
              <span className="info-label">Model Version:</span>
              <span className="info-value">{status.model}</span>
            </div>
            <div className="info-item">
              <span className="info-label">API Endpoint:</span>
              <span className="info-value">api.openai.com/v1</span>
            </div>
            <div className="info-item">
              <span className="info-label">Rate Limit:</span>
              <span className="info-value">100 requests/min</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3 className="card-title">Recent Activity</h3>
          <div className="activity-timeline">
            <div className="timeline-item">
              <div className="timeline-time">{formatTime(new Date(Date.now() - 120000))}</div>
              <div className="timeline-content">CV summarization completed</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">{formatTime(new Date(Date.now() - 300000))}</div>
              <div className="timeline-content">Job matching analysis finished</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">{formatTime(new Date(Date.now() - 600000))}</div>
              <div className="timeline-content">Skill extraction processed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIStatus


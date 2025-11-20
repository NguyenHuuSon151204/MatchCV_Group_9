import { useEffect, useState } from 'react'
import './AuditLog.css'
import '../components/Button.css'
import api from '../services/api'

function AuditLog() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    loadLogs()
  }, [dateRange])

  const loadLogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (dateRange.from) params.append('from', dateRange.from)
      if (dateRange.to) params.append('to', dateRange.to)

      const data = await api.get(`/admin/logs?${params.toString()}`)
      setLogs(data || [])
    } catch (error) {
      console.error('Failed to load logs:', error)
      setError('Failed to load audit logs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }))
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getLogTypeBadge = (action) => {
    if (!action) return { label: 'Unknown', class: 'badge-neutral' }
    
    const actionLower = action.toLowerCase()
    if (actionLower.includes('create') || actionLower.includes('add')) {
      return { label: 'Create', class: 'badge-success' }
    }
    if (actionLower.includes('update') || actionLower.includes('edit')) {
      return { label: 'Update', class: 'badge-info' }
    }
    if (actionLower.includes('delete') || actionLower.includes('remove')) {
      return { label: 'Delete', class: 'badge-danger' }
    }
    return { label: action, class: 'badge-neutral' }
  }

  return (
    <div className="audit-log">
      <div className="page-header">
        <div>
          <div className="breadcrumbs">Home / Audit Log</div>
          <h1 className="page-title">Audit Log</h1>
          <p className="page-subtitle">
            Track all system activities and administrative actions
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
          <button className="btn btn-primary" onClick={loadLogs}>
            Apply Filter
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">Audit Logs</h3>
          <span className="table-count">
            {logs.length} log{logs.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div className="loading">Loading audit logs...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Type</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No audit logs found for the selected date range.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => {
                  const typeBadge = getLogTypeBadge(log.action)
                  return (
                    <tr key={log.id || index}>
                      <td>{formatDateTime(log.createdAt)}</td>
                      <td>
                        <strong>{log.userName || 'System'}</strong>
                      </td>
                      <td>
                        <span className={`badge ${typeBadge.class}`}>
                          {typeBadge.label}
                        </span>
                      </td>
                      <td>{log.entityType || 'N/A'}</td>
                      <td className="log-details">
                        {log.details || log.action || 'No details available'}
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

export default AuditLog


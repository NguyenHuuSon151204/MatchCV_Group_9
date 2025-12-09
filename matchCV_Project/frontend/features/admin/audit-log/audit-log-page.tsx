'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'

interface AuditLog {
  id?: number
  createdAt: string
  userName?: string
  actor?: string
  action: string
  entity?: string
  entityId?: number
  details?: string
}

export function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
      const params: any = {}
      if (dateRange.from) params.from = dateRange.from
      if (dateRange.to) params.to = dateRange.to

      const data = await adminService.getLogs(params)
      setLogs(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error('Failed to load logs:', err)
      setError('Failed to load audit logs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (field: string, value: string) => {
    setDateRange((prev) => ({ ...prev, [field]: value }))
  }

  const formatDateTime = (dateString: string) => {
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

  const getLogTypeBadge = (action?: string) => {
    if (!action) return { label: 'Unknown', class: 'bg-gray-100 text-gray-800' }

    const actionLower = action.toLowerCase()
    if (actionLower.includes('create') || actionLower.includes('add')) {
      return { label: 'Create', class: 'bg-green-100 text-green-800' }
    }
    if (actionLower.includes('update') || actionLower.includes('edit')) {
      return { label: 'Update', class: 'bg-blue-100 text-blue-800' }
    }
    if (actionLower.includes('delete') || actionLower.includes('remove')) {
      return { label: 'Delete', class: 'bg-red-100 text-red-800' }
    }
    return { label: action, class: 'bg-gray-100 text-gray-800' }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">Home / Audit Log</div>
        <h1 className="text-2xl font-bold mb-2">Audit Log</h1>
        <p className="text-muted-foreground">
          Track all system activities and administrative actions
        </p>
      </div>

      <div className="mb-6 p-6 bg-card border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Date Range</h3>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">From</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={dateRange.from}
              onChange={(e) => handleDateChange('from', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">To</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={dateRange.to}
              onChange={(e) => handleDateChange('to', e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={loadLogs}
          >
            Apply Filter
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      <div className="bg-card border rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Audit Logs</h3>
            <span className="text-sm text-muted-foreground">
              {logs.length} log{logs.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading audit logs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left text-sm font-medium">Timestamp</th>
                  <th className="p-3 text-left text-sm font-medium">User</th>
                  <th className="p-3 text-left text-sm font-medium">Action</th>
                  <th className="p-3 text-left text-sm font-medium">Type</th>
                  <th className="p-3 text-left text-sm font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No audit logs found for the selected date range.
                    </td>
                  </tr>
                ) : (
                  logs.map((log, index) => {
                    const typeBadge = getLogTypeBadge(log.action)
                    return (
                      <tr key={log.id || index} className="border-b hover:bg-accent/50">
                        <td className="p-3 text-sm">{formatDateTime(log.createdAt)}</td>
                        <td className="p-3">
                          <strong>{log.userName || log.actor || 'System'}</strong>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${typeBadge.class}`}>
                            {typeBadge.label}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{log.entity || 'N/A'}</td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {log.details || `${log.action} ${log.entity || ''}${log.entityId ? `#${log.entityId}` : ''}`}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'

interface Summary {
  totals?: {
    users?: number
    cvs?: number
    jobs?: number
    apps?: number
  }
  aiCalls?: number
  topSkills?: Array<{ skill: string; count: number }>
  logs?: Array<{
    createdAt: string
    actor: string
    action: string
    entity: string
    entityId?: number
  }>
}

export function AdminDashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = async () => {
    try {
      setError(null)
      const data = await adminService.getSummary()
      setSummary(data)
    } catch (err: any) {
      console.error('Failed to load admin summary:', err)
      setError(err.message || 'Failed to load admin summary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Đang tải...</div>
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-1">Trang chủ / Admin Dashboard</div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="text-destructive mb-4">{error}</div>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          onClick={loadSummary}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">Trang chủ / Admin Dashboard</div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground mb-1">Users</div>
          <div className="text-2xl font-bold">{summary?.totals?.users || 0}</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground mb-1">CVs</div>
          <div className="text-2xl font-bold">{summary?.totals?.cvs || 0}</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground mb-1">Jobs</div>
          <div className="text-2xl font-bold">{summary?.totals?.jobs || 0}</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground mb-1">Applications</div>
          <div className="text-2xl font-bold">{summary?.totals?.apps || 0}</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground mb-1">AI Calls</div>
          <div className="text-2xl font-bold">{summary?.aiCalls || 0}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Top Skills</h2>
          <div className="flex flex-wrap gap-2">
            {summary?.topSkills && summary.topSkills.length > 0 ? (
              summary.topSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {skill.skill} ({skill.count})
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">No data yet</span>
            )}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Recent Admin Logs</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {summary?.logs && summary.logs.length > 0 ? (
              summary.logs.slice(0, 10).map((log, idx) => (
                <div key={idx} className="text-sm border-b pb-2">
                  <div className="text-muted-foreground text-xs mb-1">
                    {new Date(log.createdAt).toLocaleString('vi-VN')}
                  </div>
                  <div>
                    {log.actor} - {log.action} {log.entity}
                    {log.entityId ? `#${log.entityId}` : ''}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-muted-foreground">
                No logs yet. Logs are loaded from /api/admin/logs endpoint.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

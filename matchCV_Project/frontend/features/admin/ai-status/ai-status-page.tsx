'use client'

import { useEffect, useState } from 'react'
import { adminService } from '@/lib/services/admin-service'
import { RefreshCw, CheckCircle2, XCircle, Activity, Zap, DollarSign } from 'lucide-react'

interface AIStatus {
  isOnline: boolean
  model: string
  provider: string
  lastSync: Date
  responseTime: number
  totalCalls: number
  recentCalls: number
  successRate: number
  totalTokensIn: number
  totalTokensOut: number
  totalCost: number
  recentActivity: Array<{
    id: number
    provider: string
    model: string
    status: string
    latencyMs?: number
    createdAt: string
  }>
}

export function AIStatusPage() {
  const [status, setStatus] = useState<AIStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAIStatus()
    const interval = setInterval(loadAIStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadAIStatus = async () => {
    try {
      setError(null)
      const response = await adminService.getAIStatus()
      const data = response.data

      setStatus({
        isOnline: data.isOnline ?? true,
        model: data.model || 'gpt-4',
        provider: data.provider || 'OpenAI',
        lastSync: new Date(data.lastSync || new Date()),
        responseTime: data.responseTime || 0,
        totalCalls: data.totalCalls || 0,
        recentCalls: data.recentCalls || 0,
        successRate: data.successRate || 0,
        totalTokensIn: data.totalTokensIn || 0,
        totalTokensOut: data.totalTokensOut || 0,
        totalCost: data.totalCost || 0,
        recentActivity: data.recentActivity || [],
      })
    } catch (err: any) {
      console.error('Failed to load AI status:', err)
      setError('Failed to connect to AI service')
      setStatus(prev => prev ? { ...prev, isOnline: false } : null)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Đang tải...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / AI Status</div>
          <h1 className="text-2xl font-bold mb-2">AI System Status</h1>
          <p className="text-muted-foreground">
            Monitor AI service health, performance, and usage statistics
          </p>
        </div>
        <button
          className="px-4 py-2 border rounded hover:bg-accent flex items-center gap-2"
          onClick={loadAIStatus}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card p-6 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">System Status</h3>
            <div className="flex items-center gap-2">
              {status?.isOnline ? (
                <CheckCircle2 className="size-5 text-green-600" />
              ) : (
                <XCircle className="size-5 text-red-600" />
              )}
              <span className={`text-sm font-medium ${status?.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {status?.isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model:</span>
              <span className="font-medium">{status?.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider:</span>
              <span className="font-medium">{status?.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Sync:</span>
              <span className="font-medium">{status ? formatTime(status.lastSync) : 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="size-4 text-primary" />
            <h3 className="text-sm text-muted-foreground">Total AI Calls</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{status?.totalCalls.toLocaleString() || 0}</div>
          <div className="text-xs text-muted-foreground">
            {status?.recentCalls || 0} in last 30 days
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="size-4 text-green-600" />
            <h3 className="text-sm text-muted-foreground">Success Rate</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{status?.successRate || 0}%</div>
          <div className="text-xs text-muted-foreground">Last 30 days</div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="size-4 text-yellow-600" />
            <h3 className="text-sm text-muted-foreground">Avg Response</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{status?.responseTime || 0}ms</div>
          <div className="text-xs text-muted-foreground">Current average</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Token Usage (Last 30 Days)</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Input Tokens:</span>
              <span className="font-medium">{status?.totalTokensIn.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Output Tokens:</span>
              <span className="font-medium">{status?.totalTokensOut.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Tokens:</span>
              <span className="font-medium">
                {((status?.totalTokensIn || 0) + (status?.totalTokensOut || 0)).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-muted-foreground flex items-center gap-1">
                <DollarSign className="size-4" />
                Estimated Cost:
              </span>
              <span className="font-medium text-lg">${status?.totalCost.toFixed(4) || '0.0000'}</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">AI Service Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider:</span>
              <span className="font-medium">{status?.provider || 'Google'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model Version:</span>
              <span className="font-medium">{status?.model || 'gemini-pro'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">API Endpoint:</span>
              <span className="font-medium">generativelanguage.googleapis.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate Limit:</span>
              <span className="font-medium">60 requests/min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {status?.recentActivity && status.recentActivity.length > 0 ? (
            status.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between text-sm border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className={`size-2 rounded-full ${activity.status.toLowerCase() === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}></div>
                  <span>{activity.provider} - {activity.model}</span>
                  {activity.latencyMs && (
                    <span className="text-muted-foreground">({activity.latencyMs}ms)</span>
                  )}
                </div>
                <span className="text-muted-foreground">{formatDateTime(activity.createdAt)}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No recent activity found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

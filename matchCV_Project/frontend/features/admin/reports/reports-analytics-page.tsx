'use client'

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
import { adminService } from '@/lib/services/admin-service'

interface Stats {
  totals?: {
    users?: number
    cvs?: number
    jobs?: number
    apps?: number
  }
  topSkills?: Array<{ skill: string; count: number }>
  aiCalls?: number
  range?: {
    start?: string
    end?: string
  }
  avgScoreByDay?: Array<{ day: string; avg: number }>
}

export function ReportsAnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
      const params: any = {}
      if (dateRange.from) params.from = dateRange.from
      if (dateRange.to) params.to = dateRange.to

      const data = await adminService.getReports(params)
      setStats(data)
    } catch (err: any) {
      console.error('Failed to load reports:', err)
      setError('Failed to load reports. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (field: string, value: string) => {
    setDateRange((prev) => ({ ...prev, [field]: value }))
  }

  const formatNumber = (num?: number) => {
    if (!num) return '0'
    return num.toLocaleString()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe']

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">Home / Reports & Analytics</div>
        <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights and statistics about your recruitment platform
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
            onClick={loadReports}
          >
            Apply Filter
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-muted-foreground">Loading reports...</div>
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card p-6 rounded-lg border border-blue-200">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-sm text-muted-foreground mb-1">Total Users</div>
              <div className="text-2xl font-bold">{formatNumber(stats.totals?.users)}</div>
              <div className="text-xs text-muted-foreground mt-1">All registered users</div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-green-200">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-sm text-muted-foreground mb-1">Total CVs</div>
              <div className="text-2xl font-bold">{formatNumber(stats.totals?.cvs)}</div>
              <div className="text-xs text-muted-foreground mt-1">Uploaded CVs</div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-orange-200">
              <div className="text-3xl mb-2">💼</div>
              <div className="text-sm text-muted-foreground mb-1">Total Jobs</div>
              <div className="text-2xl font-bold">{formatNumber(stats.totals?.jobs)}</div>
              <div className="text-xs text-muted-foreground mt-1">Job postings</div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-purple-200">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-sm text-muted-foreground mb-1">Total Applications</div>
              <div className="text-2xl font-bold">{formatNumber(stats.totals?.apps)}</div>
              <div className="text-xs text-muted-foreground mt-1">All applications</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Top Skills</h3>
              <div className="space-y-2">
                {stats.topSkills && stats.topSkills.length > 0 ? (
                  stats.topSkills.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{item.skill}</span>
                      <span className="text-sm text-muted-foreground">{item.count} mentions</span>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No skills data available</div>
                )}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">AI Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total AI Calls</div>
                  <div className="text-2xl font-bold">{formatNumber(stats.aiCalls)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Date Range</div>
                  <div className="text-sm">
                    {formatDate(stats.range?.start)} - {formatDate(stats.range?.end)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {stats.avgScoreByDay && stats.avgScoreByDay.length > 0 && (
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Average Score Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={stats.avgScoreByDay.map((item) => ({
                    date: formatDate(item.day),
                    score: Math.round(item.avg),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis domain={[0, 100]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Match Score (%)"
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}

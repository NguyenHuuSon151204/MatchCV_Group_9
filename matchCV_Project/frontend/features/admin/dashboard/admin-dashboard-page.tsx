'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminService } from '@/lib/services/admin-service'
import { Users, FileText, Briefcase, Send, Zap, TrendingUp, Activity } from 'lucide-react'

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
  const router = useRouter()

  useEffect(() => {
    loadSummary()
  }, [])

  const loadSummary = async () => {
    try {
      setError(null)
      const response = await adminService.getSummary()
      setSummary(response.data)
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

  const stats = [
    {
      label: 'Total Users',
      value: summary?.totals?.users || 0,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      link: null,
    },
    {
      label: 'CVs',
      value: summary?.totals?.cvs || 0,
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      link: null,
    },
    {
      label: 'Jobs',
      value: summary?.totals?.jobs || 0,
      icon: Briefcase,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      link: '/admin/jobs',
    },
    {
      label: 'Applications',
      value: summary?.totals?.apps || 0,
      icon: Send,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      link: '/admin/applicants',
    },
    {
      label: 'AI Calls',
      value: summary?.aiCalls || 0,
      icon: Zap,
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-500/10 to-amber-500/10',
      link: '/admin/ai-status',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-1">Trang chủ / Admin Dashboard</div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              onClick={() => stat.link && router.push(stat.link)}
              className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${stat.bgGradient} p-6 transition-all hover:shadow-lg hover:scale-105 ${stat.link ? 'cursor-pointer' : ''
                }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
                </div>
                <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-3`}>
                  <Icon className="size-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <TrendingUp className="size-3 mr-1" />
                <span>{stat.link ? 'Click to view details' : 'Active'}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Skills */}
        <div className="lg:col-span-2 bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              Top Skills in Demand
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {summary?.topSkills && summary.topSkills.length > 0 ? (
              summary.topSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-2 border border-primary/20 hover:border-primary/40 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{skill.skill}</span>
                    <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full font-medium">
                      {skill.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-muted-foreground">No data yet</span>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/admin/jobs')}
              className="w-full px-4 py-3 bg-card hover:bg-accent rounded-lg border text-left transition-colors flex items-center justify-between"
            >
              <span className="font-medium">Manage Jobs</span>
              <Briefcase className="size-4" />
            </button>
            <button
              onClick={() => router.push('/admin/applicants')}
              className="w-full px-4 py-3 bg-card hover:bg-accent rounded-lg border text-left transition-colors flex items-center justify-between"
            >
              <span className="font-medium">View Applications</span>
              <Send className="size-4" />
            </button>
            <button
              onClick={() => router.push('/admin/recruiters')}
              className="w-full px-4 py-3 bg-card hover:bg-accent rounded-lg border text-left transition-colors flex items-center justify-between"
            >
              <span className="font-medium">Manage Recruiters</span>
              <Users className="size-4" />
            </button>
            <button
              onClick={() => router.push('/admin/licenses')}
              className="w-full px-4 py-3 bg-card hover:bg-accent rounded-lg border text-left transition-colors flex items-center justify-between"
            >
              <span className="font-medium">License Management</span>
              <FileText className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Admin Logs */}
      <div className="bg-card p-6 rounded-xl border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Admin Activity</h2>
          <button
            onClick={() => router.push('/admin/audit-log')}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All
            <Activity className="size-3" />
          </button>
        </div>
        <div className="space-y-3">
          {summary?.logs && summary.logs.length > 0 ? (
            summary.logs.slice(0, 5).map((log, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border group cursor-pointer"
                onClick={() => router.push('/admin/audit-log')}
              >
                <div className="size-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {log.actor} - {log.action} {log.entity}
                      {log.entityId ? ` #${log.entityId}` : ''}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.createdAt).toLocaleString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No logs yet. Logs are loaded from /api/admin/logs endpoint.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

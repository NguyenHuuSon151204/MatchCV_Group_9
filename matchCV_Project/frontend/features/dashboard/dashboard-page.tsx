'use client'

import { useEffect, useState } from 'react'
import { ActivityList } from '@/components/common/activity-list'
import { ScoreCircle } from '@/components/common/score-circle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { dashboardService } from '@/lib/services/dashboard-service'
import type { DashboardMetrics } from '@/lib/types'

const metricConfig = [
  { key: 'totalCVs', label: 'Total CVs', accent: 'from-purple-500 to-indigo-500' },
  { key: 'analyzedCVs', label: 'Analyzed CVs', accent: 'from-emerald-500 to-cyan-500' },
  { key: 'averageScore', label: 'Average AI Score', accent: 'from-amber-500 to-orange-500' },
  { key: 'exportedCVs', label: 'Exported CVs', accent: 'from-blue-500 to-sky-500' },
] as const

export function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardService
      .getMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Overview</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage and analyze your professional resumes using AI.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricConfig.map((metric) => (
          <Card key={metric.key} className="border-none bg-card/70 shadow-lg shadow-black/10">
            <CardHeader className="pb-2">
              <CardDescription>{metric.label}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-3xl font-bold tracking-tight">
                {loading ? '—' : metrics ? metrics[metric.key] : '—'}
              </p>
              <div
                className={`rounded-full bg-gradient-to-br ${metric.accent} p-3 text-white shadow-lg shadow-black/30`}
              >
                <span className="text-xs font-semibold uppercase">AI</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-none bg-card/80 shadow-xl shadow-primary/5 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">AI Insights</CardTitle>
              <CardDescription>Top strengths extracted from latest analyses.</CardDescription>
            </div>
            <ScoreCircle score={metrics?.averageScore} size={96} />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              {['React', 'System Design', 'Leadership'].map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl border border-border/40 bg-muted/20 p-4 text-center text-sm font-semibold text-muted-foreground"
                >
                  {skill}
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-border/40 bg-background/60 p-4 text-sm text-muted-foreground">
              Keep your CVs updated with quantifiable achievements. AI prioritizes clarity, measurable impact, and
              alignment with the job description keywords.
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card/80 shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Track how you interact with AI workflows.</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityList items={metrics?.activity ?? []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { recruiterService } from '@/lib/services/recruiter-service'

interface Job {
  id: number
  title: string
  company?: string
  createdAt: string
  applicants?: number
  avgScore?: number
  topSkill?: string
  topCandidates?: Array<{ id: number; name?: string; score?: number }>
}

interface Applicant {
  id: number
  candidateName?: string
  jobTitle: string
  jobId: number
  createdAt: string
  score?: number
  status?: string
}

interface Skill {
  name?: string
  skill?: string
  count?: number
  jobCount?: number
}

interface DashboardData {
  summary?: {
    totalJobs?: number
    activeJobs?: number
    totalApplicants?: number
    averageScore?: number
    newApplications?: number
  }
  jobs?: Job[]
  recentApplicants?: Applicant[]
  topSkills?: Skill[]
}

export function RecruiterDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const jobs = data?.jobs || []
  const summary = data?.summary || {}
  const recentApplicants = data?.recentApplicants || []
  const topSkills = data?.topSkills || []

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await recruiterService.getDashboard()
      // Backend returns { summary, jobs, recentApplicants, topSkills } directly
      setData({
        summary: response?.summary || {},
        jobs: response?.jobs || [],
        recentApplicants: response?.recentApplicants || [],
        topSkills: response?.topSkills || [],
      })
    } catch (err: any) {
      console.error('Failed to load recruiter dashboard:', err)
      setError(err.message || err.response?.data?.message || 'Failed to load dashboard.')
    } finally {
      setLoading(false)
    }
  }

  const highlightJob = useMemo(() => {
    if (!jobs.length) return null
    return jobs.reduce((prev, current) => {
      const prevScore = prev.avgScore || 0
      const currentScore = current.avgScore || 0
      return currentScore > prevScore ? current : prev
    })
  }, [jobs])

  const formatDate = (value: string) => {
    if (!value) return 'N/A'
    return new Date(value).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatDateTime = (value: string) => {
    if (!value) return 'N/A'
    return new Date(value).toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getScoreClass = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query) ||
          job.topSkill?.toLowerCase().includes(query)
      )
    }

    filtered.sort((a, b) => {
      let aVal: any = a[sortBy as keyof Job]
      let bVal: any = b[sortBy as keyof Job]

      if (sortBy === 'createdAt') {
        aVal = new Date(aVal).getTime()
        bVal = new Date(bVal).getTime()
      } else if (sortBy === 'avgScore') {
        aVal = aVal ?? 0
        bVal = bVal ?? 0
      } else if (sortBy === 'applicants') {
        aVal = a.applicants ?? 0
        bVal = b.applicants ?? 0
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return filtered
  }, [jobs, searchQuery, sortBy, sortOrder])

  const handleExportCSV = () => {
    try {
      const csvRows = ['ID,Title,Company,Applicants,Avg Score,Top Skill,Created Date']
      filteredJobs.forEach((job) => {
        csvRows.push(
          `${job.id},"${job.title}","${job.company || 'N/A'}",${job.applicants || 0},${job.avgScore != null ? Math.round(job.avgScore) : 'N/A'},"${job.topSkill || 'N/A'}","${formatDate(job.createdAt)}"`
        )
      })

      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `recruiter-jobs-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export CSV:', error)
      alert('Failed to export CSV. Please try again.')
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Home / Recruiter Dashboard</div>
          <h1 className="text-2xl font-bold mb-2">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">
            Track JD performance, candidate scores, and create new JDs in just a few steps.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/recruiter/jobs/create"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            + New JD
          </Link>
          <button
            className="px-4 py-2 border rounded hover:bg-accent"
            onClick={loadDashboard}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center p-8">Loading recruiter data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Total JDs</div>
              <div className="text-2xl font-bold">{summary.totalJobs ?? 0}</div>
              <div className="text-xs text-muted-foreground mt-1">JDs you are managing</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Active JDs</div>
              <div className="text-2xl font-bold">{summary.activeJobs ?? 0}</div>
              <div className="text-xs text-muted-foreground mt-1">Currently receiving CVs</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Total Applicants</div>
              <div className="text-2xl font-bold">{summary.totalApplicants ?? 0}</div>
              <div className="text-xs text-muted-foreground mt-1">CVs evaluated</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Avg Score</div>
              <div className="text-2xl font-bold">
                {summary.averageScore != null ? `${summary.averageScore}%` : 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Average score across all candidates</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-primary/50">
              <div className="text-sm text-muted-foreground mb-1">New Applications (7d)</div>
              <div className="text-2xl font-bold">{summary.newApplications ?? 0}</div>
              <div className="text-xs text-muted-foreground mt-1">New CVs this week</div>
            </div>
          </div>

          {highlightJob && (
            <div className="mb-6 p-6 bg-card border rounded-lg flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Top Performing JD</div>
                <h3 className="text-xl font-semibold mb-1">{highlightJob.title}</h3>
                <p className="text-muted-foreground">
                  {highlightJob.company} • Avg Score:{' '}
                  {highlightJob.avgScore != null ? `${highlightJob.avgScore}%` : 'N/A'} • Applicants:{' '}
                  {highlightJob.applicants}
                </p>
              </div>
              <Link
                href={`/recruiter/jobs/${highlightJob.id}`}
                className="px-4 py-2 border rounded hover:bg-accent"
              >
                View Details
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card p-6 rounded-lg border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Job Descriptions</h2>
                  <p className="text-sm text-muted-foreground">Click a JD to view candidates and their scores</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/recruiter/jobs" className="px-3 py-1 border rounded text-sm hover:bg-accent">
                    Manage All
                  </Link>
                  {filteredJobs.length > 0 && (
                    <button
                      className="px-3 py-1 border rounded text-sm hover:bg-accent"
                      onClick={handleExportCSV}
                    >
                      📥 Export CSV
                    </button>
                  )}
                </div>
              </div>

              {jobs.length > 0 && (
                <div className="mb-4 flex gap-4">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="Search by title, company, or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Sort by:</label>
                    <select
                      className="px-3 py-2 border rounded bg-background text-foreground"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="createdAt">Created Date</option>
                      <option value="avgScore">Avg Score</option>
                      <option value="applicants">Applicants</option>
                      <option value="title">Title</option>
                    </select>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              )}

              {jobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No JDs yet. <Link href="/recruiter/jobs/create" className="text-primary hover:underline">Create your first JD now</Link>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No JDs match your search.{' '}
                  <button className="text-primary hover:underline" onClick={() => setSearchQuery('')}>
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-5 gap-4 p-2 font-semibold text-sm border-b">
                    <span>JD</span>
                    <span>Applicants</span>
                    <span>Avg Score</span>
                    <span>Top Skill</span>
                    <span>Top Candidates</span>
                  </div>
                  {filteredJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/recruiter/jobs/${job.id}`}
                      className="grid grid-cols-5 gap-4 p-3 border rounded hover:bg-accent transition-colors"
                    >
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {job.company} • {formatDate(job.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-secondary rounded text-sm">{job.applicants || 0}</span>
                      </div>
                      <div className="flex items-center">
                        {job.avgScore != null ? (
                          <span className={`font-semibold ${getScoreClass(job.avgScore)}`}>
                            {Math.round(job.avgScore)}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        {job.topSkill ? (
                          <span className="px-2 py-1 bg-secondary rounded text-sm">{job.topSkill}</span>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {job.topCandidates && job.topCandidates.length > 0 ? (
                          job.topCandidates.map((candidate) => (
                            <span key={candidate.id} className="px-2 py-1 bg-secondary rounded text-xs">
                              {candidate.name || 'Unknown'}{' '}
                              {candidate.score != null && (
                                <span className="font-semibold">{Math.round(candidate.score)}%</span>
                              )}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">Waiting for CVs</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* AI Insights Card */}
              <div className="bg-card p-6 rounded-lg border">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-1">AI Insights</h2>
                  <p className="text-sm text-muted-foreground">Key metrics and performance indicators</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Average Match Score</div>
                      <div className="text-2xl font-bold text-primary">
                        {summary.averageScore != null ? `${Math.round(summary.averageScore)}%` : 'N/A'}
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Top Performing JD</div>
                      <div className="text-lg font-semibold">
                        {highlightJob ? highlightJob.title : 'N/A'}
                      </div>
                      {highlightJob?.avgScore != null && (
                        <div className="text-sm text-muted-foreground">
                          Score: {Math.round(highlightJob.avgScore)}%
                        </div>
                      )}
                    </div>
                  </div>
                  {topSkills.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2">Most Required Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {topSkills.slice(0, 5).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill.name || skill.skill || 'Unknown'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">Recent Applicants</h2>
                    <p className="text-sm text-muted-foreground">The most recent CVs submitted to your JDs</p>
                  </div>
                  {recentApplicants.length > 0 && (
                    <Link href="/recruiter/applicants" className="px-3 py-1 border rounded text-sm hover:bg-accent">
                      View All
                    </Link>
                  )}
                </div>
                {recentApplicants.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground text-sm">No recent CVs.</div>
                ) : (
                  <div className="space-y-2">
                    {recentApplicants.map((app) => (
                      <Link
                        key={app.id}
                        href={`/recruiter/jobs/${app.jobId}`}
                        className="block p-3 border rounded hover:bg-accent transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{app.candidateName || 'Unknown'}</div>
                            <div className="text-sm text-muted-foreground">{app.jobTitle}</div>
                            <div className="text-xs text-muted-foreground mt-1">{formatDateTime(app.createdAt)}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {app.score != null ? (
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-semibold">
                                {Math.round(app.score)}%
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-secondary rounded text-sm">N/A</span>
                            )}
                            <span className="px-2 py-1 bg-secondary rounded text-xs">
                              {app.status || 'pending'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-1">Top Required Skills</h2>
                  <p className="text-sm text-muted-foreground">Most frequently required skills across your JDs</p>
                </div>
                {topSkills.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground text-sm">No skills data yet.</div>
                ) : (
                  <div className="space-y-3">
                    {topSkills.map((skill, idx) => {
                      const count = skill.count || skill.jobCount || 0
                      const maxCount = topSkills[0]?.count || topSkills[0]?.jobCount || 1
                      return (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{skill.name || skill.skill || 'Unknown'}</span>
                            <span className="text-xs text-muted-foreground">
                              {count} JD{count !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${Math.min(100, (count / maxCount) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

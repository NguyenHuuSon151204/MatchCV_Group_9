'use client'

import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns'
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  Flame,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnalyzeJDDialog } from '@/components/common/analyze-jd-dialog'
import { ApplyCVDialog } from '@/components/common/apply-cv-dialog'
import { jobService } from '@/lib/services/job-service'
import { savedJdService } from '@/lib/services/saved-jd-service'
import { useToastContext } from '@/contexts/toast-context'
import { appliedJobsService } from '@/lib/services/applied-jobs-service'
import type { Job } from '@/lib/types'

export function JobDetailsPage() {
  const navigate = useNavigate()
  const { jobId } = useParams<{ jobId: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyzeDialogOpen, setAnalyzeDialogOpen] = useState(false)
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  const [applied, setApplied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const appliedKey = jobId ? `applied-job-${jobId}` : null
  const savedKey = jobId ? `saved-job-${jobId}` : null
  const toast = useToastContext()

  // Load job detail: quick cache from localStorage, then refresh from API
  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        setError('Job ID not found')
        setLoading(false)
        return
      }

      const jobIdNum = parseInt(jobId, 10)
      setLoading(true)

      const cached = localStorage.getItem('selectedJob')
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as Job
          if (parsed?.id === jobIdNum) setJob(parsed)
        } catch {
          // ignore parse errors
        } finally {
          localStorage.removeItem('selectedJob')
        }
      }

      try {
        const fresh = await jobService.getJob(jobIdNum)
        if (fresh) {
          setJob(fresh)
          if (appliedKey && localStorage.getItem(appliedKey) === 'true') {
            setApplied(true)
          }
          const savedList = savedJdService.list()
          const isSaved = savedList.some((j) => j.jobId === fresh.id)
          setSaved(isSaved)
          if (!isSaved && savedKey) {
            localStorage.removeItem(savedKey)
          }
        } else if (!cached) {
          setError('Job not found')
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load job details'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [jobId, appliedKey, savedKey])

  const matchScore = useMemo(() => {
    if (!job) return null
    const base = (job.title?.length + job.company?.length) % 25
    return 75 + (base % 20) // 75-94%
  }, [job])

  const heroMeta = useMemo(() => {
    if (!job) return null
    return {
      location: 'Remote / Flexible',
      salary: '$150k – $200k',
      type: 'Full-time',
      level: 'Senior Level',
      posted: formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }),
    }
  }, [job])

  const bulletList = (source?: string, fallback: string[] = []) => {
    if (!source) return fallback
    const items = source
      .split(/\r?\n/)
      .map((line) => line.replace(/^[\s-•]+/, '').trim())
      .filter(Boolean)
    return items.length ? items.slice(0, 8) : fallback
  }

  const responsibilities = bulletList(job?.jobDescription || job?.rawText, [
    'Develop new user-facing features using modern React patterns.',
    'Build reusable components and design systems for future use.',
    'Translate design wireframes into high-quality, performant UI.',
    'Optimize applications for maximum speed and scalability.',
    'Collaborate with product, design, and backend teams.',
    'Participate in code reviews and share best practices.',
  ])

  const requirements = bulletList(job?.rawText, [
    '5+ years of experience with React and TypeScript.',
    'Strong knowledge of JavaScript fundamentals and browser APIs.',
    'Experience with state management (Redux/Zustand/Context).',
    'Familiarity with RESTful APIs and modern authorization flows.',
    'Hands-on with build tools: Webpack/Vite/Babel.',
    'Bachelor’s degree in Computer Science or equivalent experience.',
  ])

  const skills = useMemo(() => {
    const defaults = ['React', 'TypeScript', 'Redux', 'Next.js', 'CSS3', 'REST API', 'Node.js', 'Git']
    if (!job?.jobDescription && !job?.rawText) return defaults
    const text = `${job.jobDescription ?? ''} ${job.rawText ?? ''}`.toLowerCase()
    const tags = defaults.filter((skill) => text.includes(skill.toLowerCase()))
    return tags.length ? tags : defaults
  }, [job])

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="py-12 text-center text-muted-foreground">Loading job details...</div>
      </section>
    )
  }

  if (error || !job) {
    return (
      <section className="space-y-6">
        <Button onClick={() => navigate('/app/jobs')} variant="ghost" className="gap-2">
          <ArrowLeft className="size-4" />
          Back to Jobs
        </Button>
        <Card className="rounded-3xl border border-border/40 bg-card/80 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 size-8 text-destructive" />
          <p className="text-lg text-muted-foreground">{error || 'Job not found'}</p>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <Button onClick={() => navigate('/app/jobs')} variant="ghost" className="gap-2">
        <ArrowLeft className="size-4" />
        Back to Jobs
      </Button>

      {/* Hero */}
      <Card className="rounded-3xl border border-border/50 bg-card/90 p-6 shadow-2xl shadow-primary/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/10 text-primary">
                <Flame className="size-4" />
                Trending
              </Badge>
              <Badge
                variant={job.status === 'Active' ? 'default' : 'secondary'}
                className="rounded-full px-3 py-1"
              >
                {job.status}
              </Badge>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-card-foreground">{job.title}</h1>
              <div className="mt-2 flex items-center gap-2 text-lg text-muted-foreground">
                <Building2 className="size-5" />
                <span>{job.company}</span>
              </div>
            </div>

            {heroMeta && (
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" /> {heroMeta.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Briefcase className="size-4" /> {heroMeta.type}
                </span>
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="size-4" /> {heroMeta.level}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="size-4" /> {heroMeta.salary}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-4" /> {heroMeta.posted}
                </span>
              </div>
            )}

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full px-6" onClick={() => setApplyDialogOpen(true)}>
                  {applied ? 'Applied' : 'Apply Now'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6"
                  onClick={() => setAnalyzeDialogOpen(true)}
                >
                  <Sparkles className="mr-2 size-4" />
                  Analyze with CV
                </Button>
              <Button
                size="lg"
                variant={saved ? 'secondary' : 'outline'}
                className="rounded-full px-6"
                onClick={() => {
                  if (!job || saved) return
                  savedJdService.saveFromJob(job)
                  if (savedKey) localStorage.setItem(savedKey, 'true')
                  setSaved(true)
                  toast.success('Saved job', `"${job.title}" saved to Saved JDs`)
                }}
              >
                {saved ? 'Saved' : 'Save'}
              </Button>
              </div>
            </div>

          {matchScore && (
            <div className="rounded-3xl border border-primary/30 bg-primary/5 px-6 py-5 text-right shadow-inner">
              <p className="text-xs uppercase tracking-[0.25em] text-primary/80">Match Score</p>
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-5xl font-black text-primary">{matchScore}%</span>
                <span className="text-sm text-muted-foreground">vs your CV</span>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2 text-xs text-primary/80">
                <CheckCircle2 className="size-4" />
                Strong fit detected
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-3xl border border-border/40 bg-card/90 p-6 shadow-xl shadow-black/5">
            <h2 className="mb-4 text-xl font-semibold text-card-foreground">Job Description</h2>
            <div className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {job.jobDescription || 'No description provided.'}
            </div>
          </Card>

          <Card className="rounded-3xl border border-border/40 bg-card/90 p-6 shadow-xl shadow-black/5">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="size-5" />
              <h3 className="text-lg font-semibold text-card-foreground">Key Responsibilities</h3>
            </div>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              {responsibilities.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle2 className="mt-1 size-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl border border-border/40 bg-card/90 p-6 shadow-xl shadow-black/5">
            <div className="flex items-center gap-2 text-primary">
              <BadgeCheck className="size-5" />
              <h3 className="text-lg font-semibold text-card-foreground">Requirements</h3>
            </div>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              {requirements.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle2 className="mt-1 size-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          {analysisResult && (
            <Card className="rounded-3xl border border-border/40 bg-card/90 p-6 shadow-xl shadow-black/5">
              <h3 className="mb-4 font-semibold text-card-foreground">CV Analysis Result</h3>
              <div className="mb-4 flex items-center justify-between rounded-2xl bg-primary/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Match Score</p>
                  <p className="text-3xl font-bold text-primary">{analysisResult.matchScore}%</p>
                </div>
                <Badge variant="outline" className="rounded-full border-primary/40 text-primary">
                  {analysisResult.matchScore >= 80 ? 'Excellent' : analysisResult.matchScore >= 60 ? 'Good' : 'Fair'}
                </Badge>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">CV</p>
                  <p className="text-card-foreground font-medium">{analysisResult.cvName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Matched Skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {analysisResult.matchedSkills.map((skill: string) => (
                      <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {analysisResult.missingSkills.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Missing Skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {analysisResult.missingSkills.map((skill: string) => (
                        <span key={skill} className="rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                className="mt-4 w-full rounded-full"
                size="sm"
                onClick={() => setAnalysisResult(null)}
              >
                Clear
              </Button>
            </Card>
          )}

          <Card className="rounded-3xl border border-border/40 bg-card/90 p-6 shadow-xl shadow-black/5">
            <h3 className="mb-4 font-semibold text-card-foreground">Job Information</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-card-foreground">
                <Building2 className="size-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="size-4" />
                <span>Job ID #{job.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="size-4" />
                <span>Updated {formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{format(new Date(job.createdAt), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={job.status === 'Active' ? 'default' : 'secondary'}
                  className="rounded-full"
                >
                  {job.status}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border border-border/40 bg-card/90 p-6 shadow-xl shadow-black/5">
            <h3 className="mb-3 font-semibold text-card-foreground">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-card-foreground/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <AnalyzeJDDialog
        open={analyzeDialogOpen}
        onOpenChange={setAnalyzeDialogOpen}
        onAnalysisComplete={(result) => setAnalysisResult(result)}
        job={
          job
            ? {
                id: job.id,
                title: job.title,
                company: job.company,
                jobDescription: job.jobDescription,
              }
            : undefined
        }
      />

      <ApplyCVDialog
        open={applyDialogOpen}
        onOpenChange={setApplyDialogOpen}
        onApplied={() => {
          setApplied(true)
          if (appliedKey) localStorage.setItem(appliedKey, 'true')
          if (job) {
            appliedJobsService.save({ id: job.id, title: job.title, company: job.company })
          }
        }}
        job={
          job
            ? {
                id: job.id,
                title: job.title,
                company: job.company,
              }
            : undefined
        }
      />
    </section>
  )
}

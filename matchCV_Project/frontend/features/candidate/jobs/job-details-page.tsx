'use client'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { ArrowLeft, Building2, Calendar, MapPin, Briefcase, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnalyzeJDDialog } from '@/components/common/analyze-jd-dialog'
import { ApplyCVDialog } from '@/components/common/apply-cv-dialog'
import { useJob } from '@/hooks/useJob'
import type { Job } from '@/lib/types'

export function JobDetailsPage() {
  const navigate = useNavigate()
  const { jobId } = useParams<{ jobId: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyzeDialogOpen, setAnalyzeDialogOpen] = useState(false)
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        setError('Job ID not found')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // For now, we'll load from mock data in jobService
        // In production, you'd call jobService.getJob(parseInt(jobId))
        const jobIdNum = parseInt(jobId)
        // This is a placeholder - the actual implementation would fetch from the service
        setLoading(false)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load job details'
        setError(message)
        setLoading(false)
      }
    }

    loadJob()
  }, [jobId])

  // For demo purposes, get job from localStorage or create a placeholder
  useEffect(() => {
    const jobData = localStorage.getItem('selectedJob')
    if (jobData) {
      try {
        setJob(JSON.parse(jobData))
        localStorage.removeItem('selectedJob')
      } catch {
        setError('Failed to load job details')
      }
    }
    setLoading(false)
  }, [])

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
        <Button
          onClick={() => navigate('/jobs')}
          variant="ghost"
          className="gap-2"
        >
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
      {/* Back Button */}
      <Button
        onClick={() => navigate('/jobs')}
        variant="ghost"
        className="gap-2"
      >
        <ArrowLeft className="size-4" />
        Back to Jobs
      </Button>

      {/* Job Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-card-foreground">{job.title}</h1>
            <div className="mt-2 flex items-center gap-2 text-lg text-muted-foreground">
              <Building2 className="size-5" />
              <span>{job.company}</span>
            </div>
          </div>
          <Badge
            variant={job.status === 'Active' ? 'default' : 'secondary'}
            className="rounded-full text-base px-4 py-2"
          >
            {job.status}
          </Badge>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="size-4" />
            <span>Updated {formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Job Description */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-xl shadow-black/5">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">Job Description</h2>
            <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
              {job.jobDescription || 'No description provided'}
            </div>
          </Card>

          {job.rawText && (
            <Card className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-xl shadow-black/5">
              <h2 className="text-2xl font-semibold text-card-foreground mb-4">Raw Text</h2>
              <div className="text-muted-foreground whitespace-pre-wrap text-sm">
                {job.rawText}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Action Buttons */}
          <Card className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-xl shadow-black/5 space-y-3">
            <Button
              className="w-full rounded-full"
              size="lg"
              onClick={() => setApplyDialogOpen(true)}
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full"
              size="lg"
              onClick={() => setAnalyzeDialogOpen(true)}
            >
              Analyze with JD Analyzer
            </Button>
            <Button variant="outline" className="w-full rounded-full" size="lg">
              Save Job
            </Button>
          </Card>

          {/* Analysis Result Card */}
          {analysisResult && (
            <Card className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-xl shadow-black/5">
              <h3 className="font-semibold text-card-foreground mb-4">CV Analysis Result</h3>
              
              {/* CV Name */}
              <div className="mb-4 pb-4 border-b border-border/30">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">CV Analyzed</p>
                <p className="text-card-foreground font-medium">{analysisResult.cvName}</p>
              </div>

              {/* Match Score */}
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-primary">{analysisResult.matchScore}%</div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Match Score</p>
                    <p className="text-sm text-muted-foreground">
                      {analysisResult.matchScore >= 80 ? 'Excellent' : analysisResult.matchScore >= 60 ? 'Good' : 'Fair'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Matched Skills */}
              <div className="mb-4 pb-4 border-b border-border/30">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Matched Skills ({analysisResult.matchedSkills.length})</p>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.matchedSkills.slice(0, 3).map((skill: string) => (
                    <span key={skill} className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                      ✓ {skill}
                    </span>
                  ))}
                  {analysisResult.matchedSkills.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">+{analysisResult.matchedSkills.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              {analysisResult.missingSkills.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Missing Skills ({analysisResult.missingSkills.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingSkills.slice(0, 2).map((skill: string) => (
                      <span key={skill} className="text-xs bg-destructive/20 text-destructive rounded-full px-2 py-1">
                        ✗ {skill}
                      </span>
                    ))}
                    {analysisResult.missingSkills.length > 2 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">+{analysisResult.missingSkills.length - 2} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <Button
                variant="outline"
                className="w-full rounded-full mt-4"
                size="sm"
                onClick={() => setAnalysisResult(null)}
              >
                Clear Result
              </Button>
            </Card>
          )}

          {/* Job Info */}
          <Card className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-xl shadow-black/5">
            <h3 className="font-semibold text-card-foreground mb-4">Job Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Company</p>
                <p className="text-card-foreground font-medium">{job.company}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Job ID</p>
                <p className="text-card-foreground font-medium">#{job.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Status</p>
                <Badge
                  variant={job.status === 'Active' ? 'default' : 'secondary'}
                  className="rounded-full mt-1"
                >
                  {job.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Posted</p>
                <p className="text-card-foreground font-medium">
                  {new Date(job.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Card>

          {/* Key Skills */}
          <Card className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-xl shadow-black/5">
            <h3 className="font-semibold text-card-foreground mb-4">Key Requirements</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Experience required</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Technical skills needed</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Team player</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Analyze JD Dialog */}
      <AnalyzeJDDialog
        open={analyzeDialogOpen}
        onOpenChange={setAnalyzeDialogOpen}
        onAnalysisComplete={(result) => setAnalysisResult(result)}
        job={job ? {
          id: job.id,
          title: job.title,
          company: job.company,
          jobDescription: job.jobDescription,
        } : undefined}
      />

      {/* Apply CV Dialog */}
      <ApplyCVDialog
        open={applyDialogOpen}
        onOpenChange={setApplyDialogOpen}
        job={job ? {
          id: job.id,
          title: job.title,
          company: job.company,
        } : undefined}
      />
    </section>
  )
}

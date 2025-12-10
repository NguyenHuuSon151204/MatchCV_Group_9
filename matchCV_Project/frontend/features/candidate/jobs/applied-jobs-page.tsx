'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { appliedJobsService, type AppliedJob } from '@/lib/services/applied-jobs-service'
import { useNavigate } from 'react-router-dom'

export function AppliedJobsPage() {
  const [applied, setApplied] = useState<AppliedJob[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setApplied(appliedJobsService.list())
  }, [])

  const handleDelete = (id: string) => {
    setApplied(appliedJobsService.delete(id))
  }

  const handleOpenJob = (id: string) => {
    navigate(`/app/jobs/${id}`)
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Jobs</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Applied Jobs</h1>
        <p className="text-sm text-muted-foreground">Review the jobs you have applied to.</p>
      </div>

      <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg">Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {applied.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applied jobs yet.</p>
          ) : (
            <div className="space-y-3">
              {applied.map((job) => (
                <div
                  key={job.id}
                  className="flex items-start justify-between rounded-2xl border border-border/40 bg-background/70 p-4 text-sm"
                >
                  <div className="space-y-1">
                    <button
                      className="text-left text-card-foreground hover:underline"
                      onClick={() => handleOpenJob(job.id)}
                    >
                      {job.title}
                    </button>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                    <p className="text-[11px] text-muted-foreground">Applied at {job.appliedAt}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(job.id)}
                    title="Remove"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}


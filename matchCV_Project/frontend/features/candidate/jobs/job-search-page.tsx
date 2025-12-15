'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { Search, Building2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useJob } from '@/hooks/useJob'
import type { Job } from '@/lib/types'

export function JobSearchPage() {
  const navigate = useNavigate()
  const { jobs, loading, refresh } = useJob()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')

  useEffect(() => {
    refresh(searchQuery || undefined, statusFilter || undefined)
  }, [searchQuery, statusFilter, refresh])

  // Jobs are already filtered by the API call in refresh()
  const filteredJobs = jobs

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Job Market</p>
          <h1 className="text-3xl font-semibold text-card-foreground">Find Jobs</h1>
          <p className="text-sm text-muted-foreground">Search and discover job opportunities that match your skills.</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="rounded-3xl border border-border/40 bg-card/80 p-4 shadow-2xl shadow-black/5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search jobs by title, company, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-2xl border border-input bg-background/80 px-4 text-sm outline-none transition focus:ring-2 focus:ring-primary/40"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-muted-foreground">
            Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
      </div>

      {/* Jobs List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-8 text-center text-muted-foreground">Loading jobs...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="col-span-full py-8 text-center text-muted-foreground">
            {searchQuery ? 'No jobs found matching your search.' : 'No jobs available. Be the first to post one!'}
          </div>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} onViewDetails={() => {
            localStorage.setItem('selectedJob', JSON.stringify(job))
            navigate(`/app/jobs/${job.id}`)
          }} />)
        )}
      </div>
    </section>
  )
}

function JobCard({ job, onViewDetails }: { job: Job; onViewDetails: () => void }) {
  return (
    <Card className="flex flex-col gap-4 rounded-3xl border border-border/40 bg-card/80 p-6 shadow-2xl shadow-black/5 transition hover:shadow-black/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground">{job.title}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="size-4" />
            <span>{job.company}</span>
          </div>
        </div>
        <Badge
          variant={job.status === 'Active' ? 'default' : 'secondary'}
          className="rounded-full"
        >
          {job.status}
        </Badge>
      </div>

      {job.jobDescription && (
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {job.jobDescription.length > 150 ? `${job.jobDescription.substring(0, 150)}...` : job.jobDescription}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
        </div>
        <Button size="sm" variant="outline" className="rounded-full" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </Card>
  )
}



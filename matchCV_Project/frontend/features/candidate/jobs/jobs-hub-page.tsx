'use client'

import { Briefcase, Bookmark, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const hubs = [
  {
    title: 'Find Jobs',
    description: 'Search and discover roles that match your skills.',
    action: '/app/jobs',
    icon: <Briefcase className="size-5" />,
  },
  {
    title: 'Saved JDs',
    description: 'Review job descriptions you saved for later.',
    action: '/app/saved-jds',
    icon: <Bookmark className="size-5" />,
  },
  {
    title: 'Applied Jobs',
    description: 'Track jobs you have submitted applications to.',
    action: '/app/applied-jobs',
    icon: <Sparkles className="size-5" />,
  },
]

export function JobsHubPage() {
  const navigate = useNavigate()
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Jobs</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Jobs</h1>
        <p className="text-sm text-muted-foreground">
          Access job search, saved descriptions, and applications from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {hubs.map((item) => (
          <Card key={item.title} className="border-none bg-card/80 shadow-lg shadow-black/5">
            <CardHeader className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {item.icon}
                  {item.title}
                </CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="rounded-full" onClick={() => navigate(item.action)}>
                Go to {item.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Trash2, Briefcase, MapPin, Clock3 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { savedJdService, type SavedJd } from '@/lib/services/saved-jd-service'

export function SavedJDsPage() {
  const [saved, setSaved] = useState<SavedJd[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setSaved(savedJdService.list())
  }, [])

  const handleOpenAnalyzer = (jd: SavedJd) => {
    navigate('/app/jd-analyzer', { state: { savedJd: jd } })
  }

  const handleDelete = (id: string) => {
    setSaved(savedJdService.delete(id))
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Jobs</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Saved JDs</h1>
        <p className="text-sm text-muted-foreground">Manage saved job descriptions and reopen in JD Analyzer.</p>
      </div>

      <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg">Saved Job Descriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {saved.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved JDs yet.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {saved.map((jd) => (
                <Card
                  key={jd.id}
                  className="rounded-2xl border border-border/40 bg-background/70 p-4 text-sm shadow-sm"
                >
                  <div className="flex flex-col gap-3">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {jd.company ? 'Saved job' : 'Saved JD'}
                      </p>
                      <p className="text-lg font-semibold text-card-foreground">{jd.title}</p>
                      {jd.company && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="size-4" />
                          <span>{jd.company}</span>
                        </div>
                      )}
                      <p className="line-clamp-3 text-xs text-muted-foreground">{jd.content}</p>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground/80">
                        <Clock3 className="size-3.5" />
                        <span>Saved {new Date(jd.savedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default" size="sm" className="gap-2" onClick={() => handleOpenAnalyzer(jd)}>
                        <BookOpen className="size-4" />
                        Analyze with CV
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(jd.id)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

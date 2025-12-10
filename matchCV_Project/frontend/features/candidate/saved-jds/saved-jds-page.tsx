'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Trash2 } from 'lucide-react'
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
    navigate('/app/jd-analyzer', { state: { jdContent: jd.content } })
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
            <div className="space-y-3">
              {saved.map((jd) => (
                <div
                  key={jd.id}
                  className="rounded-2xl border border-border/40 bg-background/70 p-4 text-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-card-foreground">{jd.title}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{jd.content}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenAnalyzer(jd)} title="Open in JD Analyzer">
                        <BookOpen className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(jd.id)} title="Delete">
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}


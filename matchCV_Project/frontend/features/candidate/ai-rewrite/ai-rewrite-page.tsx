'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCV } from '@/hooks/useCV'
import { useAnalyze } from '@/hooks/useAnalyze'
import type { RewriteSection } from '@/lib/types'

const sections: { label: string; value: RewriteSection; helper: string }[] = [
  { label: 'Summary', value: 'summary', helper: 'High-level intro paragraph' },
  { label: 'Experience', value: 'experience', helper: 'Most recent role or project' },
  { label: 'Skills', value: 'skills', helper: 'Technical or soft skills focus' },
]

type RewriteLocationState = {
  cvId?: string
}

export function AIRewritePage() {
  const location = useLocation()
  const state = (location.state as RewriteLocationState | null) ?? null
  const { cvs } = useCV()
  const [selectedCV, setSelectedCV] = useState<string | undefined>()
  const [section, setSection] = useState<RewriteSection>('summary')
  const [instructions, setInstructions] = useState('')
  const { rewriteResult, rewriteSection, rewriteLoading } = useAnalyze()

  useEffect(() => {
    if (state?.cvId) {
      setSelectedCV(state.cvId)
    }
  }, [state])

  useEffect(() => {
    if (!selectedCV && cvs.length > 0) {
      setSelectedCV(cvs[0].id)
    }
  }, [cvs, selectedCV])

  const selectedCvMeta = useMemo(() => cvs.find((cv) => cv.id === selectedCV), [cvs, selectedCV])

  const handleRewrite = async () => {
    if (!selectedCV) return
    await rewriteSection({
      cvId: selectedCV,
      section,
      instructions,
    })
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">AI Rewrite</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Rewrite Assistant</h1>
        <p className="text-sm text-muted-foreground">Select a CV, pick a section, and let AI craft a sharper message.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-none bg-card/80 shadow-lg shadow-black/5 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Rewrite Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">Select CV</label>
                <select
                  value={selectedCV}
                  onChange={(e) => setSelectedCV(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-border bg-background/80 px-4 text-sm"
                >
                  {cvs.map((cv) => (
                    <option key={cv.id} value={cv.id}>
                      {cv.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">Section</label>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value as RewriteSection)}
                  className="h-11 w-full rounded-2xl border border-border bg-background/80 px-4 text-sm"
                >
                  {sections.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add context, achievements to highlight, preferred tone..."
              className="min-h-[160px] rounded-3xl"
            />
            <Button className="w-full gap-2 rounded-full" onClick={handleRewrite} disabled={rewriteLoading}>
              <Sparkles className="size-4" />
              {rewriteLoading ? 'Rewriting...' : 'Rewrite Section'}
            </Button>
          </CardContent>
        </Card>
        <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="text-lg">Rewrite Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {rewriteResult ? (
              <>
                <div className="rounded-3xl border border-border/40 bg-background/50 p-4 text-card-foreground">
                  {rewriteResult.output}
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">AI Highlights</p>
                  {rewriteResult.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-2xl border border-border/40 bg-muted/20 px-3 py-2 text-xs">
                      {highlight}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Run a rewrite to preview AI suggestions.</p>
            )}
            {selectedCvMeta && (
              <div className="rounded-3xl border border-border/30 bg-background/30 p-4 text-xs text-muted-foreground">
                Working on <span className="font-semibold text-card-foreground">{selectedCvMeta.name}</span> —{' '}
                {selectedCvMeta.position}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}



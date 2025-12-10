'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCV } from '@/hooks/useCV'
import { useAnalyze } from '@/hooks/useAnalyze'
import { activityService } from '@/lib/services/activity-service'
import { useToastContext } from '@/contexts/toast-context'
import type { RewriteSection } from '@/lib/types'

const sections: { label: string; value: RewriteSection; helper: string }[] = [
  { label: 'Summary', value: 'summary', helper: 'High-level intro paragraph' },
  { label: 'Experience', value: 'experience', helper: 'Most recent role or project' },
  { label: 'Skills', value: 'skills', helper: 'Technical or soft skills focus' },
]

type RewriteLocationState = {
  cvId?: string
}

type RewriteHistoryItem = {
  id: string
  section: RewriteSection
  original: string
  rewritten: string
  timestamp: string
  instructions?: string
  applied?: boolean
  rolledBack?: boolean
}

export function AIRewritePage() {
  const location = useLocation()
  const state = (location.state as RewriteLocationState | null) ?? null
  const { cvs, updateCV } = useCV()
  const toast = useToastContext()
  const [selectedCV, setSelectedCV] = useState<string | undefined>()
  const [section, setSection] = useState<RewriteSection>('summary')
  const [instructions, setInstructions] = useState('')
  const { rewriteResult, rewriteSection, rewriteLoading } = useAnalyze()
  const [applying, setApplying] = useState(false)
  const [history, setHistory] = useState<RewriteHistoryItem[]>([])

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

  // Load history per CV
  useEffect(() => {
    if (!selectedCV) return
    const stored = localStorage.getItem(`rewrite-history-${selectedCV}`)
    if (stored) {
      try {
        setHistory(JSON.parse(stored))
      } catch {
        setHistory([])
      }
    } else {
      setHistory([])
    }
  }, [selectedCV])

  const persistHistory = (items: RewriteHistoryItem[]) => {
    if (!selectedCV) return
    localStorage.setItem(`rewrite-history-${selectedCV}`, JSON.stringify(items))
  }

  const handleRewrite = async () => {
    if (!selectedCV) return
    await rewriteSection({
      cvId: selectedCV,
      section,
      instructions,
    })
  }

  const handleApply = async () => {
    if (!selectedCV || !rewriteResult) return
    setApplying(true)
    try {
      const originalText =
        selectedCvMeta?.cvData?.personalInfo?.summary ||
        selectedCvMeta?.description ||
        ''

      const newHistoryItem: RewriteHistoryItem = {
        id: `${selectedCV}-${Date.now()}`,
        section,
        original: originalText,
        rewritten: rewriteResult.output,
        timestamp: new Date().toISOString(),
        instructions,
        applied: true,
      }

      await updateCV({
        id: selectedCV,
        cvData: {
          personalInfo: {
            summary: rewriteResult.output,
          },
        },
      })

      const updatedHistory = [newHistoryItem, ...history].slice(0, 30)
      setHistory(updatedHistory)
      persistHistory(updatedHistory)
      activityService.add({
        title: 'AI Rewrite Applied',
        description: `Applied rewrite for ${section} on "${selectedCvMeta?.name || 'CV'}"`,
      })
      toast.success('Rewrite applied', 'Changes saved to CV')
    } finally {
      setApplying(false)
    }
  }

  const handleRollback = async (item: RewriteHistoryItem) => {
    if (!selectedCV) return
    setApplying(true)
    try {
      await updateCV({
        id: selectedCV,
        cvData: {
          personalInfo: {
            summary: item.original,
          },
        },
      })
      const updated = history.map((h) =>
        h.id === item.id ? { ...h, rolledBack: true, applied: false } : h
      )
      setHistory(updated)
      persistHistory(updated)
      activityService.add({
        title: 'AI Rewrite Rolled Back',
        description: `Rolled back ${item.section} on "${selectedCvMeta?.name || 'CV'}"`,
      })
      toast.success('Rollback complete', 'Reverted to previous summary')
    } finally {
      setApplying(false)
    }
  }

  const lastApplied = history.find((h) => h.applied && !h.rolledBack)

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
                <p className="text-xs text-muted-foreground">{sections.find((s) => s.value === section)?.helper}</p>
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
                <div className="rounded-2xl border border-border/40 bg-muted/10 p-3 text-xs text-muted-foreground">
                  <p className="font-semibold text-card-foreground">Diff preview</p>
                  <div className="mt-2 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-border/30 bg-background/50 p-2">
                      <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">Original</p>
                      <p className="text-sm text-card-foreground">
                        {selectedCvMeta?.cvData?.personalInfo?.summary || selectedCvMeta?.description || 'No summary available.'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-primary/40 bg-primary/5 p-2">
                      <p className="mb-1 text-[11px] uppercase tracking-wide text-primary">Rewrite</p>
                      <p className="text-sm text-card-foreground">{rewriteResult.output}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Run a rewrite to preview AI suggestions.</p>
            )}
            <div className="flex flex-col gap-2">
              <Button
                className="w-full rounded-full"
                variant="secondary"
                disabled={!rewriteResult || applying}
                onClick={handleApply}
              >
                {applying ? 'Applying...' : 'Apply to CV'}
              </Button>
              {lastApplied && (
                <Button
                  className="w-full rounded-full"
                  variant="outline"
                  disabled={applying}
                  onClick={() => handleRollback(lastApplied)}
                >
                  <RotateCcw className="mr-2 size-4" />
                  Rollback last apply
                </Button>
              )}
            </div>
            {selectedCvMeta && (
              <div className="rounded-3xl border border-border/30 bg-background/30 p-4 text-xs text-muted-foreground">
                Working on <span className="font-semibold text-card-foreground">{selectedCvMeta.name}</span>{' '}
                {selectedCvMeta.position}
                {selectedCvMeta.status === 'uploaded' && (
                  <div className="mt-2 text-destructive">Apply is disabled for uploaded CV files.</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-card/80 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg">Rewrite History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">No rewrite history yet.</p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/40 bg-background/70 p-4 text-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {item.section} • {new Date(item.timestamp).toLocaleString()}
                      </p>
                      <p className="text-card-foreground font-semibold">
                        {item.instructions ? `Instruction: ${item.instructions}` : 'Rewrite'}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.applied ? 'Applied' : 'Not applied'}
                        {item.rolledBack ? ' • Rolled back' : ''}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 text-xs"
                      disabled={applying}
                      onClick={() => handleRollback(item)}
                    >
                      <RotateCcw className="size-3" /> Rollback
                    </Button>
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <div className="rounded-xl border border-border/30 bg-background/50 p-2 text-xs text-muted-foreground">
                      <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">Original</p>
                      <p className="text-card-foreground">{item.original || 'N/A'}</p>
                    </div>
                    <div className="rounded-xl border border-primary/30 bg-primary/5 p-2 text-xs text-muted-foreground">
                      <p className="mb-1 text-[11px] uppercase tracking-wide text-primary">Rewritten</p>
                      <p className="text-card-foreground">{item.rewritten}</p>
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

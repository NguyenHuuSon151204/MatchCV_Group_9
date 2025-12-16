'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle, Sparkles, Save, Trash2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalyze } from '@/hooks/useAnalyze'
import { useCV } from '@/hooks/useCV'
import { useAiUsage } from '@/hooks/useAiUsage'
import { activityService } from '@/lib/services/activity-service'
import { savedJdService, type SavedJd } from '@/lib/services/saved-jd-service'

export function JDAnalyzerPage() {
  const location = useLocation()
  const preset = (location.state as { jdContent?: string } | null) ?? null
  const [jobDescription, setJobDescription] = useState('')
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null)
  const { analyzeJD, jdAnalysis, jdError, analysisLoading } = useAnalyze()
  const { cvs, loading: cvsLoading } = useCV()
  const { usage, loading: usageLoading, error: usageError, refresh: refreshUsage, reset } = useAiUsage()
  const unlimited = (val?: number) => usage?.plan === 'Pro' && val !== undefined && val !== null && val >= 1_000_000
  const formatRemaining = (val?: number) => {
    if (val === undefined || val === null) return '-'
    if (usage?.plan === 'Pro') return 'Unlimited'
    if (unlimited(val)) return 'Unlimited'
    const cap = 5
    const shown = Math.min(val, cap)
    return `${shown}/${cap}`
  }
  const selectedCv = useMemo(() => cvs.find((cv) => cv.id === selectedCvId) || null, [cvs, selectedCvId])
  const selectedCvName = selectedCv?.name || 'CV'
  const selectedCvText = useMemo(() => {
    if (!selectedCv) return ''

    const parts: string[] = []
    const personal = selectedCv.cvData?.personalInfo
    if (personal?.summary) parts.push(personal.summary)
    if (personal?.position) parts.push(`Position: ${personal.position}`)

    if (Array.isArray(selectedCv.cvData?.experiences)) {
      parts.push(
        ...selectedCv.cvData.experiences
          .map((exp: any) =>
            [exp.position, exp.company, exp.description, exp.summary].filter(Boolean).join(' - ')
          )
          .filter(Boolean)
      )
    }

    if (Array.isArray(selectedCv.cvData?.skills)) {
      const skillsLine = selectedCv.cvData.skills
        .map((skill: any) => skill?.name || skill?.title || skill?.skill || skill)
        .filter(Boolean)
        .join(', ')
      if (skillsLine) {
        parts.push(`Skills: ${skillsLine}`)
      }
    }

    if (selectedCv.description) parts.push(selectedCv.description)
    return parts.join('\n').trim()
  }, [selectedCv])
  const [savedJds, setSavedJds] = useState<SavedJd[]>([])

  useEffect(() => {
    setSavedJds(savedJdService.list())
  }, [])

  useEffect(() => {
    if (preset?.jdContent) {
      setJobDescription(preset.jdContent)
    }
  }, [preset])

  useEffect(() => {
    if (!selectedCvId && cvs.length === 1) {
      setSelectedCvId(cvs[0].id)
    }
  }, [cvs, selectedCvId])

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !selectedCvId) return
    const result = await analyzeJD(jobDescription, selectedCvText || selectedCvName || 'CV content placeholder')
    if (result) {
      activityService.add({
        title: 'JD Analyzed',
        description: `Ran JD analysis for CV "${selectedCvName}"`,
      })
      refreshUsage()
    }
  }

  const handleSaveJd = () => {
    if (!jobDescription.trim()) return
    const entry = savedJdService.save(jobDescription)
    setSavedJds(savedJdService.list())
    activityService.add({ title: 'JD Saved', description: `Saved JD "${entry.title}"` })
  }

  const handleLoadJd = (id: string) => {
    const jd = savedJdService.list().find((j) => j.id === id)
    if (jd) {
      setJobDescription(jd.content)
    }
  }

  const handleDeleteJd = (id: string) => {
    setSavedJds(savedJdService.delete(id))
  }

  return (
    <section className="space-y-6">
      <Card className="border-none bg-card/80 shadow-lg shadow-black/10">
        <CardContent className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Plan</p>
            <p className="text-lg font-semibold text-card-foreground">
              {usageLoading ? 'Loading…' : usage?.plan || 'Free'}
            </p>
            {usageError && <p className="text-xs text-destructive">{usageError}</p>}
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Rewrite remaining</p>
              <p className="text-card-foreground font-semibold">
                {usageLoading ? '…' : formatRemaining(usage?.remainingRewrite)}
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">JD analyze remaining</p>
              <p className="text-card-foreground font-semibold">
                {usageLoading ? '…' : formatRemaining(usage?.remainingJdAnalyze)}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full border border-border/60"
              onClick={reset}
              disabled={usageLoading}
            >
              Reset (demo)
            </Button>
            <Button asChild className="rounded-full" variant="outline">
              <a href="/app/payos" target="_blank" rel="noreferrer">
                Upgrade to Pro
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">AI Copilot</p>
        <h1 className="text-3xl font-semibold text-card-foreground">JD Analyzer</h1>
        <p className="text-sm text-muted-foreground">Paste the job description to extract skills, priorities, and match tips.</p>
      </div>

      <Card className="border-none bg-card/80 shadow-lg shadow-black/10">
        <CardHeader>
          <CardTitle className="text-lg">Job Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Select CV</label>
            {cvsLoading ? (
              <div className="rounded-xl border border-border/50 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                Loading CVs...
              </div>
            ) : cvs.length === 0 ? (
              <div className="rounded-xl border border-border/50 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                No CVs found. Please create or upload a CV first.
              </div>
            ) : (
              <select
                value={selectedCvId ?? ''}
                onChange={(e) => setSelectedCvId(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background/80 px-3 py-2 text-sm"
              >
                <option value="" disabled>
                  -- Choose a CV --
                </option>
                {cvs.map((cv) => (
                  <option key={cv.id} value={cv.id}>
                    {cv.name} {cv.position ? `- ${cv.position}` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="min-h-[220px] rounded-3xl"
          />
          <Button
            className="w-full gap-2 rounded-full"
            onClick={handleAnalyze}
            disabled={analysisLoading || !jobDescription.trim() || !selectedCvId}
          >
            <Sparkles className="size-4" />
            {analysisLoading ? 'Analyzing...' : 'Analyze JD'}
          </Button>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full"
                onClick={handleSaveJd}
                disabled={!jobDescription.trim()}
              >
                <Save className="size-4" /> Save JD
              </Button>
              {selectedCvId && <span>Selected CV will be used as context for this JD analysis.</span>}
            </div>
            {savedJds.length > 0 && (
              <div className="rounded-2xl border border-border/40 bg-background/60 p-3">
                <div className="mb-2 flex items-center justify-between text-sm font-semibold text-card-foreground">
                  <span>Saved JDs</span>
                  <BookOpen className="size-4 text-muted-foreground" />
                </div>
                <div className="max-h-40 space-y-2 overflow-y-auto">
                  {savedJds.map((jd) => (
                    <div
                      key={jd.id}
                      className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 px-3 py-2 text-xs"
                    >
                      <button
                        className="text-left text-card-foreground hover:underline"
                        onClick={() => handleLoadJd(jd.id)}
                      >
                        {jd.title}
                      </button>
                      <button
                        className="text-destructive hover:underline"
                        onClick={() => handleDeleteJd(jd.id)}
                        aria-label="Delete JD"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {jdAnalysis && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-none bg-card/80 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {jdAnalysis.skills.map((skill) => (
                <div key={skill} className="rounded-2xl border border-border/40 bg-muted/20 px-4 py-2 text-sm">
                  {skill}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-none bg-card/80 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Priority List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {jdAnalysis.priorities.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/40 px-4 py-2 text-sm">
                  <span className="size-6 rounded-full bg-primary/20 text-center text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-none bg-card/80 shadow-xl shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Match Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {jdAnalysis.suggestions.map((suggestion) => (
                <div key={suggestion} className="rounded-2xl border border-border/40 bg-background/40 px-4 py-2 text-sm text-muted-foreground">
                  {suggestion}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {jdError && jdError.toLowerCase().includes('quota') ? (
        <Card className="border border-primary/40 bg-primary/5 p-4 text-primary">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="size-4" />
              <span>JD Analyzer quota exceeded. Upgrade to Pro for unlimited runs.</span>
            </div>
            <Button asChild className="rounded-full" variant="secondary">
              <a href="/app/payos" target="_blank" rel="noreferrer">
                Upgrade to Pro
              </a>
            </Button>
          </div>
        </Card>
      ) : jdError ? (
        <Card className="border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="size-4" />
            <span>{jdError}</span>
          </div>
        </Card>
      ) : null}
    </section>
  )
}

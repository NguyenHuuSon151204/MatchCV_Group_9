'use client'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle, Sparkles, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalyze } from '@/hooks/useAnalyze'
import { useCV } from '@/hooks/useCV'
import { activityService } from '@/lib/services/activity-service'
import { savedJdService, type SavedJd } from '@/lib/services/saved-jd-service'
import { cn } from '@/lib/utils'

export function JDAnalyzerPage() {
  const location = useLocation()
  const preset = (location.state as { jdContent?: string; savedJd?: SavedJd } | null) ?? null
  const [jobDescription, setJobDescription] = useState('')
  const [selectedSavedJdId, setSelectedSavedJdId] = useState<string | null>(null)
  const [loadedSavedJd, setLoadedSavedJd] = useState<SavedJd | null>(null)
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null)
  const [mode, setMode] = useState<'manual' | 'saved'>('manual')
  const [showSavedPicker, setShowSavedPicker] = useState(false)
  const { analyzeJD, jdAnalysis, jdError, analysisLoading } = useAnalyze()
  const { cvs, loading: cvsLoading } = useCV()
  const selectedCvName = cvs.find((cv) => cv.id === selectedCvId)?.name || 'CV'
  const [savedJds, setSavedJds] = useState<SavedJd[]>([])

  useEffect(() => {
    setSavedJds(savedJdService.list())
  }, [])

  useEffect(() => {
    if (preset?.savedJd) {
      setLoadedSavedJd(preset.savedJd)
      setSelectedSavedJdId(preset.savedJd.id)
      setJobDescription(preset.savedJd.content || '')
      setMode('saved')
    } else if (preset?.jdContent) {
      setJobDescription(preset.jdContent)
      setMode('manual')
    }
  }, [preset])

  useEffect(() => {
    if (!selectedCvId && cvs.length === 1) {
      setSelectedCvId(cvs[0].id)
    } else if (preset?.savedJd && !selectedCvId && cvs.length > 0) {
      // Default to first CV when navigating from Saved JDs so user doesn't need to re-enter anything.
      setSelectedCvId(cvs[0].id)
    }
  }, [cvs, selectedCvId, preset])

  const handleAnalyze = async () => {
    const descriptionToUse = mode === 'saved' ? loadedSavedJd?.content ?? '' : jobDescription
    if (!descriptionToUse.trim() || !selectedCvId) return
    const result = await analyzeJD(descriptionToUse)
    if (result) {
      activityService.add({
        title: 'JD Analyzed',
        description: `Ran JD analysis for CV "${selectedCvName}"`,
      })
    }
  }

  const handleLoadJd = (id: string) => {
    const jd = savedJdService.list().find((j) => j.id === id)
    if (jd) {
      setSelectedSavedJdId(jd.id)
      setLoadedSavedJd(jd)
      setJobDescription(jd.content)
      setMode('saved')
    }
  }

  return (
    <section className="space-y-6">
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
          <div className="flex flex-wrap gap-2 text-sm">
            {mode === 'manual' ? (
              savedJds.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setMode('saved')
                    const first = loadedSavedJd ?? savedJds[0]
                    handleLoadJd(first.id)
                  }}
                >
                  Use saved JD / job
                </Button>
              )
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setMode('manual')
                  setLoadedSavedJd(null)
                  setSelectedSavedJdId(null)
                  setJobDescription('')
                }}
              >
                Enter manually
              </Button>
            )}
          </div>
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

          {mode === 'saved' ? (
            savedJds.length === 0 ? (
              <div className="rounded-xl border border-border/50 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                No saved jobs/JDs. Save from Job Details first.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Choose a saved JD / job</label>
                  <select
                    className="w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm"
                    value={selectedSavedJdId ?? savedJds[0]?.id ?? ''}
                    onChange={(e) => handleLoadJd(e.target.value)}
                  >
                    {savedJds.map((jd) => (
                      <option key={jd.id} value={jd.id}>
                        {jd.title} {jd.company ? `• ${jd.company}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-border/50 bg-muted/10 px-4 py-3 text-sm text-muted-foreground">
                  <p className="mb-2 text-card-foreground font-semibold">
                    {loadedSavedJd?.title ||
                      savedJds.find((j) => j.id === selectedSavedJdId)?.title ||
                      'Saved JD'}
                  </p>
                  {loadedSavedJd?.company && <p className="text-xs text-muted-foreground">{loadedSavedJd.company}</p>}
                  <p className="text-xs leading-relaxed whitespace-pre-wrap line-clamp-8">
                    {loadedSavedJd?.content ||
                      savedJds.find((j) => j.id === selectedSavedJdId)?.content ||
                      ''}
                  </p>
                </div>
              </div>
            )
          ) : (
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[220px] rounded-3xl"
            />
          )}
          <Button
            className="w-full gap-2 rounded-full"
            onClick={handleAnalyze}
            disabled={
              analysisLoading ||
              !selectedCvId ||
              (mode === 'manual' ? !jobDescription.trim() : !loadedSavedJd?.content?.trim())
            }
          >
            <Sparkles className="size-4" />
            {analysisLoading ? 'Analyzing...' : 'Analyze JD'}
          </Button>
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

      {jdError && (
        <Card className="border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="size-4" />
            <span>{jdError}</span>
          </div>
        </Card>
      )}
    </section>
  )
}

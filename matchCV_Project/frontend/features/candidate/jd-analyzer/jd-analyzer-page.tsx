'use client'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle, Sparkles, Save, Trash2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalyze } from '@/hooks/useAnalyze'
import { useCV } from '@/hooks/useCV'
import { activityService } from '@/lib/services/activity-service'
import { savedJdService, type SavedJd } from '@/lib/services/saved-jd-service'

export function JDAnalyzerPage() {
  const location = useLocation()
  const preset = (location.state as { jdContent?: string } | null) ?? null
  const [jobDescription, setJobDescription] = useState('')
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null)
  const { analyzeJD, jdAnalysis, jdError, analysisLoading } = useAnalyze()
  const { cvs, loading: cvsLoading } = useCV()
  const selectedCvName = cvs.find((cv) => cv.id === selectedCvId)?.name || 'CV'
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
    const result = await analyzeJD(jobDescription)
    if (result) {
      activityService.add({
        title: 'JD Analyzed',
        description: `Ran JD analysis for CV "${selectedCvName}"`,
      })
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



'use client'

import { useEffect, useMemo, useState } from 'react'
import { Loader2, AlertCircle, RotateCcw, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { useCV } from '@/hooks/useCV'
import apiClient from '@/lib/services/api-client'
import type { CV } from '@/lib/types'

interface AnalyzeJDDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAnalysisComplete?: (result: any) => void
  job?: {
    id: number
    title: string
    company: string
    jobDescription?: string
  }
}

interface ScoringResult {
  totalScore: number
  label: string
  color: string
  breakdown: Record<string, number>
  highlights: string[]
  warnings: string[]
}

interface AnalysisHistoryItem {
  id: string
  cvId: string
  cvName: string
  jobId: number
  jobTitle: string
  jobCompany: string
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
  recommendations: string[]
  breakdown: Record<string, number>
  timestamp: string
  note?: string
}

export function AnalyzeJDDialog({ open, onOpenChange, job, onAnalysisComplete }: AnalyzeJDDialogProps) {
  const { cvs, loading: cvsLoading } = useCV()
  const [selectedCV, setSelectedCV] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([])

  const historyKey = useMemo(() => (job ? `jd-history-${job.id}` : null), [job])

  useEffect(() => {
    if (open && historyKey) {
      const stored = localStorage.getItem(historyKey)
      if (stored) {
        try {
          setHistory(JSON.parse(stored))
        } catch {
          setHistory([])
        }
      }
    }
  }, [open, historyKey])

  const persistHistory = (items: AnalysisHistoryItem[]) => {
    if (!historyKey) return
    localStorage.setItem(historyKey, JSON.stringify(items))
  }

  // Convenience: if chỉ có 1 CV thì auto chọn khi mở, còn nhiều CV thì người dùng tự chọn
  useEffect(() => {
    if (open && !selectedCV && cvs.length === 1) {
      setSelectedCV(cvs[0].id)
    }
  }, [open, selectedCV, cvs])

  const handleAnalyze = async () => {
    if (!selectedCV || !job) return

    setAnalyzing(true)
    try {
      const selectedCVData = cvs.find((cv) => cv.id === selectedCV)
      const documentId = parseInt(selectedCV, 10)

      const response = await apiClient.post<ScoringResult>('/analyzer/score-document', {
        documentId,
        jobId: job.id,
        industry: 'IT',
        level: 'Mid',
      })

      const scoringResult = response.data as any as ScoringResult
      const result = {
        cvId: selectedCV,
        cvName: selectedCVData?.name || 'Unknown CV',
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
        matchScore: scoringResult.totalScore ?? scoringResult.TotalScore ?? 0,
        scoreLabel: scoringResult.label ?? scoringResult.Label ?? '',
        scoreColor: scoringResult.color ?? scoringResult.Color ?? '',
        matchedSkills: scoringResult.highlights ?? scoringResult.Highlights ?? [],
        missingSkills: scoringResult.warnings ?? scoringResult.Warnings ?? [],
        recommendations: Object.entries(scoringResult.breakdown ?? scoringResult.Breakdown ?? {})
          .map(([key, value]) => `${key}: ${value}%`)
          .slice(0, 5),
        breakdown: scoringResult.breakdown ?? scoringResult.Breakdown ?? {},
        timestamp: new Date().toISOString(),
      }

      setAnalysisResult(result)
      const newEntry: AnalysisHistoryItem = {
        id: `${job.id}-${selectedCV}-${Date.now()}`,
        ...result,
      }
      const updatedHistory = [newEntry, ...history].slice(0, 20)
      setHistory(updatedHistory)
      persistHistory(updatedHistory)
    } catch (error) {
      console.error('Error analyzing:', error)
      const message =
        (error as any)?.response?.data?.message ||
        (error as Error).message ||
        'Unable to analyze this CV right now.'

      const selectedCVData = cvs.find((cv) => cv.id === selectedCV)
      const failResult = {
        cvId: selectedCV,
        cvName: selectedCVData?.name || 'Unknown CV',
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
        matchScore: 0,
        scoreLabel: 'Unavailable',
        scoreColor: '#ef4444',
        matchedSkills: [],
        missingSkills: [],
        recommendations: [message, 'Please ensure the CV content is not empty and try again.'],
        breakdown: {},
        timestamp: new Date().toISOString(),
      }
      setAnalysisResult(failResult)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleReRun = async (cvId: string) => {
    setSelectedCV(cvId)
    await handleAnalyze()
  }

  const handleSaveNote = (id: string, note: string) => {
    const updated = history.map((item) => (item.id === id ? { ...item, note } : item))
    setHistory(updated)
    persistHistory(updated)
  }

  const handleSaveResult = () => {
    if (analysisResult && onAnalysisComplete) {
      onAnalysisComplete(analysisResult)
    }
    handleClose()
  }

  const handleClose = () => {
    setSelectedCV(null)
    setAnalysisResult(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        {!analysisResult ? (
          <>
            <DialogHeader>
              <DialogTitle>Analyze with JD Analyzer</DialogTitle>
              {job && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Analyze your CV against "{job.title}" at {job.company}
                </p>
              )}
            </DialogHeader>

            <DialogBody>
              <div>
                <label className="mb-3 block text-sm font-medium text-card-foreground">
                  Select a CV to analyze:
                </label>

                {cvs.length > 1 && (
                  <select
                    value={selectedCV ?? ''}
                    onChange={(e) => setSelectedCV(e.target.value)}
                    className="mb-3 w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm"
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

                {cvsLoading ? (
                  <div className="py-8 text-center text-muted-foreground">Loading your CVs...</div>
                ) : cvs.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    No CVs found. Please create a CV first.
                  </div>
                ) : (
                  <div className="max-h-80 space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-background/20">
                    {cvs.map((cv) => (
                      <div
                        key={cv.id}
                        className={`cursor-pointer rounded-2xl border-2 p-4 transition ${
                          selectedCV === cv.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border/40 bg-background/50 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedCV(cv.id)}
                      >
                        <div className="font-medium text-card-foreground">{cv.name}</div>
                        {cv.position && <div className="text-sm text-muted-foreground">{cv.position}</div>}
                        <div className="mt-1 text-xs text-muted-foreground">
                          Modified: {new Date(cv.modifiedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DialogBody>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} className="rounded-full">
                Cancel
              </Button>
              <Button onClick={handleAnalyze} disabled={!selectedCV || analyzing} className="rounded-full gap-2">
                {analyzing && <Loader2 className="size-4 animate-spin" />}
                {analyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Analysis Result</DialogTitle>
            </DialogHeader>

            <DialogBody className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <div className="text-center">
                    <div className="mb-2 text-5xl font-bold text-primary">{analysisResult.matchScore}%</div>
                    <p className="text-muted-foreground">Match Score</p>
                  </div>

                  <div>
                    <h4 className="mb-3 font-semibold text-card-foreground">Matched Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.matchedSkills.map((skill: string) => (
                        <div
                          key={skill}
                          className="rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  {analysisResult.missingSkills.length > 0 && (
                    <div>
                      <h4 className="mb-3 font-semibold text-card-foreground">Missing Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingSkills.map((skill: string) => (
                          <div
                            key={skill}
                            className="rounded-full bg-destructive/20 px-4 py-2 text-sm font-medium text-destructive"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="mb-3 font-semibold text-card-foreground">Recommendations</h4>
                    <div className="space-y-2">
                      {analysisResult.recommendations.map((rec: string, idx: number) => (
                        <div key={idx} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                            {idx + 1}
                          </span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-border/40 bg-muted/10 p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-card-foreground">History</h4>
                    <span className="text-xs text-muted-foreground">{history.length} runs</span>
                  </div>
                  <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
                    {history.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No previous runs.</p>
                    ) : (
                      history.map((item) => (
                        <div key={item.id} className="rounded-xl border border-border/50 bg-background/70 p-3 text-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-card-foreground">{item.cvName}</p>
                              <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
                              <p className="mt-1 text-sm font-semibold text-primary">{item.matchScore}%</p>
                              <p className="text-[11px] text-muted-foreground">
                                Matched: {item.matchedSkills.length} | Missing: {item.missingSkills.length}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full"
                                onClick={() => handleReRun(item.cvId)}
                                title="Re-run"
                              >
                                <RotateCcw className="size-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2">
                            <textarea
                              className="min-h-[60px] w-full rounded-xl border border-border/60 bg-background/50 p-2 text-xs"
                              placeholder="Add note..."
                              defaultValue={item.note}
                              onBlur={(e) => handleSaveNote(item.id, e.target.value)}
                            />
                            <div className="mt-1 flex justify-end">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="gap-1 text-xs"
                                onClick={(e) => {
                                  const value = (e.currentTarget.parentElement?.previousSibling as HTMLTextAreaElement)?.value || ''
                                  handleSaveNote(item.id, value)
                                }}
                              >
                                <Save className="size-3" /> Save note
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </DialogBody>

            <DialogFooter>
              <Button onClick={() => setAnalysisResult(null)} variant="outline" className="rounded-full">
                Analyze Another CV
              </Button>
              <Button onClick={handleSaveResult} className="rounded-full">
                Save & Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

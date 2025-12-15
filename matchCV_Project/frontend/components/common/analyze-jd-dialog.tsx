'use client'

import { useState } from 'react'
import type { AxiosError } from 'axios'
import { Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { useCV } from '@/hooks/useCV'
import { useToastContext } from '@/contexts/toast-context'
import { aiService } from '@/lib/services/ai-service'

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

export function AnalyzeJDDialog({ open, onOpenChange, job, onAnalysisComplete }: AnalyzeJDDialogProps) {
  const { cvs, loading: cvsLoading } = useCV()
  const [selectedCV, setSelectedCV] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const toast = useToastContext()

  const handleAnalyze = async () => {
    if (!selectedCV || !job) return

    // Validate job description before calling API to avoid 400 from backend
    if (!job.jobDescription || job.jobDescription.trim().length === 0) {
      const message = 'This job has no description. Please add a job description before analyzing.'
      setErrorMessage(message)
      toast.error('Analyze failed', message)
      return
    }

    setAnalyzing(true)
    setErrorMessage(null)
    try {
      const selectedCVData = cvs.find(cv => cv.id === selectedCV)
      const cvText =
        selectedCVData?.description ||
        selectedCVData?.cvData?.personalInfo?.summary ||
        selectedCVData?.name ||
        'CV Content'

      const scoringResult: ScoringResult = await aiService.analyzeJD({
        description: job.jobDescription || '',
        cvText,
        industry: 'IT',
        level: 'Mid',
      })
      const breakdownEntries = Object.entries(scoringResult.breakdown || {}).sort((a, b) => b[1] - a[1])
      const result = {
        cvId: selectedCV,
        cvName: selectedCVData?.name || 'Unknown CV',
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
        matchScore: scoringResult.totalScore,
        scoreLabel: scoringResult.label,
        scoreColor: scoringResult.color,
        matchedSkills: scoringResult.highlights || [],
        missingSkills: scoringResult.warnings || [],
        recommendations: breakdownEntries.map(([key, value]) => `${key}: ${value}%`).slice(0, 5),
        breakdown: scoringResult.breakdown || {},
        timestamp: new Date().toISOString(),
      }

      setAnalysisResult(result)
      toast.success('JD analyzed', `Score: ${result.matchScore}%`)
    } catch (error: any) {
      console.error('Error analyzing:', error)
      const axiosError = error as AxiosError<any>
      const message =
        axiosError?.response?.data?.message ||
        axiosError?.response?.data?.error ||
        (error instanceof Error ? error.message : 'Quota exceeded or server error')
      setErrorMessage(message)
      toast.error('Analyze failed', message)
      setAnalysisResult(null)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSaveResult = () => {
    if (analysisResult && onAnalysisComplete) {
      onAnalysisComplete(analysisResult)
    }
    handleDialogOpenChange(false)
  }

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedCV(null)
      setAnalysisResult(null)
      setErrorMessage(null)
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        {!analysisResult ? (
          <>
            <DialogHeader>
              <DialogTitle>Analyze with JD Analyzer</DialogTitle>
              {job && (
                <p className="text-sm text-muted-foreground mt-2">
                  Analyze your CV against "{job.title}" at {job.company}
                </p>
              )}
            </DialogHeader>

            <DialogBody>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-3 block">
                  Select a CV to analyze:
                </label>

                {cvsLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading your CVs...
                  </div>
                ) : cvs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No CVs found. Please create a CV first.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-background/20">
                    {cvs.map((cv) => (
                      <div
                        key={cv.id}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                          selectedCV === cv.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border/40 bg-background/50 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedCV(cv.id)}
                      >
                        <div className="font-medium text-card-foreground">{cv.name}</div>
                        {cv.position && (
                          <div className="text-sm text-muted-foreground">{cv.position}</div>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          Modified: {new Date(cv.modifiedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errorMessage && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="size-4" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </DialogBody>

            <DialogFooter>
              <Button variant="outline" onClick={() => handleDialogOpenChange(false)} className="rounded-full">
                Cancel
              </Button>
              <Button
                onClick={handleAnalyze}
                disabled={!selectedCV || analyzing}
                className="rounded-full gap-2"
              >
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
              <div className="text-center">
                <div className="text-5xl font-bold mb-2" style={{ color: analysisResult.scoreColor || 'inherit' }}>
                  {analysisResult.matchScore}%
                </div>
                <p className="text-muted-foreground">
                  Match Score • {analysisResult.scoreLabel}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Matched Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.matchedSkills.map((skill: string) => (
                    <div
                      key={skill}
                      className="rounded-full bg-primary/20 text-primary px-4 py-2 text-sm font-medium"
                    >
                      ✓ {skill}
                    </div>
                  ))}
                </div>
              </div>

              {analysisResult.missingSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-card-foreground mb-3">Missing Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingSkills.map((skill: string) => (
                      <div
                        key={skill}
                        className="rounded-full bg-destructive/20 text-destructive px-4 py-2 text-sm font-medium"
                      >
                        ✗ {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {Object.entries((analysisResult.breakdown || {}) as Record<string, number>).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between rounded-xl border border-border/40 bg-background/60 px-3 py-2"
                      >
                        <span className="font-medium capitalize">{key}</span>
                        <span className="text-card-foreground">{value}%</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {analysisResult.recommendations.map((rec: string, idx: number) => (
                    <div key={idx} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                        {idx + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
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

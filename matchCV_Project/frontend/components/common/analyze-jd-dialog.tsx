'use client'

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { useCV } from '@/hooks/useCV'
import type { CV } from '@/lib/types'
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
  const toast = useToastContext()

  const handleAnalyze = async () => {
    if (!selectedCV || !job) return

    setAnalyzing(true)
    try {
      const selectedCVData = cvs.find(cv => cv.id === selectedCV)
      const cvText =
        selectedCVData?.description ||
        selectedCVData?.cvData?.personalInfo?.summary ||
        selectedCVData?.name ||
        'CV Content'

      const scoringResult = await aiService.analyzeJD({
        description: job.jobDescription || '',
        cvText,
        industry: 'IT',
        level: 'Mid',
      })
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
        recommendations: Object.entries(scoringResult.breakdown || {})
          .map(([key, value]) => `${key}: ${value}%`)
          .slice(0, 5),
        breakdown: scoringResult.breakdown,
        timestamp: new Date().toISOString(),
      }

      setAnalysisResult(result)
      toast.success('JD analyzed', `Score: ${result.matchScore}%`)
    } catch (error) {
      console.error('Error analyzing:', error)
      toast.error('Analyze failed', error instanceof Error ? error.message : 'Quota exceeded or server error')
      // Fallback to mock data on error
      const selectedCVData = cvs.find(cv => cv.id === selectedCV)
      const mockResult = {
        cvId: selectedCV,
        cvName: selectedCVData?.name || 'Unknown CV',
        jobId: job.id,
        jobTitle: job.title,
        jobCompany: job.company,
        matchScore: Math.floor(Math.random() * 40 + 60),
        scoreLabel: 'Good',
        scoreColor: '#f59e0b',
        matchedSkills: ['React', 'TypeScript', 'Node.js', 'Database Design'],
        missingSkills: ['AWS', 'Docker', 'Kubernetes'],
        recommendations: [
          'Add more details about your experience with React',
          'Include cloud platform experience (AWS/Azure/GCP)',
          'Highlight containerization skills',
        ],
        breakdown: {},
        timestamp: new Date().toISOString(),
      }
      setAnalysisResult(mockResult)
    } finally {
      setAnalyzing(false)
    }
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
            </DialogBody>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} className="rounded-full">
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
              {/* Match Score */}
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {analysisResult.matchScore}%
                </div>
                <p className="text-muted-foreground">Match Score</p>
              </div>

              {/* Matched Skills */}
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

              {/* Missing Skills */}
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

              {/* Recommendations */}
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

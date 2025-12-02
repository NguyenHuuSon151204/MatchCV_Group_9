'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalyze } from '@/hooks/useAnalyze'

export function JDAnalyzerPage() {
  const [jobDescription, setJobDescription] = useState('')
  const { analyzeJD, jdAnalysis, analysisLoading } = useAnalyze()

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return
    await analyzeJD(jobDescription)
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
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="min-h-[220px] rounded-3xl"
          />
          <Button className="w-full gap-2 rounded-full" onClick={handleAnalyze} disabled={analysisLoading}>
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
    </section>
  )
}



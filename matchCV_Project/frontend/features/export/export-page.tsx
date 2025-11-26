'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCV } from '@/hooks/useCV'

const formats: Array<{ label: string; value: 'pdf' | 'docx' | 'json' }> = [
  { label: 'PDF', value: 'pdf' },
  { label: 'DOCX', value: 'docx' },
  { label: 'JSON', value: 'json' },
]

export function ExportPage() {
  const { cvs, exportCV } = useCV()

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Delivery</p>
        <h1 className="text-3xl font-semibold text-card-foreground">Export CVs</h1>
        <p className="text-sm text-muted-foreground">Choose any CV and export to PDF, DOCX, or JSON for automation.</p>
      </div>

      <Card className="border-none bg-card/80 shadow-xl shadow-black/10">
        <CardHeader>
          <CardTitle className="text-lg">Available CVs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-border/40 bg-background/30 px-4 py-3"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-card-foreground">{cv.name}</p>
                <p className="text-xs text-muted-foreground">{cv.position}</p>
              </div>
              {formats.map((format) => (
                <Button
                  key={format.value}
                  size="sm"
                  variant="secondary"
                  className="rounded-full border-border/40 bg-muted/40 text-muted-foreground"
                  onClick={() => exportCV(cv.id, format.value)}
                >
                  <Download className="mr-1 size-4" />
                  {format.label}
                </Button>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}


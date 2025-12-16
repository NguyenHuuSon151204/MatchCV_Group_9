'use client'

import { Eye, FileText, MoreHorizontal } from 'lucide-react'
import { ScoreCircle } from '@/components/common/score-circle'
import { StatusBadge } from '@/components/common/status-badge'
import type { CV } from '@/lib/types'

interface CVCardProps {
  cv: CV
  onView?: (id: string) => void
  onEdit: (id: string) => void
  onAnalyze: (id: string) => void
  onRewrite: (id: string) => void
  onDownload: (id: string) => void
  onDelete: (id: string) => void
}

export function CVCard({ cv, onView, onEdit, onAnalyze, onRewrite, onDownload, onDelete }: CVCardProps) {
  return (
    <div className="rounded-3xl border border-border/40 bg-card/70 p-4 shadow-lg shadow-black/5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <FileText className="size-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-card-foreground">{cv.name}</p>
              <p className="text-xs text-muted-foreground">{cv.position}</p>
            </div>
            <button className="rounded-full border border-border/40 p-2 text-muted-foreground hover:bg-muted/30">
              <MoreHorizontal className="size-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <StatusBadge status={cv.status} />
            <ScoreCircle score={cv.score} size={48} />
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
        {onView && (
          <button
            onClick={() => onView(cv.id)}
            className="col-span-2 rounded-2xl border border-green-500/30 px-3 py-2 text-green-600 hover:border-green-500/60"
          >
            <Eye className="mr-2 inline size-3" />
            View CV
          </button>
        )}
        <button
          onClick={() => onEdit(cv.id)}
          className="col-span-2 rounded-2xl border border-blue-500/30 px-3 py-2 text-blue-500 hover:border-blue-500/60"
        >
          Edit CV
        </button>
        <button
          onClick={() => onAnalyze(cv.id)}
          className="rounded-2xl border border-border/40 px-3 py-2 text-primary hover:border-primary/60"
        >
          Analyze
        </button>
        <button
          onClick={() => onRewrite(cv.id)}
          className="rounded-2xl border border-border/40 px-3 py-2 text-purple-300 hover:border-purple-500/60"
        >
          Rewrite
        </button>
        <button
          onClick={() => onDownload(cv.id)}
          className="rounded-2xl border border-border/40 px-3 py-2 text-muted-foreground hover:border-muted-foreground/50"
          title="Download CV"
        >
          Download
        </button>
        <button
          onClick={() => onDelete(cv.id)}
          className="rounded-2xl border border-destructive/30 px-3 py-2 text-destructive hover:border-destructive/60"
        >
          Delete
        </button>
      </div>
    </div>
  )
}


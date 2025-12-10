'use client'

import { Bot, Download, Eye, FileText, MoreHorizontal, Trash2 } from 'lucide-react'
import { StatusBadge } from '@/components/common/status-badge'
import type { CV } from '@/lib/types'

interface CVCardProps {
  cv: CV
  onEdit: (id: string) => void
  onAnalyze: (id: string) => void
  onRewrite: (id: string) => void
  onExport: (id: string, format: 'pdf' | 'docx' | 'json') => void
  onView: (id: string) => void
  onDelete: (id: string) => void
}

export function CVCard({ cv, onEdit, onAnalyze, onRewrite, onExport, onView, onDelete }: CVCardProps) {
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
            <span className="text-[11px] text-muted-foreground">
              Last updated {new Date(cv.modifiedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
        <button
          onClick={() => onView(cv.id)}
          aria-label="View CV"
          className="flex items-center justify-center rounded-2xl border border-green-500/40 px-3 py-2 text-green-600 hover:border-green-500/70"
        >
          <Eye className="size-4" />
        </button>
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
          className="flex items-center justify-center rounded-2xl border border-border/40 px-3 py-2 text-purple-300 hover:border-purple-500/60"
        >
          <Bot className="mr-1 size-4" />
          Rewrite
        </button>
        <button
          onClick={() => onExport(cv.id, 'pdf')}
          aria-label="Export CV"
          className="flex items-center justify-center rounded-2xl border border-border/40 px-3 py-2 text-muted-foreground hover:border-muted-foreground/50"
        >
          <Download className="size-4" />
        </button>
        <button
          onClick={() => onDelete(cv.id)}
          aria-label="Delete CV"
          className="flex items-center justify-center rounded-2xl border border-destructive/30 px-3 py-2 text-destructive hover:border-destructive/60"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  )
}


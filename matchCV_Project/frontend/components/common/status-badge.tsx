'use client'

import { Badge } from '@/components/ui/badge'
import type { CVStatus } from '@/lib/types'

const statusMap: Record<
  CVStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'outline'
    classes: string
  }
> = {
  draft: { label: 'Draft', variant: 'secondary', classes: 'bg-muted text-muted-foreground' },
  uploaded: { label: 'Uploaded', variant: 'secondary', classes: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200' },
  analyzed: { label: 'Analyzed', variant: 'default', classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200' },
  submitted: { label: 'Submitted', variant: 'default', classes: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-100' },
  active: { label: 'Uploaded', variant: 'secondary', classes: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200' },
}

interface StatusBadgeProps {
  status: CVStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusMap[status]
  return (
    <Badge variant={config.variant} className={`rounded-full px-3 py-0.5 text-xs font-semibold ${config.classes}`}>
      {config.label}
    </Badge>
  )
}


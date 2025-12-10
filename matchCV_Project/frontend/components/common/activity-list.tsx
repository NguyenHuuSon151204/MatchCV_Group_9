import type { ActivityItem } from '@/lib/types'
import { Clock } from 'lucide-react'

interface ActivityListProps {
  items: ActivityItem[]
}

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">No recent activity yet.</p>
      )}
      {items.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 rounded-2xl border border-border/40 bg-card/60 px-4 py-3"
        >
          <div className="rounded-full bg-primary/20 p-2 text-primary">
            <Clock className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
          </div>
          <span className="ml-auto text-xs text-muted-foreground">{activity.timestamp}</span>
        </div>
      ))}
    </div>
  )
}


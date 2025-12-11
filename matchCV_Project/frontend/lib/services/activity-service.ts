import type { ActivityItem } from '@/lib/types'

const STORAGE_KEY = 'activity-feed'
const MAX_ITEMS = 50

function load(): ActivityItem[] {
  if (typeof window === 'undefined') return []
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  try {
    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // ignore parse errors
  }
  return []
}

function save(items: ActivityItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)))
}

export const activityService = {
  add(item: Omit<ActivityItem, 'id' | 'timestamp'> & { timestamp?: string }) {
    const current = load()
    const now = item.timestamp || new Date().toLocaleString()
    const entry: ActivityItem = {
      id: `${Date.now()}`,
      timestamp: now,
      ...item,
    }
    const updated = [entry, ...current].slice(0, MAX_ITEMS)
    save(updated)
    return updated
  },
  list(): ActivityItem[] {
    return load()
  },
}

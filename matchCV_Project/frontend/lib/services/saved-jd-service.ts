import type { Job } from '@/lib/types'

const STORAGE_KEY = 'saved-jd-list'
const MAX_ITEMS = 20

export type SavedJd = {
  id: string
  jobId?: number
  title: string
  company?: string
  content: string
  savedAt: string
}

function normalize(item: any): SavedJd | null {
  if (!item) return null
  // Backward compatibility: old shape {id,title,content}
  return {
    id: item.id ?? `${Date.now()}`,
    jobId: item.jobId,
    title: item.title ?? 'Untitled JD',
    company: item.company,
    content: item.content ?? '',
    savedAt: item.savedAt ?? new Date().toISOString(),
  }
}

function load(): SavedJd[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalize).filter((x): x is SavedJd => !!x)
  } catch {
    return []
  }
}

function persist(items: SavedJd[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)))
}

export const savedJdService = {
  list(): SavedJd[] {
    return load()
  },
  saveFromJob(job: Job): SavedJd {
    const content = job.jobDescription || (job as any).rawText || job.title || ''
    const entry: SavedJd = {
      id: `${Date.now()}`,
      jobId: job.id,
      title: job.title,
      company: job.company,
      content,
      savedAt: new Date().toISOString(),
    }
    const updated = [entry, ...load()].slice(0, MAX_ITEMS)
    persist(updated)
    return entry
  },
  delete(id: string): SavedJd[] {
    const filtered = load().filter((j) => j.id !== id)
    persist(filtered)
    return filtered
  },
}

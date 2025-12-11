export type AppliedJob = {
  id: string
  title: string
  company: string
  appliedAt: string
}

const STORAGE_KEY = 'applied-jobs'
const MAX_ITEMS = 50

function load(): AppliedJob[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist(items: AppliedJob[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)))
}

export const appliedJobsService = {
  list(): AppliedJob[] {
    return load()
  },
  save(job: { id: number; title: string; company: string }) {
    const entry: AppliedJob = {
      id: job.id.toString(),
      title: job.title,
      company: job.company,
      appliedAt: new Date().toLocaleString(),
    }
    const updated = [entry, ...load().filter((j) => j.id !== entry.id)].slice(0, MAX_ITEMS)
    persist(updated)
    return entry
  },
  delete(id: string) {
    const filtered = load().filter((j) => j.id !== id)
    persist(filtered)
    return filtered
  },
}

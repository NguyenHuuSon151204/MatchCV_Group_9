export type AppliedJob = {
  id: string
  title: string
  company?: string
  appliedAt: string
}

const STORAGE_KEY = 'applied-jobs'

const load = (): AppliedJob[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AppliedJob[]) : []
  } catch {
    return []
  }
}

const persist = (items: AppliedJob[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const appliedJobsService = {
  list(): AppliedJob[] {
    return load()
  },

  save(job: { id: string | number; title: string; company?: string }): AppliedJob {
    const items = load()
    const entry: AppliedJob = {
      id: job.id.toString(),
      title: job.title,
      company: job.company,
      appliedAt: new Date().toLocaleString(),
    }
    const next = [entry, ...items.filter((item) => item.id !== entry.id)].slice(0, 50)
    persist(next)
    return entry
  },

  delete(id: string): AppliedJob[] {
    const next = load().filter((item) => item.id !== id)
    persist(next)
    return next
  },
}

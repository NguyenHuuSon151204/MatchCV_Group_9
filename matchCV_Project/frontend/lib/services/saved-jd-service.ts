export type SavedJd = {
  id: string
  title: string
  content: string
  savedAt: string
}

const STORAGE_KEY = 'saved-jds'

const load = (): SavedJd[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedJd[]) : []
  } catch {
    return []
  }
}

const persist = (items: SavedJd[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const savedJdService = {
  list(): SavedJd[] {
    return load()
  },

  save(content: string): SavedJd {
    const items = load()
    const firstLine = content.trim().split(/\r?\n/)[0] ?? ''
    const title = firstLine || 'Saved JD'
    const entry: SavedJd = {
      id: Date.now().toString(),
      title: title.slice(0, 80),
      content,
      savedAt: new Date().toISOString(),
    }
    const next = [entry, ...items].slice(0, 50)
    persist(next)
    return entry
  },

  delete(id: string): SavedJd[] {
    const next = load().filter((item) => item.id !== id)
    persist(next)
    return next
  },
}

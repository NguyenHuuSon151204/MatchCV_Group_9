const STORAGE_KEY = 'saved-jd-list'
const MAX_ITEMS = 20

export type SavedJd = { id: string; title: string; content: string }

function load(): SavedJd[] {
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

function persist(items: SavedJd[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)))
}

export const savedJdService = {
  list(): SavedJd[] {
    return load()
  },
  save(content: string): SavedJd {
    const title = content.split('\n').find((l) => l.trim())?.slice(0, 60) || 'Untitled JD'
    const entry: SavedJd = { id: `${Date.now()}`, title, content }
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

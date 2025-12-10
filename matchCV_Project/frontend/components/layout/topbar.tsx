import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'

interface TopbarProps {
  onToggleSidebar: () => void
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useContext(AuthContext) || {}
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notifications, setNotifications] = useState(() => [
    { id: 1, title: 'AI rewrite ready', message: 'Your rewrite suggestions are ready to apply.', time: '2m ago', read: false },
    { id: 2, title: 'Analysis completed', message: 'CV vs JD scoring finished for Product Manager.', time: '1h ago', read: false },
    { id: 3, title: 'Export done', message: 'CV exported to PDF successfully.', time: 'Yesterday', read: true },
  ])
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('matchcv-profile-extras') : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.avatarBase64) {
          setAvatarUrl(`data:image/png;base64,${parsed.avatarBase64}`)
        }
      } catch {
        // ignore
      }
    }
  }, [user])

  return (
    <header className="flex items-center justify-between border-b border-border bg-card/70 px-4 py-4 backdrop-blur-md lg:px-8">
      <div className="flex flex-1 items-center gap-3">
        <button
          className="rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30 lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your CVs, JD, or actions..."
            className="w-full rounded-full border border-border bg-background/80 py-2 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="ml-4 flex items-center gap-3">
        <button
          className="rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        <div className="relative">
          <button
            className="relative rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30"
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 z-20 mt-3 w-80 rounded-2xl border border-border/60 bg-card p-3 shadow-2xl shadow-black/10">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-card-foreground">Notifications</p>
                <span className="text-xs text-muted-foreground">{notifications.length} updates</span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No notifications yet.</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="rounded-xl border border-border/50 bg-muted/30 p-3 text-sm text-card-foreground"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold">{n.title}</p>
                          <p className="text-muted-foreground text-xs">{n.message}</p>
                        </div>
                        <span className="text-[11px] text-muted-foreground">{n.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1"
            onClick={() => setShowUserMenu((prev) => !prev)}
          >
            <div className="size-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary/60">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-primary-foreground/70">
                  {user?.displayName?.slice(0, 2)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold leading-tight">{user?.displayName || 'User'}</p>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{user?.role || 'Guest'}</p>
            </div>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 z-30 mt-3 w-48 rounded-2xl border border-border/60 bg-card p-2 shadow-2xl shadow-black/15">
              <button
                className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-muted/50"
                onClick={() => {
                  setShowUserMenu(false)
                  window.location.href = '/app/settings'
                }}
              >
                Settings
              </button>
              <button
                className="w-full rounded-xl px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setShowUserMenu(false)
                  logout?.()
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}


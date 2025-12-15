'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { Bell, Menu, Moon, Search, Sun, User as UserIcon, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'
import { useNotifications } from '@/hooks/useNotifications'

interface TopbarProps {
  onToggleSidebar: () => void
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useContext(AuthContext) || {}
  const [open, setOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const notifRef = useRef<HTMLDivElement | null>(null)
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications({
    role: user?.role,
    userId: user?.id,
    pollMs: 60000,
  })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const avatarSrc = user?.avatarBase64 ? `data:image/png;base64,${user.avatarBase64}` : null

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
        <div className="relative" ref={notifRef}>
          <button
            className="relative rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-border bg-card/95 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Thông báo</p>
                  <p className="text-xs text-muted-foreground">Cá nhân hóa cho vai trò {user?.role || 'Guest'}</p>
                </div>
                <button
                  className="text-xs text-primary hover:underline disabled:text-muted-foreground"
                  onClick={markAllAsRead}
                  disabled={loading || unreadCount === 0}
                >
                  Đánh dấu đã đọc
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="px-4 py-6 text-sm text-muted-foreground">Đang tải thông báo...</div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-muted-foreground">Chưa có thông báo mới.</div>
                ) : (
                  notifications.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full border-b border-border/60 px-4 py-3 text-left last:border-b-0 ${
                        item.isRead ? 'bg-background/40 text-muted-foreground' : 'bg-background text-card-foreground'
                      }`}
                      onClick={() => markAsRead(item.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="text-xs">{item.message}</p>
                        </div>
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">{item.time}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 transition hover:bg-muted/50"
            onClick={() => setOpen((v) => !v)}
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt="avatar" className="size-8 rounded-full object-cover" />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-xs font-semibold text-white">
                {user?.displayName?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight">{user?.displayName || 'User'}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{user?.role || 'Guest'}</p>
              </div>
              <ChevronDown className="size-3 text-muted-foreground" />
            </div>
          </button>
          {open && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-border bg-card/95 shadow-xl backdrop-blur">
              <a
                href="/app/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted/50"
              >
                <UserIcon className="size-4" /> Profile
              </a>
              <a
                href="/app/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted/50"
              >
                <Settings className="size-4" /> Settings
              </a>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-destructive hover:bg-muted/50"
                onClick={() => logout?.()}
              >
                <LogOut className="size-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

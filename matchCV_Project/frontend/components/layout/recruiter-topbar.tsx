'use client'

import { useRef, useState, useEffect } from 'react'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'
import { AccountDropdown } from './account-dropdown'
import { useNotifications } from '@/hooks/useNotifications'

interface RecruiterTopbarProps {
  onToggleSidebar: () => void
}

export function RecruiterTopbar({ onToggleSidebar }: RecruiterTopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications({
    role: 'Recruiter',
    pollMs: 60000,
  })
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

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
            placeholder="Search jobs, applicants, or actions..."
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
                  <p className="text-xs text-muted-foreground">Dành cho Recruiter</p>
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
        <AccountDropdown />
      </div>
    </header>
  )
}

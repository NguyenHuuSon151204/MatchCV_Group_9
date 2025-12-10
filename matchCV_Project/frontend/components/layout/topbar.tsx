import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'

interface TopbarProps {
  onToggleSidebar: () => void
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { user } = useContext(AuthContext) || {}

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
        <button className="rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30">
          <Bell className="size-4" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1">
          <div className="size-8 rounded-full bg-gradient-to-br from-primary to-primary/60" />
          <div>
            <p className="text-xs font-semibold leading-tight">{user?.displayName || 'User'}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{user?.role || 'Guest'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}


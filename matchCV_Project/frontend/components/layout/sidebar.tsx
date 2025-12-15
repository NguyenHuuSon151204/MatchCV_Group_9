'use client'

import { useContext } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  BarChart3,
  Settings,
  Briefcase,
  Plus,
  Users
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { AuthContext } from '@/contexts/AuthContext'
import { X } from 'lucide-react'

type NavChild = {
  label: string
  path: string
}

type NavItem = {
  label: string
  path: string
  icon: LucideIcon
  children?: NavChild[]
}

const candidateNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { label: 'My CVs', path: '/app/my-cvs', icon: FileText },
  { label: 'JD Analyzer', path: '/app/jd-analyzer', icon: BarChart3 },
  { label: 'AI Rewrite', path: '/app/ai-rewrite', icon: Sparkles },
  {
    label: 'Jobs',
    path: '/app/jobs',
    icon: Briefcase,
    children: [
      { label: 'Find Jobs', path: '/app/jobs/find' },
      { label: 'Saved Jobs', path: '/app/jobs/saved' },
      { label: 'Applied Jobs', path: '/app/jobs/applied' },
    ],
  },
  { label: 'Settings', path: '/app/settings', icon: Settings },
]

const recruiterNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Post Job', path: '/app/post-job', icon: Plus },
  { label: 'Find Candidates', path: '/app/candidates', icon: Users },
  { label: 'Settings', path: '/app/settings', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

export function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const { user } = useContext(AuthContext) || {}
  const role = user?.role || 'Candidate'
  const navItems = role === 'Recruiter' ? recruiterNav : candidateNav

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed inset-y-0 z-40 w-72 transform border-r border-sidebar-border bg-sidebar/95 backdrop-blur-lg transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/60">
                MatchCV
              </p>
              <h1 className="text-2xl font-bold text-sidebar-foreground">{role}</h1>
            </div>
            <button
              className="rounded-full border border-sidebar-border p-2 text-sidebar-foreground/70 transition hover:bg-sidebar-accent/50 lg:hidden"
              onClick={onToggle}
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon

              if (!item.children || item.children.length === 0) {
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-primary/20'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
                      )
                    }
                    onClick={onClose}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </NavLink>
                )
              }

              return (
                <div key={item.path} className="space-y-1">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-primary/20'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
                      )
                    }
                    onClick={onClose}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-5" />
                      {item.label}
                    </div>
                  </NavLink>
                  <div className="ml-4 space-y-1 border-l border-sidebar-border pl-4">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all',
                            isActive
                              ? 'bg-sidebar-accent/80 text-sidebar-accent-foreground shadow-md shadow-primary/10'
                              : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground'
                          )
                        }
                        onClick={onClose}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Removed promotional footer to keep sidebar clean */}
        </div>
      </aside>
    </>
  )
}

'use client'

import { useContext, useEffect, useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  BarChart3,
  Download,
  Settings,
  Briefcase,
  Plus,
  Users,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { AuthContext } from '@/contexts/AuthContext'

const candidateNav = [
  { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { label: 'My CVs', path: '/app/my-cvs', icon: FileText },
  { label: 'JD Analyzer', path: '/app/jd-analyzer', icon: BarChart3 },
  { label: 'AI Rewrite', path: '/app/ai-rewrite', icon: Sparkles },
  { label: 'Export', path: '/app/export', icon: Download },
  { label: 'Settings', path: '/app/settings', icon: Settings },
]

const recruiterNav = [
  { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Post Job', path: '/app/post-job', icon: Plus },
  { label: 'Find Candidates', path: '/app/candidates', icon: Users },
  { label: 'Settings', path: '/app/settings', icon: Settings },
]

interface SidebarProps {
  isMobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const { user } = useContext(AuthContext) || {}
  const role = user?.role || 'Candidate'
  const navItems = role === 'Recruiter' ? recruiterNav : candidateNav
  const location = useLocation()
  const [jobsOpen, setJobsOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const jobLinks = [
    { label: 'Find Jobs', path: '/app/jobs' },
    { label: 'Saved JDs', path: '/app/saved-jds' },
    { label: 'Applied Jobs', path: '/app/applied-jobs' },
  ]

  useEffect(() => {
    if (location.pathname.startsWith('/app/jobs')) {
      setJobsOpen(true)
    }
  }, [location.pathname])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden',
          isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed inset-y-0 z-40 transform border-r border-sidebar-border bg-sidebar/95 backdrop-blur-lg transition-transform lg:static lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'w-20' : 'w-72'
        )}
      >
        <div className="flex h-full flex-col">
          <div className={cn('flex items-center justify-between border-b border-sidebar-border px-4 py-4', collapsed && 'px-3')}>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary-foreground/80">
                AI
              </div>
              {!collapsed && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/60">
                    MatchCV
                  </p>
                  <h1 className="text-2xl font-bold text-sidebar-foreground">{role}</h1>
                </div>
              )}
            </div>
            <button
              className="rounded-full border border-sidebar-border p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent/40"
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            </button>
          </div>

          <nav className={cn('flex-1 space-y-1 py-6', collapsed ? 'px-2' : 'px-4')}>
            {navItems.map((item) => {
              const Icon = item.icon
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
                  <Icon className="size-5 shrink-0" />
                  {!collapsed && item.label}
                </NavLink>
              )
            })}
            {/* Jobs parent + children */}
            <button
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all',
                location.pathname.startsWith('/app/jobs')
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-primary/20'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
              )}
              onClick={() => {
                setJobsOpen((prev) => !prev)
              }}
            >
              <Briefcase className="size-5 shrink-0" />
              {!collapsed && 'Jobs'}
            </button>
            {jobsOpen && !collapsed && (
              <div className="ml-4 space-y-1">
                {jobLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground'
                      )
                    }
                    onClick={onClose}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </nav>

          {/* Removed bottom AI Copilot card */}
        </div>
      </aside>
    </>
  )
}

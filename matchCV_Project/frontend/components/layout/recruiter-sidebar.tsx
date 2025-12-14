'use client'

import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileCheck,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const recruiterNavigation = [
  { label: 'Dashboard', path: '/recruiter', icon: LayoutDashboard },
  { label: 'Jobs', path: '/recruiter/jobs', icon: Briefcase },
  { label: 'Applicants', path: '/recruiter/applicants', icon: Users },
  { label: 'Verification', path: '/recruiter/verification', icon: FileCheck },
]

interface RecruiterSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function RecruiterSidebar({ collapsed = false, onToggle, open = false, onClose }: RecruiterSidebarProps & { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 z-40 w-72 transform border-r border-sidebar-border bg-sidebar/95 backdrop-blur-lg transition-transform lg:static lg:translate-x-0',
          collapsed && 'lg:w-20',
          !open && '-translate-x-full lg:translate-x-0',
          open && 'translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
            <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg font-bold">
                M
              </div>
              {!collapsed && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/60">
                    MatchCV
                  </p>
                  <h1 className="text-xl font-bold text-sidebar-foreground">Recruiter</h1>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {recruiterNavigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path || pathname?.startsWith(item.path + '/')
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => onClose?.()}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-primary/20'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                    collapsed && 'justify-center px-3'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="size-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-sidebar-border px-6 py-4">
            {!collapsed && (
              <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 text-sm text-sidebar-foreground/80">
                <p className="font-semibold">Recruiter Portal</p>
                <p className="text-xs text-sidebar-foreground/60">
                  Manage jobs and evaluate candidates
                </p>
              </div>
            )}
            {onToggle && (
              <button
                className="mt-3 w-full rounded-xl border border-sidebar-border p-2 text-xs font-semibold text-sidebar-foreground/70 hover:bg-sidebar-accent/60 transition-colors hidden lg:block"
                onClick={onToggle}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <ChevronRight className="size-4 mx-auto" /> : <ChevronLeft className="size-4 mx-auto" />}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

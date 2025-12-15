'use client'

import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Key,
  BarChart3,
  FileText,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight,
  FileCheck,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const adminNavigation = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Jobs', path: '/admin/jobs', icon: Briefcase },
  { label: 'Applicants', path: '/admin/applicants', icon: Users },
  { label: 'Recruiters', path: '/admin/recruiters', icon: Building2 },
  { label: 'Licenses', path: '/admin/licenses', icon: Key },
  { label: 'Verifications', path: '/admin/verifications', icon: FileCheck },
  { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
  { label: 'Audit Log', path: '/admin/audit-log', icon: FileText },
  { label: 'AI Status', path: '/admin/ai-status', icon: Brain },
  { label: 'Configuration', path: '/admin/config', icon: Settings },
]

interface AdminSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 z-40 w-72 transform border-r border-sidebar-border bg-sidebar/95 backdrop-blur-lg transition-transform lg:static lg:translate-x-0',
        collapsed && 'lg:w-20'
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
                <h1 className="text-xl font-bold text-sidebar-foreground">Admin</h1>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {adminNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path || pathname?.startsWith(item.path + '/')
            return (
              <Link
                key={item.path}
                href={item.path}
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
          <Link
            href="/recruiter/settings"
            className={cn(
              'flex items-center gap-2 rounded-2xl border border-sidebar-border bg-sidebar/80 px-4 py-3 text-sm font-semibold text-sidebar-foreground/80 transition hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
              collapsed && 'justify-center px-3'
            )}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings className="size-5" />
            {!collapsed && <span>Settings</span>}
          </Link>

          {!collapsed && (
            <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 text-sm text-sidebar-foreground/80">
              <p className="font-semibold">Admin Panel</p>
              <p className="text-xs text-sidebar-foreground/60">
                Manage system settings and monitor activity
              </p>
            </div>
          )}
          {onToggle && (
            <button
              className="mt-3 w-full rounded-xl border border-sidebar-border p-2 text-xs font-semibold text-sidebar-foreground/70 hover:bg-sidebar-accent/60 transition-colors"
              onClick={onToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="size-4 mx-auto" /> : <ChevronLeft className="size-4 mx-auto" />}
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}

'use client'

import { useState } from 'react'
import { RecruiterSidebar } from './recruiter-sidebar'
import { RecruiterTopbar } from './recruiter-topbar'

export function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground">
      <RecruiterSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <RecruiterTopbar onToggleSidebar={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto bg-background px-4 py-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}

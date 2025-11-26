'use client'

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar isMobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto bg-background px-4 py-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}


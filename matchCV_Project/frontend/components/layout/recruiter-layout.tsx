'use client'

import { useContext, useState } from 'react'
import { RecruiterSidebar } from './recruiter-sidebar'
import { RecruiterTopbar } from './recruiter-topbar'
import { AuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const auth = useContext(AuthContext)
  const banned = auth?.user?.role === 'recruiter' && auth.user?.isActive === false

  return (
    <div className="flex h-screen bg-background text-foreground">
      <RecruiterSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <RecruiterTopbar onToggleSidebar={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto bg-background px-4 py-6 lg:px-8">
          {children}
        </div>

        {banned && (
          <div className="pointer-events-auto absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
            <div className="w-full max-w-lg space-y-4 rounded-3xl bg-card p-6 shadow-2xl shadow-black/30">
              <h2 className="text-xl font-semibold text-destructive">Tài khoản đã bị ban</h2>
              <p className="text-sm text-muted-foreground">
                Email này đã bị khóa quyền Recruiter. Vui lòng liên hệ admin để mở lại hoặc dùng tài khoản khác.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => auth?.logout?.()}>
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

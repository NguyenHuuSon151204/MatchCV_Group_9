'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ToastProvider, useToastContext } from '@/contexts/toast-context'
import { ToastContainer } from '@/components/ui/toast'
import { AuthProvider } from '@/contexts/AuthContext'

function ToastContainerWrapper({ children }: { children: React.ReactNode }) {
  const toast = useToastContext()

  return (
    <>
      {children}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <ToastContainerWrapper>{children}</ToastContainerWrapper>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}


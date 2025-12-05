'use client'

import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/routes/app-router'
import { AuthProvider } from '@/contexts/AuthContext'

export default function AppPage() {
  const Router = appRouter()
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  )
}



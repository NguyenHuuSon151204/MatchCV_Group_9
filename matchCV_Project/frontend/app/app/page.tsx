'use client'

import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/routes/app-router'

export default function AppPage() {
  return <RouterProvider router={appRouter} />
}



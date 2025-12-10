'use client'

import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/routes/app-router'
import { useState, useEffect, useMemo } from 'react'


export default function AppPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [router, setRouter] = useState<ReturnType<typeof appRouter> | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setRouter(appRouter());
  }, []);

  if (!isMounted || !router) return null; // Prevent hydration mismatch

  return (
    <RouterProvider router={router} />
  )
}



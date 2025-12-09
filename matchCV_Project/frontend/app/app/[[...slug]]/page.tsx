'use client'

import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/routes/app-router'
import { useState, useEffect, useMemo } from 'react'


export default function AppPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    setRouter(appRouter());
  }, []);

  if (!isMounted || !router) return null; // Prevent hydration mismatch

  return (
    <RouterProvider router={router} />
  )
}



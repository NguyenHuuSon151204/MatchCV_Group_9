'use client'

import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/main-layout'
import { DashboardPage } from '@/features/candidate/dashboard/dashboard-page'
import { MyCVsPage } from '@/features/candidate/my-cvs/my-cvs-page'
import { JDAnalyzerPage } from '@/features/candidate/jd-analyzer/jd-analyzer-page'
import { AIRewritePage } from '@/features/candidate/ai-rewrite/ai-rewrite-page'
import { ExportPage } from '@/features/candidate/export/export-page'
import { SettingsPage } from '@/features/candidate/settings/settings-page'
import { JobSearchPage } from '@/features/candidate/jobs/job-search-page'
import { JobDetailsPage } from '@/features/candidate/jobs/job-details-page'
import { PostJobPage } from '@/features/admin/jobs/post-job-page'
import LiveCVBuilder from '@/src/components/LiveCV/LiveCVBuilder'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Login from '@/components/auth/Login'

export function appRouter(){
  return createBrowserRouter(
  [
    {
      path: "/auth",
      children: [
        { path: "login", element: <Login /> }
      ]
    },
    {
      element: <ProtectedRoute />,   // ⬅ Protect everything inside
      children: [
        {
          path: '/app',
          element: <MainLayout />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'my-cvs', element: <MyCVsPage /> },
            { path: 'jd-analyzer', element: <JDAnalyzerPage /> },
            { path: 'ai-rewrite', element: <AIRewritePage /> },
            { path: 'export', element: <ExportPage /> },
            { path: 'settings', element: <SettingsPage /> },
            { path: 'jobs', element: <JobSearchPage /> },
            { path: 'jobs/:jobId', element: <JobDetailsPage /> },
            { path: 'post-job', element: <PostJobPage /> },
          ],
        },
      ],
    },

    // Also protect CV Builder
    {
      path: '/app/cv-builder',
      element: <ProtectedRoute />,
      children: [
        { index: true, element: <LiveCVBuilder /> }
      ],
    },
  ])
} 
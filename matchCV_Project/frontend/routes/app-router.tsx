'use client'

import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/main-layout'
import { DashboardPage } from '@/features/candidate/dashboard/dashboard-page'
import { MyCVsPage } from '@/features/candidate/my-cvs/my-cvs-page'
import { JDAnalyzerPage } from '@/features/candidate/jd-analyzer/jd-analyzer-page'
import { AIRewritePage } from '@/features/candidate/ai-rewrite/ai-rewrite-page'
import { ExportPage } from '@/features/candidate/export/export-page'
import { SettingsPage } from '@/features/candidate/settings/settings-page'
import { JobSearchPage } from '@/features/candidate/jobs/job-search-page'
import { JobDetailsPage } from '@/features/candidate/jobs/job-details-page'
import { SavedJDsPage } from '@/features/candidate/saved-jds/saved-jds-page'
import { AppliedJobsPage } from '@/features/candidate/jobs/applied-jobs-page'
import { JobsHubPage } from '@/features/candidate/jobs/jobs-hub-page'
import { PostJobPage } from '@/features/admin/jobs/post-job-page'
import LiveCVBuilder from '@/src/components/LiveCV/LiveCVBuilder'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Login from '@/components/auth/Login'

export function appRouter() {
  return createBrowserRouter(
    [
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/app",
        element: <ProtectedRoute />,
        errorElement: <div>Application Error in /app</div>,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: 'dashboard', element: <DashboardPage /> },
              { path: 'my-cvs', element: <MyCVsPage /> },
              { path: 'jd-analyzer', element: <JDAnalyzerPage /> },
              { path: 'ai-rewrite', element: <AIRewritePage /> },
              { path: 'export', element: <ExportPage /> },
              { path: 'settings', element: <SettingsPage /> },
              { path: 'jobs-hub', element: <JobsHubPage /> },
              { path: 'jobs', element: <JobSearchPage /> },
              { path: 'jobs/:jobId', element: <JobDetailsPage /> },
              { path: 'saved-jds', element: <SavedJDsPage /> },
              { path: 'applied-jobs', element: <AppliedJobsPage /> },
              { path: 'post-job', element: <PostJobPage /> },
            ]
          },
          {
            path: 'cv-builder',
            element: <LiveCVBuilder />
          }
        ],
      },
      {
        path: "*",
        element: <div>404 Not Found (Router Catch-All)</div>
      }
    ])
} 

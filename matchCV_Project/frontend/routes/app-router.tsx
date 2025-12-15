'use client'

import { createBrowserRouter, createMemoryRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/main-layout'
import { DashboardPage } from '@/features/candidate/dashboard/dashboard-page'
import { MyCVsPage } from '@/features/candidate/my-cvs/my-cvs-page'
import { JDAnalyzerPage } from '@/features/candidate/jd-analyzer/jd-analyzer-page'
import { AIRewritePage } from '@/features/candidate/ai-rewrite/ai-rewrite-page'
import { SettingsPage } from '@/features/candidate/settings/settings-page'
import { JobSearchPage } from '@/features/candidate/jobs/job-search-page'
import { JobDetailsPage } from '@/features/candidate/jobs/job-details-page'
import { JobsHubPage } from '@/features/candidate/jobs/jobs-hub-page'
import { AppliedJobsPage } from '@/features/candidate/jobs/applied-jobs-page'
import { SavedJDsPage } from '@/features/candidate/saved-jds/saved-jds-page'
import { PostJobPage } from '@/features/admin/jobs/post-job-page'
import LiveCVBuilder from '@/src/components/LiveCV/LiveCVBuilder'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Login from '@/components/auth/Login'
import { RouterErrorBoundary } from '@/components/common/router-error'

const routes = [
  {
    path: '/auth',
    children: [{ path: 'login', element: <Login /> }],
  },
  {
    element: <ProtectedRoute />, // Protect everything inside
    children: [
      {
        path: '/app',
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'my-cvs', element: <MyCVsPage /> },
          { path: 'jd-analyzer', element: <JDAnalyzerPage /> },
          { path: 'ai-rewrite', element: <AIRewritePage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'jobs', element: <JobsHubPage /> },
          { path: 'jobs/find', element: <JobSearchPage /> },
          { path: 'jobs/saved', element: <SavedJDsPage /> },
          { path: 'jobs/applied', element: <AppliedJobsPage /> },
          { path: 'jobs/:jobId', element: <JobDetailsPage /> },
          { path: 'post-job', element: <PostJobPage /> },
        ],
        errorElement: <RouterErrorBoundary />,
      },
      // Also protect CV Builder
      {
        path: '/app/cv-builder',
        children: [{ index: true, element: <LiveCVBuilder /> }],
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: '*',
        element: <RouterErrorBoundary />,
      },
    ],
    errorElement: <RouterErrorBoundary />,
  },
  {
    path: '*',
    element: <Navigate to="/app" replace />,
  },
]

export function appRouter() {
  const useBrowser = typeof document !== 'undefined'
  const serverInitialEntries = ['/app']
  return useBrowser
    ? createBrowserRouter(routes)
    : createMemoryRouter(routes, { initialEntries: serverInitialEntries })
}

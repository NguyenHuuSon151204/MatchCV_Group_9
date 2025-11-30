import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/main-layout'
import { DashboardPage } from '@/features/dashboard/dashboard-page'
import { MyCVsPage } from '@/features/my-cvs/my-cvs-page'
import { JDAnalyzerPage } from '@/features/jd-analyzer/jd-analyzer-page'
import { AIRewritePage } from '@/features/ai-rewrite/ai-rewrite-page'
import { ExportPage } from '@/features/export/export-page'
import { SettingsPage } from '@/features/settings/settings-page'
import { JobSearchPage } from '@/features/jobs/job-search-page'
import { PostJobPage } from '@/features/jobs/post-job-page'
import LiveCVBuilder from '@/src/components/LiveCV/LiveCVBuilder'

export const appRouter = createBrowserRouter([
  {
    path: '/',
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
      { path: 'post-job', element: <PostJobPage /> },
    ],
  },
  {
    path: '/cv-builder',
    element: <LiveCVBuilder />,
  },
])


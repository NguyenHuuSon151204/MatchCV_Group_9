import { Suspense } from 'react'
import { JobManagementPage } from '@/features/recruiter/jobs/job-management-page'
import { RecruiterLayout } from '@/components/layout/recruiter-layout'

export default function RecruiterJobsPage() {
  return (
    <RecruiterLayout>
      <Suspense fallback={<div className="p-6 text-muted-foreground">Loading jobs...</div>}>
        <JobManagementPage />
      </Suspense>
    </RecruiterLayout>
  )
}

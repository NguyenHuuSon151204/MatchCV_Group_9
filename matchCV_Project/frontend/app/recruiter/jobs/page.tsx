import { JobManagementPage } from '@/features/recruiter/jobs/job-management-page'
import { RecruiterLayout } from '@/components/layout/recruiter-layout'

export default function RecruiterJobsPage() {
  return (
    <RecruiterLayout>
      <JobManagementPage />
    </RecruiterLayout>
  )
}

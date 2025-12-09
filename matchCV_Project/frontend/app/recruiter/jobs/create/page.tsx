import { JobCreatePage } from '@/features/recruiter/jobs/job-create-page'
import { RecruiterLayout } from '@/components/layout/recruiter-layout'

export default function RecruiterJobCreatePage() {
  return (
    <RecruiterLayout>
      <JobCreatePage />
    </RecruiterLayout>
  )
}

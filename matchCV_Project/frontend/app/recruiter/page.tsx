import { RecruiterDashboardPage } from '@/features/recruiter/dashboard/recruiter-dashboard-page'
import { RecruiterLayout } from '@/components/layout/recruiter-layout'

export default function RecruiterPage() {
  return (
    <RecruiterLayout>
      <RecruiterDashboardPage />
    </RecruiterLayout>
  )
}

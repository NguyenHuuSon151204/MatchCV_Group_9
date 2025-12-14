import { RecruiterManagementPage } from '@/features/admin/recruiters/recruiter-management-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function AdminRecruitersPage() {
  return (
    <AdminLayout>
      <RecruiterManagementPage />
    </AdminLayout>
  )
}

import { CandidateManagementPage } from '@/features/admin/candidates/candidate-management-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function AdminCandidatesPage() {
  return (
    <AdminLayout>
      <CandidateManagementPage />
    </AdminLayout>
  )
}


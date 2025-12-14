import { VerificationManagementPage } from '@/features/admin/verification/verification-management-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function AdminVerificationsPage() {
  return (
    <AdminLayout>
      <VerificationManagementPage />
    </AdminLayout>
  )
}

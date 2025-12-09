import { LicenseManagementPage } from '@/features/admin/licenses/license-management-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function AdminLicensesPage() {
  return (
    <AdminLayout>
      <LicenseManagementPage />
    </AdminLayout>
  )
}

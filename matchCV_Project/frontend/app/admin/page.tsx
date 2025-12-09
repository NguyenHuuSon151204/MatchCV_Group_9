import { AdminDashboardPage } from '@/features/admin/dashboard/admin-dashboard-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboardPage />
    </AdminLayout>
  )
}

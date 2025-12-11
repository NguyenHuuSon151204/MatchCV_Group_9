import { AdminJobManagementPage } from '@/features/admin/jobs/admin-job-management-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function AdminJobsPage() {
  return (
    <AdminLayout>
      <AdminJobManagementPage />
    </AdminLayout>
  )
}


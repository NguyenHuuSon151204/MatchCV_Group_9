import { SystemConfigurationPage } from '@/features/admin/config/system-configuration-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function AdminConfigPage() {
  return (
    <AdminLayout>
      <SystemConfigurationPage />
    </AdminLayout>
  )
}

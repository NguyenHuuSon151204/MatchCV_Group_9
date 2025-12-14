import { AdminApplicantManagementPage } from '@/features/admin/applicants/admin-applicant-management-page'
import { AdminLayout } from '@/components/layout/admin-layout'

export default function ApplicantsPage() {
    return (
        <AdminLayout>
            <AdminApplicantManagementPage />
        </AdminLayout>
    )
}

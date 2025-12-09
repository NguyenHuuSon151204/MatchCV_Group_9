# Migration Guide: Client → Frontend

Hướng dẫn migration các pages từ `client/` sang `frontend/` đã được Next.js hóa.

## Cấu trúc đã tạo

### ✅ Đã hoàn thành:

1. **Services:**
   - `frontend/lib/services/admin-service.ts` - API service cho admin
   - `frontend/lib/services/recruiter-service.ts` - API service cho recruiter

2. **Features:**
   - `frontend/features/admin/dashboard/admin-dashboard-page.tsx` - Admin Dashboard
   - `frontend/features/recruiter/dashboard/recruiter-dashboard-page.tsx` - Recruiter Dashboard
   - `frontend/features/recruiter/jobs/job-management-page.tsx` - Job Management
   - `frontend/features/recruiter/applicants/applicants-page.tsx` - Applicants Management

3. **Routes:**
   - `frontend/app/admin/page.tsx` - Route cho admin dashboard
   - `frontend/app/recruiter/page.tsx` - Route cho recruiter dashboard
   - `frontend/app/recruiter/jobs/page.tsx` - Route cho job management
   - `frontend/app/recruiter/applicants/page.tsx` - Route cho applicants

## Các pages cần migrate

### Admin Pages (từ `client/src/pages/`):

1. ✅ **AdminDashboard.jsx** → `features/admin/dashboard/admin-dashboard-page.tsx` (Đã xong)
2. ⏳ **JobManagement.jsx** → `features/admin/jobs/job-management-page.tsx` (Có thể dùng chung với recruiter)
3. ⏳ **Applicants.jsx** → `features/admin/applicants/applicants-page.tsx` (Có thể dùng chung với recruiter)
4. ✅ **RecruiterManagement.jsx** → `features/admin/recruiters/recruiter-management-page.tsx` (Đã xong)
5. ✅ **LicenseManagement.jsx** → `features/admin/licenses/license-management-page.tsx` (Đã xong)
6. ✅ **ReportsAnalytics.jsx** → `features/admin/reports/reports-analytics-page.tsx` (Đã xong)
7. ✅ **AuditLog.jsx** → `features/admin/audit-log/audit-log-page.tsx` (Đã xong)
8. ✅ **AIStatus.jsx** → `features/admin/ai-status/ai-status-page.tsx` (Đã xong)
9. ✅ **SystemConfiguration.jsx** → `features/admin/config/system-configuration-page.tsx` (Đã xong)
10. ✅ **VerificationManagement.jsx** → `features/admin/verification/verification-management-page.tsx` (Đã xong)

### Recruiter Pages (từ `client/src/pages/`):

1. ✅ **RecruiterDashboard.jsx** → `features/recruiter/dashboard/recruiter-dashboard-page.tsx` (Đã xong)
2. ✅ **JobManagement.jsx** → `features/recruiter/jobs/job-management-page.tsx` (Đã xong)
3. ⏳ **JobCreate.jsx** → `features/recruiter/jobs/job-create-page.tsx`
4. ⏳ **JobDetail.jsx** → `features/recruiter/jobs/job-detail-page.tsx`
5. ✅ **JobEdit.jsx** → `features/recruiter/jobs/job-edit-page.tsx` (Đã xong)
6. ✅ **Applicants.jsx** → `features/recruiter/applicants/applicants-page.tsx` (Đã xong)
7. ✅ **RecruiterVerification.jsx** → `features/recruiter/verification/recruiter-verification-page.tsx` (Đã xong)

## Quy trình migration

### Bước 1: Tạo feature page mới

1. Tạo file trong `frontend/features/[admin|recruiter]/[feature-name]/[page-name]-page.tsx`
2. Convert từ `.jsx` sang `.tsx`
3. Thêm `'use client'` directive ở đầu file
4. Import từ `@/lib/services/[admin|recruiter]-service` thay vì `../services/api`

### Bước 2: Convert code

**Thay đổi chính:**

```typescript
// ❌ Cũ (client)
import api from '../services/api'
import { Link } from 'react-router-dom'
import './Page.css'

// ✅ Mới (frontend)
'use client'
import { adminService } from '@/lib/services/admin-service'
import Link from 'next/link'
// CSS: Dùng Tailwind classes thay vì CSS files
```

**Routing:**

```typescript
// ❌ Cũ
import { useNavigate, useSearchParams } from 'react-router-dom'
const navigate = useNavigate()
navigate('/path')

// ✅ Mới
import { useRouter, useSearchParams } from 'next/navigation'
const router = useRouter()
router.push('/path')
```

**Styling:**

```typescript
// ❌ Cũ
<div className="page-header">
  <h1 className="page-title">Title</h1>
</div>

// ✅ Mới (Tailwind)
<div className="mb-6">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

### Bước 3: Tạo Next.js route

Tạo file trong `frontend/app/[path]/page.tsx`:

```typescript
import { FeaturePage } from '@/features/[admin|recruiter]/[feature]/[page]-page'

export default function Page() {
  return <FeaturePage />
}
```

### Bước 4: Update navigation

Cập nhật sidebar/navigation để dùng Next.js Link thay vì React Router Link.

## Lưu ý quan trọng

1. **API Client:** Frontend đã có `api-client.ts` với BaseResponseDto unwrapping. Services mới nên dùng `adminService` hoặc `recruiterService`.

2. **TypeScript:** Tất cả files mới phải là `.tsx` với proper types.

3. **Styling:** 
   - Không import CSS files từ client
   - Dùng Tailwind CSS classes
   - Có thể tạo component-specific styles nếu cần

4. **Components:** 
   - Layout components có thể cần migrate hoặc tái sử dụng
   - Check `frontend/components/` trước khi tạo mới

5. **Contexts:** 
   - Theme context có thể cần migrate
   - Check `frontend/contexts/` hoặc `frontend/components/providers/`

## Testing

Sau khi migrate mỗi page:

1. Test navigation đến page
2. Test API calls
3. Test form submissions
4. Test filtering/sorting
5. Test responsive design

## Next Steps

1. Migrate các pages quan trọng nhất trước (JobManagement, Applicants)
2. Migrate các pages còn lại theo thứ tự ưu tiên
3. Update navigation/sidebar
4. Test toàn bộ flow
5. Clean up client folder sau khi migration hoàn tất

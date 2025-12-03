# Module Xác Thực Nhà Tuyển Dụng (Recruiter Verification)

## Tổng Quan

Module này cho phép hệ thống xác thực nhà tuyển dụng (recruiters) để đảm bảo họ thực sự thuộc về công ty mà họ đại diện. Module bao gồm:

- Kiểm tra thông tin công ty (tên, email, số điện thoại)
- Xác nhận email công ty và số điện thoại
- Upload và quản lý tài liệu pháp lý (giấy phép kinh doanh, giấy tờ chứng minh công ty)
- Quy trình duyệt: Pending → Approved/Rejected
- Logging đầy đủ các hành động

## Cấu Trúc Database

### Bảng RecruiterVerifications

```sql
CREATE TABLE RecruiterVerifications (
    Id                          INT IDENTITY(1,1) PRIMARY KEY,
    RecruiterId                 INT             NOT NULL,
    CompanyName                 NVARCHAR(200)    NOT NULL,
    CompanyEmail                NVARCHAR(250)    NOT NULL,
    CompanyPhone                NVARCHAR(50)     NULL,
    CompanyAddress              NVARCHAR(200)    NULL,
    TaxCode                     NVARCHAR(50)     NULL,
    BusinessLicenseDocumentId   INT              NULL,
    CompanyProofDocumentId      INT              NULL,
    Status                      NVARCHAR(30)    NOT NULL DEFAULT 'Pending',
    AdminNotes                  NVARCHAR(500)    NULL,
    ReviewedByAdminId           INT              NULL,
    ReviewedAt                  DATETIME2       NULL,
    CreatedAt                   DATETIME2        NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt                   DATETIME2        NULL
)
```

**Trạng thái (Status):**
- `Pending`: Đang chờ duyệt
- `Approved`: Đã được duyệt
- `Rejected`: Bị từ chối

## Backend Components

### 1. Model (`RecruiterVerification.cs`)
- Model class với đầy đủ navigation properties
- Liên kết với User (Recruiter và Admin)
- Liên kết với Documents (BusinessLicense và CompanyProof)

### 2. Service (`RecruiterVerificationService.cs`)
**Chức năng:**
- `SaveVerificationDocumentAsync`: Lưu file tài liệu với tên file an toàn
- `ValidateCompanyEmailAsync`: Kiểm tra email công ty có khớp với tên công ty không
- `ValidateCompanyPhoneAsync`: Kiểm tra định dạng số điện thoại
- `GenerateSecureFileNameAsync`: Tạo tên file an toàn (timestamp + GUID)
- `IsValidDocumentType`: Kiểm tra loại file hợp lệ (PDF, JPG, PNG, DOC, DOCX)
- `IsValidDocumentSize`: Kiểm tra kích thước file (tối đa 10MB)

**Bảo mật:**
- File được lưu với tên ngẫu nhiên để tránh truy cập trực tiếp
- Tính toán SHA256 hash cho mỗi file
- Validate file type và size trước khi lưu

### 3. Controller (`RecruiterVerificationController.cs`)
**Endpoints:**

#### Cho Recruiter:
- `POST /api/recruiter-verification/submit` - Gửi yêu cầu xác thực
- `GET /api/recruiter-verification/status?recruiterId={id}` - Xem trạng thái
- `GET /api/recruiter-verification/{id}` - Xem chi tiết

#### Cho Admin:
- `GET /api/recruiter-verification/admin/pending` - Danh sách chờ duyệt
- `GET /api/recruiter-verification/admin/all?status={status}` - Tất cả requests
- `PUT /api/recruiter-verification/admin/{id}/status?adminId={id}` - Duyệt/từ chối

### 4. Validator (`RecruiterVerificationValidator.cs`)
- Validation cho `SubmitVerificationRequest`
- Validation cho `UpdateVerificationStatusRequest`
- Sử dụng FluentValidation

### 5. Logging
- Tất cả actions được log vào `AdminLogs` table
- Bao gồm: SubmitVerification, VerificationApproved, VerificationRejected
- Lưu metadata dưới dạng JSON

## Frontend Components

### 1. Recruiter Verification Page (`RecruiterVerification.jsx`)
**Chức năng:**
- Form nhập thông tin công ty
- Upload tài liệu (Business License và/hoặc Company Proof)
- Hiển thị trạng thái verification
- Cho phép resubmit nếu bị reject

**Routes:**
- `/verification` - Trang chính cho recruiter

### 2. Verification Management Page (`VerificationManagement.jsx`)
**Chức năng:**
- Admin xem danh sách tất cả verification requests
- Filter theo status (Pending, Approved, Rejected)
- Xem chi tiết từng request
- Approve/Reject với ghi chú

**Routes:**
- `/admin/verifications` - Trang quản lý cho admin

## Cấu Hình

### appsettings.json
```json
{
  "FileStorage": {
    "VerificationPath": "uploads/verifications"
  }
}
```

### Program.cs
Service đã được đăng ký:
```csharp
builder.Services.AddScoped<IRecruiterVerificationService, RecruiterVerificationService>();
```

## Quy Trình Sử Dụng

### 1. Recruiter Submit Verification
1. Recruiter truy cập `/verification`
2. Điền thông tin công ty (tên, email, phone, address, tax code)
3. Upload ít nhất 1 tài liệu (Business License hoặc Company Proof)
4. Submit → Status = "Pending"

### 2. Admin Review
1. Admin truy cập `/admin/verifications`
2. Xem danh sách requests đang chờ
3. Click "View" để xem chi tiết
4. Click "Review" để approve/reject
5. Nhập ghi chú (nếu cần)
6. Submit → Status = "Approved" hoặc "Rejected"

### 3. Recruiter Check Status
1. Recruiter truy cập `/verification`
2. Xem trạng thái hiện tại
3. Nếu Approved: Hiển thị thông báo thành công
4. Nếu Rejected: Hiển thị lý do và cho phép resubmit

## Bảo Mật

### File Upload
- ✅ Validate file type (chỉ PDF, JPG, PNG, DOC, DOCX)
- ✅ Validate file size (tối đa 10MB)
- ✅ Tên file được hash và timestamp để tránh conflict
- ✅ File được lưu trong thư mục riêng biệt
- ✅ Tính toán SHA256 hash cho mỗi file

### Validation
- ✅ Email format validation
- ✅ Email domain matching với company name (basic)
- ✅ Phone number format validation
- ✅ Required fields validation

### Authorization
- ⚠️ **Lưu ý**: Hiện tại chưa có authentication middleware
- ⚠️ Cần thêm `[Authorize]` attributes cho các endpoints
- ⚠️ Cần kiểm tra role (Recruiter/Admin) trước khi cho phép truy cập

## Migration

Chạy script SQL migration:
```sql
-- Xem file: RecruiterVerification_Migration.sql
```

## API Examples

### Submit Verification
```http
POST /api/recruiter-verification/submit?recruiterId=1
Content-Type: multipart/form-data

companyName: "Acme Corporation"
companyEmail: "hr@acme.com"
companyPhone: "+84123456789"
businessLicenseFile: [file]
companyProofFile: [file]
```

### Get Status
```http
GET /api/recruiter-verification/status?recruiterId=1
```

### Admin Approve
```http
PUT /api/recruiter-verification/admin/1/status?adminId=1
Content-Type: application/json

{
  "status": "Approved",
  "adminNotes": "Documents verified successfully"
}
```

## TODO / Cải Tiến

1. **Authentication & Authorization**
   - Thêm JWT authentication
   - Thêm `[Authorize]` attributes
   - Kiểm tra role trước khi cho phép actions

2. **Email Validation**
   - Cải thiện domain matching logic
   - Có thể tích hợp với email verification service

3. **File Storage**
   - Có thể chuyển sang cloud storage (Azure Blob, S3)
   - Thêm virus scanning

4. **Notifications**
   - Gửi email khi verification được approve/reject
   - Thông báo cho recruiter khi status thay đổi

5. **UI/UX**
   - Thêm progress indicator khi upload file
   - Preview file trước khi submit
   - Drag & drop file upload

6. **Testing**
   - Unit tests cho service
   - Integration tests cho controller
   - E2E tests cho frontend

## Files Created/Modified

### Backend
- ✅ `matchCV_Project/Models/RecruiterVerification.cs` (NEW)
- ✅ `matchCV_Project/Models/Document.cs` (MODIFIED - thêm navigation properties)
- ✅ `matchCV_Project/Models/User.cs` (MODIFIED - thêm navigation properties)
- ✅ `matchCV_Project/Data/AppDbContext.cs` (MODIFIED - thêm DbSet và configuration)
- ✅ `matchCV_Project/Interfaces/IRecruiterVerificationService.cs` (NEW)
- ✅ `matchCV_Project/Services/RecruiterVerificationService.cs` (NEW)
- ✅ `matchCV_Project/Controllers/RecruiterVerificationController.cs` (NEW)
- ✅ `matchCV_Project/Validators/RecruiterVerificationValidator.cs` (NEW)
- ✅ `matchCV_Project/Program.cs` (MODIFIED - đăng ký service)
- ✅ `matchCV_Project/appsettings.json` (MODIFIED - thêm FileStorage config)

### Frontend
- ✅ `client/src/pages/RecruiterVerification.jsx` (NEW)
- ✅ `client/src/pages/RecruiterVerification.css` (NEW)
- ✅ `client/src/pages/VerificationManagement.jsx` (NEW)
- ✅ `client/src/pages/VerificationManagement.css` (NEW)
- ✅ `client/src/App.jsx` (MODIFIED - thêm routes)

### Database
- ✅ `RecruiterVerification_Migration.sql` (NEW)

## Kết Luận

Module Recruiter Verification đã được xây dựng đầy đủ với:
- ✅ Backend: Model, Controller, Service, Validator, Logging
- ✅ Frontend: Form submit, Status tracking, Admin management
- ✅ Security: File validation, secure storage, input validation
- ✅ Database: Migration script và schema design

Module sẵn sàng để tích hợp vào hệ thống sau khi chạy migration script và thêm authentication middleware.


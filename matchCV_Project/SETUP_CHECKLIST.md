# Checklist Sau Khi Chạy Database Migration

## ✅ Đã Hoàn Thành

- [x] Database migration script đã chạy thành công
- [x] Bảng `RecruiterVerifications` đã được tạo
- [x] Triggers đã được tạo
- [x] Backend models và services đã được tạo
- [x] Frontend components đã được tạo
- [x] Routes đã được thêm vào App.jsx
- [x] Sidebar menu items đã được thêm

## 🔧 Các Bước Tiếp Theo

### 1. Build và Test Backend

```bash
# Di chuyển vào thư mục backend
cd matchCV_Project

# Build project
dotnet build

# Chạy project (nếu chưa chạy)
dotnet run
```

**Kiểm tra:**
- ✅ Project build thành công không có errors
- ✅ API có thể truy cập tại `http://localhost:5000` hoặc port được cấu hình
- ✅ Swagger UI có thể truy cập (nếu Development mode)

### 2. Test API Endpoints

Sử dụng Swagger UI hoặc Postman để test các endpoints:

#### Endpoints cho Recruiter:
- `POST /api/recruiter-verification/submit?recruiterId=1`
  - Test với FormData (multipart/form-data)
  - Gửi company info + files

- `GET /api/recruiter-verification/status?recruiterId=1`
  - Kiểm tra trả về status

#### Endpoints cho Admin:
- `GET /api/recruiter-verification/admin/pending`
  - Xem danh sách pending requests

- `GET /api/recruiter-verification/admin/all`
  - Xem tất cả requests

- `PUT /api/recruiter-verification/admin/{id}/status?adminId=1`
  - Test approve/reject

### 3. Build và Test Frontend

```bash
# Di chuyển vào thư mục client
cd client

# Cài đặt dependencies (nếu chưa)
npm install

# Chạy development server
npm run dev
```

**Kiểm tra:**
- ✅ Frontend chạy không có errors
- ✅ Có thể truy cập `/verification` (Recruiter page)
- ✅ Có thể truy cập `/admin/verifications` (Admin page)
- ✅ Sidebar có menu items mới

### 4. Test Chức Năng Cơ Bản

#### Test Recruiter Verification Flow:

1. **Truy cập `/verification`**
   - ✅ Form hiển thị đúng
   - ✅ Có thể nhập thông tin công ty
   - ✅ Có thể chọn file upload
   - ✅ Validation hoạt động (required fields, file type, file size)

2. **Submit Verification Request**
   - ✅ Submit thành công
   - ✅ Status hiển thị "Pending"
   - ✅ Files được upload và lưu vào `uploads/verifications/`

3. **Xem Status**
   - ✅ Hiển thị thông tin công ty
   - ✅ Hiển thị documents đã upload
   - ✅ Hiển thị status hiện tại

#### Test Admin Verification Management:

1. **Truy cập `/admin/verifications`**
   - ✅ Danh sách verification requests hiển thị
   - ✅ Có thể filter theo status
   - ✅ Có thể sort các cột

2. **Xem Chi Tiết**
   - ✅ Click "View" hiển thị modal với đầy đủ thông tin
   - ✅ Hiển thị documents

3. **Approve/Reject**
   - ✅ Click "Review" mở form
   - ✅ Có thể chọn Approved hoặc Rejected
   - ✅ Có thể nhập admin notes
   - ✅ Submit thành công
   - ✅ Status được cập nhật

4. **Kiểm tra Logging**
   - ✅ Kiểm tra bảng `AdminLogs` có records mới
   - ✅ Logs có đầy đủ thông tin (Actor, Action, Entity, MetaJson)

### 5. Kiểm Tra Database

```sql
-- Kiểm tra bảng đã được tạo
SELECT * FROM RecruiterVerifications;

-- Kiểm tra triggers
SELECT * FROM sys.triggers WHERE name LIKE '%RecruiterVerification%';

-- Kiểm tra foreign keys
SELECT 
    fk.name AS ForeignKey,
    tp.name AS ParentTable,
    cp.name AS ParentColumn,
    tr.name AS ReferencedTable,
    cr.name AS ReferencedColumn
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tp ON fkc.parent_object_id = tp.object_id
INNER JOIN sys.columns cp ON fkc.parent_object_id = cp.object_id AND fkc.parent_column_id = cp.column_id
INNER JOIN sys.tables tr ON fkc.referenced_object_id = tr.object_id
INNER JOIN sys.columns cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id
WHERE tp.name = 'RecruiterVerifications';
```

### 6. Kiểm Tra File Storage

```bash
# Kiểm tra thư mục uploads
ls -la matchCV_Project/uploads/verifications/

# Hoặc trên Windows
dir matchCV_Project\uploads\verifications\
```

**Kiểm tra:**
- ✅ Thư mục `uploads/verifications/` đã được tạo
- ✅ Files được lưu với tên an toàn (có timestamp và GUID)
- ✅ Files có thể đọc được

### 7. Test Edge Cases

- [ ] Submit với file quá lớn (>10MB) → Phải báo lỗi
- [ ] Submit với file type không hợp lệ → Phải báo lỗi
- [ ] Submit không có file nào → Phải báo lỗi
- [ ] Submit khi đã có pending request → Phải báo lỗi
- [ ] Admin approve/reject khi status không phải Pending → Phải báo lỗi
- [ ] Xóa document đang được reference → Trigger phải set NULL

### 8. Cải Thiện (Optional)

- [ ] Thêm authentication middleware
- [ ] Thêm role-based access control
- [ ] Thêm email notifications khi status thay đổi
- [ ] Thêm file preview trước khi submit
- [ ] Thêm progress indicator khi upload
- [ ] Thêm pagination cho admin page
- [ ] Thêm search/filter nâng cao

## 🐛 Troubleshooting

### Lỗi: "Cannot find the object 'dbo.RecruiterVerifications'"
- **Nguyên nhân**: Bảng chưa được tạo hoặc migration chưa chạy
- **Giải pháp**: Chạy lại migration script

### Lỗi: "Multiple cascade paths"
- **Nguyên nhân**: Foreign key constraints conflict
- **Giải pháp**: Đã được sửa trong migration script (dùng NO ACTION + triggers)

### Lỗi: "File upload failed"
- **Nguyên nhân**: Thư mục uploads chưa được tạo hoặc không có quyền
- **Giải pháp**: Tạo thư mục `uploads/verifications/` và cấp quyền write

### Lỗi: "Service not registered"
- **Nguyên nhân**: Service chưa được đăng ký trong Program.cs
- **Giải pháp**: Đã được thêm, kiểm tra lại Program.cs

## 📝 Notes

- **File Storage Path**: Mặc định là `uploads/verifications/` (có thể thay đổi trong appsettings.json)
- **Max File Size**: 10MB
- **Allowed File Types**: PDF, JPG, JPEG, PNG, DOC, DOCX
- **Status Values**: Pending, Approved, Rejected

## ✅ Khi Nào Coi Là Hoàn Thành?

- [x] Database migration chạy thành công
- [ ] Backend build và chạy không lỗi
- [ ] Frontend build và chạy không lỗi
- [ ] Có thể submit verification request
- [ ] Có thể xem status verification
- [ ] Admin có thể approve/reject
- [ ] Files được lưu đúng
- [ ] Logs được ghi đúng

---

**Chúc bạn test thành công! 🎉**


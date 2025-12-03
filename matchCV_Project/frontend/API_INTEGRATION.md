# API Integration Guide - MatchCV Frontend

## ✅ Đã sửa các vấn đề kết nối Frontend - Backend

### 1. **API Client Interceptor** (`lib/services/api-client.ts`)
- ✅ Tự động unwrap `BaseResponseDto<T>` từ backend (structure: `{ Success, Message, Data, Errors }`)
- ✅ Tự động thêm `userId` vào query params từ localStorage
- ✅ Xử lý lỗi và authentication

### 2. **CV Service** (`lib/services/cv-service.ts`)
- ✅ Đã map routes để match với backend:
  - `GET /api/cv/user/{userId}` → Lấy danh sách CV
  - `GET /api/cv/{id}?userId={userId}` → Lấy CV theo ID
  - `POST /api/cv/create?userId={userId}` → Tạo CV mới
  - `PUT /api/cv/{id}?userId={userId}` → Cập nhật CV
  - `DELETE /api/cv/{id}?userId={userId}` → Xóa CV
  - `POST /api/cv/upload?userId={userId}&id={id}` → Upload file
  - `POST /api/cv/analyze/{id}?userId={userId}` → Phân tích CV bằng AI

- ✅ Mapping `DocumentDto` (backend) → `CV` (frontend)
- ✅ Mapping `AnalysisResultDto` (backend) → `AnalyzeResult` (frontend)
- ✅ Fallback về mock data nếu backend không khả dụng

### 3. **Cấu hình Backend**
- Backend chạy tại: `http://localhost:5185` (HTTP) hoặc `https://localhost:7233` (HTTPS)
- API base URL: `http://localhost:5185/api` hoặc `https://localhost:7233/api`

## 🔧 Cách test

### Bước 1: Set User ID trong localStorage
Trước khi test, cần set userId trong browser console:
```javascript
localStorage.setItem('matchcv-userId', '1') // Thay 1 bằng userId thực tế
```

### Bước 2: Chạy Backend
```bash
cd matchCV_Project
dotnet run
```
Backend sẽ chạy tại: `http://localhost:5185` hoặc `https://localhost:7233`

### Bước 3: Chạy Frontend
```bash
cd frontend
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:3000`

### Bước 4: Kiểm tra kết nối
1. Mở browser DevTools (F12)
2. Vào tab Network để xem API calls
3. Vào tab Console để xem logs

## 📝 Lưu ý

### Backend Response Format
Backend trả về `BaseResponseDto<T>`:
```json
{
  "Success": true,
  "Message": "Success message",
  "Data": { ... },
  "Errors": []
}
```

Frontend interceptor tự động unwrap và trả về `Data` trực tiếp.

### DocumentDto → CV Mapping
- `Id` → `id` (convert to string)
- `OriginalName` → `name`
- `DocType` → `position`
- `FileName` → `description`
- `UpdatedAt` → `modifiedAt`
- `Status` → `status` (mapped: Draft→draft, Analyzed→analyzed, etc.)
- `TotalScore` → `score`

### AnalysisResultDto → AnalyzeResult Mapping
- `Score` → `score`
- `Evidence` (string) → `evidence` (array)
- `Skills` → `suggestions` (mapped to skill names)

## 🐛 Troubleshooting

### Lỗi: "User ID not found"
- **Giải pháp**: Set `localStorage.setItem('matchcv-userId', '1')` trong console

### Lỗi: CORS
- **Giải pháp**: Backend đã có CORS policy "AllowAll", kiểm tra lại `Program.cs`

### Lỗi: 404 Not Found
- **Giải pháp**: Kiểm tra backend đang chạy và route đúng
- Kiểm tra Swagger: `http://localhost:5185/swagger`

### Lỗi: 401 Unauthorized
- **Giải pháp**: Set token nếu có: `localStorage.setItem('matchcv-token', 'your-token')`

### Frontend fallback về mock data
- **Nguyên nhân**: Backend không khả dụng hoặc lỗi API
- **Kiểm tra**: Xem console logs để biết lỗi cụ thể

## 📊 API Endpoints Summary

| Frontend Call | Backend Endpoint | Method | Notes |
|--------------|------------------|--------|-------|
| `getCVs()` | `/api/cv/user/{userId}` | GET | userId từ localStorage |
| `getCV(id)` | `/api/cv/{id}?userId={userId}` | GET | |
| `createCV()` | `/api/cv/create?userId={userId}` | POST | Body: `{ OriginalName, DocType }` |
| `updateCV()` | `/api/cv/{id}?userId={userId}` | PUT | Body: `{ OriginalName, DocType }` |
| `deleteCV(id)` | `/api/cv/{id}?userId={userId}` | DELETE | |
| `uploadCV(id, file)` | `/api/cv/upload?userId={userId}&id={id}` | POST | FormData với file |
| `analyzeCV(id)` | `/api/cv/analyze/{id}?userId={userId}` | POST | |

## 🎯 Next Steps

1. ✅ API integration đã hoàn tất
2. ⏳ Test với backend thực tế
3. ⏳ Thêm authentication flow nếu cần
4. ⏳ Thêm error handling UI tốt hơn
5. ⏳ Thêm loading states


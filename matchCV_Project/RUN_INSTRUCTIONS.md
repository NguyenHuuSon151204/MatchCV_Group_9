# 🚀 Hướng dẫn Chạy MatchCV Project

## 📋 Yêu cầu

- .NET 8 SDK
- Visual Studio 2022 hoặc VS Code
- SQL Server (hoặc đã có database setup)
- Backend API đã được cấu hình

## 🔧 Bước 1: Setup Backend

### 1.1. Kiểm tra Connection String

Mở `matchCV_Project/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=MatchCVDb;User Id=sa;Password=123;"
  }
}
```

### 1.2. Chạy Backend

```bash
cd matchCV_Project
dotnet restore
dotnet build
dotnet run
```

Backend sẽ chạy tại:
- **HTTPS**: `https://localhost:7233`
- **HTTP**: `http://localhost:5185`
- **Swagger**: `https://localhost:7233/swagger`

### 1.3. Kiểm tra Backend

Mở browser và truy cập:
- Swagger UI: `https://localhost:7233/swagger`
- Test endpoint: `https://localhost:7233/api/cv/user/1`

## 🔧 Bước 2: Setup Frontend (HTML/CSS)

### 2.1. Frontend Location

Frontend nằm trong thư mục `matchcv-frontend/` - sử dụng HTML/CSS/JavaScript thuần (không cần build).

### 2.2. Cấu hình API Address

Mở `matchcv-frontend/js/main.js` và cập nhật API base URL:

```javascript
const API_BASE_URL = 'https://localhost:7233/api'; // Hoặc URL backend của bạn
```

**Lưu ý**: Port phải khớp với backend!

### 2.3. Không cần Build

Frontend HTML/CSS thuần không cần build step, chỉ cần mở file hoặc dùng HTTP server.

## 🚀 Bước 3: Chạy Application

### Option 1: Visual Studio (Backend) + Browser (Frontend)

1. **Chạy Backend:**
   - Set `matchCV_Project` làm Startup Project
   - Nhấn **F5** hoặc **Ctrl+F5**

2. **Chạy Frontend:**
   - Mở file `matchcv-frontend/index.html` bằng trình duyệt
   - Hoặc dùng Live Server extension trong VS Code

### Option 2: Command Line (2 Terminals)

**Terminal 1 - Backend:**
```bash
cd matchCV_Project
dotnet run
```

**Terminal 2 - Frontend (HTTP Server):**
```bash
cd matchcv-frontend
python -m http.server 8000
# Hoặc: npx http-server
```

Sau đó mở browser: `http://localhost:8000`

### Option 3: Visual Studio Code

1. Mở 2 terminals trong VS Code
2. Terminal 1: `cd matchCV_Project && dotnet run`
3. Terminal 2: `cd matchcv-frontend && python -m http.server 8000`
4. Mở browser: `http://localhost:8000`

## 🌐 Bước 4: Truy cập Application

Sau khi backend và frontend chạy:

- **Frontend**: `http://localhost:8000` (hoặc port bạn chọn cho HTTP server)
- **Backend API**: `https://localhost:7233` hoặc `http://localhost:5185`
- **Swagger**: `https://localhost:7233/swagger`

## ✅ Kiểm tra Hoạt động

### 1. Kiểm tra Backend
- [ ] Swagger UI mở được
- [ ] Test GET `/api/cv/user/1` trả về data hoặc empty array
- [ ] Không có lỗi trong console

### 2. Kiểm tra Frontend
- [ ] Giao diện dark theme hiển thị đúng
- [ ] Sidebar navigation hoạt động
- [ ] My CVs page load được
- [ ] Không có lỗi CORS trong browser console (F12)

### 3. Test Chức năng

#### Test Create CV
1. Click "Create New CV"
2. Nhập CV Name
3. Click "Create"
4. Kiểm tra CV xuất hiện trong danh sách

#### Test Upload CV
1. Click "Upload CV"
2. Chọn file PDF hoặc DOCX
3. Nhập CV Name
4. Click "Upload"
5. Kiểm tra CV được tạo và file được upload

#### Test Analyze
1. Click icon Analyze trên một CV
2. Đợi analysis hoàn thành
3. Kiểm tra AI Score được cập nhật

#### Test Delete
1. Click icon Delete trên một CV
2. Confirm delete
3. Kiểm tra CV bị xóa khỏi danh sách

## 🐛 Troubleshooting

### Lỗi CORS

**Triệu chứng**: Browser console hiển thị CORS error

**Giải pháp**:
1. Kiểm tra backend `Program.cs` có `app.UseCors("AllowAll")`
2. Đảm bảo CORS policy được add trước `app.MapControllers()`
3. Restart backend

### Lỗi Connection Refused

**Triệu chứng**: Frontend không kết nối được backend

**Giải pháp**:
1. Kiểm tra backend đang chạy
2. Kiểm tra port trong `appsettings.json` khớp với backend
3. Kiểm tra firewall không block port

### Lỗi HTTPS Certificate

**Triệu chứng**: Browser warning về certificate

**Giải pháp**:
```bash
# Trust development certificate
dotnet dev-certs https --trust
```

### Lỗi Build

**Triệu chứng**: `dotnet build` fails

**Giải pháp**:
```bash
# Clean và rebuild
dotnet clean
dotnet restore
dotnet build
```

### Lỗi Database Connection

**Triệu chứng**: Backend không kết nối được database

**Giải pháp**:
1. Kiểm tra SQL Server đang chạy
2. Kiểm tra connection string trong `appsettings.json`
3. Kiểm tra database đã được tạo chưa
4. Chạy migration nếu cần

### Lỗi File Upload

**Triệu chứng**: Upload file fails

**Giải pháp**:
1. Kiểm tra file size < 10MB
2. Kiểm tra file type là PDF hoặc DOCX
3. Kiểm tra folder `wwwroot/uploads` tồn tại
4. Kiểm tra permissions

## 📊 Kiểm tra Logs

### Backend Logs
- Xem trong console/terminal nơi chạy backend
- Logs hiển thị requests, errors, file operations

### Frontend Logs
- Mở Browser DevTools (F12)
- Tab Console: Xem JavaScript errors
- Tab Network: Xem API requests/responses

## 🔍 Debug Mode

### Backend Debug
1. Set breakpoint trong `CVController.cs`
2. Attach debugger trong Visual Studio
3. Make request từ frontend hoặc Swagger

### Frontend Debug
1. Mở Browser DevTools (F12)
2. Set breakpoint trong `js/main.js`
3. Interact với UI để trigger breakpoints
4. Xem Network tab để debug API calls

## 📝 Notes

1. **Development Mode**: CORS cho phép tất cả origins (không dùng cho production)

2. **User ID**: Hiện hardcode `userId = 1`. Trong production cần implement authentication.

3. **File Storage**: Files được lưu trong `wwwroot/uploads/{userId}/`

4. **Ports**: 
   - Backend: 7233 (HTTPS), 5185 (HTTP)
   - Frontend: 8000 (hoặc port bạn chọn cho HTTP server)

5. **Hot Reload**: 
   - Backend: Restart required khi thay đổi code
   - Frontend: Refresh browser để xem thay đổi (hoặc dùng Live Server để auto-reload)

## 🎯 Next Steps

Sau khi chạy thành công:
1. Test tất cả CRUD operations
2. Test file upload với các file types khác nhau
3. Test AI analysis
4. Implement authentication
5. Deploy lên server

---

**Chúc bạn thành công! 🎉**


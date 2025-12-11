# MatchCV Frontend - HTML/CSS Guide

## 🎯 Frontend Architecture

Dự án MatchCV hiện sử dụng **HTML + CSS + JavaScript thuần** (không dùng framework) cho frontend.

### 📁 Cấu trúc Frontend

```
matchcv-frontend/
├── index.html          # Trang My CVs - Trang chính
├── css/
│   └── style.css       # Stylesheet với dark theme
├── js/
│   └── main.js         # Logic JavaScript cho CRUD operations
└── README.md           # Hướng dẫn chi tiết
```

## 🚀 Cách chạy Frontend

### Option 1: Mở trực tiếp
```bash
# Mở file index.html bằng trình duyệt
# Hoặc double-click vào file
```

### Option 2: Live Server (VS Code)
1. Cài extension "Live Server"
2. Right-click vào `index.html`
3. Chọn "Open with Live Server"

### Option 3: HTTP Server
```bash
# Python 3
cd matchcv-frontend
python -m http.server 8000

# Node.js (npx)
cd matchcv-frontend
npx http-server

# Sau đó mở: http://localhost:8000
```

## 🔌 Tích hợp với Backend API

### Backend Endpoints

Frontend sẽ gọi các API endpoints từ `.NET Backend`:

- `GET /api/cv/user/{userId}` - Lấy danh sách CV
- `GET /api/cv/{id}` - Lấy CV theo ID
- `POST /api/cv` - Tạo CV mới
- `POST /api/cv/{id}/upload` - Upload file CV
- `POST /api/cv/{id}/analyze` - Phân tích CV
- `DELETE /api/cv/{id}` - Xóa CV

### Cấu hình API Base URL

Trong `js/main.js`, cập nhật:

```javascript
const API_BASE_URL = 'https://localhost:7000/api'; // Hoặc URL backend của bạn
```

### Ví dụ tích hợp API

```javascript
// Trong main.js
async function loadCVs(userId = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}/cv/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch CVs');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading CVs:', error);
        alert('Error loading CVs. Please try again.');
        return [];
    }
}
```

## 🎨 Customization

### Thay đổi màu sắc

Sửa các biến CSS trong `css/style.css`:

```css
:root {
    --accent-primary: #6C63FF;  /* Màu chính */
    --bg-primary: #0F0D16;      /* Background chính */
    --bg-card: #1E1B29;          /* Background card */
    --text-primary: #E0E0E0;     /* Màu chữ chính */
}
```

### Thêm trang mới

1. Tạo file HTML mới (ví dụ: `dashboard.html`)
2. Copy structure từ `index.html`
3. Cập nhật sidebar navigation để link đến trang mới
4. Tạo CSS và JS riêng nếu cần

## 📱 Responsive Design

- **Desktop (>1200px)**: Sidebar + Main + Insights (3 cột)
- **Tablet (768px-1200px)**: Sidebar collapse, Main + Insights (2 cột)
- **Mobile (<768px)**: Sidebar ẩn, Main full width, Insights bên dưới

## 🔧 Development Tips

1. **Debug**: Mở DevTools (F12) để xem console logs
2. **CORS**: Đảm bảo backend đã enable CORS cho frontend domain
3. **HTTPS**: Nếu backend dùng HTTPS, frontend cũng nên dùng HTTPS hoặc proxy

## 📝 Notes

- Frontend hiện tại là **static HTML**, không cần build step
- Dễ dàng deploy lên bất kỳ static hosting nào (GitHub Pages, Netlify, Vercel)
- Code sẵn sàng để tích hợp API .NET backend
- Không cần npm/yarn, không cần framework dependencies

## 🆚 So sánh với Blazor (đã không dùng)

| Feature | HTML/CSS (Hiện tại) | Blazor (Cũ) |
|---------|---------------------|-------------|
| Setup | Đơn giản, mở file | Cần .NET SDK, build |
| Dependencies | Không có | MudBlazor, .NET packages |
| Performance | Nhanh, tải ngay | Cần compile, download DLLs |
| Deployment | Static hosting | Cần .NET runtime |
| Learning curve | HTML/CSS/JS cơ bản | Cần biết C#/Razor |

**Lý do chọn HTML/CSS thuần:**
- ✅ Đơn giản, dễ maintain
- ✅ Không cần build step
- ✅ Deploy dễ dàng
- ✅ Performance tốt
- ✅ Dễ customize


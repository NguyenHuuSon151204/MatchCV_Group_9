# MatchCV - HTML/CSS Frontend

Giao diện HTML + CSS thuần cho trang **My CVs** của hệ thống MatchCV - Job Recruitment System.

## 📁 Cấu trúc thư mục

```
matchcv-frontend/
├── index.html          # Trang My CVs chính
├── css/
│   └── style.css       # Stylesheet với dark theme
├── js/
│   └── main.js         # Logic render data và xử lý modal
└── README.md           # File này
```

## 🎨 Thiết kế

- **Theme**: Dark mode hiện đại
- **Màu sắc chính**:
  - Background: `#0F0D16`
  - Card: `#1E1B29`
  - Accent: `#6C63FF` (tím)
  - Text: `#E0E0E0`
- **Font**: Inter (Google Fonts)
- **Layout**: Sidebar trái + Main content + Insights sidebar phải

## 🚀 Cách chạy

### Option 1: Mở trực tiếp
1. Mở file `index.html` bằng trình duyệt
2. Hoặc dùng Live Server extension trong VS Code

### Option 2: Dùng HTTP Server
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx http-server

# Sau đó mở: http://localhost:8000
```

## ✨ Tính năng

### ✅ Đã hoàn thành
- ✅ Sidebar navigation với menu items
- ✅ Header với search box và action buttons
- ✅ Bảng danh sách CV với đầy đủ thông tin
- ✅ Status badges với màu sắc theo trạng thái
- ✅ AI Score hiển thị dạng vòng tròn progress
- ✅ AI Insights card (Average Score, Top Skills)
- ✅ Activity Summary card
- ✅ Modal Create New CV
- ✅ Modal Upload CV (với drag & drop)
- ✅ Responsive design
- ✅ Animations và transitions mượt mà

### 🔄 Dữ liệu mẫu
Hiện tại sử dụng dummy data trong `main.js`. Để tích hợp API thật:

1. Thay thế `cvs` array bằng API call:
```javascript
async function loadCVs() {
    const response = await fetch('/api/cv/user/1');
    const data = await response.json();
    return data;
}
```

2. Cập nhật các action functions (`analyzeCV`, `rewriteCV`, `exportCV`) để gọi API thật.

## 🔌 Tích hợp API

### Endpoints cần tích hợp:
- `GET /api/cv/user/{userId}` - Lấy danh sách CV
- `POST /api/cv` - Tạo CV mới
- `POST /api/cv/{id}/upload` - Upload file CV
- `POST /api/cv/{id}/analyze` - Phân tích CV
- `DELETE /api/cv/{id}` - Xóa CV

### Ví dụ tích hợp:
```javascript
// Trong main.js
const API_BASE_URL = 'https://your-api-url.com/api';

async function fetchCVs(userId = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}/cv/user/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching CVs:', error);
        return [];
    }
}
```

## 📱 Responsive

- **Desktop**: Sidebar + Main + Insights (3 cột)
- **Tablet**: Sidebar collapse, Main + Insights (2 cột)
- **Mobile**: Sidebar ẩn, Main full width, Insights bên dưới

## 🎯 Status Colors

- **Draft**: Đỏ (`#ff4d4f`)
- **Analyzed**: Xanh (`#00c853`)
- **Submitted**: Vàng (`#fbc02d`)
- **Activating**: Tím (`#6C63FF`)

## 📝 Notes

- Code hoàn toàn tĩnh, không cần build tool
- Sẵn sàng để tích hợp API .NET backend
- Dễ dàng customize màu sắc và layout
- Comment rõ ràng trong code

## 🔧 Customization

### Thay đổi màu sắc:
Sửa các biến CSS trong `css/style.css`:
```css
:root {
    --accent-primary: #6C63FF;  /* Màu chính */
    --bg-primary: #0F0D16;      /* Background */
    --bg-card: #1E1B29;          /* Card background */
}
```

### Thêm menu item:
Thêm vào sidebar trong `index.html`:
```html
<a href="#" class="nav-item">
    <span class="nav-icon">🔔</span>
    <span class="nav-text">Notifications</span>
</a>
```

## 📄 License

Dự án MatchCV - Internal use only.


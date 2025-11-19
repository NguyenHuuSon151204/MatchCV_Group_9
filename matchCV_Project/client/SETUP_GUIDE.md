# Hướng dẫn Setup và Chạy MatchCV React App

## 📚 Giải thích về React.js

### React.js là gì?
React.js là một **JavaScript library** (thư viện) được Facebook phát triển để xây dựng **User Interface (UI)** cho web applications.

**Ưu điểm của React:**
- ✅ **Component-based**: Code được chia nhỏ thành các components có thể tái sử dụng
- ✅ **Virtual DOM**: Render nhanh hơn bằng cách chỉ update phần thay đổi
- ✅ **Unidirectional Data Flow**: Data flow một chiều, dễ debug
- ✅ **Ecosystem lớn**: Nhiều thư viện hỗ trợ (React Router, Axios, etc.)

### Các khái niệm cơ bản:

#### 1. **Component**
Component giống như một "khối xây dựng" của UI. Ví dụ:
- `Sidebar` component = thanh menu bên trái
- `TopBar` component = thanh trên cùng
- `Dashboard` component = trang dashboard

#### 2. **JSX (JavaScript XML)**
JSX cho phép viết HTML trong JavaScript:
```jsx
// Thay vì:
const element = React.createElement('div', null, 'Hello')

// Ta viết:
const element = <div>Hello</div>
```

#### 3. **State (Trạng thái)**
State lưu trữ dữ liệu có thể thay đổi của component:
```jsx
const [jobs, setJobs] = useState([]) // jobs là state, setJobs là hàm để thay đổi
```

#### 4. **Props (Properties)**
Props là dữ liệu truyền từ component cha sang component con:
```jsx
<Layout children={...} /> // children là prop
```

#### 5. **Hooks**
Hooks cho phép sử dụng state và lifecycle trong functional components:
- `useState`: Quản lý state
- `useEffect`: Thực hiện side effects (gọi API, subscribe, etc.)

---

## 🏗️ Cấu trúc Project đã tạo

### 1. **Entry Point: `main.jsx`**
```jsx
// File này là điểm bắt đầu của app
// Nó render App component vào <div id="root"> trong index.html
```

### 2. **App Component: `App.jsx`**
```jsx
// Component chính, định nghĩa routing (điều hướng trang)
// Sử dụng React Router để chuyển giữa các trang
```

### 3. **Layout Component: `Layout.jsx`**
```jsx
// Layout chung cho tất cả các trang
// Bao gồm: Sidebar (menu trái) + TopBar (thanh trên) + Content (nội dung)
```

### 4. **Pages (Các trang)**
- **Dashboard.jsx**: Trang dashboard với thống kê
- **JobListings.jsx**: Trang quản lý jobs
- **Applicants.jsx**: Trang quản lý applicants
- **AdminDashboard.jsx**: Trang admin

### 5. **Services: `api.js`**
```jsx
// Service layer để gọi API đến backend
// Sử dụng Axios để gửi HTTP requests
// Có interceptors để xử lý authentication, errors
```

### 6. **Styling**
- Mỗi component có file CSS riêng
- Sử dụng CSS Variables để dễ customize theme
- Responsive design

---

## 🛠️ Công cụ cần cài đặt

### 1. **Node.js** (Bắt buộc)
- **Tải về**: https://nodejs.org/
- **Chọn version**: LTS (Long Term Support) - khuyến nghị
- **Kiểm tra cài đặt**:
```bash
node --version
npm --version
```

### 2. **Code Editor** (Khuyến nghị)
- **Visual Studio Code**: https://code.visualstudio.com/
- **Extensions hữu ích**:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

### 3. **Git** (Tùy chọn)
- Để quản lý version control
- https://git-scm.com/

---

## 🚀 Hướng dẫn chạy Project

### Bước 1: Cài đặt Dependencies

Mở Terminal/Command Prompt/PowerShell và chạy:

```bash
# Di chuyển vào thư mục client
cd client

# Cài đặt tất cả packages (React, React Router, Axios, etc.)
npm install
```

**Giải thích**: `npm install` sẽ đọc file `package.json` và tải về tất cả các thư viện cần thiết vào thư mục `node_modules/`.

### Bước 2: Chạy Development Server

```bash
# Vẫn trong thư mục client
npm run dev
```

**Kết quả**: 
- Server sẽ chạy trên `http://localhost:3000`
- Mở browser và vào địa chỉ trên
- **Hot Reload**: Khi bạn sửa code, trang sẽ tự động reload

### Bước 3: Chạy Backend (ASP.NET Core)

Mở một Terminal/Command Prompt khác:

```bash
# Di chuyển vào thư mục backend
cd matchCV_Project

# Chạy backend (tùy vào cách bạn setup)
dotnet run
# Hoặc
dotnet watch run
```

**Kết quả**: Backend sẽ chạy trên `http://localhost:5000` (hoặc port khác)

### Bước 4: Kiểm tra

1. **Frontend (React)**: http://localhost:3000
2. **Backend (API)**: http://localhost:5000
3. **API Proxy**: React app sẽ tự động forward requests từ `/api/*` đến backend

---

## 📦 Giải thích các Packages đã cài

### Dependencies (Production)

1. **react** & **react-dom**
   - Core React library
   - `react-dom` để render React vào DOM

2. **react-router-dom**
   - Routing library cho React
   - Cho phép điều hướng giữa các trang (SPA - Single Page Application)

3. **axios**
   - HTTP client để gọi API
   - Thay thế cho `fetch()` với nhiều tính năng hơn

### DevDependencies (Development)

1. **vite**
   - Build tool nhanh, hiện đại
   - Thay thế cho Create React App
   - Hot Module Replacement (HMR) - reload nhanh khi code thay đổi

2. **@vitejs/plugin-react**
   - Plugin để Vite hiểu JSX/React

3. **@types/react** & **@types/react-dom**
   - TypeScript types (nếu dùng TypeScript sau này)

---

## 🔧 Các Scripts trong package.json

```json
{
  "scripts": {
    "dev": "vite",           // Chạy development server
    "build": "vite build",   // Build production (tạo file tối ưu)
    "preview": "vite preview" // Preview production build
  }
}
```

**Cách dùng**:
```bash
npm run dev      # Development
npm run build    # Build production
npm run preview  # Preview build
```

---

## 🌐 Cách hoạt động của Proxy

Trong `vite.config.js`:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

**Giải thích**:
- Khi React app gọi `/api/recruiter/jobs`
- Vite sẽ tự động forward đến `http://localhost:5000/api/recruiter/jobs`
- Giúp tránh CORS issues trong development

---

## 📁 Cấu trúc File chi tiết

```
client/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.jsx       # Layout chính
│   │   ├── Sidebar.jsx      # Menu bên trái
│   │   ├── TopBar.jsx       # Thanh trên cùng
│   │   └── *.css            # Styles cho components
│   │
│   ├── pages/               # Các trang
│   │   ├── Dashboard.jsx    # Trang dashboard
│   │   ├── JobListings.jsx  # Trang jobs
│   │   ├── Applicants.jsx  # Trang applicants
│   │   └── *.css            # Styles cho pages
│   │
│   ├── services/            # API services
│   │   └── api.js           # Axios configuration
│   │
│   ├── App.jsx              # Main app component (routing)
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # Documentation
```

---

## 🐛 Troubleshooting

### Lỗi: "npm: command not found"
**Giải pháp**: Cài đặt Node.js từ https://nodejs.org/

### Lỗi: "Port 3000 already in use"
**Giải pháp**: 
```bash
# Sửa port trong vite.config.js
server: {
  port: 3001  # Đổi sang port khác
}
```

### Lỗi: "Cannot connect to backend"
**Giải pháp**: 
1. Kiểm tra backend có đang chạy không
2. Kiểm tra port trong `vite.config.js` có đúng không
3. Kiểm tra CORS settings trong backend

### Lỗi: "Module not found"
**Giải pháp**: 
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

---

## 📝 Next Steps

1. ✅ Cài đặt Node.js
2. ✅ Chạy `npm install` trong thư mục `client`
3. ✅ Chạy `npm run dev` để start React app
4. ✅ Chạy backend ASP.NET Core
5. ✅ Mở browser và test

---

## 💡 Tips

- **Hot Reload**: Sửa code → Lưu → Browser tự động reload
- **React DevTools**: Cài extension Chrome để debug React components
- **Console**: Mở DevTools (F12) để xem logs và errors
- **Network Tab**: Kiểm tra API calls trong DevTools → Network

---

## ❓ Câu hỏi thường gặp

**Q: Tại sao cần 2 servers (React + Backend)?**
A: Trong development, tách biệt frontend và backend giúp:
- Develop độc lập
- Hot reload nhanh hơn
- Dễ debug

**Q: Production thì sao?**
A: Build React app (`npm run build`) và serve static files từ ASP.NET Core `wwwroot/`

**Q: Có thể dùng Create React App không?**
A: Có, nhưng Vite nhanh hơn và hiện đại hơn.

---

Chúc bạn code vui vẻ! 🚀





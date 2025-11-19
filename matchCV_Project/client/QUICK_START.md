# 🚀 Quick Start Guide

## Bước 1: Cài đặt Node.js
Tải và cài đặt từ: https://nodejs.org/ (chọn bản LTS)

Kiểm tra:
```bash
node --version
npm --version
```

## Bước 2: Cài đặt Dependencies
```bash
cd client
npm install
```

## Bước 3: Chạy React App
```bash
npm run dev
```
→ Mở browser: http://localhost:3000

## Bước 4: Chạy Backend (Terminal khác)
```bash
cd matchCV_Project
dotnet run
```
→ Backend chạy trên: http://localhost:5000

## ✅ Xong! 
React app sẽ tự động kết nối với backend qua proxy.

---

## 📖 Giải thích ngắn gọn

### React.js là gì?
- **Library JavaScript** để xây dựng UI
- **Component-based**: Code chia nhỏ thành các components
- **Reactive**: Tự động update UI khi data thay đổi

### Cấu trúc đã tạo:
```
client/
├── src/
│   ├── components/    → Sidebar, TopBar, Layout
│   ├── pages/         → Dashboard, JobListings, Applicants
│   ├── services/      → API service (gọi backend)
│   └── App.jsx        → Routing
```

### Cách hoạt động:
1. User mở browser → React app load
2. User click menu → React Router chuyển trang
3. Page load → Gọi API qua `api.js`
4. Backend trả data → React render UI

---

Xem file `SETUP_GUIDE.md` để biết chi tiết hơn!





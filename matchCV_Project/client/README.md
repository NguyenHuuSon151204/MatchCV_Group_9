# MatchCV React Client

Frontend React application cho MatchCV project.

## Setup

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Build cho production:
```bash
npm run build
```

## Cấu trúc

- `src/components/` - Reusable components (Layout, Sidebar, TopBar)
- `src/pages/` - Page components (Dashboard, JobListings, Applicants)
- `src/services/` - API service layer
- `src/index.css` - Global styles

## Backend API

Backend chạy trên `http://localhost:5000` (hoặc port khác tùy cấu hình ASP.NET Core).

Vite proxy đã được cấu hình để forward `/api/*` requests đến backend.

## Notes

- React Router được sử dụng cho routing
- Axios được sử dụng cho API calls
- CSS variables được định nghĩa trong `index.css` cho theming


# 📝 Giải thích Code Chi Tiết

## 🎯 Tổng quan

Project này sử dụng **React.js** để xây dựng frontend, thay thế cho HTML/CSS/JS thuần. React giúp:
- Code dễ quản lý hơn (component-based)
- UI tự động update khi data thay đổi
- Dễ maintain và mở rộng

---

## 📂 Giải thích từng File

### 1. **main.jsx** - Entry Point

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

**Giải thích**:
- `ReactDOM.createRoot()`: Tạo root để render React app
- `BrowserRouter`: Bọc App để enable routing (điều hướng URL)
- `React.StrictMode`: Chế độ strict để phát hiện lỗi sớm
- Render `<App />` vào `<div id="root">` trong `index.html`

**Luồng hoạt động**:
1. Browser load `index.html`
2. Script load `main.jsx`
3. React render `App` component
4. App render các pages dựa trên URL

---

### 2. **App.jsx** - Routing

```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<JobListings />} />
      </Routes>
    </Layout>
  )
}
```

**Giải thích**:
- `<Layout>`: Component bao bọc tất cả pages (có Sidebar + TopBar)
- `<Routes>`: Container cho các routes
- `<Route>`: Định nghĩa mapping giữa URL và Component
  - `path="/"` → Hiển thị `<Dashboard />`
  - `path="/jobs"` → Hiển thị `<JobListings />`

**Ví dụ**:
- User vào `http://localhost:3000/` → Hiển thị Dashboard
- User vào `http://localhost:3000/jobs` → Hiển thị JobListings

---

### 3. **Layout.jsx** - Layout Chính

```jsx
function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  )
}
```

**Giải thích**:
- `{ children }`: Props đặc biệt, nhận component con được truyền vào
- Khi `<Layout><Dashboard /></Layout>`, thì `children = <Dashboard />`
- Layout luôn có Sidebar (trái) + TopBar (trên) + Content (giữa)

**Cấu trúc**:
```
┌─────────┬──────────────────┐
│ Sidebar │ TopBar           │
│         ├──────────────────┤
│         │ {children}       │
│         │ (Dashboard, etc) │
└─────────┴──────────────────┘
```

---

### 4. **Sidebar.jsx** - Menu Navigation

```jsx
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => 
        `nav-link ${isActive ? 'active' : ''}`
      }>
        Dashboard
      </NavLink>
    </aside>
  )
}
```

**Giải thích**:
- `NavLink`: Component từ React Router, tự động highlight khi active
- `isActive`: Prop cho biết link có đang active không
- Khi click → React Router chuyển trang (không reload page)

**So sánh với HTML thuần**:
```html
<!-- HTML thuần -->
<a href="/dashboard">Dashboard</a>  <!-- Reload page -->

<!-- React Router -->
<NavLink to="/dashboard">Dashboard</NavLink>  <!-- Không reload -->
```

---

### 5. **Dashboard.jsx** - Trang Dashboard

```jsx
import { useEffect, useState } from 'react'
import api from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalRecruiters: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const data = await api.get('/admin/summary')
      setStats({
        totalCandidates: data.totals?.users || 0,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stat-value">{stats.totalCandidates}</div>
    </div>
  )
}
```

**Giải thích từng phần**:

#### **useState Hook**:
```jsx
const [stats, setStats] = useState({ totalCandidates: 0 })
```
- `stats`: Giá trị hiện tại của state
- `setStats`: Hàm để thay đổi state
- Khi `setStats()` được gọi → Component tự động re-render

**Ví dụ**:
```jsx
// Ban đầu: stats = { totalCandidates: 0 }
setStats({ totalCandidates: 100 })
// Sau đó: stats = { totalCandidates: 100 }
// → UI tự động update hiển thị 100
```

#### **useEffect Hook**:
```jsx
useEffect(() => {
  loadDashboardData()
}, [])
```
- Chạy function sau khi component mount (render lần đầu)
- `[]`: Dependency array rỗng = chỉ chạy 1 lần
- Dùng để: Gọi API, subscribe events, etc.

**So sánh với JavaScript thuần**:
```js
// JavaScript thuần
window.addEventListener('DOMContentLoaded', () => {
  loadData()
})

// React
useEffect(() => {
  loadData()
}, [])
```

#### **Async/Await**:
```jsx
const loadDashboardData = async () => {
  const data = await api.get('/admin/summary')
  setStats(data)
}
```
- `async`: Function bất đồng bộ
- `await`: Đợi API response
- Tương đương với `.then()` nhưng dễ đọc hơn

---

### 6. **api.js** - API Service

```jsx
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

**Giải thích**:
- `axios.create()`: Tạo instance với config mặc định
- `baseURL: '/api'`: Tự động thêm `/api` vào mọi request
- `interceptors`: Middleware để xử lý request/response
  - Request interceptor: Thêm token vào header
  - Response interceptor: Xử lý errors

**Cách dùng**:
```jsx
// Thay vì:
fetch('/api/recruiter/jobs')
  .then(res => res.json())
  .then(data => ...)

// Ta viết:
const data = await api.get('/recruiter/jobs')
```

---

### 7. **JobListings.jsx** - Trang Jobs

```jsx
const [jobs, setJobs] = useState([])
const [filters, setFilters] = useState({ search: '' })

const loadJobs = async () => {
  const params = new URLSearchParams()
  if (filters.search) params.append('q', filters.search)
  const data = await api.get(`/recruiter/jobs?${params}`)
  setJobs(data)
}

return (
  <div>
    <input 
      value={filters.search}
      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
    />
    <table>
      {jobs.map(job => (
        <tr key={job.id}>
          <td>{job.title}</td>
        </tr>
      ))}
    </table>
  </div>
)
```

**Giải thích**:

#### **Controlled Input**:
```jsx
<input 
  value={filters.search}
  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
/>
```
- `value={filters.search}`: Input hiển thị giá trị từ state
- `onChange`: Khi user gõ → Update state
- React quản lý toàn bộ input (controlled component)

#### **Array.map()**:
```jsx
{jobs.map(job => (
  <tr key={job.id}>
    <td>{job.title}</td>
  </tr>
))}
```
- `map()`: Tạo array mới từ array cũ
- Mỗi `job` → Tạo 1 `<tr>`
- `key={job.id}`: React cần key để optimize re-render

**So sánh với JavaScript thuần**:
```js
// JavaScript thuần
const rows = jobs.map(job => {
  return `<tr><td>${job.title}</td></tr>`
})
document.getElementById('table').innerHTML = rows.join('')

// React
{jobs.map(job => <tr><td>{job.title}</td></tr>)}
```

---

## 🔄 Data Flow

### Luồng dữ liệu trong React:

```
1. User Action (click, type, etc.)
   ↓
2. Event Handler (onClick, onChange)
   ↓
3. Update State (setState)
   ↓
4. React Re-render Component
   ↓
5. UI Update
```

**Ví dụ cụ thể**:
```jsx
// 1. User gõ vào input
<input onChange={(e) => {
  // 2. Event handler chạy
  setFilters({ search: e.target.value })
  // 3. State update
}} />

// 4. React tự động re-render
// 5. Input hiển thị giá trị mới
```

---

## 🆚 So sánh React vs HTML thuần

### HTML/JS thuần:
```html
<!-- HTML -->
<div id="jobs"></div>

<script>
  // JavaScript
  async function loadJobs() {
    const res = await fetch('/api/jobs')
    const jobs = await res.json()
    const html = jobs.map(j => `<div>${j.title}</div>`).join('')
    document.getElementById('jobs').innerHTML = html
  }
  loadJobs()
</script>
```

**Vấn đề**:
- Phải tự quản lý DOM
- Phải tự update HTML khi data thay đổi
- Code dễ bị rối khi app lớn

### React:
```jsx
// React Component
function Jobs() {
  const [jobs, setJobs] = useState([])
  
  useEffect(() => {
    api.get('/jobs').then(setJobs)
  }, [])
  
  return (
    <div>
      {jobs.map(j => <div key={j.id}>{j.title}</div>)}
    </div>
  )
}
```

**Ưu điểm**:
- React tự quản lý DOM
- Tự động update khi state thay đổi
- Code rõ ràng, dễ maintain

---

## 🎨 Styling

### CSS Modules / Component CSS:
```jsx
// JobListings.jsx
import './JobListings.css'

// JobListings.css
.job-listings { ... }
```

**Ưu điểm**:
- CSS scoped cho component
- Dễ quản lý
- Không conflict với component khác

### CSS Variables:
```css
:root {
  --accent: #3b82f6;
  --text-main: #111827;
}

.button {
  background: var(--accent);
  color: var(--text-main);
}
```

**Ưu điểm**:
- Dễ thay đổi theme
- Consistent colors
- Dễ maintain

---

## 🚀 Build & Deploy

### Development:
```bash
npm run dev
```
- Chạy trên `localhost:3000`
- Hot reload
- Source maps (dễ debug)

### Production:
```bash
npm run build
```
- Tạo folder `dist/` với files đã optimize
- Minify JS/CSS
- Tree shaking (loại bỏ code không dùng)

### Deploy:
1. Build: `npm run build`
2. Copy files từ `dist/` vào `wwwroot/` của ASP.NET Core
3. Backend serve static files

---

## 💡 Best Practices

### 1. **Component Naming**:
```jsx
// ✅ Good
function JobListings() { ... }
function UserProfile() { ... }

// ❌ Bad
function jobs() { ... }
function user() { ... }
```

### 2. **State Management**:
```jsx
// ✅ Good: State ở component cần dùng
function JobListings() {
  const [jobs, setJobs] = useState([])
}

// ❌ Bad: State ở component không liên quan
function App() {
  const [jobs, setJobs] = useState([]) // Không cần ở đây
}
```

### 3. **Error Handling**:
```jsx
// ✅ Good
try {
  const data = await api.get('/jobs')
  setJobs(data)
} catch (error) {
  console.error('Failed:', error)
  // Hiển thị error message cho user
}

// ❌ Bad
const data = await api.get('/jobs') // Có thể throw error
```

---

## 📚 Tài liệu tham khảo

- **React Docs**: https://react.dev/
- **React Router**: https://reactrouter.com/
- **Axios**: https://axios-http.com/
- **Vite**: https://vitejs.dev/

---

Chúc bạn học React vui vẻ! 🎉





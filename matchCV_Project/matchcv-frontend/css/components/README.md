# CSS Components - Hướng dẫn sử dụng

Thư mục này chứa các CSS module tái sử dụng cho các component chính của ứng dụng MatchCV.

## Cấu trúc

```
css/
├── variables.css          # CSS Variables (design tokens)
├── components/
│   ├── topbar.css        # Topbar component styles
│   ├── sidebar.css       # Sidebar component styles
│   └── header.css        # Page header component styles
└── style.css             # Main stylesheet (imports all modules)
```

## Cách sử dụng

### 1. Import trong file HTML

Các module đã được import tự động trong `style.css`. Bạn chỉ cần import `style.css`:

```html
<link rel="stylesheet" href="css/style.css">
```

### 2. Sử dụng riêng lẻ từng module

Nếu bạn chỉ muốn sử dụng một component cụ thể, bạn có thể import trực tiếp:

```html
<!-- Import variables trước (bắt buộc) -->
<link rel="stylesheet" href="css/variables.css">

<!-- Sau đó import component bạn cần -->
<link rel="stylesheet" href="css/components/topbar.css">
<link rel="stylesheet" href="css/components/sidebar.css">
<link rel="stylesheet" href="css/components/header.css">
```

## Components

### Topbar (`topbar.css`)

Top navigation bar với search và user actions.

**Classes chính:**
- `.topbar` - Container chính
- `.topbar-inner` - Inner container
- `.topbar-left` - Phần bên trái (brand, search)
- `.topbar-right` - Phần bên phải (notifications, user)
- `.top-search` - Search input container
- `.search-input` - Input field

**Ví dụ:**
```html
<div class="topbar">
  <div class="topbar-inner">
    <div class="topbar-left">
      <div class="brand">...</div>
      <div class="top-search">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-input" placeholder="Search...">
      </div>
    </div>
    <div class="topbar-right">...</div>
  </div>
</div>
```

### Sidebar (`sidebar.css`)

Navigation sidebar với menu items.

**Classes chính:**
- `.sidebar` - Container chính
- `.sidebar-header` - Header với logo
- `.sidebar-nav` - Navigation container
- `.nav-item` - Menu item (thêm class `.active` cho item active)
- `.sidebar-footer` - Footer section

**Ví dụ:**
```html
<div class="sidebar">
  <div class="sidebar-header">
    <div class="logo">
      <div class="logo-icon">M</div>
      <div class="logo-text">MatchCV</div>
    </div>
  </div>
  <nav class="sidebar-nav">
    <a href="#" class="nav-item active">
      <span class="nav-icon">📊</span>
      <span class="nav-text">Dashboard</span>
    </a>
  </nav>
  <div class="sidebar-footer">...</div>
</div>
```

### Header (`header.css`)

Page header với title, subtitle và actions.

**Classes chính:**
- `.page-header` - Container chính
- `.header-content` - Content wrapper
- `.header-title-section` - Title section
- `.page-title` - Main title
- `.page-subtitle` - Subtitle
- `.header-actions` - Action buttons container
- `.header-right` - Right section (notifications, user profile)

**Ví dụ:**
```html
<div class="page-header">
  <div class="header-content">
    <div class="header-title-section">
      <h1 class="page-title">My CVs</h1>
      <p class="page-subtitle">Manage your CVs</p>
    </div>
    <div class="header-actions">
      <button class="btn btn-primary">Create New</button>
    </div>
  </div>
</div>
```

## CSS Variables

Tất cả components sử dụng CSS variables từ `variables.css`. Bạn có thể override các variables này để customize theme:

```css
:root {
  --primary-color: #6c63ff;
  --bg-primary: #0f0d16;
  --spacing-md: 16px;
  /* ... */
}
```

## Responsive Design

Tất cả components đã được thiết kế responsive. Breakpoints:
- Desktop: > 1200px
- Tablet: 768px - 1200px
- Mobile: < 768px

## Best Practices

1. **Luôn import `variables.css` trước** các component CSS
2. **Sử dụng CSS variables** thay vì hardcode values
3. **Giữ nguyên class names** để đảm bảo styles hoạt động đúng
4. **Không modify trực tiếp** các file trong `components/` - tạo override file riêng nếu cần

## Tái sử dụng trong dự án khác

Để sử dụng các component này trong dự án khác:

1. Copy thư mục `css/components/` và `css/variables.css`
2. Import `variables.css` trước
3. Import các component CSS bạn cần
4. Đảm bảo HTML structure khớp với các class names


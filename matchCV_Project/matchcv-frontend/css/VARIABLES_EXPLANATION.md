# Giải thích chi tiết về CSS Variables

## 📚 CSS Variables là gì?

**CSS Variables** (hay còn gọi là **Custom Properties**) là cách để lưu trữ các giá trị CSS và sử dụng lại chúng nhiều lần trong stylesheet. Giống như biến trong lập trình!

## 🎯 Tại sao cần CSS Variables?

### ❌ **KHÔNG dùng variables** (cách cũ):
```css
.button {
  background-color: #6c63ff;
  padding: 16px 24px;
  border-radius: 12px;
}

.card {
  background-color: #1e1b29;
  padding: 16px;
  border-radius: 12px;
}

.sidebar {
  background-color: #14121a;
  padding: 24px;
}
```

**Vấn đề:**
- Nếu muốn đổi màu chính, phải tìm và sửa ở **nhiều nơi**
- Dễ bị sai lệch (ví dụ: một chỗ dùng `#6c63ff`, chỗ khác dùng `#6c64ff`)
- Khó maintain khi project lớn

### ✅ **Dùng variables** (cách mới):
```css
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
}

.card {
  background-color: var(--bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.sidebar {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
}
```

**Lợi ích:**
- ✅ Chỉ cần sửa **một nơi** (`variables.css`)
- ✅ Đảm bảo **nhất quán** trong toàn bộ ứng dụng
- ✅ Dễ dàng **thay đổi theme** (dark/light mode)
- ✅ Code **dễ đọc và maintain** hơn

## 📖 Cấu trúc file `variables.css`

### 1. **`:root` Selector**
```css
:root {
  --primary-color: #6c63ff;
}
```

- `:root` = phần tử gốc (thường là `<html>`)
- Variables khai báo trong `:root` có thể dùng **ở mọi nơi** trong CSS
- Giống như biến global trong lập trình

### 2. **Cú pháp khai báo**
```css
--tên-biến: giá-trị;
```

- Bắt đầu bằng `--` (hai dấu gạch ngang)
- Tên biến thường dùng `kebab-case` (chữ thường, nối bằng dấu gạch ngang)
- Ví dụ: `--primary-color`, `--spacing-md`, `--bg-card`

### 3. **Cách sử dụng**
```css
.element {
  color: var(--primary-color);
  padding: var(--spacing-md);
}
```

- Dùng `var()` để gọi biến
- Cú pháp: `var(--tên-biến)`

## 🎨 Các nhóm Variables trong file

### 1. **Primary Colors** (Màu chính)
```css
--primary-color: #6c63ff;      /* Màu tím chủ đạo */
--primary-hover: #7c73ff;      /* Màu khi hover */
--primary-light: #f3f0ff;      /* Màu nhạt cho background */
```

**Dùng cho:** Buttons, links, highlights, icons

### 2. **Background Colors** (Màu nền)
```css
--bg-primary: #0f0d16;         /* Nền chính - đen đậm */
--bg-secondary: #14121a;       /* Nền phụ */
--bg-card: #1e1b29;            /* Nền cho cards */
--bg-hover: #2a2533;           /* Nền khi hover */
```

**Dùng cho:** Body background, sidebar, cards, hover states

### 3. **Text Colors** (Màu chữ)
```css
--text-primary: #ffffff;       /* Chữ chính - trắng */
--text-secondary: #a0a0a0;     /* Chữ phụ - xám nhạt */
--text-tertiary: #757575;      /* Chữ phụ hơn - xám đậm */
```

**Dùng cho:** Headings, body text, labels, placeholders

### 4. **Status Colors** (Màu trạng thái)
```css
--status-draft: #ff6b6b;       /* Đỏ - chưa hoàn thành */
--status-analyzed: #51cf66;    /* Xanh - đã phân tích */
--status-submitted: #ffd43b;   /* Vàng - đã submit */
--status-activating: #845ef7;  /* Tím - đang kích hoạt */
```

**Dùng cho:** Badges, status indicators, alerts

### 5. **Borders & Shadows** (Viền và đổ bóng)
```css
--border-color: #2a2533;       /* Màu viền */
--shadow-sm: 0 2px 4px ...;    /* Shadow nhỏ */
--shadow-md: 0 4px 12px ...;   /* Shadow vừa */
--shadow-lg: 0 8px 24px ...;   /* Shadow lớn */
--glow-primary: 0 0 20px ...;  /* Hiệu ứng phát sáng */
```

**Dùng cho:** Borders, box-shadow, focus states

### 6. **Spacing** (Khoảng cách)
```css
--spacing-xs: 4px;             /* Rất nhỏ */
--spacing-sm: 8px;              /* Nhỏ */
--spacing-md: 16px;             /* Vừa */
--spacing-lg: 24px;             /* Lớn */
--spacing-xl: 32px;             /* Rất lớn */
```

**Dùng cho:** Padding, margin, gap

### 7. **Border Radius** (Bo góc)
```css
--radius-sm: 8px;               /* Bo góc nhỏ */
--radius-md: 12px;              /* Bo góc vừa */
--radius-lg: 16px;               /* Bo góc lớn */
```

**Dùng cho:** Buttons, cards, inputs, containers

## 💡 Ví dụ thực tế

### Ví dụ 1: Button Component
```css
/* KHÔNG dùng variables */
.btn-primary {
  background-color: #6c63ff;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  background-color: #7c73ff;
}
```

```css
/* Dùng variables */
.btn-primary {
  background-color: var(--primary-color);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}
```

### Ví dụ 2: Card Component
```css
.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.card-title {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.card-text {
  color: var(--text-secondary);
}
```

### Ví dụ 3: Status Badge
```css
.badge-draft {
  background-color: var(--status-draft);
  color: var(--text-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.badge-analyzed {
  background-color: var(--status-analyzed);
  color: var(--text-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}
```

## 🎨 Thay đổi Theme (Dark/Light Mode)

Một trong những lợi ích lớn nhất của CSS Variables là dễ dàng tạo **dark/light theme**:

```css
/* Dark theme (mặc định) */
:root {
  --bg-primary: #0f0d16;
  --text-primary: #ffffff;
}

/* Light theme */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --bg-card: #f5f5f5;
  --border-color: #e0e0e0;
}
```

Chỉ cần thêm `data-theme="light"` vào `<html>` tag là toàn bộ app đổi theme!

## 🔧 Override Variables

Bạn có thể override variables cho từng component:

```css
/* Override cho sidebar */
.sidebar {
  --bg-secondary: #1a1a1a;  /* Override màu nền sidebar */
  background-color: var(--bg-secondary);
}

/* Override cho button đặc biệt */
.btn-special {
  --primary-color: #ff6b6b;  /* Override màu chính */
  background-color: var(--primary-color);
}
```

## ✅ Best Practices

1. **Luôn import `variables.css` trước** các file CSS khác
2. **Đặt tên biến rõ ràng** và có ý nghĩa
3. **Nhóm các biến** theo chức năng (colors, spacing, etc.)
4. **Sử dụng variables** thay vì hardcode values
5. **Document** các biến quan trọng bằng comments

## 🚀 Kết luận

File `variables.css` là **"single source of truth"** cho tất cả design tokens của ứng dụng. Nó giúp:
- ✅ Code dễ maintain hơn
- ✅ Design nhất quán
- ✅ Dễ dàng thay đổi theme
- ✅ Tái sử dụng được trong nhiều project

Đây là một **best practice** trong front-end development hiện đại! 🎉


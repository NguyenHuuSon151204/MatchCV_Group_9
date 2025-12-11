# 🚀 Hướng dẫn chạy Frontend React

## ⚠️ Vấn đề: Lỗi Execution Policy trong PowerShell

Nếu bạn gặp lỗi:
```
npm : File D:\NodeJs\npm.ps1 cannot be loaded...
```

## ✅ Giải pháp (Chọn 1 trong 3 cách):

---

### **Cách 1: Chạy script helper (Dễ nhất) ⭐**

1. Trong PowerShell terminal của VS Code, chạy:
   ```powershell
   .\run-dev.ps1
   ```

Script này sẽ tự động fix execution policy và chạy dev server.

---

### **Cách 2: Fix execution policy trước khi chạy npm**

**Bước 1:** Trong PowerShell terminal, chạy lệnh này:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

**Bước 2:** Sau đó chạy:
```powershell
cd frontend
npm run dev
```

**Lưu ý:** Bạn cần chạy lệnh `Set-ExecutionPolicy` mỗi lần mở terminal mới.

---

### **Cách 3: Dùng Command Prompt (Không cần fix) ⭐⭐⭐**

**Đây là cách đơn giản nhất và không gặp lỗi!**

1. Trong VS Code, mở Terminal
2. Click vào **dropdown** bên cạnh dấu `+` (hoặc `^` ở góc trên bên phải terminal)
3. Chọn **"Command Prompt"** (hoặc "cmd")
4. Chạy:
   ```cmd
   cd frontend
   npm run dev
   ```

**Command Prompt không có vấn đề execution policy!**

---

## 🔧 Fix vĩnh viễn (Chỉ cần làm 1 lần)

Nếu muốn fix vĩnh viễn để không phải chạy lệnh mỗi lần:

1. Mở PowerShell **bất kỳ** (không cần admin)
2. Chạy:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Nhấn `Y` để xác nhận
4. Đóng và mở lại PowerShell terminal trong VS Code

---

## 📝 Kiểm tra server đã chạy

Sau khi chạy `npm run dev`, mở trình duyệt và truy cập:
- `http://localhost:3000` hoặc
- `http://localhost:3001` (nếu port 3000 đã được dùng)

---

## 🛑 Dừng server

Nhấn `Ctrl + C` trong terminal để dừng server.

---

## ❓ Nếu vẫn gặp lỗi lock file

```powershell
cd frontend
Remove-Item .next\dev\lock -Force -ErrorAction SilentlyContinue
npm run dev
```


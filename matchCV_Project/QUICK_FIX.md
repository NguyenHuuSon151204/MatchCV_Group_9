# Hướng dẫn nhanh fix lỗi npm trong PowerShell

## Lỗi gặp phải:
```
npm : File D:\NodeJs\npm.ps1 cannot be loaded. The file D:\NodeJs\npm.ps1 is not digitally signed.
```

## Giải pháp nhanh (3 cách):

### ✅ Cách 1: Fix vĩnh viễn (Khuyến nghị - Chỉ cần làm 1 lần)

**Bước 1:** Mở PowerShell trong VS Code (hoặc PowerShell bất kỳ)

**Bước 2:** Chạy lệnh này:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Bước 3:** Nhấn `Y` để xác nhận

**Bước 4:** Đóng và mở lại PowerShell terminal trong VS Code

**Sau đó bạn có thể chạy `npm run dev` bình thường!**

---

### ⚡ Cách 2: Fix tạm thời (Mỗi lần mở terminal mới)

Mỗi khi mở PowerShell terminal mới, chạy lệnh này trước:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

Sau đó chạy `npm run dev`

---

### 🔧 Cách 3: Dùng Command Prompt thay vì PowerShell

1. Trong VS Code, mở Terminal
2. Click vào dropdown bên cạnh dấu `+` 
3. Chọn **Command Prompt** thay vì PowerShell
4. Chạy `cd frontend` và `npm run dev`

---

## Giải thích:

- **RemoteSigned**: Cho phép chạy scripts local, scripts từ internet cần được ký (An toàn)
- **Bypass**: Bỏ qua tất cả kiểm tra (Chỉ dùng tạm thời)
- **CurrentUser**: Chỉ áp dụng cho user hiện tại (Không cần quyền admin)

## Lưu ý:

Nếu vẫn gặp lỗi lock file:
```powershell
cd frontend
Remove-Item .next\dev\lock -Force
npm run dev
```


# Script helper để chạy npm run dev
# Chạy script này: .\run-dev.ps1

# Fix execution policy cho session này
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Chuyển vào thư mục frontend
Set-Location frontend

# Chạy npm run dev
npm run dev


# Script để dọn dẹp và chạy dev server
Write-Host "Đang dọn dẹp..." -ForegroundColor Yellow

# Fix execution policy
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force | Out-Null

# Dừng các process Node.js đang chạy trên port 3000, 3001, 3002
$ports = @(3000, 3001, 3002)
foreach ($port in $ports) {
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Write-Host "Đã dừng process trên port $port" -ForegroundColor Green
    }
}

# Xóa lock file
$lockFile = "frontend\.next\dev\lock"
if (Test-Path $lockFile) {
    Remove-Item $lockFile -Force -ErrorAction SilentlyContinue
    Write-Host "Đã xóa lock file" -ForegroundColor Green
}

# Chuyển vào thư mục frontend và chạy dev server
Write-Host "`nĐang khởi động dev server..." -ForegroundColor Cyan
Set-Location frontend
npm run dev


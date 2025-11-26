# Script để dừng tất cả dev server
Write-Host "Đang dừng các dev server..." -ForegroundColor Yellow

# Tìm và dừng các process Node.js đang chạy trên port 3000, 3001, 3002
$ports = @(3000, 3001, 3002)
foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        $processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($pid in $processIds) {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            Write-Host "Đã dừng process $pid trên port $port" -ForegroundColor Green
        }
    }
}

# Xóa lock file
$lockFile = "frontend\.next\dev\lock"
if (Test-Path $lockFile) {
    Remove-Item $lockFile -Force -ErrorAction SilentlyContinue
    Write-Host "Đã xóa lock file" -ForegroundColor Green
}

Write-Host "`nHoàn tất!" -ForegroundColor Cyan


Write-Host ""
Write-Host "  +------------------------------------------+" -ForegroundColor Cyan
Write-Host "  |   ~ Sol & Local - Costa del Sol 2026    |" -ForegroundColor Cyan
Write-Host "  |   Dashboard di viaggio premium           |" -ForegroundColor Cyan
Write-Host "  +------------------------------------------+" -ForegroundColor Cyan
Write-Host ""

Write-Host "  [>] Libero porte 3000 e 3001..." -ForegroundColor Yellow

$ports = @(3000, 3001)
foreach ($port in $ports) {
  $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
  foreach ($conn in $connections) {
    $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
      Write-Host "  [x] Kill $($process.ProcessName) (PID $($process.Id)) su porta $port" -ForegroundColor Red
      Stop-Process -Id $process.Id -Force
    }
  }
}

Start-Sleep -Seconds 1

Write-Host "  [>] Pulizia cache di compilazione (.next)..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "  [v] Avvio del server in corso..." -ForegroundColor Green
Write-Host "  [>] Apri http://localhost:3000 nel browser" -ForegroundColor Yellow
Write-Host ""

npm run dev

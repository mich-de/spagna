@echo off
title "Sol & Local — Costa del Sol Dashboard"

echo.
echo   +------------------------------------------+
echo   ^|   ~ Sol ^& Local - Costa del Sol 2026    ^|
echo   ^|   Dashboard di viaggio premium           ^|
echo   +------------------------------------------+
echo.

echo   [>] Libero porte 3000 e 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 "') do (
  if not "%%a"=="" taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001 "') do (
  if not "%%a"=="" taskkill /f /pid %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo   [v] Avvio del server in corso...
echo   [^>] Apri http://localhost:3000 nel browser
echo.
call npm run dev
pause

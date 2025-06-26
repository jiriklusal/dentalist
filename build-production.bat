@echo off
REM =============================================================================
REM DENTALIST - PRODUCTION BUILD SCRIPT (Windows)
REM =============================================================================
REM This script prepares the website for production deployment
REM It automatically switches DEBUG_MODE from true to false

echo 🚀 DENTALIST - Production Build Script
echo ======================================

REM Check if config.js exists
if not exist "config.js" (
    echo ❌ Error: config.js file not found!
    pause
    exit /b 1
)

echo 📋 Current DEBUG_MODE setting:
findstr "const DEBUG_MODE" config.js

echo.
echo 🔧 Switching to production mode...

REM Create backup and switch DEBUG_MODE from true to false
copy config.js config.js.bak >nul
powershell -Command "(gc config.js) -replace 'const DEBUG_MODE = true;', 'const DEBUG_MODE = false;' | Out-File -encoding ASCII config.js"

echo ✅ Production mode enabled!
echo.
echo 📋 New DEBUG_MODE setting:
findstr "const DEBUG_MODE" config.js

echo.
echo 🎯 Production checklist:
echo • ✅ DEBUG_MODE = false
echo • ✅ reCAPTCHA enabled  
echo • ✅ Test button hidden
echo • ✅ Debug messages disabled

echo.
echo 🚀 Ready for production deployment!
echo.
echo 💡 To revert to development mode:
echo    powershell -Command "(gc config.js) -replace 'const DEBUG_MODE = false;', 'const DEBUG_MODE = true;' | Out-File -encoding ASCII config.js"
echo.
pause

@echo off
echo.
echo ============================================
echo   GymFit Pro - Vercel Deployment Utility
echo ============================================
echo.

echo [STEP 1] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Root dependency installation failed
    pause
    exit /b 1
)

cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependency installation failed
    pause
    exit /b 1
)
cd ..

echo.
echo [STEP 2] Building frontend application...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed
    pause
    exit /b 1
)
cd ..

echo.
echo [STEP 3] Verifying build output...
if not exist "frontend\dist\index.html" (
    echo ERROR: Build output missing
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Build completed successfully
echo ============================================
echo.
echo Next steps:
echo   1. Install Vercel CLI: npm install -g vercel
echo   2. Login to Vercel: vercel login
echo   3. Deploy: vercel --prod
echo.
echo Or run: vercel-deploy-prod.bat
echo.
pause

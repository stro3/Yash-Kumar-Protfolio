@echo off
echo.
echo ============================================
echo   GymFit Pro - Vercel Deployment
echo ============================================
echo.
echo Step 1: Logging into Vercel...
echo.

vercel login

echo.
echo Step 2: Deploying to Production...
echo.

vercel --prod

echo.
echo ============================================
echo   Deployment Complete!
echo ============================================
echo.
echo Next Steps:
echo 1. Copy your Vercel frontend URL
echo 2. Deploy backend to Render.com (see DEPLOYMENT.md)
echo 3. Update VITE_API_URL in Vercel dashboard
echo.
pause

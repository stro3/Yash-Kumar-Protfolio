@echo off
echo Starting Gym Website Development Servers...
echo.

echo Starting Backend Server on port 5000...
start "Backend Server" cmd /k "cd backend && node server.js"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server on port 5175...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5175
echo.
echo Press any key to continue...
pause >nul
@echo off
echo Building frontend...
cd frontend
call npm run build

echo.
echo Starting server...
cd ..\backend
node server.js

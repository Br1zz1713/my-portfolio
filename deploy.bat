@echo off
Title GitHub Deployment Manager
echo ==========================================
echo    GitHub Deployment Automator
echo ==========================================
echo.

echo [Step 1] Syncing with Remote Repository...
git pull origin main
if %errorlevel% neq 0 (
    echo [WARNING] Git pull failed or encountered conflicts.
    echo check manually if you are worried about remote changes.
    pause
) else (
    echo System synchronized.
)
echo.

echo [Step 2] Adding changes...
git add .
echo Files added.
echo.

echo [Step 3] Committing...
set /p CommitMessage="Enter commit message (Default: 'Update portfolio projects'): "
if "%CommitMessage%"=="" set CommitMessage=Update portfolio projects

git commit -m "%CommitMessage%"
echo.

echo [Step 4] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ==========================================
echo    SUCCESS! Deployment Complete.
echo ==========================================
echo.
pause

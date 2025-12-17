@echo off
Title GitHub Deployment
echo ==========================================
echo    GitHub Deployment Automator
echo ==========================================
echo.

echo [Step 1] Adding all changes to staging...
git add .
if %errorlevel% neq 0 (
    echo [ERROR] Failed to add files.
    pause
    exit /b %errorlevel%
)
echo Done.
echo.

echo [Step 2] Committing changes...
set /p CommitMessage="Enter commit message (Press Enter for 'Update portfolio'): "
if "%CommitMessage%"=="" set CommitMessage=Update portfolio

git commit -m "%CommitMessage%"
echo.

echo [Step 3] Pushing to GitHub (origin main)...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push failed. Please check your internet connection or credentials.
    pause
    exit /b %errorlevel%
)

echo.
echo ==========================================
echo    SUCCESS! Changes deployed to GitHub.
echo ==========================================
echo.
pause

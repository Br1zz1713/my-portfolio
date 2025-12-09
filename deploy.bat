@echo off
echo Deploying to GitHub...

REM 1. Set Remote
git remote remove origin
git remote add origin https://github.com/Br1zz1713/my-portfolio.git

REM 2. Add and Commit
git add .
git commit -m "feat: Upgrade portfolio to v2.0 (Dark Mode, Interactive Hero, Timeline)"

REM 3. Fix Branch Name (Master -> Main)
git branch -M main

REM 4. Push (Force to overwrite remote)
git push -u origin main --force

echo.
echo Deployment command finished.
pause

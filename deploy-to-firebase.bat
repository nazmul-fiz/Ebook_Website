@echo off
title Deploying to serdventure.web.app
color 0b
echo ======================================================================
echo           SERD VENTURES - DEPLOYMENT TO serdventure.web.app
echo ======================================================================
echo.
echo Step 1: Logging into YOUR Google Account...
echo A browser window is opening. Please select YOUR own Gmail account.
echo.
call npx --yes firebase-tools login --reauth
echo.
echo ======================================================================
echo Step 2: Deploying to https://serdventure.web.app ...
echo ======================================================================
echo.
call npx --yes firebase-tools deploy --only hosting
echo.
echo ======================================================================
echo SUCCESS! Your website is live at:
echo https://serdventure.web.app
echo ======================================================================
echo.
pause

@echo off
rem Double-click launcher: runs the installer for the current user only (no admin needed).
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Install-NordEpicorTheme.ps1" %*
pause

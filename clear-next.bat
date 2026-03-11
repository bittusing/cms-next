@echo off
echo Clearing .next folder...
rmdir /s /q .next 2>nul
echo Done! You can now run npm run build
pause
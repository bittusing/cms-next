# PowerShell script to fix Next.js build issues
Write-Host "Fixing Next.js build issues..." -ForegroundColor Green

# Stop any running Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process -Name "next" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment
Start-Sleep -Seconds 2

# Try to remove .next folder
Write-Host "Removing .next folder..." -ForegroundColor Yellow
if (Test-Path ".next") {
    try {
        Remove-Item ".next" -Recurse -Force -ErrorAction Stop
        Write-Host ".next folder removed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove .next folder. Trying alternative method..." -ForegroundColor Yellow
        
        # Try to take ownership and then delete
        try {
            takeown /f ".next" /r /d y 2>$null
            icacls ".next" /grant administrators:F /t 2>$null
            Remove-Item ".next" -Recurse -Force -ErrorAction Stop
            Write-Host ".next folder removed with elevated permissions!" -ForegroundColor Green
        } catch {
            Write-Host "Warning: Could not remove .next folder. You may need to:" -ForegroundColor Red
            Write-Host "1. Close all editors and terminals" -ForegroundColor Red
            Write-Host "2. Restart your computer" -ForegroundColor Red
            Write-Host "3. Or manually delete the .next folder" -ForegroundColor Red
        }
    }
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>$null

Write-Host "Done! You can now try 'npm run build' again." -ForegroundColor Green
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
# Register Automated Daily Cache Maintenance in Windows Task Scheduler
# Reclaims disk space automatically whenever cache exceeds 5 GB.

$TaskName = "HistoryHub-Cache-Cleaner"
$ProjectDir = "C:\Projects\meoncross-history.netlify.app"
$ScriptPath = "$ProjectDir\scripts\clean_cache.cjs"
$NodeExe = (Get-Command node).Source

if (-not (Test-Path $ScriptPath)) {
    Write-Error "Could not find $ScriptPath"
    exit 1
}

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "Setting up Automated Cache Maintenance Task..." -ForegroundColor Cyan
Write-Host "===================================================="

$Action = New-ScheduledTaskAction -Execute $NodeExe -Argument "`"$ScriptPath`" --auto --threshold 5" -WorkingDirectory $ProjectDir
$Trigger = New-ScheduledTaskTrigger -Daily -At 1:00PM
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Minutes 15)

try {
    Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue | Unregister-ScheduledTask -Confirm:$false -ErrorAction SilentlyContinue
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "Daily background disk maintenance for The History Revision Hub repository. Automatically purges temporary caches when storage exceeds 5 GB." | Out-Null
    
    Write-Host "[OK] Successfully registered Windows Scheduled Task: $TaskName" -ForegroundColor Green
    Write-Host "[SCHEDULE] Runs daily at 1:00 PM" -ForegroundColor Yellow
    Write-Host "[RULE] Silently purges caches whenever accumulated temporary files exceed 5 GB." -ForegroundColor Yellow
    Write-Host "[MANUAL] To manually run: Start-ScheduledTask -TaskName '$TaskName'" -ForegroundColor Gray
    Write-Host "[REMOVE] To remove task:  Unregister-ScheduledTask -TaskName '$TaskName' -Confirm:`$false" -ForegroundColor Gray
    Write-Host "====================================================" -ForegroundColor Cyan
} catch {
    $msg = $_.Exception.Message
    Write-Host "[WARNING] Could not register scheduled task: $msg" -ForegroundColor Red
    Write-Host "You can still run maintenance manually anytime with: npm run clean:cache" -ForegroundColor Yellow
}

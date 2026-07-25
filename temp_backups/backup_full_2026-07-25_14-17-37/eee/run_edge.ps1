$p = Start-Process -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--remote-debugging-port=9222", "index.html" -PassThru
Start-Sleep -Seconds 3
$proc = Get-Process -Id $p.Id -ErrorAction SilentlyContinue
if ($proc) {
    Write-Host "Edge is running, ID: $($proc.Id)"
    Stop-Process -Id $proc.Id -Force
} else {
    Write-Host "Edge exited immediately or failed to start."
}

$p = Start-Process -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--remote-debugging-port=9222", "index.html" -PassThru
Start-Sleep -Seconds 5
try {
    $targets = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json"
    Write-Host "Success connecting to 127.0.0.1:9222"
    $targets | ConvertTo-Json | Write-Host
} catch {
    Write-Error "Failed to connect to 127.0.0.1:9222 : $_"
} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}

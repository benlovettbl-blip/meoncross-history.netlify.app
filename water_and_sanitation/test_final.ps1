$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Kill any existing edge on 9222
Get-Process -Name msedge -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -eq "" } | Stop-Process -Force -ErrorAction SilentlyContinue

$process = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--remote-debugging-port=9222", "index.html" -PassThru
Write-Host "Started process, ID: $($process.Id). Waiting 5 seconds..."
Start-Sleep -Seconds 5

$running = Get-Process -Id $process.Id -ErrorAction SilentlyContinue
if (-not $running) {
    Write-Error "Edge process exited immediately!"
    exit
}

try {
    Write-Host "Querying http://127.0.0.1:9222/json..."
    $targets = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json"
    $targets | ConvertTo-Json | Write-Host
} catch {
    Write-Error "Error querying debugging endpoint: $_"
} finally {
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
}

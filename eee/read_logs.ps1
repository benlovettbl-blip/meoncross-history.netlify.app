$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$profileDir = Join-Path $env:TEMP "edge-profile-test"
Remove-Item $profileDir -Recurse -ErrorAction SilentlyContinue | Out-Null

$absoluteHtmlPath = (Get-Item "index.html").FullName
$url = "file:///" + $absoluteHtmlPath.Replace("\", "/")

# Kill existing Edge
Get-Process -Name msedge -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -eq "" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Launch Edge with remote debugging using properly quoted single-string arguments
$args = "--headless=new --no-sandbox --disable-gpu --remote-debugging-port=9222 --user-data-dir=""$profileDir"" ""$url"""
$process = Start-Process -FilePath $edgePath -ArgumentList $args -PassThru
Start-Sleep -Seconds 3

try {
    # Get WebSocket URL
    $targets = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json"
    $page = $targets | Where-Object { $_.type -eq "page" -and $_.url -like "*index.html*" } | Select-Object -First 1
    if (-not $page) {
        $page = $targets | Where-Object { $_.type -eq "page" } | Select-Object -First 1
    }
    
    if (-not $page) {
        Write-Host "No page found."
        exit
    }
    
    $wsUrl = $page.webSocketDebuggerUrl
    Write-Host "Connecting to WebSocket: $wsUrl"
    
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $cts = New-Object System.Threading.CancellationTokenSource
    $connectTask = $ws.ConnectAsync((New-Object System.Uri($wsUrl)), $cts.Token)
    $connectTask.Wait()
    
    # Enable Console and Runtime
    $enableRuntime = '{"id": 1, "method": "Runtime.enable"}'
    $sendBytes = [System.Text.Encoding]::UTF8.GetBytes($enableRuntime)
    $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @(,$sendBytes)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()
    
    $enableConsole = '{"id": 2, "method": "Console.enable"}'
    $sendBytes = [System.Text.Encoding]::UTF8.GetBytes($enableConsole)
    $ws.SendAsync((New-Object System.ArraySegment[byte] -ArgumentList @(,$sendBytes)), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()
    
    Write-Host "Listening for 5 seconds..."
    $buffer = New-Object byte[] 65536
    $segment = New-Object System.ArraySegment[byte] -ArgumentList @(,$buffer)
    
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    while ($stopwatch.ElapsedMilliseconds -lt 5000) {
        if ($ws.State -ne [System.Net.WebSockets.WebSocketState]::Open) {
            break
        }
        
        $readTask = $ws.ReceiveAsync($segment, $cts.Token)
        try {
            if ($readTask.Wait(100)) {
                $result = $readTask.Result
                if ($result.MessageType -eq [System.Net.WebSockets.WebSocketState]::Close) {
                    break
                }
                $msg = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count)
                if ($msg) {
                    $json = ConvertFrom-Json $msg -ErrorAction SilentlyContinue
                    if ($json) {
                        if ($json.method -eq "Runtime.exceptionThrown") {
                            Write-Host "JS EXCEPTION:" -ForegroundColor Red
                            $json.params.exceptionDetails | ConvertTo-Json -Depth 5 | Write-Host
                        } elseif ($json.method -eq "Console.messageAdded") {
                            $level = $json.params.message.level
                            $text = $json.params.message.text
                            $line = $json.params.message.line
                            Write-Host "Console [$level] (line $line): $text"
                        }
                    }
                }
            }
        } catch {
            # Ignore read wait timeout or errors
        }
    }
} catch {
    Write-Error "Error: $_"
} finally {
    if ($ws -and $ws.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait()
    }
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
}

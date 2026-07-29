# Create Edge profile temp dir
$profileDir = Join-Path $env:TEMP "edge-profile-test"
Remove-Item $profileDir -Recurse -ErrorAction SilentlyContinue | Out-Null

$absoluteHtmlPath = (Get-Item "index.html").FullName
$url = "file:///" + $absoluteHtmlPath.Replace("\", "/")
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Kill any existing edge on 9222
Get-Process -Name msedge -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -eq "" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Launch Edge with more robust flags
$process = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", "--remote-debugging-port=9222", "--user-data-dir=""$profileDir""", """$url""" -PassThru
Start-Sleep -Seconds 6

try {
    # Query targets
    $targets = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json"
    $pageTarget = $targets | Where-Object { $_.type -eq "page" } | Select-Object -First 1
    
    if (-not $pageTarget) {
        Write-Error "No page target found!"
        exit
    }
    
    $wsUrl = $pageTarget.webSocketDebuggerUrl
    Write-Host "Connecting to WebSocket: $wsUrl"
    
    # Connect using ClientWebSocket
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $cts = New-Object System.Threading.CancellationTokenSource
    $task = $ws.ConnectAsync((New-Object System.Uri($wsUrl)), $cts.Token)
    $task.Wait()
    
    # Enable Runtime and Console
    $enableRuntime = '{"id": 1, "method": "Runtime.enable"}'
    $enableConsole = '{"id": 2, "method": "Console.enable"}'
    
    $sendBytes = [System.Text.Encoding]::UTF8.GetBytes($enableRuntime)
    $sendArray = New-Object System.ArraySegment[byte] -ArgumentList @(,$sendBytes)
    $ws.SendAsync($sendArray, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()
    
    $sendBytes = [System.Text.Encoding]::UTF8.GetBytes($enableConsole)
    $sendArray = New-Object System.ArraySegment[byte] -ArgumentList @(,$sendBytes)
    $ws.SendAsync($sendArray, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()
    
    Write-Host "Listening for errors for 5 seconds..."
    $buffer = New-Object byte[] 65536
    $segment = New-Object System.ArraySegment[byte] -ArgumentList @(,$buffer)
    
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    while ($stopwatch.ElapsedMilliseconds -lt 5000) {
        if ($ws.State -ne [System.Net.WebSockets.WebSocketState]::Open) {
            break
        }
        
        $readTask = $ws.ReceiveAsync($segment, $cts.Token)
        if ($readTask.Wait(500)) {
            $result = $readTask.Result
            $msg = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count)
            if ($msg) {
                $msgs = $msg -split '(?<=\})(?=\{"id"|"method")'
                foreach ($m in $msgs) {
                    $json = ConvertFrom-Json $m -ErrorAction SilentlyContinue
                    if ($json) {
                        if ($json.method -eq "Runtime.exceptionThrown") {
                            Write-Host "`n=== JS RUNTIME EXCEPTION ===" -ForegroundColor Red
                            Write-Host ($json.params.exceptionDetails | ConvertTo-Json -Depth 5) -ForegroundColor Red
                        } elseif ($json.method -eq "Console.messageAdded") {
                            $level = $json.params.message.level
                            $text = $json.params.message.text
                            Write-Host "Console [$level]: $text"
                        }
                    }
                }
            }
        }
    }
} catch {
    Write-Error "Error during debugging session: $_"
} finally {
    if ($ws -and $ws.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
        $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Closing", $cts.Token).Wait()
    }
    if ($process) {
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    }
}

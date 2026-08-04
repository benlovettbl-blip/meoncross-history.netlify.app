$logPath = "C:\Users\fives\.gemini\antigravity\brain\d2fa742d-0f33-45d9-adb2-bae2fe9184ea\.system_generated\logs\transcript.jsonl"
$lines = Get-Content -Path $logPath
$count = 0
foreach ($line in $lines) {
    if ($line -match '"dates":\s*"[^"]+"') {
        # Extract a small snippet around the match
        $idx = $line.IndexOf('"dates":')
        $start = [Math]::Max(0, $idx - 50)
        $len = [Math]::Min($line.Length - $start, 150)
        Write-Host "Snippet: $($line.Substring($start, $len))"
        $count++
        if ($count -gt 10) { break }
    }
}

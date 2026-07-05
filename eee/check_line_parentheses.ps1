$lines = Get-Content -Path "app.js"

function Check-Line($lineIndex, $lineNum) {
    $line = $lines[$lineIndex]
    Write-Host "Line $($lineNum) text length: $($line.Length)"
    
    $openCount = 0
    $closeCount = 0
    for ($i = 0; $i -lt $line.Length; $i++) {
        if ($line[$i] -eq '(') { $openCount++ }
        if ($line[$i] -eq ')') { $closeCount++ }
    }
    Write-Host "Opening Parentheses: $($openCount)"
    Write-Host "Closing Parentheses: $($closeCount)"
}

Check-Line 2534 2535
Check-Line 2541 2542

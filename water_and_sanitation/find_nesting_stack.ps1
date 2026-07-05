$filePath = "app.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$stack = New-Object System.Collections.Stack
$escape = $false
$line = 1
$col = 0

for ($i = 0; $i -lt $content.Length; $i++) {
    $char = $content[$i]
    $col++
    if ($char -eq "`n") {
        $line++
        $col = 0
    }
    
    if ($escape) {
        $escape = $false
        continue
    }
    if ($char -eq "\") {
        $escape = $true
        continue
    }
    
    if ($stack.Count -gt 0) {
        $top = $stack.Peek()
        if ($char -eq $top.char) {
            $null = $stack.Pop()
            continue
        }
        if ($top.char -eq '"' -or $top.char -eq "'" -or $top.char -eq '`') {
            continue
        }
    }
    
    if ($char -eq '"' -or $char -eq "'" -or $char -eq '`') {
        $item = @{ char = $char; line = $line; col = $col; index = $i }
        $stack.Push($item)
    }
}

Write-Host "Unclosed quotes stack at the end of the file:"
$fileLines = Get-Content -Path $filePath
$remaining = $stack.ToArray()
[Array]::Reverse($remaining)

foreach ($item in $remaining) {
    Write-Host "Quote: $($item.char) opened at Line $($item.line), Col $($item.col)"
    Write-Host "Line Content: $($fileLines[$item.line - 1])"
    Write-Host "Context:"
    $startIdx = [Math]::Max(0, $item.index - 50)
    $len = [Math]::Min(100, $content.Length - $startIdx)
    Write-Host $content.Substring($startIdx, $len)
    Write-Host "------------------"
}

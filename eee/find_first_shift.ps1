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
            if ($top.char -eq '"' -or $top.char -eq "'") {
                if ($line -ne $top.line) {
                    Write-Host "FOUND SYNTAX ERROR: String enclosed in $($top.char) spanned $($line - $top.line) lines!"
                    Write-Host "Opened at Line $($top.line), Col $($top.col)"
                    Write-Host "Closed at Line $($line), Col $($col)"
                    $fileLines = Get-Content -Path $filePath
                    Write-Host "Opening Line: $($fileLines[$top.line - 1])"
                    Write-Host "Closing Line: $($fileLines[$line - 1])"
                    exit
                }
            }
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
Write-Host "No multi-line single/double quote strings found."

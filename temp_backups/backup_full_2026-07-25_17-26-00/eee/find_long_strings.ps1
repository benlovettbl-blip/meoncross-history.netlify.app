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
            $span = $line - $top.line
            if ($span -gt 5) {
                Write-Host "String literal enclosed in $($top.char) spanned $($span) lines! Opened at Line $($top.line), Col $($top.col), closed at Line $($line), Col $($col)"
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

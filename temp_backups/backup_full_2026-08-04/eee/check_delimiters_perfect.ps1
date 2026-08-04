$filePath = "app.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$escape = $false
$inDoubleQuote = $false
$inSingleQuote = $false
$inBacktick = $false
$inLineComment = $false
$inBlockComment = $false

$braces = 0
$brackets = 0
$parens = 0

$line = 1
$col = 0

$bracesStack = New-Object System.Collections.Stack
$bracketsStack = New-Object System.Collections.Stack
$parensStack = New-Object System.Collections.Stack

for ($i = 0; $i -lt $content.Length; $i++) {
    $char = $content[$i]
    $nextChar = if ($i + 1 -lt $content.Length) { $content[$i+1] } else { $null }
    
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
        if ($inDoubleQuote -or $inSingleQuote -or $inBacktick) {
            $escape = $true
        }
        continue
    }
    
    if ($inLineComment) {
        if ($char -eq "`n") { $inLineComment = $false }
        continue
    }
    if ($inBlockComment) {
        if ($char -eq "*" -and $nextChar -eq "/") {
            $inBlockComment = $false
            $i++
            $col++
        }
        continue
    }
    
    if ($inDoubleQuote) {
        if ($char -eq '"') { $inDoubleQuote = $false }
        continue
    }
    if ($inSingleQuote) {
        if ($char -eq "'") { $inSingleQuote = $false }
        continue
    }
    if ($inBacktick) {
        if ($char -eq '`') { $inBacktick = $false }
        continue
    }
    
    if ($char -eq "/" -and $nextChar -eq "/") {
        $inLineComment = $true
        $i++
        $col++
        continue
    }
    if ($char -eq "/" -and $nextChar -eq "*") {
        $inBlockComment = $true
        $i++
        $col++
        continue
    }
    
    if ($char -eq '"') { $inDoubleQuote = $true; continue }
    if ($char -eq "'") { $inSingleQuote = $true; continue }
    if ($char -eq '`') { $inBacktick = $true; continue }
    
    # Skip regexes in the scanner
    if ($char -eq "/" -and ($nextChar -eq "[" -or $nextChar -eq "‘" -or $nextChar -eq "'" -or $nextChar -eq "\")) {
        $i++
        $col++
        while ($i -lt $content.Length -and $content[$i] -ne "/") {
            if ($content[$i] -eq "\") { $i += 2; $col += 2; continue }
            $i++
            $col++
        }
        $i++
        $col++
        continue
    }
    
    # Braces
    if ($char -eq '{') {
        $braces++
        $bracesStack.Push(@{ line = $line; col = $col })
        continue
    }
    if ($char -eq '}') {
        $braces--
        if ($braces -lt 0) {
            Write-Error "Mismatched closing brace '}' at Line $($line), Col $($col)"
            exit
        }
        $null = $bracesStack.Pop()
        continue
    }
    
    # Brackets
    if ($char -eq '[') {
        $brackets++
        $bracketsStack.Push(@{ line = $line; col = $col })
        continue
    }
    if ($char -eq ']') {
        $brackets--
        if ($brackets -lt 0) {
            Write-Error "Mismatched closing bracket ']' at Line $($line), Col $($col)"
            exit
        }
        $null = $bracketsStack.Pop()
        continue
    }
    
    # Parentheses
    if ($char -eq '(') {
        $parens++
        $parensStack.Push(@{ line = $line; col = $col })
        continue
    }
    if ($char -eq ')') {
        $parens--
        if ($parens -lt 0) {
            Write-Error "Mismatched closing parenthesis ')' at Line $($line), Col $($col)"
            exit
        }
        $null = $parensStack.Pop()
        continue
    }
}

Write-Host "Done!"
Write-Host "Braces left: $($bracesStack.Count)"
$fileLines = Get-Content -Path $filePath
foreach ($item in $bracesStack.ToArray()) {
    Write-Host "  Brace opened at Line $($item.line), Col $($item.col): $($fileLines[$item.line - 1])"
}

Write-Host "Brackets left: $($bracketsStack.Count)"
foreach ($item in $bracketsStack.ToArray()) {
    Write-Host "  Bracket opened at Line $($item.line), Col $($item.col): $($fileLines[$item.line - 1])"
}

Write-Host "Parentheses left: $($parensStack.Count)"
foreach ($item in $parensStack.ToArray()) {
    Write-Host "  Parenthesis opened at Line $($item.line), Col $($item.col): $($fileLines[$item.line - 1])"
}

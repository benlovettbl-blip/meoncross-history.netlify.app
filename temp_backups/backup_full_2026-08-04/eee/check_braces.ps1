function Check-JSFile($filePath) {
    Write-Host "Analyzing $($filePath)..."
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    
    $inDoubleQuote = $false
    $inSingleQuote = $false
    $inBacktick = $false
    $escape = $false
    
    $braces = 0
    $brackets = 0
    $parens = 0
    
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
        
        if ($char -eq '"') {
            $inDoubleQuote = $true
            continue
        }
        if ($char -eq "'") {
            $inSingleQuote = $true
            continue
        }
        if ($char -eq '`') {
            $inBacktick = $true
            continue
        }
        
        # Check braces
        if ($char -eq '{') { $braces++; continue }
        if ($char -eq '}') {
            $braces--
            if ($braces -lt 0) {
                Write-Error "Mismatched closing brace '}' at Line $($line), Col $($col)"
                return $false
            }
            continue
        }
        
        # Check brackets
        if ($char -eq '[') { $brackets++; continue }
        if ($char -eq ']') {
            $brackets--
            if ($brackets -lt 0) {
                Write-Error "Mismatched closing bracket ']' at Line $($line), Col $($col)"
                return $false
            }
            continue
        }
        
        # Check parentheses
        if ($char -eq '(') { $parens++; continue }
        if ($char -eq ')') {
            $parens--
            if ($parens -lt 0) {
                Write-Error "Mismatched closing parenthesis ')' at Line $($line), Col $($col)"
                return $false
            }
            continue
        }
    }
    
    if ($inDoubleQuote) { Write-Warning "Unterminated double quote starting somewhere in the file" }
    if ($inSingleQuote) { Write-Warning "Unterminated single quote starting somewhere in the file" }
    if ($inBacktick) { Write-Warning "Unterminated backtick starting somewhere in the file" }
    
    Write-Host "End of file reached."
    Write-Host "Braces nesting level: $($braces)"
    Write-Host "Brackets nesting level: $($brackets)"
    Write-Host "Parentheses nesting level: $($parens)"
    
    if ($braces -ne 0 -or $brackets -ne 0 -or $parens -ne 0) {
        Write-Error "Syntax error in $($filePath) - unbalanced delimiters!"
        return $false
    }
    
    Write-Host "File $($filePath) appears balanced and syntactically clean of delimiter mismatch!"
    return $true
}

Check-JSFile "data.js"
Check-JSFile "app.js"

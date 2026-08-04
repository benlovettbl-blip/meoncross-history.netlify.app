$filePath = "app.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Strip comments
$content = $content -replace '/\*[\s\S]*?\*/', ''
$lines = $content -split "\r?\n"
$cleanedLines = @()
foreach ($l in $lines) {
    if ($l.Contains("//")) {
        if ($l -match 'http://|https://|file://') {
            $cleanedLines += $l
        } else {
            $parts = $l -split '//'
            $cleanedLines += $parts[0]
        }
    } else {
        $cleanedLines += $l
    }
}
$content = $cleanedLines -join "`n"

# 2. Strip regexes
$content = $content -replace '/\[.+?\]/g', '"regex_placeholder"'
$content = $content -replace '/\[.+?\]/', '"regex_placeholder"'
$content = $content -replace '/\s+/g', '"regex_placeholder"'

$braces = 0
$brackets = 0
$parens = 0
$inDoubleQuote = $false
$inSingleQuote = $false
$inBacktick = $false
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
    
    if ($char -eq '"') { $inDoubleQuote = $true; continue }
    if ($char -eq "'") { $inSingleQuote = $true; continue }
    if ($char -eq '`') { $inBacktick = $true; continue }
    
    # Braces
    if ($char -eq '{') { $braces++; continue }
    if ($char -eq '}') {
        $braces--
        if ($braces -lt 0) {
            Write-Error "Mismatched closing brace '}' at Line $($line), Col $($col)"
            exit
        }
        continue
    }
    
    # Brackets
    if ($char -eq '[') { $brackets++; continue }
    if ($char -eq ']') {
        $brackets--
        if ($brackets -lt 0) {
            Write-Error "Mismatched closing bracket ']' at Line $($line), Col $($col)"
            exit
        }
        continue
    }
    
    # Parentheses
    if ($char -eq '(') { $parens++; continue }
    if ($char -eq ')') {
        $parens--
        if ($parens -lt 0) {
            Write-Error "Mismatched closing parenthesis ')' at Line $($line), Col $($col)"
            exit
        }
        continue
    }
}

Write-Host "Braces nesting: $($braces)"
Write-Host "Brackets nesting: $($brackets)"
Write-Host "Parentheses nesting: $($parens)"

if ($braces -ne 0 -or $brackets -ne 0 -or $parens -ne 0) {
    Write-Error "UNBALANCED DELIMITERS in app.js!"
} else {
    Write-Host "Balanced!"
}

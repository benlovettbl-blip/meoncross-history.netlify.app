$filePath = "app.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$inDoubleQuote = $false
$doubleQuoteStartLine = 0
$doubleQuoteStartCol = 0

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
        if ($char -eq '"') {
            $inDoubleQuote = $false
        }
        continue
    }
    
    if ($char -eq '"') {
        $inDoubleQuote = $true
        $doubleQuoteStartLine = $line
        $doubleQuoteStartCol = $col
    }
}

if ($inDoubleQuote) {
    Write-Host "Unterminated double quote opened at Line $($doubleQuoteStartLine), Col $($doubleQuoteStartCol)"
    $fileLines = Get-Content -Path $filePath
    Write-Host "Line Content: $($fileLines[$doubleQuoteStartLine - 1])"
} else {
    Write-Host "No unterminated double quote found"
}

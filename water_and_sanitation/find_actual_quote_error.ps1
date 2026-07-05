$filePath = "app.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$inDoubleQuote = $false
$inSingleQuote = $false
$inBacktick = $false
$escape = $false

$dqLine = $dqCol = $sqLine = $sqCol = $btLine = $btCol = 0

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
        $dqLine = $line
        $dqCol = $col
        continue
    }
    if ($char -eq "'") {
        $inSingleQuote = $true
        $sqLine = $line
        $sqCol = $col
        continue
    }
    if ($char -eq '`') {
        $inBacktick = $true
        $btLine = $line
        $btCol = $col
        continue
    }
}

$fileLines = Get-Content -Path $filePath
if ($inDoubleQuote) {
    Write-Host "Unterminated double quote opened at Line $($dqLine), Col $($dqCol)"
    Write-Host "Line: $($fileLines[$dqLine - 1])"
}
if ($inSingleQuote) {
    Write-Host "Unterminated single quote opened at Line $($sqLine), Col $($sqCol)"
    Write-Host "Line: $($fileLines[$sqLine - 1])"
}
if ($inBacktick) {
    Write-Host "Unterminated backtick opened at Line $($btLine), Col $($btCol)"
    Write-Host "Line: $($fileLines[$btLine - 1])"
}

$filePath = "app.js"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Strip block comments
$content = $content -replace '/\*[\s\S]*?\*/', ''

# 2. Strip line comments (keeping URLs intact)
$lines = $content -split "\r?\n"
$cleanedLines = @()
foreach ($l in $lines) {
    if ($l.Contains("//")) {
        # Check if it's a URL
        if ($l -match 'http://|https://|file://') {
            # Keep as is, or strip if there is a comment at the end
            $cleanedLines += $l
        } else {
            # Strip comment
            $parts = $l -split '//'
            $cleanedLines += $parts[0]
        }
    } else {
        $cleanedLines += $l
    }
}
$content = $cleanedLines -join "`n"

# 3. Replace regex literals with safe string
$content = $content -replace '/\[.+?\]/g', '"regex_placeholder"'
$content = $content -replace '/\[.+?\]/', '"regex_placeholder"'
$content = $content -replace '/\s+/g', '"regex_placeholder"'

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
                    Write-Host "------------------------------------"
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

$files = @("index.html", "app.js")

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Fixing garbled text in $file..."
        $text = Get-Content -Raw -Encoding utf8 -Path $file
        
        $text = $text.Replace(([char]0x00E2 + [char]0x20AC + [char]0x201C).ToString(), ([char]0x2013).ToString())
        $text = $text.Replace(([char]0x00E2 + [char]0x20AC + [char]0x02DC).ToString(), ([char]0x2018).ToString())
        $text = $text.Replace(([char]0x00E2 + [char]0x20AC + [char]0x2122).ToString(), ([char]0x2019).ToString())
        $text = $text.Replace(([char]0x00E2 + [char]0x20AC + [char]0x201D).ToString(), ([char]0x2014).ToString())
        $text = $text.Replace(([char]0x00C3 + [char]0x0192 + [char]0x00C2 + [char]0x00A9).ToString(), ([char]0x00E9).ToString())
        $text = $text.Replace(([char]0x00C3 + [char]0x0192 + [char]0x00C2 + [char]0x00AD).ToString(), ([char]0x00ED).ToString())
        $text = $text.Replace(([char]0x00C3 + [char]0x00BA).ToString(), ([char]0x00FA).ToString())
        $text = $text.Replace(([char]0x00C2 + [char]0x00A3).ToString(), ([char]0x00A3).ToString())
        
        # Literal replacements for any specific legacy leftovers
        $text = $text.Replace('1585?"88', '1585–88')
        $text = $text.Replace('1558?"68', '1558–68')
        $text = $text.Replace('1569?"88', '1569–88')
        $text = $text.Replace('1570?"88', '1570–88')
        $text = $text.Replace('1559?"69', '1559–69')
        $text = $text.Replace('?~Settlement?T', '‘Settlement’')
        $text = $text.Replace('?~settlement?T', '‘settlement’')
        
        [System.IO.File]::WriteAllText($file, $text, (New-Object System.Text.UTF8Encoding $false))
    }
}
Write-Host "Cleanup complete!"

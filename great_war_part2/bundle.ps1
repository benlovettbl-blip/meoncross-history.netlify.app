# Get content of files using UTF-8 encoding to preserve emojis and special characters
$html = Get-Content -Encoding utf8 -Raw -Path "index.html"
$css = Get-Content -Encoding utf8 -Raw -Path "styles.css"
$appJs = Get-Content -Encoding utf8 -Raw -Path "app.js"

# Use literal Replace to avoid regex '$' template literal replacement corruption
$html = $html.Replace('<link rel="stylesheet" href="styles.css">', "<style>`n$css`n</style>")
$html = $html.Replace('<script type="module" src="app.js"></script>', "<script>`n$appJs`n</script>")
$html = $html.Replace('<script src="app.js"></script>', "<script>`n$appJs`n</script>")

# Write out the bundled file using UTF-8 encoding without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("bundled_app.html", $html, $utf8NoBom)
Write-Output "bundled_app.html safely rebuilt with UTF-8 encoding!"

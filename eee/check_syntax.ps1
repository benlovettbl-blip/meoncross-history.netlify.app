$htmlDoc = New-Object -ComObject "HTMLFile"
$data = Get-Content -Raw -Encoding utf8 -Path "data.js"
$app = Get-Content -Raw -Encoding utf8 -Path "app.js"

try {
    # We must add an empty script element or just use write
    $htmlDoc.write("<html><head><script>`n$data`n</script><script>`n$app`n</script></head><body></body></html>")
    Write-Host "No syntax error detected in data.js or app.js!"
} catch {
    Write-Error "Syntax error: $_"
}

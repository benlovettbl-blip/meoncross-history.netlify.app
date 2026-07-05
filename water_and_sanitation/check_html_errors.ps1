$html = Get-Content -Raw -Encoding utf8 -Path "index.html"
$injectedHtml = $html.Replace("<head>", "<head>`n<script>`nwindow.onerror = function(msg, url, line, col, err) {`n  try {`n    var fs = new ActiveXObject('Scripting.FileSystemObject');`n    var f = fs.CreateTextFile('browser_error.txt', true);`n    f.WriteLine('ERROR: ' + msg + ' at ' + url + ':' + line + ':' + col);`n    if (err && err.stack) { f.WriteLine(err.stack); }`n    f.Close();`n  } catch(e) {}`n};`n</script>")
[System.IO.File]::WriteAllText("index_test.html", $injectedHtml, [System.Text.Encoding]::UTF8)

# Run mshta.exe with index_test.html
$process = Start-Process -FilePath "mshta.exe" -ArgumentList (Get-Item "index_test.html").FullName -PassThru
Start-Sleep -Seconds 4
Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue

# Clean up index_test.html
Remove-Item "index_test.html" -ErrorAction SilentlyContinue

# Check error file
if (Test-Path "browser_error.txt") {
    $err = Get-Content -Raw -Path "browser_error.txt"
    Write-Host "Found Browser Error:" -ForegroundColor Red
    Write-Host $err -ForegroundColor Yellow
    Remove-Item "browser_error.txt"
} else {
    Write-Host "No browser error written to file (it might have run without error or MSHTA didn't write it)."
}

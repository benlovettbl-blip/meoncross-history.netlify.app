$lines = Get-Content -Path "app.js"
$line1732 = $lines[1731]
Write-Host "Line length: $($line1732.Length)"
for ($i = 0; $i -lt $line1732.Length; $i++) {
    $c = $line1732[$i]
    $val = [int][char]$c
    Write-Host "$($i) : $($c) : $($val)"
}

$lines = Get-Content -Path "app.js"
$line2580 = $lines[2579]
Write-Host "Line length: $($line2580.Length)"
for ($i = 0; $i -lt $line2580.Length; $i++) {
    $c = $line2580[$i]
    $val = [int][char]$c
    Write-Host "$($i) : $($c) : $($val)"
}

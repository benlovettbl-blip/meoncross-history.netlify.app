$lines = Get-Content -Path "app.js"
$line2565 = $lines[2564]
Write-Host "Line length: $($line2565.Length)"
for ($i = 0; $i -lt $line2565.Length; $i++) {
    $c = $line2565[$i]
    $val = [int][char]$c
    Write-Host "$($i) : $($c) : $($val)"
}

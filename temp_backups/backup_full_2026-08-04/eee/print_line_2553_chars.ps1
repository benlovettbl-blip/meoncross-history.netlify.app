$lines = Get-Content -Path "app.js"
$line2553 = $lines[2552]
Write-Host "Line length: $($line2553.Length)"
for ($i = 0; $i -lt $line2553.Length; $i++) {
    $c = $line2553[$i]
    $val = [int][char]$c
    Write-Host "$($i) : $($c) : $($val)"
}

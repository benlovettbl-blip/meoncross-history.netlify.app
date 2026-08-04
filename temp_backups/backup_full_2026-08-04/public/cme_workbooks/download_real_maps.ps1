$filename = "1947-UN-Partition-Plan-1949-Armistice-Comparison.png"
$filenameBytes = [System.Text.Encoding]::UTF8.GetBytes($filename)
$md5 = [System.Security.Cryptography.MD5]::Create()
$hashBytes = $md5.ComputeHash($filenameBytes)
$hash = ($hashBytes | ForEach-Object { $_.ToString("x2") }) -join ""
$char1 = $hash.Substring(0,1)
$char2 = $hash.Substring(0,2)
$comparisonUrl = "https://upload.wikimedia.org/wikipedia/commons/$char1/$char2/$filename"

$userAgent = "EdexcelGCSEHistoryStudyApp/1.0 (https://edexcelgcsehistorycme.netlify.app; support@example.com)"

Write-Host "Calculated MD5 Hash: $hash"
Write-Host "Calculated URL: $comparisonUrl"

Write-Host "Downloading Map..."
Invoke-WebRequest -UserAgent $userAgent -Uri $comparisonUrl -OutFile "assets/sources/1949_armistice_map.png"
Copy-Item "assets/sources/1949_armistice_map.png" "assets/sources/un_partition_plan_1947.png"

Write-Host "Successfully downloaded and copied map!"

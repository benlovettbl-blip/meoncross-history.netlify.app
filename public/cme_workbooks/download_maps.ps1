$comparisonUrl = "https://upload.wikimedia.org/wikipedia/commons/e/e4/1947-UN-Partition-Plan-1949-Armistice-Comparison.png"
$userAgent = "EdexcelGCSEHistoryStudyApp/1.0 (https://edexcelgcsehistorycme.netlify.app; support@example.com)"

Write-Host "Downloading 1949 Armistice Map..."
Invoke-WebRequest -UserAgent $userAgent -Uri $comparisonUrl -OutFile "assets/sources/1949_armistice_map.png"

Write-Host "Downloading 1947 Partition Plan Map..."
Invoke-WebRequest -UserAgent $userAgent -Uri $comparisonUrl -OutFile "assets/sources/un_partition_plan_1947.png"

Write-Host "Done!"

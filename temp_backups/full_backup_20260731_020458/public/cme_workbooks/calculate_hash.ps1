$filename = "UN_Partition_Plan_for_Palestine_1947.png"
$filenameBytes = [System.Text.Encoding]::UTF8.GetBytes($filename)
$md5 = [System.Security.Cryptography.MD5]::Create()
$hashBytes = $md5.ComputeHash($filenameBytes)
$hash = ($hashBytes | ForEach-Object { $_.ToString("x2") }) -join ""
$char1 = $hash.Substring(0,1)
$char2 = $hash.Substring(0,2)
$url = "https://upload.wikimedia.org/wikipedia/commons/$char1/$char2/$filename"

Write-Host "MD5 Hash: $hash"
Write-Host "URL: $url"

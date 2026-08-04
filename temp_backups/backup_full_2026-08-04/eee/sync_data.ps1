$cwd = Get-Location
$jsonPath = Join-Path $cwd "assets\data.json"
$jsPath = Join-Path $cwd "data.js"

if (-not (Test-Path $jsonPath)) {
    Write-Error "Source file assets/data.json not found!"
    exit 1
}

Write-Host "Syncing assets/data.json back to data.js for legacy web compatibility..."
$jsonText = Get-Content -Encoding utf8 -Raw -Path $jsonPath
$data = ConvertFrom-Json -InputObject $jsonText

# Convert each property back to a formatted JSON string
$timelineJson = $data.timelineData | ConvertTo-Json -Depth 100
$quizJson = $data.quizData | ConvertTo-Json -Depth 100
$examJson = $data.examData | ConvertTo-Json -Depth 100
$wheelJson = $data.elizabethanWheelData | ConvertTo-Json -Depth 100
$papersJson = $data.officialPastPapers | ConvertTo-Json -Depth 100

$jsContent = @"
const timelineData = $timelineJson;

const quizData = $quizJson;

const examData = $examJson;

const elizabethanWheelData = $wheelJson;

const officialPastPapers = $papersJson;

// Export variables if in node environment, otherwise make them global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { timelineData, quizData, examData, elizabethanWheelData, officialPastPapers };
}
"@

[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Successfully synchronized assets/data.json -> data.js."

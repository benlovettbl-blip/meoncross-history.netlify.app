$rootDirs = @(
    "australia",
    "cme_new",
    "cold_war",
    "early_modern_world",
    "eee",
    "great_war",
    "great_war_part2",
    "industrialisation_and_empire",
    "post_war_britain",
    "second_world_war",
    "the_shoah",
    "water_and_sanitation",
    "weimar_nazi_germany"
)

$basePath = "C:\Projects\meoncross-history.netlify.app"
$unitsPath = "$basePath\units"

foreach ($dir in $rootDirs) {
    $sourcePath = "$basePath\$dir"
    $destPath = "$unitsPath\$dir"
    
    if (Test-Path $sourcePath) {
        Write-Host "Consolidating $dir..."
        
        # Ensure destination exists
        if (-not (Test-Path $destPath)) {
            New-Item -ItemType Directory -Force -Path $destPath | Out-Null
        }
        
        # Move data.js
        if (Test-Path "$sourcePath\data.js") {
            Move-Item -Path "$sourcePath\data.js" -Destination "$destPath\data.js" -Force
            Write-Host "  Moved data.js"
        }
        
        # Move terminology_data.js if exists
        if (Test-Path "$sourcePath\terminology_data.js") {
            Move-Item -Path "$sourcePath\terminology_data.js" -Destination "$destPath\terminology_data.js" -Force
            Write-Host "  Moved terminology_data.js"
        }

        # Move any images or assets folders
        $assets = @("images", "assets")
        foreach ($asset in $assets) {
            if (Test-Path "$sourcePath\$asset") {
                # Copy instead of move, or move content? Move-Item can move directories
                Move-Item -Path "$sourcePath\$asset" -Destination "$destPath\$asset" -Force
                Write-Host "  Moved $asset folder"
            }
        }
        
        # Delete the legacy root folder completely
        Remove-Item -Path $sourcePath -Recurse -Force
        Write-Host "  Deleted legacy root folder $dir"
    } else {
        Write-Host "Directory $dir not found in root, skipping."
    }
}

Write-Host "Consolidation complete!"

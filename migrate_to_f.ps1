$ErrorActionPreference = "Stop"
$projectDir = "C:\Projects\meoncross-history.netlify.app"
$fDriveRoot = "F:\meoncross_project_data"

if (!(Test-Path $fDriveRoot)) {
    Write-Host "Creating $fDriveRoot..."
    New-Item -ItemType Directory -Force -Path $fDriveRoot | Out-Null
}

$foldersToMove = @(
    @{ Source = "$projectDir\dist"; Target = "$fDriveRoot\dist" },
    @{ Source = "$projectDir\public\assets"; Target = "$fDriveRoot\assets" },
    @{ Source = "$projectDir\temp_backups"; Target = "$fDriveRoot\temp_backups" }
)

foreach ($folder in $foldersToMove) {
    $src = $folder.Source
    $dst = $folder.Target

    if (Test-Path $src) {
        # Check if it's already a junction/symlink
        $isLink = (Get-Item $src).Attributes.HasFlag([System.IO.FileAttributes]::ReparsePoint)
        if ($isLink) {
            Write-Host "$src is already a link. Skipping."
            continue
        }

        Write-Host "Moving $src to $dst..."
        # Robocopy /E (recursive) /MOVE (delete source) /NP (no progress) /NFL /NDL (no file/dir logging) /R:1 /W:1
        $roboArgs = @($src, $dst, "/E", "/MOVE", "/NP", "/NFL", "/NDL", "/R:1", "/W:1")
        & robocopy $roboArgs | Out-Null
        # robocopy exit codes < 8 mean success
        if ($LASTEXITCODE -ge 8) {
            throw "Robocopy failed moving $src to $dst with exit code $LASTEXITCODE"
        }
        
        Write-Host "Creating junction from $src -> $dst"
        cmd /c mklink /J "`"$src`"" "`"$dst`""
    } else {
        Write-Host "$src does not exist. Skipping."
    }
}
Write-Host "Migration complete!"

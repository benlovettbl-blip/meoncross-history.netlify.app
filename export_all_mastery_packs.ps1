$files = Get-ChildItem -Path public\units\*\mastery_pack_*.html
foreach ($file in $files) {
    node export_pdfs.js $file.Directory.Name $file.Name
}

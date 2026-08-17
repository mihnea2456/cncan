$sourceDir = "E:\documente cncan\Legislatie\norme\norme de minerit radioactiv"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-minerit"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$files = Get-ChildItem -Path $sourceDir -Filter "*.pdf"
$count = 0

foreach ($f in $files) {
    if ($f.Name -like "*NMR-01*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NMR_01_Radioprotectie_Minerit.pdf" -Force
        Write-Output "Copied NMR-01"
        $count++
    }
    elseif ($f.Name -like "*NMR-02*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NMR_02_Deseuri_Minerit.pdf" -Force
        Write-Output "Copied NMR-02"
        $count++
    }
    elseif ($f.Name -like "*NMR-03*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NMR_03_Dezafectare_Instalatii_Minerit.pdf" -Force
        Write-Output "Copied NMR-03"
        $count++
    }
}

Write-Output "Total NMR files copied: $count"

$sourceDir = "E:\documente cncan\Legislatie\norme\norme urgente radiologice"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-urgente"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$mapping = @{
    "Normele privind prevenirea, pregatirea si raspunsul in caz de situatii.pdf" = "NUR_01_Norme_Urgenta_Radiologica_2018.pdf"
    "Ordin-147-MOF.pdf" = "Ordin_147_2018_Aprobare_NUR_01.pdf"
    "Regulamentul privind gestionarea situatiilor de urgenta specifice.pdf" = "Regulament_Gestionare_Urgente_Nucleare_Radiologice_2018.pdf"
    "Regulamentului privind gestionarea situatiilor de urgenta specifice.pdf" = "Ordin_150_138_2021_Modificare_Regulament_Urgente.pdf"
}

$count = 0
foreach ($origName in $mapping.Keys) {
    $srcPath = Join-Path $sourceDir $origName
    $destName = $mapping[$origName]
    $destPath = Join-Path $destDir $destName
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $destPath -Force
        $count++
        Write-Output "Copied $origName -> $destName"
    } else {
        Write-Output "WARNING: Not found $srcPath"
    }
}

Write-Output "Total NUR emergency files copied: $count"

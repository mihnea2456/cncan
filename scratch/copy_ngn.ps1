$sourceDir = "E:\documente cncan\Legislatie\norme\norme de garantii nucleare"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-garantii"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$mapping = @{
    "ngn01.pdf" = "NGN_01_Control_Garantii_Nucleare.pdf"
    "ngn02.pdf" = "NGN_02_Lista_Materiale_Proliferare.pdf"
    "ngn03.pdf" = "NGN_03_Autorizare_Activitati_Proliferare.pdf"
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

Write-Output "Total NGN files copied: $count"

$sourceDir = "E:\documente cncan\Legislatie\norme\norme privind sursele naturale de radiatii"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-surse-naturale"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$mapping = @{
    "Metodologie pentru determinarea concentratiei de radon în aerul din interiorul cladirilor si de la locurile de munca.pdf" = "Metodologie_Determinare_Radon_Ordin_153_2023.pdf"
    "Normelor privind cerinţele de securitate radiologică pentru surse naturale de radiații.pdf" = "Norme_Securitate_Surse_Naturale_Radiatii_Ordin_316_2018.pdf"
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

Write-Output "Total natural radiation files copied: $count"

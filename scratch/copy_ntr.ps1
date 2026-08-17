$sourceDir = "E:\documente cncan\Legislatie\norme\norme de transport materiale radioactive"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-transport"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$mapping = @{
    "NDR-06-Anexa-la-ord.-CNCAN-443-2008.pdf" = "NDR_06_Expedieri_Internationale_Deseuri.pdf"
    "NTR-01-Ordin-2212017-Norma-privind-cerinte-de-autorizare-transport.pdf" = "NTR_01_Autorizare_Transport.pdf"
    "NTR-03-Ordinul-2232017-Norme-privind-raportul-de-securitate-colete-de-transport.pdf" = "NTR_03_Raport_Securitate_Colete.pdf"
    "Ordin-329din2006.pdf" = "Ordin_329_2006_Expeditii_UE_Euratom.pdf"
    "Ordin-nr.-104din15062022.pdf" = "NTR_02_Ordin_104_2022_Program_Radioprotectie.pdf"
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

Write-Output "Total NTR files copied: $count"

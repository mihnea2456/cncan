$sourceDir = "E:\documente cncan\Legislatie\norme\norme de managementul calitatii"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-calitate"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$mapping = @{
    "Norme privind cerintele generale pentru sistemele de management al calitatii aplicate la realizarea, functionarea si dezafectarea instalatiilor nucleare (NMC-02).pdf" = "NMC_02_Cerinte_Generale_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii aplicate activitatilor de aprovizionare destinate instalatiilor nucleare (NMC-06).pdf" = "NMC_06_Aprovizionare_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii aplicate activitatilor de cercetare - dezvoltare in domeniul nuclear (NMC-04).pdf" = "NMC_04_Cercetare_Dezvoltare_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii aplicate activitatilor de constructii-montaj destinate instalatiilor nucleare (NMC-08).pdf" = "NMC_08_Constructii_Montaj_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii aplicate activitatilor de punere in functiune a instalatiilor nucleare (NMC-09).pdf" = "NMC_09_Punere_In_Functiune_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii aplicate la dezafectarea instalatiilor nucleare (NMC-11).pdf" = "NMC_11_Dezafectare_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii aplicate la proiectarea instalatiilor nucleare (NMC-05).pdf" = "NMC_05_Proiectare_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii aplicatela evaluarea si alegerea amplasamentelor instalatiilor nucleare (NMC-03).pdf" = "NMC_03_Evaluare_Amplasamente_SMC.pdf"
    "Norme privind cerintele specifice pentru sistemele de management al calitatii pentru exploatarea instalatiilor nucleare (NMC-10).pdf" = "NMC_10_Exploatare_SMC.pdf"
    "Normelor privind autorizarea sistemelor de management al calitatii aplicate la realizarea, functionarea si dezafectarea instalatiilor nucleare.pdf" = "NMC_01_Ordin_213_2025_Modificare_Autorizare_SMC.pdf"
    "Normelor privind cerintele specifice pentru sistemele de management al calitatii aplicate activitatilor de aprovizionare destinate instalatiilor nucleare.pdf" = "NMC_06_Ordin_214_2025_Modificare_Aprovizionare_SMC.pdf"
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

Write-Output "Total NMC quality files copied: $count"

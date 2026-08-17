$sourceDir = "E:\documente cncan\Legislatie\norme\norme si ghiduri de securitate nucleara"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-nucleara"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$mapping = @{
    "GSN-11-Ordinul-229.pdf" = "GSN_11_Investigare_Defectiuni.pdf"
    "Ordin-231NSN-23.pdf"    = "NSN_23_Modificare_Personal.pdf"
    "Ordin-232NSN-14.pdf"    = "NSN_14_Modificare_Permise_Personal.pdf"
    "nsn05.pdf"              = "NSN_05_Limite_si_Conditii_Operare.pdf"
    "nsn06.pdf"              = "NSN_06_Protectie_Evenimente_Naturale.pdf"
    "nsn07.pdf"              = "NSN_07_Raspuns_Tranzienti_si_Accidente.pdf"
    "nsn08.pdf"              = "NSN_08_Evaluari_Probabilistice_Securitate.pdf"
    "nsn09.pdf"              = "NSN_09_Protectie_Incendii_CNE.pdf"
    "nsn10.pdf"              = "NSN_10_Revizuire_Periodica_Securitate.pdf"
    "nsn11.pdf"              = "NSN_11_Sistem_Racire_Avarie.pdf"
    "nsn14.pdf"              = "NSN_14_Permise_Exercitare_Personal.pdf"
    "nsn15.pdf"              = "NSN_15_Verificare_Independenta_Analize.pdf"
    "nsn16.pdf"              = "NSN_16_Supraveghere_si_Inspectii_Exploatare.pdf"
    "nsn17.pdf"              = "NSN_17_Management_Imbatranire.pdf"
    "nsn18.pdf"              = "NSN_18_Raportare_si_Analiza_Evenimente.pdf"
    "nsn19.pdf"              = "NSN_19_Modificari_Proiect_si_Configuratie.pdf"
    "nsn20.pdf"              = "NSN_20_Politica_si_Evaluare_Securitate.pdf"
    "nsn22.pdf"              = "NSN_22_Autorizare_Instalatii_Nucleare.pdf"
    "nsn23.pdf"              = "NSN_23_Pregatire_si_Calificare_Personal.pdf"
    "nsn27.pdf"              = "NSN_27_Utilizare_Standarde_Securitate.pdf"
    "nsn31.pdf"              = "NSN_31_Inteligenta_Artificiala_in_Nuclear.pdf"
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

Write-Output "Total NSN files copied: $count"

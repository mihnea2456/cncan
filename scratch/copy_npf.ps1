$sourceDir = "E:\documente cncan\Legislatie\norme\norma de protectie fizica in domeniul nuclear"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-protectie-fizica"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$files = Get-ChildItem -Path $sourceDir -Filter "*.pdf"
$count = 0

foreach ($f in $files) {
    if ($f.Name -like "*Normele de protectie fizica in domeniul nuclear*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NPF_01_Protectie_Fizica_Fundamentale.pdf" -Force
        Write-Output "Copied NPF-01"
        $count++
    }
    elseif ($f.Name -like "*utilizarea standardelor*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NPF_02_Standarde_Protectie_Fizica.pdf" -Force
        Write-Output "Copied NPF-02"
        $count++
    }
    elseif ($f.Name -eq "npf03.pdf") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NPF_03_Avizare_Personal_Permanent.pdf" -Force
        Write-Output "Copied NPF-03"
        $count++
    }
    elseif ($f.Name -eq "Norme privind cerintele pentru angajarea, pregatirea si calificarea personalului.pdf") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NPF_04_Calificare_Personal_Paza.pdf" -Force
        Write-Output "Copied NPF-04"
        $count++
    }
}

Write-Output "Total NPF files copied: $count"

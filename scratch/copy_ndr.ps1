$sourceDir = "E:\documente cncan\Legislatie\norme\norme privind managementul deseurilor radioactive"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-deseuri"

$files = Get-ChildItem -Path $sourceDir -Filter "*.pdf"
$count = 0

foreach ($f in $files) {
    if ($f.Name -like "*dezafectare*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NDR_05_Dezafectare_Instalatii_2022.pdf" -Force
        Write-Output "Copied NDR-05 (Ordin 102/2022)"
        $count++
    }
    elseif ($f.Name -like "*Norme fundamentale pentru gestionarea*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NDR_01_Fundamentale_Deseuri_2022.pdf" -Force
        Write-Output "Copied NDR-01 (Ordin 74/2022)"
        $count++
    }
    elseif ($f.Name -like "*cerintele de eliberare a materialelor si cladirilor de sub regimul de autorizare al Comisiei*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NDR_06_Eliberare_Sub_Regim_Autorizare_2022.pdf" -Force
        Write-Output "Copied NDR-06 (Ordin 155/2022)"
        $count++
    }
    elseif ($f.Name -like "*NDR-03*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NDR_03_Clasificare_Deseuri.pdf" -Force
        Write-Output "Copied NDR-03"
        $count++
    }
    elseif ($f.Name -like "*NDR-04*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NDR_04_Limitare_Efluenti_Mediu.pdf" -Force
        Write-Output "Copied NDR-04"
        $count++
    }
    elseif ($f.Name -like "*predepozitare*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NDR_02_Predepozitare_Deseuri_2022.pdf" -Force
        Write-Output "Copied NDR-02 (Ordin 103/2022)"
        $count++
    }
    elseif ($f.Name -like "*Normele privind cerintele de eliberare a materialelor si cladirilor de sub regimul de autorizare.pdf*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\Ordin_80_2025_Modificare_Eliberare.pdf" -Force
        Write-Output "Copied Ordin 80/2025"
        $count++
    }
}

Write-Output "Total NDR waste files copied: $count"

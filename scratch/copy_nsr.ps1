$src = "E:\documente cncan\Legislatie\norme\norme de securitate radiologica"
$dst = "public/documents/legislatie/norme/norme-radiologica"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Remove-Item -Path "$dst\*" -Force -ErrorAction SilentlyContinue

Get-ChildItem -Path $src | ForEach-Object {
    $origName = $_.Name
    $targetName = ""
    if ($origName -like "*cerintele de baza*") { $targetName = "NSR_01_Cerinte_de_Baza.pdf" }
    elseif ($origName -like "*estimarea dozelor efective*") { $targetName = "NSR_Estimare_Doze_Expunere.pdf" }
    elseif ($origName -like "*controlul reglementat al surselor*") { $targetName = "NSR_Control_Surse_si_Surse_Orfane.pdf" }
    elseif ($origName -like "*medicina nucleara*") { $targetName = "NSR_14_Medicina_Nucleara.pdf" }
    elseif ($origName -like "*radioterapie*") { $targetName = "NSR_12_Radioterapie.pdf" }
    elseif ($origName -like "*radiologie de diagnostic*") { $targetName = "NSR_Radiologie_Diagnostic_Interventie.pdf" }
    elseif ($origName -like "*(NSR-06)*") { $targetName = "NSR_06_Dozimetrie_Individuala.pdf" }
    elseif ($origName -like "*si radon*") { $targetName = "NSR_Dozimetrie_si_Radon.pdf" }
    elseif ($origName -like "*(NSR-21)*") { $targetName = "NSR_21_Monitorizare_Emisii.pdf" }
    elseif ($origName -like "*(NSR-22)*") { $targetName = "NSR_22_Monitorizare_Mediu.pdf" }
    elseif ($origName -like "*(NSR-23)*") { $targetName = "NSR_23_Dispersie_Efluenti.pdf" }
    elseif ($origName -like "*(NSR-24)*") { $targetName = "NSR_24_Meteo_Hidro.pdf" }
    elseif ($origName -like "*(NSR-15)*") { $targetName = "NSR_15_Echipament_Protectie.pdf" }
    elseif ($origName -like "*(NSR-05)*") { $targetName = "NSR_05_Lucru_Exterior.pdf" }
    elseif ($origName -like "*(NSR-30)*") { $targetName = "NSR_30_Sisteme_Masurare.pdf" }
    elseif ($origName -like "*control nedistructiv*") { $targetName = "NSR_Control_Nedistructiv_CND.pdf" }
    elseif ($origName -like "*control al parametrilor de proces*") { $targetName = "NSR_Control_Parametri_Proces.pdf" }
    elseif ($origName -like "*aeronavelor*") { $targetName = "NSR_Control_Securitate_Colete_Cargo.pdf" }
    elseif ($origName -like "*(NSR-07)*") { $targetName = "NSR_07_Permise_si_Experti.pdf" }
    elseif ($origName -like "*intreprinderilor externe*") { $targetName = "NSR_Acceptare_Intreprinderi_Externe.pdf" }
    elseif ($origName -like "*expertul in fizica medicala*") { $targetName = "NSR_Expert_Fizica_Medicala.pdf" }
    elseif ($origName -like "*desemnare a laboratoarelor*") { $targetName = "NSR_Desemnare_Laboratoare.pdf" }
    elseif ($origName -like "*(NSR-04)*") { $targetName = "NSR_04_Expuneri_Medicale.pdf" }
    elseif ($origName -like "*scolarizare si pregatire*") { $targetName = "NSR_Pregatire_Personal_Medical.pdf" }
    else {
        $targetName = $origName -replace '[^a-zA-Z0-9_\-\.]', '_'
    }
    Copy-Item $_.FullName -Destination "$dst/$targetName" -Force
}

$count = (Get-ChildItem $dst).Count
Write-Host "Copied $count files successfully!"
Get-ChildItem $dst | Select-Object Name

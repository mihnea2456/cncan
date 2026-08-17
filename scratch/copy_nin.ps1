$sourceDir = "E:\documente cncan\Legislatie\norme\norme comune interdepartamentale"
$destDir = "$PSScriptRoot\..\public\documents\legislatie\norme\norme-interdepartamentale"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Write-Output "Created directory $destDir"
}

$files = Get-ChildItem -Path $sourceDir -Filter "*.pdf"
$count = 0

foreach ($f in $files) {
    if ($f.Name -like "*NIN-01*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NIN_01_Alimente_si_Furaje_Contaminate.pdf" -Force
        Write-Output "Copied NIN-01"
        $count++
    }
    elseif ($f.Name -like "*NIN-02*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NIN_02_Alimente_Tratate_cu_Radiatii.pdf" -Force
        Write-Output "Copied NIN-02"
        $count++
    }
    elseif ($f.Name -like "*NIN-03*") {
        Copy-Item -Path $f.FullName -Destination "$destDir\NIN_03_Monitorizare_Materiale_Metalice.pdf" -Force
        Write-Output "Copied NIN-03"
        $count++
    }
}

Write-Output "Total NIN files copied: $count"

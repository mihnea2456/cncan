param([string]$ImagePath)

Add-Type -AssemblyName WindowsBase | Out-Null
[System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime") | Out-Null

$asTaskGeneric = ([System.Windows.Threading.Dispatcher].Assembly.GetType("System.Windows.Threading.ExceptionWrapper").Assembly.GetType("System.Threading.Tasks.TaskExtensions").GetMethods() | Where-Object { $_.Name -eq 'GetAwaiter' -and $_.GetParameters().Length -eq 1 })[0]

function Await($Task) {
    $awaiter = $asTaskGeneric.Invoke($null, @($Task))
    $awaiter.GetResult()
}

$fileTask = [Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]::GetFileFromPathAsync($ImagePath)
$file = Await $fileTask
$streamTask = $file.OpenReadAsync()
$stream = Await $streamTask

$decoderTask = [Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics,ContentType=WindowsRuntime]::CreateAsync($stream)
$decoder = Await $decoderTask

$bitmapTask = $decoder.GetSoftwareBitmapAsync()
$bitmap = Await $bitmapTask

$engine = [Windows.Media.Ocr.OcrEngine,Windows.Media.Ocr,ContentType=WindowsRuntime]::TryCreateFromUserProfileLanguages()
$ocrTask = $engine.RecognizeAsync($bitmap)
$res = Await $ocrTask
Write-Output $res.Text

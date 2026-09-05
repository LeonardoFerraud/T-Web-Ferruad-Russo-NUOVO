$ErrorActionPreference = 'Stop'

$backendPath = $PSScriptRoot
$jarPath = Join-Path $backendPath 'target\t-web-backend-0.0.1-SNAPSHOT.jar'
$outputLog = Join-Path $backendPath 'backend-run.log'
$errorLog = Join-Path $backendPath 'backend-run-error.log'

$listener = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
if ($listener) {
    Write-Host "Backend gia attivo sulla porta 8080 (PID $($listener[0].OwningProcess))."
    exit 0
}

if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    throw 'Java non e installato o non e presente nel PATH.'
}

if (-not (Test-Path $jarPath)) {
    throw "JAR non trovato: $jarPath. Esegui prima la build del backend."
}

Start-Process -FilePath 'java' `
    -ArgumentList '-jar', $jarPath `
    -WorkingDirectory $backendPath `
    -WindowStyle Hidden `
    -RedirectStandardOutput $outputLog `
    -RedirectStandardError $errorLog

for ($attempt = 0; $attempt -lt 30; $attempt++) {
    if (Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue) {
        Write-Host 'Backend avviato in background sulla porta 8080.'
        exit 0
    }
    Start-Sleep -Seconds 1
}

throw "Il backend non ha iniziato ad ascoltare sulla porta 8080. Controlla il log: $errorLog"

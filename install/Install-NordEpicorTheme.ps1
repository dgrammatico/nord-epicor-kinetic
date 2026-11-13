<#
.SYNOPSIS
    Installs the Nord Polar Night theme for Epicor Kinetic for the current user.

.DESCRIPTION
    Runs per user and does not need administrator rights. It:
      1. Installs the Inter font for the current user (the theme's typeface), unless -SkipFont.
      2. Finds Firefox, Chrome and Edge, and for each one you pick:
           - opens the Stylus extension page so you can add Stylus (skip with -SkipStylus), then
           - opens the theme's .user.css in that browser, where Stylus shows its "Install style" page.
    Stylus then keeps the theme updated from GitHub automatically.

    Nothing is changed in the browser without you clicking Stylus's own Install buttons.

.PARAMETER Browser
    One or more of: Firefox, Chrome, Edge, All. If omitted, you are asked.

.PARAMETER SkipFont
    Do not install Inter (the theme falls back to Segoe UI).

.PARAMETER SkipStylus
    Do not open the Stylus extension page (use when Stylus is already installed).

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\Install-NordEpicorTheme.ps1

.EXAMPLE
    .\Install-NordEpicorTheme.ps1 -Browser Firefox -SkipStylus
#>
[CmdletBinding()]
param(
    [ValidateSet('Firefox', 'Chrome', 'Edge', 'All')]
    [string[]]$Browser,
    [switch]$SkipFont,
    [switch]$SkipStylus
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$Repo     = 'dgrammatico/nord-epicor-kinetic'
$StyleUrl = "https://raw.githubusercontent.com/$Repo/main/epicor-kinetic-nord.user.css"
$InterVersion = '4.1'
$InterZip = "https://github.com/rsms/inter/releases/download/v$InterVersion/Inter-$InterVersion.zip"

$StylusPages = @{
    Firefox = 'https://addons.mozilla.org/firefox/addon/styl-us/'
    Chrome  = 'https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne'
    Edge    = 'https://microsoftedge.microsoft.com/addons/detail/stylus/ogjnbcnhnehbhfghiikbmhbjnlnhkljd'
}

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)   { Write-Host "    $msg" -ForegroundColor Green }
function Write-Note($msg) { Write-Host "    $msg" -ForegroundColor DarkGray }

# ---------------------------------------------------------------- browsers
function Find-BrowserExe([string]$name) {
    $candidates = switch ($name) {
        'Firefox' { @("$env:ProgramFiles\Mozilla Firefox\firefox.exe", "${env:ProgramFiles(x86)}\Mozilla Firefox\firefox.exe", "$env:LOCALAPPDATA\Mozilla Firefox\firefox.exe") }
        'Chrome'  { @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe", "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe", "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe") }
        'Edge'    { @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") }
    }
    foreach ($c in $candidates) { if ($c -and (Test-Path $c)) { return $c } }
    $exe = @{ Firefox = 'firefox.exe'; Chrome = 'chrome.exe'; Edge = 'msedge.exe' }[$name]
    foreach ($hive in 'HKCU:', 'HKLM:') {
        $key = "$hive\Software\Microsoft\Windows\CurrentVersion\App Paths\$exe"
        if (Test-Path $key) { $p = (Get-ItemProperty $key).'(default)'; if ($p -and (Test-Path $p)) { return $p } }
    }
    return $null
}

$found = [ordered]@{}
foreach ($b in 'Firefox', 'Chrome', 'Edge') { $p = Find-BrowserExe $b; if ($p) { $found[$b] = $p } }

if (-not $found.Count) { throw 'No supported browser found (Firefox, Chrome or Edge).' }

if (-not $Browser) {
    Write-Host ''
    Write-Host 'Install the theme in which browser(s)?' -ForegroundColor White
    $i = 1; $keys = @($found.Keys)
    foreach ($k in $keys) { Write-Host "  [$i] $k"; $i++ }
    Write-Host "  [A] All of the above"
    $ans = Read-Host 'Choice (e.g. 1 or 1,2 or A)'
    if ($ans -match '^[Aa]') { $Browser = $keys }
    else { $Browser = $ans -split '[,\s]+' | Where-Object { $_ -match '^\d+$' } | ForEach-Object { $keys[[int]$_ - 1] } | Where-Object { $_ } }
}
if ($Browser -contains 'All') { $Browser = @($found.Keys) }
$Browser = @($Browser | Select-Object -Unique)
$missing = $Browser | Where-Object { -not $found.Contains($_) }
if ($missing) { Write-Warning ("Not installed, skipping: " + ($missing -join ', ')) }
$Browser = @($Browser | Where-Object { $found.Contains($_) })
if (-not $Browser.Count) { throw 'Nothing to do: none of the chosen browsers are installed.' }

# ---------------------------------------------------------------- Inter font (per user, no admin)
function Install-InterFont {
    $fontDir = Join-Path $env:LOCALAPPDATA 'Microsoft\Windows\Fonts'
    $regKey  = 'HKCU:\Software\Microsoft\Windows NT\CurrentVersion\Fonts'
    $already = (Get-ChildItem $fontDir -Filter 'Inter*.tt*' -ErrorAction SilentlyContinue) -or
               (Get-ChildItem "$env:WINDIR\Fonts" -Filter 'Inter*.tt*' -ErrorAction SilentlyContinue)
    if ($already) { Write-Ok 'Inter is already installed.'; return }

    $tmp = Join-Path ([IO.Path]::GetTempPath()) ("inter-" + [guid]::NewGuid())
    New-Item -ItemType Directory -Path $tmp | Out-Null
    try {
        Write-Note "Downloading Inter $InterVersion from github.com/rsms/inter"
        Invoke-WebRequest -Uri $InterZip -OutFile "$tmp\inter.zip" -UseBasicParsing
        Expand-Archive "$tmp\inter.zip" -DestinationPath "$tmp\x" -Force
        # static TTFs only (extras\ttf\Inter-*.ttf); mixing them with InterVariable confuses Windows font matching
        $fonts = Get-ChildItem "$tmp\x" -Recurse -Filter 'Inter-*.ttf' | Where-Object { $_.FullName -match '\\ttf\\' }
        if (-not $fonts) { $fonts = Get-ChildItem "$tmp\x" -Recurse -Filter 'InterVariable*.ttf' }
        New-Item -ItemType Directory -Path $fontDir -Force | Out-Null
        if (-not (Test-Path $regKey)) { New-Item -Path $regKey -Force | Out-Null }
        foreach ($f in $fonts) {
            $dest = Join-Path $fontDir $f.Name
            Copy-Item $f.FullName $dest -Force
            $face = [IO.Path]::GetFileNameWithoutExtension($f.Name) -replace '-', ' '
            New-ItemProperty -Path $regKey -Name "$face (TrueType)" -Value $dest -PropertyType String -Force | Out-Null
        }
        Write-Ok "Installed $($fonts.Count) Inter font file(s) for $env:USERNAME. Restart the browser to pick them up."
    }
    finally { Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue }
}

# ---------------------------------------------------------------- run
Write-Host ''
Write-Host 'Nord Polar Night for Epicor Kinetic' -ForegroundColor White
Write-Host "Theme: $StyleUrl" -ForegroundColor DarkGray

if (-not $SkipFont) {
    Write-Step 'Installing the Inter font (current user only)'
    try { Install-InterFont } catch { Write-Warning "Inter could not be installed ($($_.Exception.Message)). The theme still works with Segoe UI." }
}

foreach ($b in $Browser) {
    $exe = $found[$b]
    Write-Step "$b"
    if (-not $SkipStylus) {
        Write-Note 'Opening the Stylus extension page. Click "Add" / "Get" if Stylus is not installed yet.'
        Start-Process -FilePath $exe -ArgumentList $StylusPages[$b]
        [void](Read-Host "    Press Enter once Stylus is installed in $b")
    }
    Write-Note 'Opening the theme. In the Stylus tab that appears, click "Install style".'
    Start-Process -FilePath $exe -ArgumentList $StyleUrl
}

Write-Host ''
Write-Ok 'Done. Open (or reload) Epicor Kinetic to see the theme.'
Write-Note 'Stylus checks GitHub for updates automatically (Stylus > Manage > Check for updates to force it).'
Write-Note 'To remove: Stylus > Manage > delete "Epicor Kinetic - Nord Polar Night".'

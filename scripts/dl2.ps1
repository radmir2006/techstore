$dest = Join-Path $PSScriptRoot "..\public\products"
$h = @{
    "User-Agent" = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    "Referer" = "https://www.apple.com/"
    "Accept" = "image/webp,image/apng,image/*,*/*;q=0.8"
}
$C = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is"
$Q = "?wid=800&hei=800&fmt=jpeg&qlt=90"

$imgs = @(
    # iPhone 16 — correct names from Apple page
    @{n="iphone16-black.jpg";    u="$C/iphone16-black-select-202409$Q"},
    @{n="iphone16-white.jpg";    u="$C/iphone16-white-select-202409$Q"},
    @{n="iphone16-pink.jpg";     u="$C/iphone16-pink-select-202409$Q"},
    @{n="iphone16-teal.jpg";     u="$C/iphone16-teal-select-202409$Q"},
    @{n="iphone16-ultramarine.jpg"; u="$C/iphone16-ultramarine-select-202409$Q"},
    # iPhone 16 Pro
    @{n="iphone16pro-black.jpg";    u="$C/iphone16pro-blacktitanium-select-202409$Q"},
    @{n="iphone16pro-white.jpg";    u="$C/iphone16pro-whitetitanium-select-202409$Q"},
    @{n="iphone16pro-natural.jpg";  u="$C/iphone16pro-naturaltitanium-select-202409$Q"},
    @{n="iphone16pro-desert.jpg";   u="$C/iphone16pro-deserttitanium-select-202409$Q"},
    # iPhone 16 Pro Max
    @{n="iphone16promax-black.jpg";   u="$C/iphone16promax-blacktitanium-select-202409$Q"},
    @{n="iphone16promax-white.jpg";   u="$C/iphone16promax-whitetitanium-select-202409$Q"},
    @{n="iphone16promax-natural.jpg"; u="$C/iphone16promax-naturaltitanium-select-202409$Q"},
    @{n="iphone16promax-desert.jpg";  u="$C/iphone16promax-deserttitanium-select-202409$Q"},
    # iPhone 17
    @{n="iphone17-black.jpg";    u="$C/iphone17-black-select-202509$Q"},
    @{n="iphone17-white.jpg";    u="$C/iphone17-white-select-202509$Q"},
    @{n="iphone17-lavender.jpg"; u="$C/iphone17-lavender-select-202509$Q"},
    @{n="iphone17-sage.jpg";     u="$C/iphone17-sage-select-202509$Q"},
    @{n="iphone17-mistblue.jpg"; u="$C/iphone17-mistblue-select-202509$Q"},
    # iPhone 17 Pro
    @{n="iphone17pro-orange.jpg"; u="$C/iphone17pro-orange-select-202509$Q"},
    @{n="iphone17pro-white.jpg";  u="$C/iphone17pro-white-select-202509$Q"},
    @{n="iphone17pro-blue.jpg";   u="$C/iphone17pro-blue-select-202509$Q"},
    # iPhone 17 Pro Max
    @{n="iphone17promax-orange.jpg"; u="$C/iphone17promax-orange-select-202509$Q"},
    @{n="iphone17promax-white.jpg";  u="$C/iphone17promax-white-select-202509$Q"},
    @{n="iphone17promax-blue.jpg";   u="$C/iphone17promax-blue-select-202509$Q"}
)

$ok=0; $fail=0
foreach ($i in $imgs) {
    $p = Join-Path $dest $i.n
    try {
        Invoke-WebRequest -Uri $i.u -OutFile $p -Headers $h -TimeoutSec 25 -ErrorAction Stop
        $sz = (Get-Item $p).Length
        if ($sz -gt 5000) { Write-Host "OK  $($i.n) ($sz bytes)"; $ok++ }
        else { Write-Host "SMALL $($i.n) ($sz bytes)"; Remove-Item $p -Force; $fail++ }
    } catch {
        $msg = $_.Exception.Message
        if ($msg.Length -gt 80) { $msg = $msg.Substring(0,80) }
        Write-Host "FAIL $($i.n): $msg"; $fail++
    }
}
Write-Host ""
Write-Host "Result: $ok OK, $fail FAIL"

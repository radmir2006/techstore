$dest = Join-Path $PSScriptRoot "..\public\products"
$h = @{ "User-Agent"="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"; "Referer"="https://www.apple.com/" }
$C = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is"
$C17 = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is"
$Q = "?wid=800&hei=800&fmt=jpeg&qlt=90"
$imgs = @(
  @{n="iphone16-black.jpg";url="$C/iphone16-black-select-202409$Q"},
  @{n="iphone16-white.jpg";url="$C/iphone16-white-select-202409$Q"},
  @{n="iphone16-pink.jpg";url="$C/iphone16-pink-select-202409$Q"},
  @{n="iphone16-teal.jpg";url="$C/iphone16-teal-select-202409$Q"},
  @{n="iphone16-ultramarine.jpg";url="$C/iphone16-ultramarine-select-202409$Q"},
  @{n="iphone16pro-black.jpg";url="$C/iphone16pro-blacktitanium-select-202409$Q"},
  @{n="iphone16pro-white.jpg";url="$C/iphone16pro-whitetitanium-select-202409$Q"},
  @{n="iphone16pro-natural.jpg";url="$C/iphone16pro-naturaltitanium-select-202409$Q"},
  @{n="iphone16pro-desert.jpg";url="$C/iphone16pro-deserttitanium-select-202409$Q"},
  @{n="iphone16promax-black.jpg";url="$C/iphone16promax-blacktitanium-select-202409$Q"},
  @{n="iphone16promax-white.jpg";url="$C/iphone16promax-whitetitanium-select-202409$Q"},
  @{n="iphone16promax-natural.jpg";url="$C/iphone16promax-naturaltitanium-select-202409$Q"},
  @{n="iphone16promax-desert.jpg";url="$C/iphone16promax-deserttitanium-select-202409$Q"},
  @{n="iphone17-black.jpg";url="$C17/iphone17-black-select-202509$Q"},
  @{n="iphone17-white.jpg";url="$C17/iphone17-white-select-202509$Q"},
  @{n="iphone17-lavender.jpg";url="$C17/iphone17-lavender-select-202509$Q"},
  @{n="iphone17-sage.jpg";url="$C17/iphone17-sage-select-202509$Q"},
  @{n="iphone17-mistblue.jpg";url="$C17/iphone17-mistblue-select-202509$Q"},
  @{n="iphone17pro-orange.jpg";url="$C17/iphone17pro-orange-select-202509$Q"},
  @{n="iphone17pro-white.jpg";url="$C17/iphone17pro-white-select-202509$Q"},
  @{n="iphone17pro-blue.jpg";url="$C17/iphone17pro-blue-select-202509$Q"},
  @{n="iphone17promax-orange.jpg";url="$C17/iphone17promax-orange-select-202509$Q"},
  @{n="iphone17promax-white.jpg";url="$C17/iphone17promax-white-select-202509$Q"},
  @{n="iphone17promax-blue.jpg";url="$C17/iphone17promax-blue-select-202509$Q"}
)
$ok=0; $fail=0
foreach ($i in $imgs) {
  $p = Join-Path $dest $i.n
  try {
    Invoke-WebRequest -Uri $i.url -OutFile $p -Headers $h -TimeoutSec 20 -ErrorAction Stop
    $sz = (Get-Item $p).Length
    if ($sz -gt 5000) { Write-Host "OK  $($i.n) ($sz)"; $ok++ }
    else { Write-Host "SMALL $($i.n) ($sz)"; $fail++ }
  } catch { Write-Host "FAIL $($i.n): $($_.Exception.Message.Substring(0,[Math]::Min(60,$_.Exception.Message.Length)))"; $fail++ }
}
Write-Host "Result: $ok OK, $fail FAIL"

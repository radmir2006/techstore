$dest = "d:\Downloads\ДП\Диплом Максим\public\products"
$headers = @{
    "User-Agent" = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    "Referer" = "https://www.apple.com/"
    "Accept" = "image/webp,image/apng,image/*,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.9"
}

$CDN = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is"
$CDN17 = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is"
$Q = "?wid=800&hei=800&fmt=jpeg&qlt=90"

$images = @(
    # iPhone 16
    @{ name = "iphone16-black.jpg";        url = "$CDN/iphone16-black-select-202409$Q" },
    @{ name = "iphone16-white.jpg";        url = "$CDN/iphone16-white-select-202409$Q" },
    @{ name = "iphone16-pink.jpg";         url = "$CDN/iphone16-pink-select-202409$Q" },
    @{ name = "iphone16-teal.jpg";         url = "$CDN/iphone16-teal-select-202409$Q" },
    @{ name = "iphone16-ultramarine.jpg";  url = "$CDN/iphone16-ultramarine-select-202409$Q" },
    # iPhone 16 Pro
    @{ name = "iphone16pro-black.jpg";     url = "$CDN/iphone16pro-blacktitanium-select-202409$Q" },
    @{ name = "iphone16pro-white.jpg";     url = "$CDN/iphone16pro-whitetitanium-select-202409$Q" },
    @{ name = "iphone16pro-natural.jpg";   url = "$CDN/iphone16pro-naturaltitanium-select-202409$Q" },
    @{ name = "iphone16pro-desert.jpg";    url = "$CDN/iphone16pro-deserttitanium-select-202409$Q" },
    # iPhone 16 Pro Max
    @{ name = "iphone16promax-black.jpg";  url = "$CDN/iphone16promax-blacktitanium-select-202409$Q" },
    @{ name = "iphone16promax-white.jpg";  url = "$CDN/iphone16promax-whitetitanium-select-202409$Q" },
    @{ name = "iphone16promax-natural.jpg"; url = "$CDN/iphone16promax-naturaltitanium-select-202409$Q" },
    @{ name = "iphone16promax-desert.jpg"; url = "$CDN/iphone16promax-deserttitanium-select-202409$Q" },
    # iPhone 17
    @{ name = "iphone17-black.jpg";        url = "$CDN17/iphone17-black-select-202509$Q" },
    @{ name = "iphone17-white.jpg";        url = "$CDN17/iphone17-white-select-202509$Q" },
    @{ name = "iphone17-lavender.jpg";     url = "$CDN17/iphone17-lavender-select-202509$Q" },
    @{ name = "iphone17-sage.jpg";         url = "$CDN17/iphone17-sage-select-202509$Q" },
    @{ name = "iphone17-mistblue.jpg";     url = "$CDN17/iphone17-mistblue-select-202509$Q" },
    # iPhone 17 Pro
    @{ name = "iphone17pro-orange.jpg";    url = "$CDN17/iphone17pro-orange-select-202509$Q" },
    @{ name = "iphone17pro-white.jpg";     url = "$CDN17/iphone17pro-white-select-202509$Q" },
    @{ name = "iphone17pro-blue.jpg";      url = "$CDN17/iphone17pro-blue-select-202509$Q" },
    # iPhone 17 Pro Max
    @{ name = "iphone17promax-orange.jpg"; url = "$CDN17/iphone17promax-orange-select-202509$Q" },
    @{ name = "iphone17promax-white.jpg";  url = "$CDN17/iphone17promax-white-select-202509$Q" },
    @{ name = "iphone17promax-blue.jpg";   url = "$CDN17/iphone17promax-blue-select-202509$Q" }
)

$ok = 0
$fail = 0

foreach ($img in $images) {
    $path = "$dest\$($img.name)"
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $path -Headers $headers -TimeoutSec 20 -ErrorAction Stop
        $size = (Get-Item $path).Length
        if ($size -gt 5000) {
            Write-Host "OK  $($img.name) ($size bytes)"
            $ok++
        } else {
            Write-Host "SMALL $($img.name) ($size bytes) - may be error page"
            $fail++
        }
    } catch {
        Write-Host "FAIL $($img.name): $($_.Exception.Message.Substring(0, [Math]::Min(80, $_.Exception.Message.Length)))"
        $fail++
    }
}

Write-Host ""
Write-Host "Done: $ok OK, $fail FAIL"

$dest = Join-Path $PSScriptRoot "..\public\products"
$h = @{
    "User-Agent" = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    "Referer" = "https://www.apple.com/"
    "Accept" = "image/webp,image/apng,image/*,*/*;q=0.8"
}

# Real URLs extracted from Apple pages with valid .v= tokens
$imgs = @(
    # iPhone 16 — from apple.com/iphone-16/ page
    @{n="iphone16-ultramarine.jpg"; u="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-ultramarine-select-202409_AV2?wid=800&hei=800&fmt=jpeg&qlt=90&.v=aWI5aGdudlZCalMrV3A2QU5NeUlaUS9CQ2hhaHB3cVp0QldQUmg0R3F6NllxU28wRmJ4M1hpa3FkUmRTa2QzR3JjdDZMRlVXdmhWTll0OTAwWGNkeVFXTjFyWXN6MmFjVTVuYkt2UFozY1c1dlhmNHBVNHcrZU96OHBHOXk0MC8"},
    # iPhone 17 compare images — from apple.com/iphone-16/ compare section
    @{n="iphone17-lavender-compare.png"; u="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-17-202509?wid=400&hei=512&fmt=png-alpha&.v=M0dlUVBobHVpY1h1dmlaR3RZekpENGh0eTVTNkN2NWpWZVAwbzMwQlBCTkxxZU5scXpES1hnUm96ckN1R2pZN215d1FhSDJ0bkR0ZGZtUjZJNmFveFo2eWNJSlJFRDM1UWQ2eUozZ1l5ZDA"},
    @{n="iphone17pro-orange-compare.png"; u="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-17-pro-202509?wid=400&hei=512&fmt=png-alpha&.v=M0dlUVBobHVpY1h1dmlaR3RZekpEMi9sbCsxVVJmYjNiS29STjQrZEV5NnNlL1VpWDFHcHBMQXVUWWdWdkZZNGJPbDJJWDFrVGJEYlIxTitTcHhVWldNTk4rSDJkMy8vL20va2hrM1NheXZ4VldteDRHenNWeThpV3EzUWVVd2o"}
)

$ok=0; $fail=0
foreach ($i in $imgs) {
    $p = Join-Path $dest $i.n
    try {
        Invoke-WebRequest -Uri $i.u -OutFile $p -Headers $h -TimeoutSec 25 -ErrorAction Stop
        $sz = (Get-Item $p).Length
        if ($sz -gt 5000) { Write-Host "OK  $($i.n) ($sz bytes)"; $ok++ }
        else { Write-Host "SMALL $($i.n) ($sz bytes)"; $fail++ }
    } catch {
        Write-Host "FAIL $($i.n): $($_.Exception.Message.Substring(0,[Math]::Min(80,$_.Exception.Message.Length)))"
        $fail++
    }
}
Write-Host "Result: $ok OK, $fail FAIL"

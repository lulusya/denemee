# Lounge Barber

Premium, interaktif bir web sitesi (TR) — HTML, CSS ve Vanilla JS.

## Özellikler
- Minimal-premium üst menü (glassmorphism, underline hover)
- Mobil çekmece (drawer) menü
- Ana sayfa: Hero, konsept, deneyimler, ekip, galeri, iletişim
- Randevu: 3 adımlı rezervasyon akışı (service/barber/tarih-saat + bilgiler + onay)
- Galeri: Filtreleme, lightbox, load more
- Hakkımızda: Hikaye, felsefe, ürünler, zaman çizelgesi, değerler
- Deneyim Detay: "Lounge Kesim & Stil" sayfası, süreç ve SSS

## Çalıştırma
- Herhangi bir sunucu gerektirmez. `index.html` dosyasını tarayıcıda açın.
- Geliştirme için VS Code "Live Server" veya "Five Server" ile otomatik yenileme kullanabilirsiniz.

## Yapı
```
.
├─ index.html
├─ about.html / about.css / about.js
├─ gallery.html / gallery.css / gallery.js
├─ booking.html / booking.css / booking.js
├─ service-haircut.html / service-detail.css / service-detail.js
├─ style.css
├─ script.js
└─ .github/copilot-instructions.md
```

## Notlar
- Üst menü tüm sayfalarda `.site-header` ile birleştirildi.
- Aktif link vurgusu ve scroll ile küçülme (shrink) davranışı eklendi.
- Tasarım: Playfair Display + Montserrat, bronz/altın vurgular, koyu tema.


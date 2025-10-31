# Copilot Instructions for denemee Codebase

## Genel Mimari
Bu proje, temel bir web uygulaması olarak yapılandırılmıştır ve üç ana dosyadan oluşur:
- `index.html`: Ana HTML dosyası, uygulamanın giriş noktasıdır.
- `script.js`: Tüm JavaScript kodları burada yer alır. (Şu anda boş)
- `style.css`: Tüm stil tanımlamaları burada yapılır. (Şu anda boş)

## Geliştirici İş Akışları
- Proje statik dosyalardan oluştuğu için derleme veya test komutları yoktur.
- Geliştirme sırasında canlı sunucu (ör. Five Server) ile dosya değişiklikleri anında tarayıcıda görüntülenebilir.
- Dosya adlandırma ve organizasyonu basittir; ek dosyalar eklenirse, mantıksal olarak ilgili dosya türüne uygun şekilde yerleştirilmelidir.

## Proje Konvansiyonları
- Tüm kodlar kök dizinde tutulur; alt klasör veya modül yapısı yoktur.
- JavaScript ve CSS dosyaları, ilgili işlevsellik ve stiller için ayrı tutulur.
- HTML dosyasında script ve stil dosyaları harici olarak bağlanmalıdır.

## Entegrasyon ve Bağımlılıklar
- Harici bir kütüphane veya framework kullanılmamaktadır.
- Tüm kodlar saf HTML, CSS ve JavaScript ile yazılır.
- Sunucu tarafı veya API entegrasyonu yoktur.

## Örnek Kullanım
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

## Önemli Dosyalar
- `index.html`: Uygulamanın ana yapısı ve giriş noktası
- `script.js`: Tüm etkileşimli işlevler burada tanımlanır
- `style.css`: Tüm görsel düzenlemeler burada yapılır

## AI Agent için Notlar
- Kod tabanı çok basit ve başlangıç seviyesindedir.
- Yeni işlevler eklerken dosya ayrımına dikkat edin.
- Proje büyüdükçe, dosya ve klasör organizasyonunu mantıklı şekilde genişletin.

---
Daha fazla dosya veya özel bir yapı eklenirse, bu dokümantasyon güncellenmelidir.
# TikSave - TikTok Downloader

Download video TikTok tanpa watermark dalam kualitas HD, SD, atau audio MP3. Gratis, cepat, dan bisa diinstall sebagai aplikasi di HP.

---

## Fitur

- Download video TikTok tanpa watermark
- Pilihan kualitas HD dan SD
- Ekstrak audio sebagai file MP3
- Riwayat download tersimpan di perangkat
- Bisa diinstall sebagai PWA (Progressive Web App) di HP
- Tampilan gelap yang nyaman di mata
- Bekerja di semua browser modern

---

## Demo

Akses langsung di: **[https://ferdymf.github.io/Tiktok-Downloader/](https://ferdymf.github.io/Tiktok-Downloader/)**

> Ganti URL di atas dengan URL GitHub Pages Anda.

---

## Cara Pakai

1. Buka aplikasi TikTok dan pilih video yang ingin didownload
2. Tap tombol **Share**, lalu pilih **Salin tautan**
3. Buka TikSave dan tempel URL di kolom input
4. Pilih kualitas download yang diinginkan (HD, SD, atau MP3)
5. Tap tombol download, file tersimpan otomatis ke perangkat

---

## Install ke Homescreen (PWA)

**Android (Chrome)**
1. Buka TikSave di Chrome
2. Tap ikon tiga titik di pojok kanan atas
3. Pilih **Tambahkan ke layar utama**

**iOS (Safari)**
1. Buka TikSave di Safari
2. Tap ikon **Share** (kotak dengan panah ke atas)
3. Pilih **Tambahkan ke Layar Utama**

---

## Struktur Project

```
📁 root/
├── 📁 assets/
│   ├── index-[hash].js     # JavaScript bundle (React + semua komponen)
│   └── index-[hash].css    # CSS bundle (Tailwind + custom styles)
├── 📁 icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── .nojekyll               # Nonaktifkan Jekyll di GitHub Pages
├── 404.html                # SPA routing fix untuk GitHub Pages
├── index.html              # Entry point aplikasi
├── manifest.json           # PWA manifest
└── sw.js                   # Service worker (offline & caching)
```

---

## Teknologi

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **PWA** - Progressive Web App dengan service worker

---

## Deploy ke GitHub Pages

1. Push semua file ke repository GitHub
2. Buka **Settings** repository
3. Pilih **Pages** di sidebar kiri
4. Set **Source** ke branch `main`, folder `/ (root)`
5. Klik **Save**
6. Tunggu beberapa menit, URL GitHub Pages Anda aktif

---

## Catatan

Project ini adalah aplikasi frontend statis. API untuk mengambil data video TikTok dihost secara terpisah.

---

## Lisensi

[MIT](LICENSE)

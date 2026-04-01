# TikSave - TikTok Downloader

Download video TikTok tanpa watermark dalam kualitas HD, SD, atau audio MP3. Gratis, cepat, dan bisa diinstall sebagai aplikasi di HP.

Demo: **[https://ferdymf.github.io/Tiktok-Downloader/](https://ferdymf.github.io/Tiktok-Downloader/)**

---

## Fitur

- Download video TikTok tanpa watermark
- Pilihan kualitas HD, SD, dan audio MP3
- Riwayat download tersimpan di perangkat
- Bisa diinstall sebagai PWA di HP (Android & iOS)
- Pull-to-refresh dengan gesture tarik layar ke bawah
- Tombol paste clipboard (ikon) di dalam input URL
- Notifikasi otomatis saat versi baru tersedia
- Indikator offline saat koneksi terputus
- Tampilan gelap, optimal di layar mobile

---

## Cara Pakai

1. Buka TikTok, pilih video, tap **Share**, pilih **Salin tautan**
2. Buka TikSave dan tap ikon clipboard di input URL
3. Pilih kualitas (HD, SD, atau MP3)
4. Tap tombol download

---

## Install ke Homescreen (PWA)

**Android (Chrome)**
1. Buka TikSave di Chrome
2. Tap ikon tiga titik, pilih **Tambahkan ke layar utama**

**iOS (Safari)**
1. Buka TikSave di Safari
2. Tap ikon **Share** (kotak dengan panah ke atas)
3. Pilih **Tambahkan ke Layar Utama**

---

## Deploy ke GitHub Pages

### Setup Awal

1. Push semua file ke repository GitHub
2. Buka **Settings** repository, pilih **Pages**
3. Set **Source** ke branch `main`, folder `/ (root)`
4. Klik **Save**

### Setiap Deploy Baru

Gunakan script deploy otomatis agar cache Service Worker ter-invalidate:

```bash
npm run deploy
```

Script ini menjalankan `vite build` lalu inject timestamp unik ke `sw.js`. Pengguna yang sudah install PWA akan mendapat notifikasi update otomatis.

Tambahkan di `package.json`:

```json
"scripts": {
  "build": "vite build",
  "deploy": "vite build && node deploy.js"
}
```

---

## Struktur Project

```
root/
├── assets/
│   ├── index-[hash].js       JavaScript bundle (Vite)
│   └── index-[hash].css      CSS bundle (Vite)
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── screenshots/              Dipakai manifest.json untuk install prompt PWA
│   ├── home.png              390x844 px, tampilan halaman utama
│   └── result.png            390x844 px, tampilan hasil download
├── .nojekyll                 Nonaktifkan Jekyll di GitHub Pages
├── 404.html                  SPA routing fix untuk GitHub Pages
├── deploy.js                 Script inject cache version ke sw.js
├── index.html                Entry point aplikasi
├── manifest.json             PWA manifest
└── sw.js                     Service worker (offline, caching, update)
```

---

## Teknologi

- React + Vite
- Tailwind CSS
- PWA (Service Worker, Web App Manifest)

---

## Catatan Penting

### Screenshots PWA

Buat dua file screenshot (390x844 px) dan simpan di folder `screenshots/`:
- `home.png`: tampilan halaman utama TikSave
- `result.png`: tampilan setelah video berhasil diproses

Tanpa file ini, prompt install PWA di Android tidak menampilkan preview.

### Cache Service Worker

`sw.js` menggunakan placeholder `__BUILD_TIMESTAMP__` yang diganti secara otomatis oleh `deploy.js` saat build. Jangan edit nilai cache version secara manual.

---

## Lisensi

[MIT](LICENSE)

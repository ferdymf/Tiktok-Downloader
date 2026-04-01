# TikSave — TikTok Downloader

> Download video TikTok tanpa watermark. HD, SD, dan Audio MP3. Gratis, cepat, dan bisa diinstall sebagai aplikasi.

**Demo:** [https://ferdymf.github.io/Tiktok-Downloader/](https://ferdymf.github.io/Tiktok-Downloader/)

---

## Fitur

- Download video TikTok tanpa watermark (HD, SD, MP3)
- Riwayat download tersimpan di perangkat (localStorage)
- Installable sebagai PWA di Android & iOS
- Pull-to-refresh dengan gesture tarik layar
- Tombol paste clipboard langsung di input URL
- Indikator offline saat koneksi terputus
- Tampilan gelap AMOLED, dioptimasi untuk layar mobile

---

## Cara Pakai

1. Buka TikTok → pilih video → tap **Share** → **Salin tautan**
2. Buka TikSave → tap ikon clipboard di input URL
3. Pilih kualitas: **HD**, **SD**, atau **MP3**
4. Tap **Download**

---

## Install ke Homescreen (PWA)

**Android (Chrome)**
1. Buka TikSave di Chrome
2. Tap ikon tiga titik → **Tambahkan ke layar utama**

**iOS (Safari)**
1. Buka TikSave di Safari
2. Tap ikon **Share** → **Tambahkan ke Layar Utama**

---

## Struktur Project

```
root/
├── assets/
│   ├── index-[hash].js       JavaScript bundle (Vite output)
│   └── index-[hash].css      CSS bundle (Vite output)
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── screenshots/
│   ├── home.png              390×844 px — tampilan halaman utama
│   └── result.png            390×844 px — tampilan hasil download
├── .nojekyll                 Nonaktifkan Jekyll di GitHub Pages
├── 404.html                  SPA routing fix untuk GitHub Pages
├── deploy.js                 Script inject cache version ke sw.js
├── index.html                Entry point aplikasi
├── manifest.json             PWA manifest
└── sw.js                     Service worker (offline & caching)
```

---

## Deploy ke GitHub Pages

### Setup Awal

1. Push semua file ke repository GitHub
2. Buka **Settings** → **Pages**
3. Set **Source** ke branch `main`, folder `/ (root)`
4. Klik **Save**

### Setiap Deploy Baru

Gunakan script deploy agar cache Service Worker ter-invalidate otomatis:

```bash
npm run deploy
```

Tambahkan script berikut di `package.json`:

```json
"scripts": {
  "build": "vite build",
  "deploy": "vite build && node deploy.js"
}
```

`deploy.js` akan meng-inject timestamp unik ke `sw.js` setiap kali build, sehingga cache lama otomatis dihapus saat ada versi baru.

---

## Catatan Teknis

### SPA Routing Fix

GitHub Pages tidak mendukung client-side routing secara native. Saat user mengakses URL selain root (misalnya `/history`), GitHub Pages akan mengembalikan 404.

Solusinya menggunakan dua file:
- `404.html` — menyimpan path ke `sessionStorage` lalu redirect ke root
- `index.html` — membaca `sessionStorage` dan React Router melanjutkan navigasi ke path yang benar

### Service Worker & Cache

`sw.js` menggunakan placeholder `__BUILD_TIMESTAMP__` yang diganti otomatis oleh `deploy.js`. Jangan ubah nilai ini secara manual.

Strategi cache yang digunakan:

| Tipe Request | Strategi |
|---|---|
| Aset statis (JS, CSS, gambar) | Cache First |
| Halaman HTML | Network First, fallback ke cache |
| API eksternal | Network Only, fallback JSON error |

### Screenshots PWA

File `screenshots/home.png` dan `screenshots/result.png` (ukuran 390×844 px) diperlukan agar install prompt PWA di Android menampilkan preview aplikasi. Tanpa file ini, prompt install tetap muncul tapi tanpa gambar.

---

## Teknologi

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- PWA — Service Worker & Web App Manifest

---

## Lisensi

[MIT](LICENSE)

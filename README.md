<div align="center">

# 📱 TikSave
### TikTok Downloader — Tanpa Watermark

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=flat-square&logo=github)](https://ferdymf.github.io/Tiktok-Downloader/)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue?style=flat-square&logo=pwa&logoColor=white)](https://ferdymf.github.io/Tiktok-Downloader/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

Download video TikTok tanpa watermark — HD, SD, dan Audio MP3.
Gratis, cepat, dan bisa diinstall langsung ke homescreen.

**🔗 [Buka TikSave →](https://ferdymf.github.io/Tiktok-Downloader/)**

</div>

---

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 🎬 **Download Tanpa Watermark** | Unduh video kualitas HD, SD, atau ekstrak audio MP3 |
| 📋 **Paste Langsung** | Tombol clipboard di input URL — satu ketuk langsung isi |
| 🕓 **Riwayat Download** | Tersimpan di perangkat via `localStorage`, tanpa akun |
| 📲 **Installable (PWA)** | Bisa diinstall ke homescreen Android & iOS layaknya aplikasi native |
| 🔄 **Pull-to-Refresh** | Gesture tarik layar untuk memuat ulang |
| 📵 **Indikator Offline** | Notifikasi otomatis saat koneksi terputus |
| 🌑 **Dark Mode AMOLED** | Tampilan gelap pekat, dioptimasi untuk layar OLED/mobile |

---

## 🚀 Cara Pakai

```
1. Buka TikTok → pilih video → tap Share → Salin Tautan

2. Buka TikSave → tap ikon clipboard di kolom URL

3. Pilih kualitas:
   ├── HD  — kualitas terbaik
   ├── SD  — ukuran lebih kecil
   └── MP3 — audio saja

4. Tap Download — selesai!
```

---

## 📲 Install ke Homescreen (PWA)

**Android (Chrome)**
1. Buka TikSave di Chrome
2. Tap ikon tiga titik → **Tambahkan ke layar utama**
3. TikSave akan muncul di homescreen seperti aplikasi biasa

**iOS (Safari)**
1. Buka TikSave di Safari
2. Tap ikon **Share** → **Tambahkan ke Layar Utama**

---

## 🗂️ Struktur Project

```
root/
├── assets/
│   ├── index-[hash].js         JavaScript bundle (Vite output)
│   └── index-[hash].css        CSS bundle (Vite output)
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
│   ├── home.png                390×844 px — tampilan halaman utama
│   └── result.png              390×844 px — tampilan hasil download
├── .nojekyll                   Nonaktifkan Jekyll di GitHub Pages
├── 404.html                    SPA routing fix untuk GitHub Pages
├── deploy.js                   Script inject cache version ke sw.js
├── index.html                  Entry point aplikasi
├── manifest.json               PWA manifest
└── sw.js                       Service worker (offline & caching)
```

---

## 🚢 Deploy ke GitHub Pages

### Setup Awal

1. Push semua file ke repository GitHub
2. Buka **Settings** → **Pages**
3. Set **Source** ke branch `main`, folder `/ (root)`
4. Klik **Save** — GitHub Pages akan otomatis aktif

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

> `deploy.js` meng-inject timestamp unik ke `sw.js` setiap build, sehingga cache lama otomatis terhapus saat ada versi baru.

---

## ⚙️ Catatan Teknis

### SPA Routing Fix

GitHub Pages tidak mendukung client-side routing secara native. Saat user mengakses URL selain root (misalnya `/history`), server akan mengembalikan 404. Solusi yang digunakan:

- **`404.html`** — menyimpan path ke `sessionStorage`, lalu redirect ke root
- **`index.html`** — membaca `sessionStorage` dan React Router melanjutkan navigasi ke path yang benar

### Service Worker & Strategi Cache

`sw.js` menggunakan placeholder `__BUILD_TIMESTAMP__` yang diganti otomatis oleh `deploy.js` setiap build. **Jangan ubah nilai ini secara manual.**

| Tipe Request | Strategi |
|---|---|
| Aset statis (JS, CSS, gambar) | Cache First |
| Halaman HTML | Network First, fallback ke cache |
| API eksternal | Network Only, fallback JSON error |

### Screenshots PWA

File `screenshots/home.png` dan `screenshots/result.png` (ukuran 390×844 px) diperlukan agar install prompt PWA di Android menampilkan preview aplikasi. Tanpa file ini, prompt install tetap muncul tapi tanpa gambar pratinjau.

---

## 🛠️ Teknologi

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

---

## 📜 Lisensi

Proyek ini didistribusikan di bawah **MIT License**. Lihat file [`LICENSE`](LICENSE) untuk informasi lengkap.

---

<div align="center">

Dibuat dengan ❤️ untuk pengguna mobile

⭐ Jika bermanfaat, beri bintang di GitHub!

</div>

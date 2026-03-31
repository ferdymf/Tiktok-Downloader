// TikSave Service Worker
// Versi: 1.0.0
//
// Strategi cache:
// - Aset statis (JS, CSS, gambar): Cache First
// - Halaman HTML: Network First dengan fallback cache
// - API eksternal (TikTok downloader): Network Only
//
// PENTING: Nama file JS/CSS TIDAK di-hardcode di sini karena
// Vite menghasilkan nama file dengan hash yang berubah setiap build.
// SW menangkap dan cache aset secara dinamis saat pertama kali dimuat.

const STATIC_CACHE = 'tiksave-static-v1';
const PAGE_CACHE = 'tiksave-page-v1';

// Hanya file-file yang namanya stabil yang di-cache saat install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png'
];

// Install: cache aset stabil saja
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        // Gunakan addAll dengan individual error handling
        // agar satu aset gagal tidak batalkan seluruh install
        return Promise.allSettled(
          PRECACHE_ASSETS.map(function (url) {
            return cache.add(url).catch(function (err) {
              console.warn('[SW] Gagal cache:', url, err);
            });
          })
        );
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

// Activate: hapus cache dari versi lama
self.addEventListener('activate', function (event) {
  var validCaches = [STATIC_CACHE, PAGE_CACHE];

  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (name) {
              return !validCaches.includes(name);
            })
            .map(function (name) {
              return caches.delete(name);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

// Fetch: routing berdasarkan tipe request
self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);

  // Lewati request non-GET
  if (request.method !== 'GET') return;

  // Lewati request browser extension atau non-http
  if (!url.protocol.startsWith('http')) return;

  // API eksternal: Network Only
  // Jika offline, kembalikan response JSON yang jelas
  if (url.hostname !== self.location.hostname) {
    event.respondWith(
      fetch(request).catch(function () {
        return new Response(
          JSON.stringify({ error: 'Tidak ada koneksi internet.' }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }

  // Aset statis: Cache First, lalu cache dinamis saat network berhasil
  // Ini menangani file JS/CSS ber-hash tanpa perlu hardcode nama filenya
  var isStaticAsset = (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/') ||
    /\.(js|css|png|jpg|jpeg|webp|svg|woff|woff2|ttf)$/.test(url.pathname)
  );

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request)
        .then(function (cached) {
          if (cached) return cached;

          // Tidak ada di cache: ambil dari network dan cache hasilnya
          return fetch(request)
            .then(function (response) {
              if (response.ok && response.status === 200) {
                var clone = response.clone();
                caches.open(STATIC_CACHE).then(function (cache) {
                  cache.put(request, clone);
                });
              }
              return response;
            })
            .catch(function () {
              // Aset statis tidak tersedia: kembalikan 404 kosong
              return new Response('', { status: 404 });
            });
        })
    );
    return;
  }

  // Halaman HTML: Network First, fallback ke cache
  event.respondWith(
    fetch(request)
      .then(function (response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(PAGE_CACHE).then(function (cache) {
            cache.put(request, clone);
          });
        }
        return response;
      })
      .catch(function () {
        // Offline: coba dari cache halaman, fallback ke index.html
        return caches.match(request)
          .then(function (cached) {
            return cached || caches.match('./index.html');
          });
      })
  );
});

// Tangani pesan dari halaman (misal: force update)
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

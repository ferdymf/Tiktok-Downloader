// TikSave Service Worker
// Versi cache di-inject otomatis oleh deploy.js saat build.
// Jangan edit BUILD_TIMESTAMP secara manual.

const STATIC_CACHE = 'tiksave-static-__BUILD_TIMESTAMP__';
const PAGE_CACHE   = 'tiksave-page-__BUILD_TIMESTAMP__';

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

// ============================================
// INSTALL: cache aset stabil
// ============================================
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        return Promise.allSettled(
          PRECACHE_ASSETS.map(function (url) {
            return cache.add(url).catch(function (err) {
              console.warn('[SW] Gagal cache:', url, err);
            });
          })
        );
      })
      .then(function () {
        // Jangan skipWaiting di sini. Biarkan halaman kontrol
        // kapan SW baru aktif via postMessage SKIP_WAITING.
        // Ini mencegah update mendadak saat user sedang download.
      })
  );
});

// ============================================
// ACTIVATE: hapus cache versi lama
// ============================================
self.addEventListener('activate', function (event) {
  var valid = [STATIC_CACHE, PAGE_CACHE];

  event.waitUntil(
    caches.keys()
      .then(function (names) {
        return Promise.all(
          names
            .filter(function (n) { return !valid.includes(n); })
            .map(function (n) {
              console.log('[SW] Hapus cache lama:', n);
              return caches.delete(n);
            })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

// ============================================
// FETCH: routing per tipe request
// ============================================
self.addEventListener('fetch', function (event) {
  var req = event.request;
  var url = new URL(req.url);

  // Lewati non-GET
  if (req.method !== 'GET') return;

  // Lewati non-http (chrome-extension, dll)
  if (!url.protocol.startsWith('http')) return;

  // API eksternal: Network Only
  // Jika offline, kembalikan JSON error yang jelas
  if (url.hostname !== self.location.hostname) {
    event.respondWith(
      fetch(req).catch(function () {
        return new Response(
          JSON.stringify({ error: 'Tidak ada koneksi internet.' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Aset statis (JS, CSS, gambar, font): Cache First
  // Aset ber-hash Vite ditangkap dan dicache secara dinamis.
  var isStatic = (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/') ||
    /\.(js|css|png|jpg|jpeg|webp|svg|woff|woff2|ttf)$/.test(url.pathname)
  );

  if (isStatic) {
    event.respondWith(
      caches.match(req).then(function (cached) {
        if (cached) return cached;

        return fetch(req).then(function (res) {
          if (res.ok) {
            var clone = res.clone();
            caches.open(STATIC_CACHE).then(function (c) { c.put(req, clone); });
          }
          return res;
        }).catch(function () {
          return new Response('', { status: 404 });
        });
      })
    );
    return;
  }

  // Halaman HTML: Network First, fallback ke cache lalu index.html
  event.respondWith(
    fetch(req)
      .then(function (res) {
        if (res.ok) {
          var clone = res.clone();
          caches.open(PAGE_CACHE).then(function (c) { c.put(req, clone); });
        }
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match('./index.html');
        });
      })
  );
});

// ============================================
// MESSAGE: terima perintah dari halaman
// ============================================
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

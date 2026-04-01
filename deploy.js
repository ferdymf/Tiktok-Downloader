/**
 * deploy.js
 *
 * Jalankan SETELAH `vite build` selesai:
 *   node deploy.js
 *
 * Yang dilakukan:
 * 1. Generate timestamp unik dari waktu build.
 * 2. Replace __BUILD_TIMESTAMP__ di sw.js dengan timestamp tersebut.
 *    Ini memastikan cache SW otomatis ter-invalidate setiap deploy baru.
 * 3. (Opsional) Tulis build info ke dist/build-info.json untuk debugging.
 *
 * Cara pakai di package.json:
 *   "scripts": {
 *     "build": "vite build",
 *     "deploy": "vite build && node deploy.js"
 *   }
 */

const fs   = require('fs');
const path = require('path');

// Folder output Vite (ganti 'dist' jika Anda pakai nama lain)
const DIST_DIR = path.resolve(__dirname, 'dist');

// ============================================
// 1. Cek folder dist ada
// ============================================
if (!fs.existsSync(DIST_DIR)) {
  console.error('[deploy] Folder dist/ tidak ditemukan. Jalankan `vite build` dulu.');
  process.exit(1);
}

// ============================================
// 2. Generate timestamp
// ============================================
const ts = Date.now().toString();
console.log('[deploy] Build timestamp:', ts);

// ============================================
// 3. Inject timestamp ke sw.js
// ============================================
const swPath = path.join(DIST_DIR, 'sw.js');

if (!fs.existsSync(swPath)) {
  console.error('[deploy] sw.js tidak ditemukan di dist/. Pastikan sw.js ada di folder root project.');
  process.exit(1);
}

let swContent = fs.readFileSync(swPath, 'utf8');

if (!swContent.includes('__BUILD_TIMESTAMP__')) {
  console.warn('[deploy] __BUILD_TIMESTAMP__ tidak ditemukan di sw.js. Cache version tidak diupdate.');
} else {
  swContent = swContent.replace(/__BUILD_TIMESTAMP__/g, ts);
  fs.writeFileSync(swPath, swContent, 'utf8');
  console.log('[deploy] sw.js: cache version diupdate ke', ts);
}

// ============================================
// 4. Tulis build-info.json (opsional, untuk debugging)
// ============================================
const buildInfo = {
  timestamp: ts,
  date: new Date().toISOString(),
  cacheVersion: 'tiksave-static-' + ts,
};

fs.writeFileSync(
  path.join(DIST_DIR, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2),
  'utf8'
);

console.log('[deploy] build-info.json ditulis.');
console.log('[deploy] Selesai. Siap deploy ke GitHub Pages.');

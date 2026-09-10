const CACHE_NAME = 'cyclesync-v1';
const ASSETS = [
  '/CycleSync/app/',
  '/CycleSync/app/index.html',
  '/CycleSync/app/app.js',
  '/CycleSync/app/styles.css',
  '/CycleSync/images/icon48.png',
  '/CycleSync/images/icon128.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

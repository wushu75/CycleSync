const CACHE_NAME = 'cyclesync-v2';

const ASSETS = [
  '/CycleSync/app/',
  '/CycleSync/app/index.html',
  '/CycleSync/app/app.js',
  '/CycleSync/app/manifest.json',
  '/CycleSync/app/icon128.png',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'
];

// Install — cache everything immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache core assets — ignore failures on fonts
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset).catch(err => console.log('Cache miss:', asset, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate — clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache first, network fallback, offline fallback
self.addEventListener('fetch', e => {
  // Skip non-GET requests
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) {
        // Serve from cache immediately
        // Update cache in background
        fetch(e.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, response));
          }
        }).catch(() => {});
        return cached;
      }

      // Not in cache — try network
      return fetch(e.request).then(response => {
        if (!response || response.status !== 200) return response;
        // Cache the new response
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, responseClone));
        return response;
      }).catch(() => {
        // Network failed — serve offline page
        return caches.match('/CycleSync/app/index.html');
      });
    })
  );
});

// Background sync — update cache when back online
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

const CACHE_NAME = 'history-hub-cache-v6';
const DYNAMIC_CACHE = 'history-hub-dynamic-v6';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/unit.html',
  '/manifest.json'
];

// Install Event: Precache core assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching core assets');
      return cache.addAll(CORE_ASSETS);
    })
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate strategy
self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  // Handle Chrome DevTools bug
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  const url = new URL(event.request.url);

  // Skip Chrome extension requests or API calls outside our control
  if (!url.protocol.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // If valid response, cache it dynamically
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch((error) => {
          console.error('[Service Worker] Fetch failed:', error);
          // If we have a cached response, the outer return already handled it.
          // If we don't, we need to return something, e.g., a custom offline page or just throw.
          throw error;
        });

      return cachedResponse || fetchPromise;
    })
  );
});

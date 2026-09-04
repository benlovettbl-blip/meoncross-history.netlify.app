const CACHE_NAME = 'history-hub-cache-v7';
const DYNAMIC_CACHE = 'history-hub-dynamic-v7';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',
  '/knowledge_bank.js',
  '/database.json',
  '/src/main.js',
];

// Install Event: Precache core assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching core assets');
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[Service Worker] Precache non-critical warning:', err);
      });
    }),
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch Event: Stale-While-Revalidate strategy with ignoreSearch support
self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  // Handle Chrome DevTools bug
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  const url = new URL(event.request.url);

  // Skip Chrome extension requests or non-http protocols
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve stale response immediately; refresh cache in background
        fetch(event.request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              (networkResponse.type === 'basic' || networkResponse.type === 'cors')
            ) {
              const responseToCache = networkResponse.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
          })
          .catch(() => {
            // Offline: quiet catch since cached response was served
          });
        return cachedResponse;
      }

      // Not in cache: fetch from network and store
      return fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (networkResponse.type === 'basic' || networkResponse.type === 'cors')
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async (error) => {
          console.warn('[Service Worker] Offline fetch failed:', event.request.url);
          // Special fallback for database.json cache regardless of timestamp queries
          if (event.request.url.includes('database.json')) {
            const dbMatch = await caches.match('/database.json');
            if (dbMatch) return dbMatch;
          }
          // General ignoreSearch cache fallback
          const fallback = await caches.match(event.request, { ignoreSearch: true });
          if (fallback) return fallback;
          throw error;
        });
    }),
  );
});

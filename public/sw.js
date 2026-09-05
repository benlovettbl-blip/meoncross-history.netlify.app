const CACHE_NAME = 'history-hub-cache-v8';
const DYNAMIC_CACHE = 'history-hub-dynamic-v8';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/style.css',
  '/public/style.css',
  '/database.json',
  '/knowledge_bank.js',
  '/src/main.js',
  // Key Ypres Battlefield Tour images for offline coach use in Belgium
  '/images/stubbington_memorial.jpg',
  '/images/stubbington_memorial_2.jpg',
  '/images/stubbington_names_2.jpg',
  '/images/stubbington_names_3.jpg',
  '/images/john_mccrae.jpg',
  '/images/siegfried_sassoon.jpg',
  '/images/charles_sorley.jpg',
  '/images/isaac_rosenberg.jpg',
  '/images/laurence_binyon.jpg',
  '/images/rupert_brooke.jpg',
  '/images/wilfred_owen.jpg',
  '/images/menin_road_nash.jpg',
  '/images/ww1_wooden_crosses.jpg',
  '/images/fabian_ware.jpg',
  '/images/cloth_hall_ruins_paterson.jpg',
  '/images/talbot_house_facade.jpg',
  '/images/cheshire_regiment_trench.png',
  '/images/ypres_essex_farm.jpg',
  '/images/lowry_william.png',
  '/images/lowry_auriol.png',
  '/images/lowry_cyril.png',
];

// Install Event: Precache core assets with resilient per-item handling
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[Service Worker] Precaching core assets and Ypres offline companion');
      for (const asset of CORE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('[Service Worker] Non-critical precache notice for:', asset, err.message);
        }
      }
    }),
  );
});

// Activate Event: Cleanup older caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
              console.log('[Service Worker] Removing outdated cache:', cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch Event: Stale-While-Revalidate with resilient offline navigation fallback
self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  // Handle Chrome DevTools bug
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  const url = new URL(event.request.url);

  // Bypass entirely on localhost/127.0.0.1 for live development
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return;
  }

  // Skip Chrome extensions and non-http schemes
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve cached response immediately; update cache in background
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
          console.warn('[Service Worker] Offline fetch intercepted:', event.request.url);

          // Fallback for database.json regardless of query timestamp
          if (event.request.url.includes('database.json')) {
            const dbMatch = await caches.match('/database.json');
            if (dbMatch) return dbMatch;
          }

          // Fallback for navigation requests (HTML SPA load)
          if (event.request.mode === 'navigate') {
            const indexMatch = (await caches.match('/index.html')) || (await caches.match('/'));
            if (indexMatch) return indexMatch;
          }

          // General ignoreSearch cache match
          const fallback = await caches.match(event.request, { ignoreSearch: true });
          if (fallback) return fallback;

          throw error;
        });
    }),
  );
});

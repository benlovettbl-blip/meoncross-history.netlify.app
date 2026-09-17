const CACHE_NAME = 'history-hub-cache-v17';
const DYNAMIC_CACHE = 'history-hub-dynamic-v17';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/style.css',
  '/database.json',
  '/knowledge_bank.js',
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
  '/images/crummack/map_canal_du_nord_cambrai_1918.jpg',
  '/images/crummack/map_canal_du_nord_modern_map.jpg',
  '/images/crummack/map_canal_du_nord_modern_satellite.jpg',
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

// Activate Event: Immediate takeover and older cache eviction
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

// Fetch Event: Resilient hybrid caching strategy
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

  // 1. Navigation Requests (HTML SPA Pages): Network-First
  // Guarantees online pupils always get the fresh index.html pointing to current Vite asset hashes.
  // Falls back to cached index.html only when truly offline (e.g. coach trip with no signal).
  const isNavigate = event.request.mode === 'navigate';
  const isHtmlRequest =
    url.pathname === '/' ||
    url.pathname === '/index.html' ||
    (event.request.headers.get('accept') &&
      event.request.headers.get('accept').includes('text/html'));

  if (isNavigate || isHtmlRequest) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, responseToCache.clone());
              cache.put('/index.html', responseToCache.clone());
              cache.put('/', responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          console.warn('[Service Worker] Offline navigation fallback for:', event.request.url);
          const cached =
            (await caches.match(event.request, { ignoreSearch: true })) ||
            (await caches.match('/index.html')) ||
            (await caches.match('/'));
          if (cached) return cached;
          throw new Error('Offline and no cached index.html found');
        }),
    );
    return;
  }

  // 2. Network-First for database.json: always fetch fresh live curriculum data when online; fallback to cache offline
  if (url.pathname.includes('database.json')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
              cache.put('/database.json', responseToCache.clone());
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          console.warn('[Service Worker] Offline fallback for database.json');
          const cached =
            (await caches.match('/database.json')) ||
            (await caches.match(event.request, { ignoreSearch: true }));
          if (cached) return cached;
          throw new Error('Offline and no database.json found in cache');
        }),
    );
    return;
  }

  // 3. Cache-First for Vite hashed assets (/assets/*):
  // Hashed files are immutable. Check cache first; if missing, fetch from network and store in dynamic cache.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
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
        });
      }),
    );
    return;
  }

  // 4. Stale-While-Revalidate for images, fonts, and static assets
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
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

          const fallback = await caches.match(event.request, { ignoreSearch: true });
          if (fallback) return fallback;

          throw error;
        });
    }),
  );
});

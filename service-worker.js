/**
 * NutriScan - Service Worker
 * Provides offline support and caching for PWA functionality
 */

const CACHE_NAME = 'nutriscan-v1';
const CACHE_ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/storage.js',
    './js/calculator.js',
    './js/foodDatabase.js',
    './js/hydration.js',
    './js/streak.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// External resources to cache
const EXTERNAL_CACHE = [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

/**
 * Install Event - Cache all static assets
 */
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => {
                // Try to cache external resources (don't fail if they don't work)
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return Promise.allSettled(
                            EXTERNAL_CACHE.map(url =>
                                fetch(url, { mode: 'cors' })
                                    .then(response => cache.put(url, response))
                                    .catch(() => console.log(`[ServiceWorker] Could not cache: ${url}`))
                            )
                        );
                    });
            })
            .then(() => self.skipWaiting())
    );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== CACHE_NAME) {
                            console.log('[ServiceWorker] Removing old cache:', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

/**
 * Fetch Event - Serve from cache, fall back to network
 * Strategy: Cache First, Network Fallback
 */
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip Chrome extension requests
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    // Also fetch from network to update cache in background
                    fetchAndCache(event.request);
                    return cachedResponse;
                }

                // Not in cache - fetch from network
                return fetchAndCache(event.request);
            })
            .catch(() => {
                // If both cache and network fail, return offline page
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            })
    );
});

/**
 * Fetch from network and update cache
 */
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);

        // Only cache successful responses
        if (response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        // Network failed - return from cache if possible
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

/**
 * Handle messages from the main app
 */
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

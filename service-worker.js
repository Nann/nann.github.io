var cacheName = 'Nann-PWA';
var filesToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/assets/css/roboto-font.css',
  '/assets/fonts/roboto/Roboto-Thin.woff2',
  '/assets/fonts/roboto/Roboto-Light.woff2',
  '/assets/vendor/normalize/7.0.0/css/normalize.min.css',
  '/assets/vendor/bootstrap/3.3.7/css/bootstrap.min.css',
  '/assets/vendor/animate/3.5.2/css/animate.min.css',
  '/assets/css/mousescroll.min.css',
  '/assets/css/custom.min.css',
  '/assets/img/display-nann.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

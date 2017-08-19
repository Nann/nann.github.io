var cacheName = 'resume-nannstudio';
var filesToCache = [];

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

var filesToCache = [
  '/',
  '/index.html',
  '/assets/css/roboto-font.css',
  '/assets/fonts/roboto/Roboto-Thin.woff2',
  '/assets/fonts/roboto/Roboto-Light.woff2',
  '/assets/vendor/normalize/7.0.0/css/normalize.min.css',
  '/assets/vendor/bootstrap/3.3.7/css/bootstrap.min.css',
  '/assets/vendor/font-awesome/4.7.0/css/font-awesome.min.css',
  '/assets/vendor/font-awesome/4.7.0/fonts/fontawesome-webfont.eot',
  '/assets/vendor/font-awesome/4.7.0/fonts/fontawesome-webfont.svg',
  '/assets/vendor/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf',
  '/assets/vendor/font-awesome/4.7.0/fonts/fontawesome-webfont.woff',
  '/assets/vendor/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2',
  '/assets/vendor/font-awesome/4.7.0/fonts/FontAwesome.otf',
  '/assets/vendor/animate/3.5.2/css/animate.min.css',
  '/assets/css/mousescroll.min.css',
  '/assets/css/custom.min.css',
  '/assets/img/profile-512x512.png'
];

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
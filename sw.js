// Install the service worker.
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('nannstudio').then(function(cache) {
      // The cache will fail if any of these resources can't be saved.
      return cache.addAll([
        // Path is relative to the origin, not the app directory.
        '/index.html',
        '/assets/vendor/normalize/7.0.0/css/normalize.min.css',
        '/assets/vendor/bootstrap/3.3.7/css/bootstrap.min.css',
        '/assets/vendor/font-awesome/4.7.0/css/font-awesome.min.css',
        '/assets/vendor/animate/3.5.2/css/animate.min.css',
        '/assets/css/custom.min.css',
        '/assets/img/profile-512x512.png',
        '/manifest.json'
      ])
      .then(function() {
        console.log('Success! App is available offline!');
      })
    })
  );
});


// Define what happens when a resource is requested.
// For our app we do a Cache-first approach.
self.addEventListener('fetch', function(event) {
  event.respondWith(
      // Try the cache.
      caches.match(event.request)
      .then(function(response) {
      // Fallback to network if resource not stored in cache.
      return response || fetch(event.request);
    })
    );
});


// App install banner
var deferredPrompt;

window.addEventListener('beforeinstallprompt', function(e) {
  console.log('beforeinstallprompt Event fired');
  e.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  return false;
});

btnSave.addEventListener('click', function() {
  if(deferredPrompt !== undefined) {
    // The user has had a postive interaction with our app and Chrome
    // has tried to prompt previously, so let's show the prompt.
    deferredPrompt.prompt();

    // Follow what the user has done with the prompt.
    deferredPrompt.userChoice.then(function(choiceResult) {

      console.log(choiceResult.outcome);

      if(choiceResult.outcome == 'dismissed') {
        console.log('User cancelled home screen install');
      }
      else {
        console.log('User added to home screen');
      }

      // We no longer need the prompt.  Clear it up.
      deferredPrompt = null;
    });
  }
});
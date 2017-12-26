"use strict";

var CACHE_NAME = 'version_01';
var URLS = [               // Add URL you want to cache in this list.
  '/',                     // If you have separate JS/CSS files,
  '/index.html',            // add path to those files here
  '/resources/icon.png',
  '/resources/icon.svg',
  '/resources/manifest.json'
];

self.addEventListener('install', event => 
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(URLS))
  )
);

self.addEventListener('activate', event =>
  event.waitUntil(
    caches.keys()
    .then(keyList => 
      Promise.all(
        keyList.map(
          (key, i) => {
            if (key !== CACHE_NAME) {
              return caches.delete(keyList[i]);
            }
          }
        )
      )
    )
  )
);

self.addEventListener('fetch', event =>
  event.respondWith(
    caches.match(event.request)
    .then(request => (request || fetch(event.request)))
  )
);

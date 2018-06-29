// Cache name
const cacheName = "convataCh";
// cache files
const cacheFiles = [
    './',
    './index.html',
    './css/bulma.min.css',
    './js/app.js'
];
self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then( cache => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate',(e) => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(presentCacheName => { 
                if(presentCacheName !== cacheName)
                console.log('Removing Old Cache');
                return caches.delete(presentCacheName);
            }))
        })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            return response || fetch(event.request);
        })
    );
});
// self.addEventListener('install', e => {
//     console.log('[Service Worker] Registered');

//     e.waitUntil(
//         caches.open(cacheName).then((cache) => {
//             console.log('Caching Files');
//             return cache.addAll(cacheFiles);
//         })
//     )
// })

// self.addEventListener('activate', (e) => {
//     console.log('[Service Worker] Activated');

//     e.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(cacheNames.map( function(presentCacheName) { 
//                 if(presentCacheName !== cacheName)
//                 console.log('Removing Old Cache');

//                 return caches.delete(presentCacheName);
//             }))
//         })
//     )
// })
// self.addEventListener('fetch', e => {
//     console.log('[Service Worker] Fetched', e.request.url);
//     e.respondWith(
//         // Check if the request already exists
//         caches.match(e.request).then((response) => {
//             return response || fetch(e.request);
//         })
//     )
// })
const CACHE="offborting-v11";
const ROOT=new URL("./",self.location).pathname.replace(/\/$/,"");
const ASSETS=[`${ROOT}/`,`${ROOT}/manifest.webmanifest`,`${ROOT}/icon-192.png`,`${ROOT}/icon-512.png`,`${ROOT}/assets/yellow.webp`,`${ROOT}/assets/people.webp`,`${ROOT}/assets/future.webp`,`${ROOT}/assets/challenges.webp`];
self.addEventListener("install",event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request)))});

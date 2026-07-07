const CACHE_NAME = "talktalk-chatbot-lab-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/static/images/icons/icon-192.png",
  "/static/images/icons/icon-512.png",
  "/static/images/icons/apple-touch-icon-152x152.png",
  "/static/js/height-fix.js",
  "/static/silent.mp3",
];

self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(
        urlsToCache.map((url) => cache.add(url))
      );

      results.forEach((res, i) => {
        if (res.status === "rejected") {
          console.warn(`[ServiceWorker] Failed to cache: ${urlsToCache[i]}`);
        }
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[ServiceWorker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) =>
            cache.put(event.request, responseToCache)
          );

          return networkResponse;
        })
        .catch((error) => {
          console.warn("[ServiceWorker] Fetch failed:", error);
        });
    })
  );
});

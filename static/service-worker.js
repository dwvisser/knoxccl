self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();

      const oldPrecache = `workbox-precache-v2-${self.registration.scope}`;
      const cachesToDelete = (await caches.keys()).filter(
        (name) => name === oldPrecache || name === 'images-and-docs'
      );
      await Promise.all(cachesToDelete.map((name) => caches.delete(name)));

      await self.registration.unregister();

      const clients = await self.clients.matchAll({ type: 'window' });
      const navigations = await Promise.allSettled(
        clients.map((client) => client.navigate(client.url))
      );
      navigations
        .filter((result) => result.status === 'rejected')
        .forEach((result) => console.error('Failed to reload a client', result.reason));
    })()
  );
});

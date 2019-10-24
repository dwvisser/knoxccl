module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{html,json,js,css,woff2}"
  ],
  globIgnores: [
    "node_modules/**/*",
    "package.json",
    "package-lock.json",
    "src/**/*",
    "workbox-config.js",
    "webpack.config.js"
  ],
  swDest: "dist/service-worker.js",

  // Define runtime caching rules.
  runtimeCaching: [{
    // Match any request ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg|pdf)$/i,

    // Apply a cache-first strategy.
    handler: 'CacheFirst',

    options: {
      // Use a custom cache name.
      cacheName: 'images-and-docs',

      // Only cache 100 files.
      expiration: {
        maxEntries: 100,
      },
    },
  }],
  // See https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
  // The following 2 options force kicking out the old ServiceWorker and activating the
  // new one on all client tabs as soon as the new ServiceWorker is installed. It is an
  // anti-pattern for PWAs in general (see https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68),
  // but for this simple "static" site I would rather users always see the latest content.
  skipWaiting: true,
  clientsClaim: true
};
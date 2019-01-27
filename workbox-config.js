module.exports = {
  "globDirectory": ".",
  "globPatterns": [
    "**/*.{html,json,js,css,woff2}"
  ],
  "swDest": "service-worker.js",

  // Define runtime caching rules.
  runtimeCaching: [{
    // Match any request ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg|pdf)$/,

    // Apply a cache-first strategy.
    handler: 'cacheFirst',

    options: {
      // Use a custom cache name.
      cacheName: 'images-and-docs',

      // Only cache 100 files.
      expiration: {
        maxEntries: 100,
      },
    },
  }]
};
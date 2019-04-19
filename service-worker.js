/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "agendas/2017-10.html",
    "revision": "e0a151da3153d836d314749fc08d8ed9"
  },
  {
    "url": "agendas/2017-11.html",
    "revision": "cc23dacde14703e1cf112190ac024cdd"
  },
  {
    "url": "flyers/2019-Feb-Forum.html",
    "revision": "1a686b54505bfd3ee3c9fc668deb4ae1"
  },
  {
    "url": "index.html",
    "revision": "8cd900848e7a6633f6a584f951d26050"
  },
  {
    "url": "manifest.json",
    "revision": "691158d1fabe18444d0fadbf371e2918"
  },
  {
    "url": "newsletters/2017-10.html",
    "revision": "894f923c4bef5ee56d9fd6e757bb85b7"
  },
  {
    "url": "newsletters/2017-11.html",
    "revision": "e82ee9943f9bafc6497922eca13da2c2"
  },
  {
    "url": "scripts/bootstrap-4.3.1.min.js",
    "revision": "e1d98d47689e00f8ecbc5d9f61bdb42e"
  },
  {
    "url": "scripts/jquery-3.4.0.min.js",
    "revision": "bbcf3bf05fa6cb58a67cfd0498f00d23"
  },
  {
    "url": "scripts/popper-1.15.0.min.js",
    "revision": "e21a6649041ef6f5f1bf43f11946621f"
  },
  {
    "url": "styles/bootstrap-4.3.1.min.css",
    "revision": "a15c2ac3234aa8f6064ef9c1f7383c37"
  },
  {
    "url": "styles/fontawesome-5.8.1.min.css",
    "revision": "e4c542a7f6bf6f74fdd8cdf6e8096396"
  },
  {
    "url": "styles/main.css",
    "revision": "40d65fdc63719c2a6aa9e9791ab2afc7"
  },
  {
    "url": "top-bottom-links.html",
    "revision": "84425238bb3c12e8a7cccb616941ab97"
  },
  {
    "url": "webfonts/fa-brands-400.woff2",
    "revision": "48461ea4e797c9774dabb4a0440d2f56"
  },
  {
    "url": "webfonts/fa-solid-900.woff2",
    "revision": "14a08198ec7d1eb96d515362293fed36"
  },
  {
    "url": "workbox-config.js",
    "revision": "5e9943789ad05be1036ed6e576fd7a7c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|pdf)$/i, new workbox.strategies.CacheFirst({ "cacheName":"images-and-docs", plugins: [new workbox.expiration.Plugin({ maxEntries: 100, purgeOnQuotaError: false })] }), 'GET');

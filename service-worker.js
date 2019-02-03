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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

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
    "revision": "90af0d6d5030b760e01ca04399cb00b2"
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
    "url": "scripts/bootstrap-4.2.1.min.js",
    "revision": "6895e8cd60b62646ce12426015888f58"
  },
  {
    "url": "scripts/jquery-3.3.1.min.js",
    "revision": "a09e13ee94d51c524b7e2a728c7d4039"
  },
  {
    "url": "scripts/popper-1.14.7.min.js",
    "revision": "56456db9d72a4b380ed3cb63095e6022"
  },
  {
    "url": "styles/bootstrap-4.2.1.min.css",
    "revision": "f411c136e2bb302ada2120b3eb1d5bc3"
  },
  {
    "url": "styles/fontawesome-5.7.1.css",
    "revision": "7b1d7f457d056ace7b230b587b9f3753"
  },
  {
    "url": "styles/main.css",
    "revision": "4ed5ea65195e090e7518d9b9213e5245"
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
    "revision": "1148939bbcb945dae2bc4f1c856d5fa3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|pdf)$/, workbox.strategies.cacheFirst({ "cacheName":"images-and-docs", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":false})] }), 'GET');

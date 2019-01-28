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
    "revision": "66ce66d067fd11f40ba364ffc41821c6"
  },
  {
    "url": "index.html",
    "revision": "a58aecfd02b50cf04823553189acdd91"
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
    "url": "scripts/bootstrap-4.1.3.min.js",
    "revision": "67176c242e1bdc20603c878dee836df3"
  },
  {
    "url": "scripts/jquery-3.3.1.min.js",
    "revision": "a09e13ee94d51c524b7e2a728c7d4039"
  },
  {
    "url": "scripts/popper-1.14.3.min.js",
    "revision": "83fb8c4d9199dce0224da0206423106f"
  },
  {
    "url": "styles/bootstrap-4.1.3.min.css",
    "revision": "04aca1f4cd3ec3c05a75a879f3be75a3"
  },
  {
    "url": "styles/fontawesome-5.3.1.css",
    "revision": "10519cfd3206802f58315b877a9beab5"
  },
  {
    "url": "styles/main.css",
    "revision": "720cbb266536aa3a56e3abd385be82db"
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
    "revision": "4cf233f457e91ce84f9a8c195df3e106"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html");

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|pdf)$/, workbox.strategies.cacheFirst({ "cacheName":"images-and-docs", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":false})] }), 'GET');

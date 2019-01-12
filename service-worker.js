/*
 *
 *  Air Horner
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

const version = "0.1.6"; 
const cacheName = `knoxccl-${version}`;
const cacheAssets = [
    '/',
    '/index.html',
    '/images/HorizontalWhite.png',
    '/scripts/jquery-3.3.1.min.js',
    '/scripts/popper-1.14.3.min.js',
    '/scripts/bootstrap-4.1.3.min.js',
    '/newsletters/2017-10.html',
    '/newsletters/2017-11.html',
    '/agendas/2017-10.html',
    '/agendas/2017-11.html',
    '/flyers/2019-Feb-Forum.html',
    '/styles/bootstrap-4.1.3.min.css',
    '/styles/fontawesome-5.3.1.css',
    '/styles/main.css',
    '/webfonts/fa-brands-400.woff2',
    '/webfonts/fa-solid-900.woff2',
    '/images/low_smoky-mountains-1379552973wwG.jpg',
    '/images/120px-Human-emblem-web-green-128.png'
];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheAssets)
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
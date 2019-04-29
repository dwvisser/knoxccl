#!/usr/bin/env bash
npx webpack --mode=production
cp node_modules/@fortawesome/fontawesome-free/css/all.min.css dist
mkdir -p webfonts
cp node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2 webfonts
cp node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 webfonts
workbox generateSW workbox-config.js

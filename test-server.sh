#!/usr/bin/env bash
npx webpack --mode=production
workbox generateSW workbox-config.js
python -m SimpleHTTPServer 3000


#!/usr/bin/env bash
workbox generateSW workbox-config.js
python -m SimpleHTTPServer 3000


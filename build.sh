#!/usr/bin/env bash
# $1 is 'development' or 'production'
npx webpack --mode=$1
workbox generateSW workbox-config.js

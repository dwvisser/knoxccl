#!/usr/bin/env bash
cd `git rev-parse --show-toplevel`/dist
python3 -m http.server 3000
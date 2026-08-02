#!/bin/sh
set -eu

mkdir -p /data/images

if [ ! -f /data/site-data.json ]; then
  echo "Seeding content volume from /seed-content..."
  cp -a /seed-content/. /data/
fi

export CONTENT_DIR=/data
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"

exec node server.js

#!/bin/sh
set -eu

mkdir -p /data/images

if [ ! -f /data/site-data.json ]; then
  echo "Seeding content volume from /seed-content..."
  cp -a /seed-content/. /data/
fi

# Public site serves images from the shared content volume
rm -rf /app/site/public/images
ln -sfn /data/images /app/site/public/images

export CONTENT_DIR=/data
export HOSTNAME=0.0.0.0

echo "Starting admin on :3001"
cd /app/admin
PORT=3001 node server.js &
ADMIN_PID=$!

echo "Starting site on :3000"
cd /app/site
PORT=3000 node server.js &
SITE_PID=$!

cleanup() {
  kill "$ADMIN_PID" "$SITE_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Wait for apps to accept connections
sleep 2

echo "Starting edge proxy on :${PORT:-8080}"
cd /app
PORT="${PORT:-8080}" node proxy.mjs

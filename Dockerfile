# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS admin-deps
WORKDIR /app
COPY admin/package.json admin/package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS admin-builder
WORKDIR /app
COPY --from=admin-deps /app/node_modules ./node_modules
COPY admin/ ./
ENV NEXT_TELEMETRY_DISABLED=1
ENV ADMIN_BASE_PATH=/studio
ENV NEXT_PUBLIC_ADMIN_BASE_PATH=/studio
RUN npm run build

FROM node:22-bookworm-slim AS site-deps
WORKDIR /app
COPY site/package.json site/package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS site-builder
WORKDIR /app
COPY --from=site-deps /app/node_modules ./node_modules
COPY site/ ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV CONTENT_DIR=/data
ENV HOSTNAME=0.0.0.0

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && mkdir -p /data /app/admin /app/site

COPY --from=admin-builder /app/public /app/admin/public
COPY --from=admin-builder /app/.next/standalone /app/admin/
COPY --from=admin-builder /app/.next/static /app/admin/.next/static

COPY --from=site-builder /app/public /app/site/public
COPY --from=site-builder /app/.next/standalone /app/site/
COPY --from=site-builder /app/.next/static /app/site/.next/static

COPY content /seed-content
COPY scripts/proxy.mjs /app/proxy.mjs
COPY scripts/start-all.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080
CMD ["/start.sh"]

# Leen's Middle East Kitchen

Monorepo for the public site, CMS admin, and shared content store.

## Apps

| Path | Role |
|------|------|
| `site/` | Public Next.js website |
| `admin/` | Password-protected content studio |
| `content/` | Seed JSON + images (runtime data lives on a Railway volume) |

## Local development

```bash
# Terminal 1 — content is shared via CONTENT_DIR
cd ../leens-content   # or use ./content

# Terminal 2
cd site && npm run dev

# Terminal 3
cd admin && npm run dev
```

Admin password default: `leenadmin` (override with `ADMIN_PASSWORD`).

## Production (Railway)

- **admin** service: Docker `Dockerfile.admin`, volume mounted at `/data`
- **site** service: Docker `Dockerfile.site`, `CONTENT_API_URL` → admin public URL

Admin writes `site-data.json` + uploads into `/data`. The site reads via `/api/public/content` and images via `/api/media-file/...`.

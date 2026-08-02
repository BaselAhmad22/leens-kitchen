# Leen's shared content

Single source of truth for the public site and the admin panel.

## Structure

- `site-data.json` - restaurant, menu, signatures, testimonials, nav
- `images/` - all media referenced by paths like `/images/...`

## Local apps

| App | Folder | Port |
|-----|--------|------|
| Public site | `../leens-kitchen` | 3000 |
| Admin | `../leens-admin` | 3001 |

Both apps read/write this folder via `CONTENT_DIR` (defaults to this directory when placed as a sibling).

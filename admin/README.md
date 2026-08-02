# Leen's Admin

Local control panel for the Leen's public website.

## Setup

```bash
cd leens-admin
npm install
npm run dev
```

Opens at [http://localhost:3001](http://localhost:3001).

Default password: `leenadmin` (change in `.env.local`).

## Shared content

Reads/writes:

- `../leens-content/site-data.json`
- `../leens-content/images/`

The public site (`leens-kitchen` on port 3000) uses the same folder.

## Sections

- Restaurant details
- Menu categories & dishes
- Homepage signatures
- Testimonials
- Media library (upload/delete images)

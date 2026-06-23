# Plan

## Completed

- [x] Unify 5 per-persona pages into single homepage with anchor-scroll sections
- [x] Move resume from /developer/resume to /resume
- [x] Inline all single-use components into index.tsx, remove src/components/
- [x] Restructure content into typed data files (src/data/) with domain filtering
- [x] Wire Download PDF to window.print(), add Back button with print:hidden
- [x] Add redirects for old routes in next.config.js
- [x] Create AGENTS.md documenting architecture and conventions
- [x] Fix all ESLint build errors, broken links, dead code, stale files
- [x] Move images from src/assets/ to public/
- [x] Backend: Scaffold Go + Gin + sqlc + Postgres backend as monorepo subdirectory
- [x] Backend: Docker-compose for local Postgres on port 5470
- [x] Backend: Messages table migration + sqlc queries
- [x] Backend: CORS middleware + POST /api/messages endpoint
- [x] Backend: Makefile and .env
- [x] Frontend: Install TanStack React Query, setup provider in _app.tsx
- [x] Frontend: Contact form section with useMutation (name, email, message)
- [x] Frontend: SEO meta tags (Head, OG, Twitter cards, canonical) on index + resume
- [x] Frontend: robots.txt and sitemap.xml in public/
- [x] Frontend: Add YouTube social link + SVG icon in footer
- [x] Frontend: Clean up dead exports (myCoverLetterBody, devIntro)

## Medium Priority

- [ ] Frontend: Vercel Analytics
- [ ] Frontend: next/font self-hosting (replace Google Fonts link)
- [ ] Backend: Deployment config (Railway/Render/Fly.io)

## Future

- [ ] Projects / work showcase section (data-driven)
- [ ] Theology / blog section for writings and sermon notes
- [ ] Admin view for contact messages
- [ ] Email notifications for new contact form submissions
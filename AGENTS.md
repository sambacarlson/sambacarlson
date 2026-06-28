# AGENTS.md

## Overview

**sambacarlson** is the personal portfolio site for Samba Carlson — a software engineer, educator, and theologian based in Buea, Cameroon. The site is a single unified homepage with anchor-scroll sections covering all three personas, plus a separate resume page. The frontend is deployed on Vercel; the backend (contact form API) runs separately.

## Stack

- **Frontend:** Next.js 13 (Pages Router) + React 18 + TypeScript + TailwindCSS
- **Backend:** Go + Gin + sqlc + PostgreSQL (monorepo at `backend/`)
- **Migrations:** golang-migrate with embed.FS (auto-applied on startup)
- **Data fetching:** TanStack React Query
- **Icons:** react-icons (used on the resume page)
- **Images:** next/image with local files in `public/`
- **Deployment:** Frontend on Vercel, backend (Railway/Render/Fly.io via Docker)

## Architecture

```
sambacarlson/
  frontend/                      # Next.js frontend
    src/
      pages/          # Pages Router routes
        index.tsx     # Unified homepage — all sections inlined (Navbar, Hero, About, Engineering, Teaching, Theology, Education, Contact Form, Footer)
        resume/        # Resume page (/resume) — sub-components defined at bottom of file
        404/           # 404 page
        _app.tsx       # App wrapper (globals.css + React Query provider)
        _document.tsx  # Document template (fonts, meta)
      data/            # Single source of truth for ALL content
        profile/       # Name, tagline, bio, photo, contact, social links
        experience/    # All work experience (with `domain` field for filtering)
        education/     # Education entries
        skills/        # Skill categories (used on resume only)
        teaching/      # Teaching subjects (in-school and out-of-school)
        theology/      # Theology bio, roles, tradition
        links/         # External links
        text.ts         # Standalone text strings (profile text for resume)
        index.ts       # Re-exports all data
      types/           # TypeScript types matching each data file
      utils/           # Helpers (getThemeColor)
      styles/          # globals.css (Tailwind + custom button class)
    public/            # Static assets (images, robots.txt, sitemap.xml)
    next.config.js     # Redirects for old routes
    tailwind.config.js # Colors, fonts, animations (keep as-is)
    tsconfig.json      # @/ path alias → ./src/
  backend/             # Go API (Gin + sqlc + Postgres)
    Dockerfile          # Multi-stage Docker build (alpine)
    .dockerignore
    Makefile
    docker-compose.yaml # Local Postgres on port 5470
    .env
    cmd/api/            # Entry point
    internal/
      database/         # Postgres connection pool + auto-migration
      server/           # Gin router, CORS middleware
      handlers/         # HTTP handlers (messages)
    db/
      migrations/       # SQL migration files (golang-migrate format)
        embed.go        # Embeds *.sql into binary via //go:embed
        000001_messages.up.sql
        000001_messages.down.sql
      queries/          # sqlc query files
      sqlc.yaml         # sqlc config
  AGENTS.md
  plan.md
```

## Environment Variables

### Frontend (`frontend/.env.local`)
- `NEXT_PUBLIC_API_URL` — URL of the Go backend (e.g. `http://localhost:8080` for dev)

### Backend (`backend/.env`)
- `DB_URL` — PostgreSQL connection string (e.g. `postgres://postgres:postgres@localhost:5470/sambacarlson?sslmode=disable`)

## Key Design Decisions

### Unified Homepage
The homepage is a single page with anchor-scroll sections for each persona (Engineering, Teaching, Theology), plus About and Education. The Navbar links are anchor links (`/#about`, `/#engineering`, etc.) and a link to `/resume`. No per-persona routes.

### Single Source of Truth for Content
All site content lives in `src/data/*.ts` and is strongly typed. Pages pull from data barrels — never hardcode content in `.tsx` files. To add or change content, edit the data files only.

### Experience Domain Filtering
`ExperienceType` has a `domain` field: `"development" | "teaching" | "theology"`. The homepage's Engineering and Teaching sections filter `myExperience` by domain. This lets one shared data file serve all sections.

### Extensible Contact Info
`ProfileDataType.socialLinks` is an array so new social links (Twitter, blog, etc.) can be added by editing `src/data/profile/profile.ts` only. The Footer renders them dynamically.

### Auto-Migrations on Startup
Migrations are embedded into the Go binary via `//go:embed` in `db/migrations/embed.go` and auto-applied by `internal/database/database.go:runMigrations()` when the server starts. No manual migration step needed in production — just start the container. The `golang-migrate` library tracks applied migrations in a `schema_migrations` table.

### Migration Conventions
Migration files use `golang-migrate` naming: `NNNNNN_name.up.sql` and `NNNNNN_name.down.sql`. Down migrations are used for rollbacks. Never use `IF NOT EXISTS` / `IF EXISTS` in migration SQL — fail loudly if the schema doesn't match expectations. To add a new migration: `make create-migration name=description`.

### API Endpoints
- `POST /api/messages` — Submit contact form (name, email, message; subject optional)
- `PATCH /api/messages/:id/read` — Mark a message as read (idempotent; returns 404 if already read)

### Querying Messages
```sh
docker exec sambacarlon_db psql -U postgres -d sambacarlon -c "SELECT * FROM messages;"
```

### No Component Abstractions for Single-Use Sections
The homepage (`src/pages/index.tsx`) inlines all UI sections directly (Navbar, Hero, About, Engineering, Teaching, Theology, Education, Footer) — no separate component files. Components are only extracted when they are reused multiple times within the same page (e.g. the resume page's `Experience`, `Education`, `Skill` sub-components at the bottom of the file). This reduces indirection and keeps each page self-contained. If a section needs to be shared across pages in the future, extract it at that point.

## Tailwind & Styling

**KEEP `tailwind.config.js` AS-IS.** The colors, fonts, animations, breakpoints, and dropShadows are intentionally chosen. If you change colors here, also update `src/utils/utils.ts` (the `getThemeColor` helper has its own color objects that should match).

### Theme Color System
The `getThemeColor(profile)` utility returns `[primary, primaryLight]` color pairs for each `ProfileType` (`"developer"`, `"teacher"`, `"designer"`, `"theologian"`, `"default"`). Currently the unified homepage uses the `developer` theme (green) everywhere. To use a different theme per section, pass a different `ProfileType` value to `getThemeColor`.

### Button Patterns
- `.btn-portforlio` — custom component class defined in `globals.css`. Used for portfolio buttons.
- Ring/hover patterns (e.g. `ring-1 hover:cursor-pointer py-2 px-4 ring-quatenary rounded-2xl hover:bg-quatenary text-quatenary hover:text-white duration-300`) — used on back buttons and CTAs.
Keep these styles.

## Build & Conventions

### Commands
All frontend commands run from `frontend/`. When invoking from the repo root, use `--prefix frontend` (e.g. `npm run build --prefix frontend`):
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint check

Backend commands run from `backend/`:
- `make run` — start Go API on :8080 (auto-applies pending migrations)
- `make migrate` — run pending migrations via golang-migrate CLI
- `make migrate-down` — roll back one migration
- `make create-migration name=foo` — scaffold `NNNNNN_foo.up.sql` and `NNNNNN_foo.down.sql`
- `make sqlc` — generate Go code from SQL queries
- `make build` — compile binary to `bin/api`
- `make test` — run Go tests
- `docker-compose up -d` — start local Postgres on port 5470
- `docker build -t sambacarlson-api .` — build production Docker image

### Path Aliases
`@/` maps to `./src/` (configured in `tsconfig.json`). Use `@/data`, `@/types`, `@/utils`.

### Router
This project uses the **Pages Router**, not the App Router. Use `import { useRouter } from "next/router"`. Do NOT import from `next/navigation`.

### ESLint
Extends `next/core-web-vitals`. Apostrophes in JSX text must be escaped as `&apos;` to avoid build failures. If you forget, `next build` will fail.

### Print Styles
The resume page has a Back button and Download PDF button. Both have the `print:hidden` class so they don't appear in printed/PDF output. The "Download PDF" button calls `window.print()` — the browser's print dialog lets users save as PDF.

## What to Avoid

- **Don't split the site into per-persona routes.** Keep it a single unified homepage.
- **Don't import `next/navigation`.** Use `next/router` (Pages Router).
- **Don't hardcode content in `.tsx` files.** Put it in `src/data/`.
- **Don't change `tailwind.config.js`** without checking with the owner — colors/animations are intentional.
- **Don't use `pages/api` unless adding a real API endpoint.** The old `hello.ts` boilerplate has been removed.
- **Don't leave unused `useState`/imports** — ESLint will flag missing effect dependencies.

## Adding Content

To add a new experience entry:
```ts
// src/data/experience/experience.ts
{
  date: "Date range",
  title: "Role",
  company: "Company",
  domain: "development", // or "teaching" or "theology"
  activities: {
    overview: "...",
    highlights: ["..."],
  },
}
```

To add a new social link:
```ts
// src/data/profile/profile.ts
socialLinks: [
  { label: "Twitter", href: "https://twitter.com/...", icon: "twitter" },
],
```

To add a new teaching subject, just append to `subjectsInSchool` or `subjectsOutSchool` in `src/data/teaching/teaching.ts`.
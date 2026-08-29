# Local-First Containerized Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the site fully runnable locally without Docker Compose for backend/frontend (just `make run` per service, plus `docker compose` for Postgres only), and make both services buildable as portable Docker images (`make build`) that can be deployed to any container platform by setting env vars — no code changes or rebuilds required to move hosts.

**Architecture:** The frontend proxies `/api/messages` to the Go backend through a Next.js API route (`pages/api/messages.ts`) that reads a server-side `BACKEND_URL` env var fresh on every request, so the browser only ever talks to its own origin — this removes the CORS-allowlist-per-deploy problem and stops leaking the backend's address to the browser. (An earlier draft of this design used `next.config.js` `rewrites()` instead; that was wrong — rewrite destinations get frozen into `routes-manifest.json` at build time and don't pick up a changed env var without a rebuild, which defeats the point. An API route re-reads `process.env` per request, so it actually works.) The backend reads `PORT`, `GIN_MODE`, and `ALLOWED_ORIGINS` from the environment instead of hardcoding them, and exposes `/healthz` for platform liveness checks. Each service gets its own `Makefile` with consistent `run` (fast local dev loop, no Docker) and `build` (produce the deployable Docker image) targets.

**Tech Stack:** Next.js 13 (Pages Router), Go + Gin, Docker (multi-stage builds), `docker compose` (Postgres only).

## Global Constraints

- No Docker Compose for backend or frontend — only Postgres uses `docker compose` (`backend/docker-compose.yaml`, unchanged).
- `make run` in each service must stay fast (no Docker build) — it's the minute-to-minute dev loop.
- `make build` in each service produces a Docker image — used occasionally, not on every change.
- No silent fallback to `localhost` for backend URL in non-local environments — fail loudly on the first request instead (this is the root cause of the suspected broken production contact form).
- `NEXT_PUBLIC_API_URL` is removed entirely; the browser must never need to know the backend's address.
- No automated test suite/CI is in scope for this plan — that's a separate follow-up. The one exception is the new pure-function `allowedOrigins()` helper, which gets a real unit test because it has no I/O dependency and is trivial to test properly.

---

### Task 1: Backend runtime config — PORT, GIN_MODE, ALLOWED_ORIGINS, /healthz

**Files:**
- Modify: `backend/cmd/api/main.go`
- Modify: `backend/internal/server/server.go`
- Create: `backend/internal/server/server_test.go`
- Create: `backend/internal/handlers/health.go`

**Interfaces:**
- Consumes: `database.DB` (existing, from `backend/internal/database/database.go`), `handlers.New(db *database.DB) *Handler` (existing).
- Produces: `allowedOrigins() []string` (unexported, package `server`) — used only inside `NewServer`. `(*Handler).HealthCheck(c *gin.Context)` — registered as `GET /healthz`.

- [ ] **Step 1: Write the failing test for `allowedOrigins()`**

Create `backend/internal/server/server_test.go`:

```go
package server

import (
	"os"
	"reflect"
	"testing"
)

func TestAllowedOrigins_DefaultsToLocalhostWhenUnset(t *testing.T) {
	os.Unsetenv("ALLOWED_ORIGINS")

	got := allowedOrigins()
	want := []string{"http://localhost:3000"}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("allowedOrigins() = %v, want %v", got, want)
	}
}

func TestAllowedOrigins_ParsesCommaSeparatedList(t *testing.T) {
	os.Setenv("ALLOWED_ORIGINS", "https://a.example.com, https://b.example.com")
	defer os.Unsetenv("ALLOWED_ORIGINS")

	got := allowedOrigins()
	want := []string{"https://a.example.com", "https://b.example.com"}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("allowedOrigins() = %v, want %v", got, want)
	}
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd backend && go test ./internal/server/... -run TestAllowedOrigins -v`
Expected: FAIL — `undefined: allowedOrigins` (compile error, since the function doesn't exist yet)

- [ ] **Step 3: Implement `allowedOrigins()`, GIN_MODE default, and rewire `NewServer`**

Replace `backend/internal/server/server.go` with:

```go
package server

import (
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sambacarlson/backend/internal/database"
	"github.com/sambacarlson/backend/internal/handlers"
)

type Server struct {
	db     *database.DB
	router *gin.Engine
}

func NewServer(db *database.DB) *Server {
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins(),
		AllowMethods:     []string{"GET", "POST", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	h := handlers.New(db)

	router.GET("/healthz", h.HealthCheck)

	api := router.Group("/api")
	{
		api.POST("/messages", h.CreateMessage)
		api.PATCH("/messages/:id/read", h.MarkMessageRead)
	}

	return &Server{
		db:     db,
		router: router,
	}
}

func allowedOrigins() []string {
	raw := os.Getenv("ALLOWED_ORIGINS")
	if raw == "" {
		return []string{"http://localhost:3000"}
	}

	origins := strings.Split(raw, ",")
	for i, o := range origins {
		origins[i] = strings.TrimSpace(o)
	}
	return origins
}

func (s *Server) Run(addr string) error {
	return s.router.Run(addr)
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd backend && go test ./internal/server/... -run TestAllowedOrigins -v`
Expected: PASS (both `TestAllowedOrigins_DefaultsToLocalhostWhenUnset` and `TestAllowedOrigins_ParsesCommaSeparatedList`)

- [ ] **Step 5: Add the `/healthz` handler**

Create `backend/internal/handlers/health.go`:

```go
package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) HealthCheck(c *gin.Context) {
	if err := h.db.Pool.Ping(c.Request.Context()); err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"status": "unavailable"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
```

This compiles against the existing `Handler` struct (`backend/internal/handlers/messages.go:12-14`), which already has a private `db *database.DB` field — no changes needed there.

- [ ] **Step 6: Add PORT env var support**

Replace `backend/cmd/api/main.go` with:

```go
package main

import (
	"log"
	"os"

	"github.com/sambacarlson/backend/internal/database"
	"github.com/sambacarlson/backend/internal/server"
)

func main() {
	db, err := database.New()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	s := server.NewServer(db)
	log.Printf("Starting server on :%s", port)
	if err := s.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
```

- [ ] **Step 7: Verify the backend builds and the full test suite passes**

Run: `cd backend && go build ./... && go test ./... -v`
Expected: build succeeds, all tests PASS (including the two from Step 4)

- [ ] **Step 8: Manually verify `/healthz` against a running Postgres**

Run (from `backend/`):
```bash
docker compose up -d
go run cmd/api/main.go
```
In another terminal: `curl -i http://localhost:8080/healthz`
Expected: `HTTP/1.1 200 OK` with body `{"status":"ok"}`

Stop the server with Ctrl-C when confirmed.

- [ ] **Step 9: Commit**

```bash
git add backend/cmd/api/main.go backend/internal/server/server.go backend/internal/server/server_test.go backend/internal/handlers/health.go
git commit -m "feat(backend): env-driven PORT/GIN_MODE/ALLOWED_ORIGINS and /healthz endpoint"
```

---

### Task 2: Backend Makefile — split `build` (Docker image) from `build-local` (native binary)

**Files:**
- Modify: `backend/Makefile`
- Create: `backend/.env.example`

**Interfaces:**
- Consumes: `backend/Dockerfile` (existing, unchanged).
- Produces: `make build` → Docker image tagged `sambacarlson-backend`; `make build-local` → native binary at `backend/bin/api`.

- [ ] **Step 1: Update the Makefile**

Replace `backend/Makefile` with:

```makefile
.PHONY: build build-local run test migrate migrate-down create-migration sqlc tidy

build-local:
	go build -o bin/api cmd/api/main.go

build:
	docker build -t sambacarlson-backend .

run:
	go run cmd/api/main.go

test:
	go test ./... -v

MIGRATE_CMD = migrate -path db/migrations -database "$(DB_URL)"

migrate:
	$(MIGRATE_CMD) up

migrate-down:
	$(MIGRATE_CMD) down 1

create-migration:
	@test -n "$(name)" || (echo "Usage: make create-migration name=foo"; exit 1)
	migrate create -ext sql -dir db/migrations -seq $(name)

sqlc:
	cd db && sqlc generate

tidy:
	go mod tidy
```

- [ ] **Step 2: Add an env var reference file**

Create `backend/.env.example`:

```
# Postgres connection string. Local default matches backend/docker-compose.yaml.
DB_URL=postgres://postgres:postgres@localhost:5470/sambacarlson?sslmode=disable

# Port the API listens on. Most managed platforms inject this automatically.
PORT=8080

# "release" or "debug". Leave unset in production (defaults to release).
# GIN_MODE=debug

# Comma-separated list of origins allowed to call the API directly.
# Not needed for the website itself (it goes through the frontend's same-origin proxy) —
# only relevant if you add a second, direct API client later.
# ALLOWED_ORIGINS=http://localhost:3000
```

- [ ] **Step 3: Verify `make build-local` and `make run` still work**

Run (from `backend/`):
```bash
make build-local
ls bin/api
make run
```
Expected: `bin/api` exists after `make build-local`; `make run` starts the server on `:8080` (stop with Ctrl-C once you see "Starting server on :8080").

- [ ] **Step 4: Commit**

```bash
git add backend/Makefile backend/.env.example
git commit -m "chore(backend): split make build into docker build vs build-local, add .env.example"
```

---

### Task 3: Frontend same-origin API proxy

**Files:**
- Modify: `frontend/next.config.js`
- Create: `frontend/src/pages/api/messages.ts`

**Interfaces:**
- Consumes: `BACKEND_URL` env var (server-side, no `NEXT_PUBLIC_` prefix), read fresh inside the handler on every request.
- Produces: `POST /api/messages` on the frontend's own origin, forwarded to `${BACKEND_URL}/api/messages`. Used by Task 4.

- [ ] **Step 1: Add `output: "standalone"` to `next.config.js`**

Replace `frontend/next.config.js` with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async redirects() {
    return [
      { source: "/developer", destination: "/", permanent: true },
      { source: "/developer/resume", destination: "/resume", permanent: true },
      { source: "/designer", destination: "/", permanent: true },
      { source: "/teacher", destination: "/", permanent: true },
      { source: "/theologian", destination: "/", permanent: true },
      { source: "/coverLetter", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
```

- [ ] **Step 2: Create the API route**

Create `frontend/src/pages/api/messages.ts`:

```ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const backendUrl =
    process.env.BACKEND_URL ||
    (process.env.NODE_ENV !== "production" ? "http://localhost:8080" : undefined);

  if (!backendUrl) {
    console.error("BACKEND_URL is not set — cannot proxy /api/messages");
    res.status(500).json({ error: "Server misconfigured: BACKEND_URL is not set" });
    return;
  }

  const backendRes = await fetch(`${backendUrl}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  const data = await backendRes.json();
  res.status(backendRes.status).json(data);
}
```

This reads `process.env.BACKEND_URL` inside the request handler, not at module load — so a container started with a different `BACKEND_URL` picks it up immediately, no rebuild required. Locally (`NODE_ENV !== "production"`), it defaults to `http://localhost:8080` for convenience; in production it has no fallback, so a misconfigured deploy returns a clear `500` instead of silently pointing at `localhost`.

- [ ] **Step 3: Verify the build succeeds**

Run (from `frontend/`): `npm run build`
Expected: build succeeds (API routes don't evaluate `BACKEND_URL` until a request comes in, so no env var is needed at build time).

- [ ] **Step 4: Manually verify both the misconfigured and configured paths**

Start the frontend without `BACKEND_URL` set but force production mode to exercise the no-fallback branch:
```bash
npm run build && NODE_ENV=production BACKEND_URL= npm run start
```
In another terminal: `curl -i -X POST http://localhost:3000/api/messages -H "Content-Type: application/json" -d '{"name":"a","email":"a@example.com","message":"hi"}'`
Expected: `HTTP/1.1 500`, body `{"error":"Server misconfigured: BACKEND_URL is not set"}`

Stop that server (Ctrl-C), then with the Task 1/2 backend running (`cd backend && docker compose up -d && make run`):
```bash
BACKEND_URL=http://localhost:8080 npm run start
```
Run the same `curl` command again.
Expected: `HTTP/1.1 201 Created` with the created message JSON (matching the backend's `MessageResponse` shape from `backend/internal/handlers/messages.go:27-35`).

- [ ] **Step 5: Commit**

```bash
git add frontend/next.config.js frontend/src/pages/api/messages.ts
git commit -m "feat(frontend): add same-origin /api/messages proxy route reading BACKEND_URL per-request"
```

---

### Task 3.5: Fix backend TIMESTAMP-scan bug (pre-existing, unblocks Task 4/8 verification)

**Discovered during Task 3's verification, not in the original plan.** `backend/internal/handlers/messages.go` scans Postgres `TIMESTAMP` columns (`read_at`, `created_at`) into Go `string`/`*string` fields. pgx v5 cannot decode a binary-format timestamp into a string — every real `POST /api/messages` (and `PATCH /api/messages/:id/read`, which hits the same pattern) returns `500 {"error":"Failed to save message"}` even though the row is inserted successfully. Confirmed repro: `scan err: can't scan into dest[6] (col: created_at): cannot scan timestamp (OID 1114) in binary format into *string`. This has nothing to do with deployment/containerization, but Task 4 Step 4 and Task 8 both submit the contact form for real and expect a success response — they will fail on this bug if it isn't fixed first.

**Files:**
- Modify: `backend/internal/handlers/messages.go`

**Interfaces:**
- Consumes: nothing new.
- Produces: `MessageResponse.CreatedAt` becomes `time.Time` (was `string`), `MessageResponse.ReadAt` becomes `*time.Time` (was `*string`). JSON output changes from an arbitrary string to an RFC3339 timestamp string (still a JSON string — no frontend code reads this field today, so this is not a breaking change to anything in this repo).

- [ ] **Step 1: Fix the struct fields and add the `time` import**

In `backend/internal/handlers/messages.go`, change the import block (currently lines 3-10):

```go
import (
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sambacarlson/backend/internal/database"
)
```

And change the `MessageResponse` struct (currently lines 27-35):

```go
type MessageResponse struct {
	ID        int        `json:"id"`
	Name      string     `json:"name"`
	Email     string     `json:"email"`
	Message   string     `json:"message"`
	Subject   *string    `json:"subject"`
	ReadAt    *time.Time `json:"read_at"`
	CreatedAt time.Time  `json:"created_at"`
}
```

No other code needs to change — `CreateMessage` and `MarkMessageRead` both already `.Scan(...)` into `&resp.ReadAt` and `&resp.CreatedAt` by pointer, and pgx v5 natively supports scanning a Postgres `TIMESTAMP` into `time.Time`/`*time.Time`.

- [ ] **Step 2: Verify it builds**

Run: `cd backend && go build ./... && go test ./... -v`
Expected: build succeeds, existing tests still pass (this task doesn't add new tests — there's no pure-function logic here to unit test in isolation; the fix is verified end-to-end in Step 3).

- [ ] **Step 3: Manually verify against a real Postgres**

```bash
cd backend && docker compose up -d && make run
```
In another terminal:
```bash
curl -i -X POST http://localhost:8080/api/messages -H "Content-Type: application/json" -d '{"name":"a","email":"a@example.com","message":"hi"}'
```
Expected: `HTTP/1.1 201 Created` with a JSON body including `"created_at":"<RFC3339 timestamp>"` and `"read_at":null` — no more `500`.

Then verify `PATCH .../read` also works (replace `<id>` with the `id` from the response above):
```bash
curl -i -X PATCH http://localhost:8080/api/messages/<id>/read
```
Expected: `HTTP/1.1 200 OK` with `"read_at":"<RFC3339 timestamp>"` populated.

Stop the server with Ctrl-C when confirmed.

- [ ] **Step 4: Commit**

```bash
git add backend/internal/handlers/messages.go
git commit -m "fix(backend): scan TIMESTAMP columns into time.Time instead of string"
```

---

### Task 4: Contact form uses the same-origin proxy instead of `NEXT_PUBLIC_API_URL`

**Files:**
- Modify: `frontend/src/pages/index.tsx:24-35`
- Create: `frontend/.env.local.example`

**Interfaces:**
- Consumes: `/api/messages` (relative URL, resolved by the Task 3 proxy).
- Produces: n/a (leaf change).

- [ ] **Step 1: Update the mutation function**

In `frontend/src/pages/index.tsx`, replace lines 24-35:

```tsx
  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      const res = await fetch(`${apiUrl}/api/messages`, {
```
(the current block using `apiUrl`) with:

```tsx
  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
  });
```

The full replaced block (lines 24-35) becomes:

```tsx
  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
  });
```

- [ ] **Step 2: Confirm no other references to `NEXT_PUBLIC_API_URL` remain**

Run: `grep -rn "NEXT_PUBLIC_API_URL" frontend/src`
Expected: no output (the only usage was the block just replaced)

- [ ] **Step 3: Add a frontend env var reference file**

Create `frontend/.env.local.example`:

```
# URL of the Go backend, read server-side by src/pages/api/messages.ts to proxy requests.
# Not needed locally if the backend runs on the default http://localhost:8080 —
# only required when pointing at a different backend, and always required in production.
BACKEND_URL=http://localhost:8080
```

- [ ] **Step 4: Manually verify the full contact form flow locally**

With the backend running (`cd backend && docker compose up -d && make run`), in another terminal:
```bash
cd frontend
npm run dev
```
(`BACKEND_URL` doesn't need to be set locally — the API route defaults to `http://localhost:8080` outside production, per Task 3 Step 2.)

Open `http://localhost:3000`, scroll to the contact form, submit it with test data.
Expected: "Thank you! Your message has been sent." confirmation appears.

Verify the row landed in Postgres:
```bash
docker exec sambacarlson_db psql -U postgres -d sambacarlson -c "SELECT id, name, email FROM messages ORDER BY id DESC LIMIT 1;"
```
Expected: the test submission is the most recent row.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/index.tsx frontend/.env.local.example
git commit -m "feat(frontend): submit contact form through same-origin /api proxy, drop NEXT_PUBLIC_API_URL"
```

---

### Task 5: Frontend Dockerfile (standalone Next.js build)

**Files:**
- Create: `frontend/Dockerfile`
- Create: `frontend/.dockerignore`

**Interfaces:**
- Consumes: `frontend/package.json`, `frontend/package-lock.json`, `output: "standalone"` from Task 3's `next.config.js`, `frontend/src/pages/api/messages.ts` from Task 3.
- Produces: a runnable image listening on port 3000, reading `BACKEND_URL` per-request (no rebuild needed to repoint it — the same image works against any backend, since Task 3's API route reads `process.env.BACKEND_URL` fresh on every call, not at build time).

- [ ] **Step 1: Create `.dockerignore`**

Create `frontend/.dockerignore`:

```
node_modules
.next
.git
*.md
```

- [ ] **Step 2: Create the Dockerfile**

Create `frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN adduser -D app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static
USER app
EXPOSE 3000
CMD ["node", "server.js"]
```

No `BACKEND_URL` is needed at build time — `pages/api/messages.ts` (Task 3) reads it per-request, so the same built image works against any backend by passing a different `BACKEND_URL` when the container starts.

- [ ] **Step 3: Build the image and verify it runs**

Run (from `frontend/`):
```bash
make build   # created in Task 6 — if running this step before Task 6, use: docker build -t sambacarlson-frontend .
docker run --rm -p 3000:3000 -e BACKEND_URL=http://host.docker.internal:8080 sambacarlson-frontend
```
Expected: server logs show it listening on port 3000. Visit `http://localhost:3000` (with the backend from Task 1/2 still running via `make run` on the host) and confirm the homepage renders.

Stop with Ctrl-C when confirmed.

- [ ] **Step 4: Commit**

```bash
git add frontend/Dockerfile frontend/.dockerignore
git commit -m "feat(frontend): add standalone Docker build for portable deployment"
```

---

### Task 6: Frontend Makefile

**Files:**
- Create: `frontend/Makefile`

**Interfaces:**
- Consumes: `frontend/Dockerfile` (Task 5).
- Produces: `make run` → `npm run dev`; `make build` → Docker image tagged `sambacarlson-frontend`.

- [ ] **Step 1: Create the Makefile**

Create `frontend/Makefile`:

```makefile
.PHONY: run build

run:
	npm run dev

build:
	docker build -t sambacarlson-frontend .
```

- [ ] **Step 2: Verify both targets**

Run (from `frontend/`):
```bash
make build
docker images sambacarlson-frontend
```
Expected: image listed.

```bash
make run
```
Expected: dev server starts on `http://localhost:3000` (stop with Ctrl-C once confirmed).

- [ ] **Step 3: Commit**

```bash
git add frontend/Makefile
git commit -m "chore(frontend): add Makefile with run/build targets"
```

---

### Task 7: Document the new architecture in AGENTS.md

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: nothing (documentation only).
- Produces: nothing (documentation only).

- [ ] **Step 1: Update the Environment Variables section**

In `AGENTS.md`, replace the existing `## Environment Variables` section (currently lines 68-74):

```markdown
## Environment Variables

### Frontend (`frontend/.env.local`, see `frontend/.env.local.example`)
- `BACKEND_URL` — URL of the Go backend, read server-side inside `src/pages/api/messages.ts` on every request and forwarded to. The browser never sees this value. Defaults to `http://localhost:8080` outside production; no fallback in production, so a misconfigured deploy returns a `500` instead of silently pointing at `localhost`.

### Backend (`backend/.env`, see `backend/.env.example`)
- `DB_URL` — PostgreSQL connection string (e.g. `postgres://postgres:postgres@localhost:5470/sambacarlson?sslmode=disable`)
- `PORT` — port the API listens on, defaults to `8080`
- `GIN_MODE` — `release` or `debug`; defaults to `release` if unset
- `ALLOWED_ORIGINS` — comma-separated CORS allowlist; only relevant for direct API clients other than the website itself, since the frontend talks to the API through its own same-origin proxy
```

- [ ] **Step 2: Update the Build & Conventions / Commands section**

Replace the existing `### Commands` subsection (currently lines 122-138):

```markdown
### Commands
Each service has its own `Makefile` with consistent targets: `make run` for fast local dev (no Docker), `make build` for producing the deployable Docker image (used occasionally, not per-change).

Frontend (`frontend/`):
- `make run` — `npm run dev`, start dev server
- `make build` — build the `sambacarlson-frontend` Docker image
- `npm run lint` — ESLint check

Backend (`backend/`):
- `make run` — `go run cmd/api/main.go`, start the API on `:8080` (or `$PORT`), auto-applies pending migrations
- `make build` — build the `sambacarlson-backend` Docker image
- `make build-local` — compile a native binary to `bin/api` (quick compile check, not for deployment)
- `make test` — run Go tests
- `make migrate` / `make migrate-down` — run/roll back migrations via the `golang-migrate` CLI
- `make create-migration name=foo` — scaffold a new migration
- `make sqlc` — generate Go code from SQL queries
- `docker compose up -d` (from `backend/`) — start local Postgres on port 5470. This is the only service that uses Docker Compose; frontend and backend are started individually via their Makefiles.

To run the whole site locally: `docker compose up -d` (from `backend/`) → `make run` (from `backend/`) → `make run` (from `frontend/`, with `BACKEND_URL` in `frontend/.env.local` if not using the `http://localhost:8080` default).
```

- [ ] **Step 3: Add a note to Architecture decisions about the API proxy**

After the existing `### Auto-Migrations on Startup` subsection in `AGENTS.md`, add:

```markdown
### Same-Origin API Proxy
The frontend never calls the backend directly from the browser. `src/pages/api/messages.ts` is a Next.js API route that reads `BACKEND_URL` and forwards the request server-side, so the browser only ever talks to its own origin. It reads the env var fresh on every request (not baked in at build time — plain `next.config.js` `rewrites()` would freeze the destination into `routes-manifest.json` at build time and NOT observe a later env var change, which is why this uses an API route instead). This means: no CORS allowlist to maintain per deploy, the backend's real address is never exposed to the browser, and repointing the site at a different backend deployment is a `BACKEND_URL` env var change + restart — no rebuild.
```

- [ ] **Step 4: Verify the doc renders sensibly**

Run: `cat AGENTS.md | grep -A5 "Same-Origin API Proxy"`
Expected: the new section appears with the text from Step 3.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs: document env-var-driven deployment and same-origin API proxy in AGENTS.md"
```

---

### Task 8: End-to-end local verification

**Files:** none (verification only)

**Interfaces:** none

- [ ] **Step 1: Fresh full-stack boot from scratch**

```bash
cd backend && docker compose up -d
cd backend && make run &
cd frontend && make run &
```

- [ ] **Step 2: Verify health check**

Run: `curl -i http://localhost:8080/healthz`
Expected: `200 OK`, body `{"status":"ok"}`

- [ ] **Step 3: Verify the homepage and contact form end-to-end**

Open `http://localhost:3000`, submit the contact form with real-looking test data.
Expected: success message shown in the UI.

Run: `docker exec sambacarlson_db psql -U postgres -d sambacarlson -c "SELECT id, name, email, created_at FROM messages ORDER BY id DESC LIMIT 1;"`
Expected: the just-submitted row is present.

- [ ] **Step 4: Verify the Docker image path works, and that repointing it needs no rebuild**

```bash
cd backend && make build
cd frontend && make build
docker run --rm -d --name sc-backend -p 8080:8080 -e DB_URL="postgres://postgres:postgres@host.docker.internal:5470/sambacarlson?sslmode=disable" sambacarlson-backend
docker run --rm -d --name sc-frontend -p 3001:3000 -e BACKEND_URL=http://host.docker.internal:8080 sambacarlson-frontend
```
Open `http://localhost:3001`, submit the contact form again.
Expected: success message shown, new row appears in the `messages` table query from Step 3.

Now prove the same image is portable without rebuilding: stop just the frontend container and restart it with a *deliberately wrong* `BACKEND_URL` to confirm it's actually being read at runtime, not baked in:
```bash
docker stop sc-frontend
docker run --rm -d --name sc-frontend -p 3001:3000 -e BACKEND_URL=http://127.0.0.1:1 sambacarlson-frontend
curl -i -X POST http://localhost:3001/api/messages -H "Content-Type: application/json" -d '{"name":"a","email":"a@example.com","message":"hi"}'
```
Expected: the request fails (connection refused to the bogus address) — proving the container is genuinely using the env var passed at `docker run` time, not a value frozen in at `make build` time. Restart it once more with the correct `BACKEND_URL=http://host.docker.internal:8080` to confirm it recovers with no rebuild.

Clean up:
```bash
docker stop sc-backend sc-frontend
```

- [ ] **Step 5: Stop the background dev processes from Step 1**

Bring the `make run` background jobs (backend and frontend) to the foreground or kill them (`kill %1 %2` or `fg` + Ctrl-C, depending on shell job numbers shown when they were started).

No commit for this task — it's verification only, confirming Tasks 1-7 work together.

# Backend Plan — Netlify Edition

Replaces the Vercel-based `plan.md`. Goal is identical: make the admin panel real (persist data, real auth, real image uploads) and feed that data to the public site. Everything below uses services **built into Netlify** — no separate server to run or pay for.

## Current state (what we're fixing)

- **No backend exists.** Zero API routes, zero server actions, zero database.
- Admin panel is a complete UI shell, but every save is `console.log` + redirect:
  - `src/app/admin/project/create/page.tsx`, `src/app/admin/project/[id]/EditProjectClient.tsx`
  - `src/app/admin/blog/create/page.tsx`, `src/app/admin/blog/[id]/EditBlogClient.tsx`
  - Delete/reorder in `src/app/admin/page.tsx` mutate React state only — gone on refresh.
- Auth is hardcoded `admin@admin.com` / `password` compared **in the browser** (`src/components/Admin/AuthContext.tsx:13-14`), and nothing guards `/admin` — anyone can open it directly.
- Image "upload" stores a guessed path string; no file is ever saved (`BlogForm.tsx:78-90`, `ProjectForm.tsx:67-79`).
- Public site reads `portfolio.json` / `blogs.json` at build time. Admin and public site are fully disconnected.
- There is **no public blog page at all** — `blogs.json` has no user-facing reader.

## Netlify stack (what replaces what)

| Need | Vercel plan (`plan.md`) | Netlify equivalent |
|---|---|---|
| Hosting + SSR | Vercel | **Netlify Next.js runtime** (supports App Router, API routes, server actions out of the box) |
| Database | Vercel Postgres + Prisma | **Netlify Blobs** for v1 (JSON store — enough for ~20 projects + a handful of posts). Upgrade path: **Netlify DB (Neon Postgres)** + Drizzle/Prisma if data outgrows blobs |
| File/image storage | Vercel Blob | **Netlify Blobs** (serve via a function route) or commit images through the admin — plus **Netlify Image CDN** for optimization |
| Auth | NextAuth on Vercel | NextAuth (Auth.js) Credentials provider — runs fine in Netlify functions. (Netlify Identity is deprecated for new sites; don't use it) |
| Serverless compute | Vercel functions | **Netlify Functions** (auto-generated from Next.js API routes / server actions by the runtime) |

**Why Blobs over Postgres for v1:** the entire dataset is two small JSON arrays. `getStore('content').setJSON('projects', [...])` gives persistence with zero schema, zero migrations, zero connection strings. Move to Netlify DB only when you need queries/relations (e.g. blog comments, tags filtering at scale).

## Hosting change required

GitHub Pages is static-only — **no Netlify feature works there**. Migration:

1. Connect the repo to Netlify (build command `next build`, the Next.js runtime plugin is auto-detected).
2. Remove `output: 'export'` from `next.config.js` (only needed for Pages).
3. Delete or disable `.github/workflows/nextjs.yml`.
4. Point the domain at Netlify.

## Implementation phases

### Phase 1 — Move hosting to Netlify
Deploy as-is. Site behaves exactly like today (static JSON), but now server code *can* run. Verify all pages render.

### Phase 2 — Data layer (Netlify Blobs)
1. `npm install @netlify/blobs`
2. Create two API routes (these become Netlify Functions automatically):
   - `src/app/api/projects/route.ts` — `GET` (list), `POST` (create)
   - `src/app/api/projects/[id]/route.ts` — `PUT`, `DELETE`
   - Same pair for `/api/blogs`.
3. Each route reads/writes one blob key: `getStore('content').getJSON('projects')` / `.setJSON('projects', updated)`.
4. Seed script: one-off route or CLI that copies `portfolio.json` and `blogs.json` into the blob store.

### Phase 3 — Auth
1. `npm install next-auth@beta`
2. Credentials provider; admin email + **bcrypt-hashed** password in Netlify env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `AUTH_SECRET`). Never in code.
3. `src/middleware.ts` guarding `/admin/*` (redirect to `/admin/login` when no session).
4. Guard the mutating API routes server-side too (check session in `POST`/`PUT`/`DELETE`) — middleware alone isn't enough.
5. Delete the hardcoded credentials from `AuthContext.tsx`; rewire it to NextAuth's `signIn`/`signOut`/`useSession`.

### Phase 4 — Wire the admin panel
1. Replace the four `console.log` stubs with `fetch('/api/...', { method, body })` calls + toast on success/error.
2. Dashboard (`src/app/admin/page.tsx`): load from `GET /api/...` instead of JSON imports; delete/reorder call the API.
3. Image upload: `POST /api/upload` route that writes the file to a Blobs store and returns a URL served by a `GET /api/images/[key]` route (or via Netlify Image CDN `/.netlify/images?url=...`). Replace the fake path-guessing in both forms.

### Phase 5 — Wire the public site
1. Convert public pages that import `portfolio.json` to **React Server Components** that read from the blob store (direct `getStore()` call — no fetch needed server-side): `app/page.tsx` tree, `app/detail/[id]/page.tsx`, `app/sitemap.ts`.
2. Add ISR (`export const revalidate = 60`) so content updates appear within a minute without redeploys.
3. **Build the missing public blog**: `app/blog/page.tsx` (list, published-only) + `app/blog/[slug]/page.tsx` (post detail). Without this, the whole blog admin has no audience.
4. Once everything reads from Blobs, delete the JSON imports (keep the files as seed data until migration is confirmed).

### Phase 6 — Cleanup
- Delete dead code: `Navbar.tsx` (or actually render it), `Portfolio/Portfolio.tsx`, `Technology/Technology.tsx`, `About/About.tsx`, `Intro/intro.tsx`.
- Rotate the EmailJS keys (current ones are hardcoded fallbacks in `ContactForm.tsx:36-38`) and keep them only in Netlify env vars.

## Environment variables (Netlify dashboard)

```
AUTH_SECRET=<openssl rand -base64 32>
ADMIN_EMAIL=<your email>
ADMIN_PASSWORD_HASH=<bcrypt hash>
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Netlify Blobs needs no config — it's wired automatically on Netlify deploys.

## Effort estimate

| Phase | Size |
|---|---|
| 1. Hosting move | ~1 hr |
| 2. Blobs API routes | ~half day |
| 3. Auth | ~half day |
| 4. Admin wiring | ~half day |
| 5. Public wiring + blog pages | ~1 day (blog pages are the bulk) |
| 6. Cleanup | ~1 hr |

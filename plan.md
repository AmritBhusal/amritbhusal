# Backend Implementation Plan: Portfolio & Blog

This document outlines the strategy for migrating the current static data architecture to a full-stack implementation using Next.js, Postgres, Prisma, and Vercel.

## 1. Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Database**: Vercel Postgres (Serverless PostgreSQL)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Auth.js v5)
- **File Storage**: Vercel Blob (for project images and blog media)
- **Deployment**: Vercel

---

## 2. Database Schema (Prisma)

Based on existing TypeScript interfaces, the `schema.prisma` will look like this:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}

model Project {
  id               String   @id @default(cuid())
  type             String   // Personal, Client
  name             String
  image            String
  demoUrl          String   @default("#")
  details          String   // Short description
  codeUrl          String   @default("#")
  role             String
  description      String   @db.Text
  technicalDetails String[]
  keyFeatures      String[]
  challenges       String[]
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String   @db.Text
  content     String   @db.Text
  coverImage  String
  category    String
  tags        String[]
  author      String
  publishedAt DateTime @default(now())
  isPublished Boolean  @default(false)
  updatedAt   DateTime @updatedAt
}

model User {
  id       String @id @default(cuid())
  email    String @unique
  password String // Hashed
}
```

---

## 3. Backend Architecture

### API Implementation Strategy
We will use **Next.js Server Actions** for all CRUD operations. This eliminates the need for manual `fetch` calls and provides end-to-end type safety.

#### Admin Operations (Protected)
- `createProject(data: ProjectInput)`
- `updateProject(id: string, data: ProjectInput)`
- `deleteProject(id: string)`
- `createBlogPost(data: BlogInput)`
- `updateBlogPost(id: string, data: BlogInput)`

#### Public Data Fetching
Public pages will use **React Server Components (RSC)** to fetch data directly from Prisma:
```typescript
// Example: src/app/portfolio/page.tsx
const projects = await prisma.project.findMany({
  orderBy: { createdAt: 'desc' }
});
```

---

## 4. Authentication Flow

1. **Setup**: Install `next-auth@beta`.
2. **Provider**: Use `CredentialsProvider` for initial setup.
3. **Guard**: Implement `middleware.ts` to protect all `/admin/*` routes.
4. **Session**: Use `auth()` helper in Server Components to verify identity.

---

## 5. Media Management

Currently, images are handled via Base64 or local paths. For the backend:
1. **Upload**: Use `upload` from `@vercel/blob` in the admin forms.
2. **Storage**: Images are stored in Vercel Blob, and the resulting URL is saved in the database.
3. **Integration**: Update `RichTextEditor` to upload to Vercel Blob instead of base64 for better performance.

---

## 6. Implementation Steps

### Phase 1: Database Setup
1. Create a **Vercel Postgres** instance in the Vercel dashboard.
2. Run `npm install prisma @prisma/client`.
3. Initialize prisma: `npx prisma init`.
4. Push schema: `npx prisma db push`.

### Phase 2: Authentication
1. Configure `auth.ts` logic.
2. Create login page and integrate with existing `AuthContext`.
3. Add middleware to prevent unauthorized access to `/admin`.

### Phase 3: Data Migration
1. Create a seed script (`prisma/seed.ts`) to migrate data from `portfolio.json` and `blogs.json` into Postgres.
2. Run `npx prisma db seed`.

### Phase 4: Frontend Refactor
1. Replace static JSON imports with Prisma queries in Server Components.
2. Convert admin form submissions to use Server Actions.
3. Integrate Vercel Blob for image uploads in `ProjectForm` and `BlogForm`.

---

## 7. Vercel Deployment Tips

- **Environment Variables**: Ensure `POSTGRES_PRISMA_URL` and `NEXTAUTH_SECRET` are set in Vercel.
- **Build Step**: Add `prisma generate` to the build script in `package.json`.
- **Edge Compatibility**: Keep Prisma queries in standard Node.js runtime unless using the Accelerate extension.

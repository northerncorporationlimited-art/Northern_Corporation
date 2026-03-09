# Architecture

## Overview

Northern Corporation is built on a modern, serverless-first architecture designed for scalability, performance, and developer experience.

---

## Tech Stack

### Frontend — Vercel (Next.js)

- **Platform:** [Vercel](https://vercel.com)
- **Framework:** Next.js (App Router)
- **Responsibilities:**
  - Server-side rendering (SSR) and static site generation (SSG)
  - Client-side interactivity and routing
  - API route handlers (`/api/*`)
  - Edge middleware for authentication and redirects
- **Deployment:** Automatic via GitHub integration with Vercel

### Backend & Database — Supabase

- **Platform:** [Supabase](https://supabase.com)
- **Database:** PostgreSQL (managed)
- **Responsibilities:**
  - Relational data storage and queries
  - Row Level Security (RLS) for fine-grained access control
  - Authentication (email/password, OAuth providers)
  - Real-time subscriptions via WebSockets
  - Edge Functions for server-side logic
- **Client Library:** `@supabase/supabase-js`

### Storage — Cloudflare R2

- **Platform:** [Cloudflare R2](https://developers.cloudflare.com/r2/)
- **Responsibilities:**
  - Object storage for user-uploaded files (images, documents, media)
  - S3-compatible API for seamless integration
  - Zero egress fees for cost-effective file delivery
- **Access:** Via presigned URLs generated from API routes

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                   Client (Browser)              │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              Vercel (Next.js App)                │
│                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │  App Router  │  │ API Routes  │  │  Edge   │ │
│  │  (Pages/UI)  │  │ (/api/*)    │  │Middleware│ │
│  └──────┬──────┘  └──────┬──────┘  └────┬────┘ │
└─────────┼───────────────┼──────────────┼────────┘
          │               │              │
          ▼               ▼              ▼
┌──────────────────┐  ┌──────────────────────────┐
│   Supabase       │  │    Cloudflare R2          │
│                  │  │                          │
│  • PostgreSQL DB │  │  • File/Media Storage    │
│  • Auth          │  │  • S3-Compatible API     │
│  • Realtime      │  │  • Presigned URLs        │
│  • Edge Funcs    │  │                          │
└──────────────────┘  └──────────────────────────┘
```

---

## Directory Structure

```
/
├── app/          # Next.js App Router pages and layouts
├── components/   # Reusable UI components
├── lib/          # Shared libraries (Supabase client, R2 helpers)
├── api/          # API route definitions and handlers
├── hooks/        # Custom React hooks
├── utils/        # Utility functions and helpers
└── tests/        # Test files
```

---

## Key Design Decisions

1. **App Router over Pages Router** — Leverages React Server Components for better performance and streaming.
2. **Supabase over custom backend** — Provides auth, database, and realtime out of the box with minimal setup.
3. **Cloudflare R2 over Supabase Storage** — Zero egress fees make it more cost-effective for file-heavy applications.
4. **Row Level Security (RLS)** — All database access is secured at the database level, not just the application level.

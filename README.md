# Next Ventures AI

Premium enterprise SaaS marketing platform for an AI software company. Built to convert business owners and enterprise decision-makers into demo bookings and SaaS subscriptions.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| UI | shadcn/ui, Framer Motion, GSAP, Lucide Icons |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis (ioredis, optional) |
| Auth | Clerk (optional in local dev) |
| Payments | Stripe (subscriptions, trials, coupons, billing portal) |
| CMS | Sanity (optional — falls back to Prisma/static data) |
| i18n | next-intl (English + Bengali ready) |
| Deployment | Vercel (frontend) + Supabase/Railway (database) |

---

## Prerequisites

Install these before running the project:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20 LTS or 24 LTS | Includes npm. [Download](https://nodejs.org/) |
| **Docker Desktop** | Latest | Used for local PostgreSQL |
| **Git** | Latest | Optional, for version control |

Verify installation:

```powershell
node -v    # e.g. v24.16.0
npm -v     # e.g. 11.x
docker -v  # e.g. Docker version 29.x
```

---

## Local Setup (Windows)

This project lives at:

```
J:\NbS\projects\next-ventures
```

### 1. Install dependencies

```powershell
cd "J:\NbS\projects\next-ventures"
npm install
```

### 2. Configure environment

Copy the example env file and create **both** `.env.local` (Next.js) and `.env` (Prisma CLI):

```powershell
Copy-Item .env.example .env.local
Copy-Item .env.local .env
```

**Important:** Prisma reads `.env`, not `.env.local`. Keep both in sync.

For local development, use the Docker PostgreSQL connection on port **5433** (avoids conflicts with other Postgres instances on 5432):

```env
DATABASE_URL="postgresql://nextventures:nextventures@localhost:5433/nextventures?schema=public"
DIRECT_URL="postgresql://nextventures:nextventures@localhost:5433/nextventures?schema=public"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Clerk, Stripe, Sanity, and Redis keys can remain as placeholders for local dev — the marketing site and admin dashboard work without them.

### 3. Start the database

```powershell
docker compose up -d
```

Or start the existing container:

```powershell
docker start nextventures-db
```

Database credentials:

| Setting | Value |
|---------|-------|
| Host | `localhost` |
| Port | `5433` |
| Database | `nextventures` |
| User | `nextventures` |
| Password | `nextventures` |

### 4. Push schema and seed data

```powershell
npm run db:push
npm run db:seed
```

Or run the combined setup script:

```powershell
npm run setup
```

This seeds **10 AI products**, testimonials, case studies, blog posts, and resources.

### 5. Start the dev server

```powershell
npm run dev
```

Open **[http://localhost:3000/en](http://localhost:3000/en)**

If port 3000 is in use:

```powershell
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
npm run dev
```

---

## Current Local Status

The following has been completed on this machine:

- [x] Node.js 24 LTS installed
- [x] Dependencies installed (`npm install`)
- [x] PostgreSQL running via Docker (`nextventures-db` on port 5433)
- [x] Database schema pushed (`npm run db:push`)
- [x] Seed data loaded (`npm run db:seed`)
- [x] Dev server verified at `http://localhost:3000/en`

---

## Next Steps

Work through these in order to move from local dev to production.

### Immediate (local development)

1. **Browse the site** — visit `/en`, `/en/solutions`, `/en/pricing`, `/en/book-demo`
2. **Explore admin** — visit `/en/admin` (accessible without Clerk keys in local dev)
3. **Inspect data** — run `npm run db:studio` to browse the database in Prisma Studio
4. **Add branding assets** — place `public/og-image.png` (1200×630) and PWA icons

### Authentication (Clerk)

1. Create a free app at [clerk.com](https://clerk.com)
2. Copy your publishable and secret keys into `.env.local` and `.env`
3. Set redirect URLs:
   - Sign-in: `/en/sign-in`
   - Sign-up: `/en/sign-up`
   - After sign-in: `/en/admin`
4. Restart the dev server — admin routes will then require login

### Payments (Stripe)

1. Create a Stripe account and get test API keys
2. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to env
3. Create products/prices in Stripe Dashboard
4. Map `stripePriceId` values in the database pricing plans
5. For local webhook testing, use the [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```powershell
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

### Content & CMS (optional)

1. Set up a [Sanity](https://sanity.io) project for blog and product content
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN` to env
3. Or manage all content via the admin dashboard and Prisma directly

### Caching (optional)

1. Run Redis locally or use a cloud provider (Upstash, Railway)
2. Set `REDIS_URL` in env — improves API response times for products, blog, and case studies

### Production deployment

1. **Database** — create a Supabase or Railway PostgreSQL instance; update `DATABASE_URL` and `DIRECT_URL`
2. **Frontend** — deploy to Vercel:
   ```powershell
   vercel deploy
   ```
   Set all env vars in the Vercel dashboard
3. **Stripe webhooks** — point to `https://yourdomain.com/api/stripe/webhook`
4. **Domain** — set `NEXT_PUBLIC_APP_URL` to your production URL
5. **Build check** — run `npm run build` locally before deploying (see Known Issues below)

### Future enhancements

- [ ] Customer portal for subscription management
- [ ] Partner / affiliate program
- [ ] Marketplace for AI agents
- [ ] API documentation portal
- [ ] Bangla (`/bn`) content translation
- [ ] Real AI chat backend (replace keyword-based `/api/chat`)

---

## Known Issues

| Issue | Workaround |
|-------|------------|
| `npm run build` fails with Clerk/webpack errors | Dev mode (`npm run dev`) works with Turbopack. Fix Clerk package versions or add real Clerk keys before production build. |
| Port 5432 already in use | Local Postgres uses port **5433** via Docker Compose |
| Prisma can't find env vars | Ensure `.env` exists (not just `.env.local`) |
| Invalid Clerk key crash | Placeholder keys (`pk_test_xxx`) are skipped automatically in local dev |

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # i18n marketing pages + admin dashboard
│   │   ├── page.tsx       # Home
│   │   ├── solutions/     # Product catalog + detail pages
│   │   ├── pricing/       # Pricing comparison
│   │   ├── case-studies/  # Client success stories
│   │   ├── blog/          # Blog with categories & tags
│   │   ├── resources/     # Guides, whitepapers, prompts
│   │   ├── contact/       # Enterprise inquiry form
│   │   ├── book-demo/     # Multi-step demo booking
│   │   └── admin/         # Admin dashboard
│   └── api/               # REST API routes
├── components/            # UI, layout, home, lead-gen, chat, admin
├── services/              # Business logic with Redis caching
├── hooks/                 # Analytics, exit-intent, scroll tracking
├── lib/                   # Prisma, Stripe, SEO, Clerk config, animations
├── data/                  # Static fallback data
├── config/                # Site config, navigation, pricing
└── types/                 # TypeScript definitions
prisma/
├── schema.prisma          # Full database schema
└── seed.ts                # 10 products + content
docker-compose.yml         # Local PostgreSQL (port 5433)
```

---

## Pages

| Page | Route |
|------|-------|
| Home | `/en` |
| Solutions | `/en/solutions` |
| Product Detail | `/en/solutions/[slug]` |
| Pricing | `/en/pricing` |
| Case Studies | `/en/case-studies` |
| Blog | `/en/blog` |
| Resources | `/en/resources` |
| About | `/en/about` |
| Contact | `/en/contact` |
| Book Demo | `/en/book-demo` |
| Admin | `/en/admin` |

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack, port 3000) |
| `npm run setup` | Install + push schema + seed database |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Sync Prisma schema to database |
| `npm run db:seed` | Seed products and content |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:migrate` | Create and run migrations |

---

## Environment Variables

See `.env.example` for the full list.

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `DIRECT_URL` | Yes | Direct DB connection (migrations) |
| `NEXT_PUBLIC_APP_URL` | Yes | Canonical app URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Production | Clerk auth |
| `CLERK_SECRET_KEY` | Production | Clerk auth |
| `STRIPE_SECRET_KEY` | Payments | Stripe API |
| `STRIPE_WEBHOOK_SECRET` | Payments | Stripe webhooks |
| `REDIS_URL` | Optional | Response caching |
| `NEXT_PUBLIC_SANITY_*` | Optional | Sanity CMS |

---

## Initial Products (Seeded)

1. AI Customer Support Agent
2. AI Sales Recovery Agent
3. AI Email Campaign Agent
4. AI Inventory Forecasting Agent
5. Shopify AI Assistant
6. AI Analytics Dashboard
7. AI CRM Assistant
8. AI Voice Receptionist
9. AI WhatsApp Business Agent
10. AI Appointment Scheduler

---

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List products (filter, search, featured) |
| `/api/products/[slug]` | GET | Single product |
| `/api/blog` | GET | Blog posts |
| `/api/case-studies` | GET | Case studies |
| `/api/leads` | POST | Lead capture |
| `/api/demo-requests` | POST | Demo booking |
| `/api/contact` | POST | Contact form |
| `/api/newsletter` | POST | Newsletter signup |
| `/api/chat` | POST | AI assistant responses |
| `/api/stripe/checkout` | POST | Create checkout session |
| `/api/stripe/webhook` | POST | Stripe webhook handler |
| `/api/analytics` | POST/GET | Event tracking |
| `/api/admin/*` | CRUD | Admin endpoints |

---

## Assets

Place these in `public/` before production deploy:

- `og-image.png` — 1200×630 Open Graph image
- `icon-192.png` / `icon-512.png` — PWA icons

---

## Design System

- **Style**: Stripe × Linear × Vercel aesthetic
- **Modes**: Dark + Light (system preference)
- **Effects**: Glassmorphism, gradient accents, floating cards
- **Animations**: Framer Motion page transitions, GSAP parallax, animated counters
- **Responsive**: 320px → 4K

---

## License

Proprietary — Next Ventures AI © 2026

# Next Ventures AI

Premium enterprise SaaS marketing platform for an AI software company. Built to convert business owners and enterprise decision-makers into demo bookings and SaaS subscriptions.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| UI | shadcn/ui, Framer Motion, GSAP, Lucide Icons |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis (ioredis) |
| Auth | Clerk |
| Payments | Stripe (subscriptions, trials, coupons, billing portal) |
| CMS | Sanity (optional — falls back to Prisma/static data) |
| i18n | next-intl (English + Bengali ready) |
| Deployment | Vercel (frontend) + Supabase/Railway (database) |

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Fill in DATABASE_URL, Clerk keys, Stripe keys, etc.

# Set up database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

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
│   │   └── admin/         # Protected admin dashboard
│   └── api/               # REST API routes
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── layout/            # Header, footer, navigation
│   ├── home/              # Home page sections
│   ├── solutions/         # Solutions listing components
│   ├── products/          # Product detail components
│   ├── pricing/           # Pricing tables
│   ├── lead-gen/          # Conversion widgets
│   ├── chat/              # AI assistant widget
│   └── admin/             # Admin dashboard components
├── services/              # Business logic layer
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (prisma, redis, stripe, seo)
├── data/                  # Static fallback data
├── config/                # Site config, navigation, pricing
└── types/                 # TypeScript type definitions
prisma/
├── schema.prisma          # Full database schema
└── seed.ts                # 10 products + testimonials + case studies
```

## Pages

| Page | Route | Features |
|------|-------|----------|
| Home | `/en` | Hero, stats, features, trusted-by, solutions preview, CTA |
| Solutions | `/en/solutions` | Category filter, search, sort, product cards |
| Product Detail | `/en/solutions/[slug]` | Video demo, ROI calculator, FAQs, pricing, testimonials |
| Pricing | `/en/pricing` | Monthly/yearly toggle, comparison table, enterprise CTA |
| Case Studies | `/en/case-studies` | Timeline, animated metrics, results charts |
| Blog | `/en/blog` | Categories, tags, search, reading time |
| Resources | `/en/resources` | Guides, whitepapers, templates, prompt library |
| About | `/en/about` | Mission, team, values |
| Contact | `/en/contact` | Enterprise form, Calendly, map |
| Book Demo | `/en/book-demo` | 4-step form with success animation |
| Admin | `/en/admin` | Full CRUD dashboard (Clerk protected) |

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
| `/api/admin/*` | CRUD | Protected admin endpoints |

## Environment Variables

See `.env.example` for the full list. Required for production:

- `DATABASE_URL` — PostgreSQL connection (Supabase/Railway)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL` — Production domain
- `REDIS_URL` — Optional, improves caching

## Deployment

### Vercel (Frontend)

```bash
vercel deploy
```

Set all environment variables in the Vercel dashboard.

### Database (Supabase)

1. Create a Supabase project
2. Copy the connection string to `DATABASE_URL` and `DIRECT_URL`
3. Run `npm run db:push && npm run db:seed`

### Stripe

1. Create products and prices in Stripe Dashboard
2. Map `stripePriceId` in pricing plans
3. Set webhook endpoint to `https://yourdomain.com/api/stripe/webhook`

## Assets

Place these in `public/` before production deploy:

- `og-image.png` — 1200×630 Open Graph image
- `icon-192.png` / `icon-512.png` — PWA icons

## Design System

- **Style**: Stripe × Linear × Vercel aesthetic
- **Modes**: Dark + Light (system preference)
- **Effects**: Glassmorphism, gradient accents, floating cards
- **Animations**: Framer Motion page transitions, GSAP parallax, animated counters
- **Responsive**: 320px → 4K

## License

Proprietary — Next Ventures AI © 2026
# Next-Ventures

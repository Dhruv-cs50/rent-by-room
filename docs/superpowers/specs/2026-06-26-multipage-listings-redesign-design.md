# Rent by the Room — Multi-Page Listings + Professional Redesign

**Date:** 2026-06-26
**Status:** Approved (pending spec review)

## Goal

Turn the current single-page React site into a multi-page site where each property
listing has its own URL and detailed "prototype" page, elevate the visual design to
look more professional, add interactivity, verify with Playwright, and deploy to
Vercel via GitHub auto-deploy.

## Decisions (locked with user)

| Topic | Decision |
|-------|----------|
| Page structure | Router routes — `react-router-dom`, per-listing URLs |
| Visual direction | Elevate current brand (navy `#1a2f4e` + orange `#E87722` + Playfair Display) |
| Photos | Keep Unsplash stock placeholders for now |
| Pricing | Add placeholder monthly room prices (editable later) |
| Deploy | Push to new GitHub repo via `gh` → import in Vercel dashboard → auto-deploy on push |
| Verify | Playwright MCP drives `npm run dev`, screenshots + interaction checks |
| Ruflo | Light use — `map`/`testgaps` workers, optional swarm review pass, AgentDB memory for slugs/tokens |

## Architecture

Split the current 596-line `src/App.jsx` into routes + focused components.

```
src/
├── main.jsx                 BrowserRouter mount
├── App.jsx                  Routes shell (Nav + <Outlet> + Footer)
├── data/properties.js       PROPERTIES, FAQS, WHY_ITEMS — extracted; +slug, +price, +gallery[]
├── routes/
│   ├── Home.jsx             hero · why · listings grid · FAQ · apply · contact (refined)
│   └── Listing.jsx          /listings/:slug — per-property prototype page
├── components/
│   ├── Nav.jsx
│   ├── Footer.jsx
│   ├── Toast.jsx
│   ├── PropertyCard.jsx     links to /listings/:slug
│   ├── ListingGallery.jsx   interactive gallery + lightbox + keyboard nav
│   ├── RoomGrid.jsx
│   ├── RoomCard.jsx
│   ├── FaqItem.jsx
│   ├── ApplyForm.jsx        shared by Home + Listing (prefill property)
│   └── AnimatedSection.jsx
└── index.css                tailwind directives + design tokens
```

Each component has one purpose, takes data via props, and is independently renderable.
`data/properties.js` is the single source of truth consumed by every route/component.

## Routing

| Path | Route |
|------|-------|
| `/` | `Home` |
| `/listings/:slug` | `Listing` (looks up property by slug; 404→redirect `/`) |
| `*` | redirect to `/` |

`vercel.json` adds a SPA rewrite so deep links / refresh on `/listings/...` don't 404.

## Data model changes

Each property gains:

- `slug` — URL-safe id, e.g. `2105-1st-street-lincoln`
- `price` — placeholder monthly room rate (number, e.g. `950`), rendered as `$950/mo`
- `gallery` — array of image URLs (seeded from existing `heroImg` + `rooms[].img`)

Existing fields (`address`, `city`, `tag`, `beds`, `baths`, `stories`, `features`,
`rooms`, `nearby`) are preserved.

## Per-listing prototype page (`/listings/:slug`)

- Breadcrumb back to home + sticky sub-nav
- Hero: address, tag, bed/bath/story badges, **price**
- Interactive `ListingGallery`: thumbnail strip → main image, arrow-key nav, click→lightbox
- Tabs: **Features** · **Rooms** (hover cards) · **Location** (nearby list + static map link)
- "Apply for this room" CTA → `ApplyForm` with `property` prefilled
- Prev/next listing navigation at page bottom

## Home page refinements (elevate, same brand)

- Keep all existing sections; tighten spacing + typographic scale
- Property cards link to detail pages instead of scroll-jump
- Add micro-interactions: card hover lift, staggered scroll-reveal, animated stat
  emphasis in "Why" section
- Mobile: keep existing responsive nav; add sticky apply CTA on listing pages

## Interactivity upgrades

- Gallery lightbox + keyboard navigation (Esc to close, ←/→ to move)
- Staggered `AnimatedSection` reveals
- Hover lifts on cards
- Apply form: existing inline validation + success state + focus management on error

## Testing

- Vitest smoke tests extended: route renders for `/` and each `/listings/:slug`,
  `ApplyForm` validation, slug lookup + 404 redirect.
- IntersectionObserver mock already in `setupTests.js`.

## Verification (Playwright MCP)

1. `npm run dev` (background)
2. Navigate `/`, screenshot, check nav links + hero CTAs
3. Navigate each `/listings/:slug`, screenshot, exercise gallery + tabs + apply CTA
4. Submit apply form, assert success toast
5. Iterate on any visual/interaction defects until clean

## Deployment

1. `git init`, `.gitignore` already present, initial commit
2. `gh repo create rent-by-room --public --source=. --push` (gh authed as `Dhruv-cs50`)
3. User imports repo in Vercel dashboard (framework: Vite, build `npm run build`,
   output `dist`)
4. `vercel.json` ships SPA rewrite; auto-deploy on every push

## Out of scope (YAGNI)

- Real backend / form submission persistence (stays simulated)
- Real property photos (stock for now)
- CMS / admin for editing listings (data file is source of truth)
- Auth, payments, booking calendar

## Ruflo usage (light touch)

- `daemon trigger -w map` / `-w testgaps` after refactor for structure + coverage signal
- Optional `swarm` review pass on the refactored component boundaries
- AgentDB memory store for listing slugs + design tokens (cross-session continuity)

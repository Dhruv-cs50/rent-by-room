# Rent by the Room

Marketing site for private room rentals in Lincoln & Sacramento, CA.
Affordable, flexible, move-in ready — $0 application, no credit check.

**Live:** https://rent-by-room.vercel.app

## Stack

- Vite + React 18
- Tailwind CSS v3
- react-router-dom v6 (multi-page: home + per-listing pages)
- Vitest + Testing Library

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm test         # run tests
```

## Structure

```
src/
├── data/properties.js   # single source of truth (listings, FAQs, contact)
├── components/           # Nav, Footer, gallery, cards, apply form, etc.
├── routes/               # Home, Listing (/listings/:slug)
└── App.jsx               # layout shell (Nav + Outlet + Footer + Toast)
public/listings/<slug>/   # real property photos
```

## Adding a listing's real photos

Drop optimized JPEGs in `public/listings/<slug>/`, then point that property's
`heroImg`, `rooms[].img`, and `gallery` in `src/data/properties.js` at them.

## Deploy

Auto-deploys to Vercel on every push to `master` (GitHub connected).
Manual: `vercel --prod`.

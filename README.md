# SpinXI

**No Arguments. Just Fair Decisions.**

A premium, client-side SaaS app for fair player order assignment and team coin tosses — powered by `window.crypto.getRandomValues()`.

## Features

- **Individual Mode** — Spinning wheel assigns unique numbers 1…N with equal probability; assigned numbers never repeat
- **Team Mode** — Two secure coin tosses decide who picks first and who chooses Bat/Bowl
- Dark / light mode, glassmorphism UI, Framer Motion animations
- No backend, no login, no database

## Stack

- React 19 · TypeScript · Tailwind CSS · Framer Motion · React Router · React Icons

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This app is ready for Vercel (`vercel.json` handles Vite build + React Router).

### Option A — GitHub (recommended)

1. Push your latest code to GitHub (`chandankumardv22/FairPlay`).
2. Open [vercel.com/new](https://vercel.com/new) and sign in.
3. **Import** the repository.
4. Keep defaults:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**.

### Option B — Vercel CLI

```bash
npx vercel login
npx vercel --prod
```

After deploy, open the `.vercel.app` URL Vercel gives you.

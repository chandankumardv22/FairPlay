# SpinXI

**No Arguments. Just Fair Decisions.**

A premium, client-side decision app styled as a cinematic command center — fair player order and team coin tosses powered by `window.crypto.getRandomValues()`.

## Features

- **Individual Mode** — Shield wheel assigns unique numbers 1…N; equal odds, no repeats
- **Team Mode** — Two secure cinematic coin tosses decide who picks first and Bat/Bowl
- Dark HQ UI with glass panels, HUD accents, Framer Motion animations
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

`vercel.json` handles Vite build + React Router SPA rewrites.

1. Push to GitHub, then import at [vercel.com/new](https://vercel.com/new), **or**
2. `npx vercel login` then `npx vercel --prod`

# FairPlay

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

## Fairness

All randomness uses the Web Crypto API with rejection sampling (no `Math.random()`, no modulo bias).

import { type ReactNode } from 'react'

/** Lightweight page wrapper — no exit animations that can block navigation */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>
}

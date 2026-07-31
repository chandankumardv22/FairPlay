import { Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '../../hooks/useTheme'

export function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      className={[
        'relative min-h-dvh overflow-x-hidden gradient-mesh',
        theme === 'dark' ? 'dark-mesh' : 'light-mesh',
      ].join(' ')}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl sm:h-72 sm:w-72 dark:bg-brand-500/15"
        animate={{ y: [0, 24, 0], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl sm:h-80 sm:w-80 dark:bg-sky-500/10"
        animate={{ y: [0, -20, 0], x: [0, -16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <header className="safe-pt relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between safe-px py-4 sm:px-8 sm:py-5">
        <Link to="/" className="group flex min-h-11 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-lg shadow-brand-600/30">
            FP
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 transition group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
            FairPlay
          </span>
        </Link>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl safe-px pb-10 sm:px-8 sm:pb-16">
        <Outlet />
      </main>

      <footer className="safe-pb relative z-10 mx-auto w-full max-w-6xl safe-px pt-2 text-center text-xs text-slate-500 sm:px-8">
        FairPlay · Cryptographically secure decisions · No accounts required
      </footer>
    </div>
  )
}

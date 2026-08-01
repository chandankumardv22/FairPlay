import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '../../hooks/useTheme'
import { CommandBackground } from './CommandBackground'
import { HologramOperatives } from './HologramOperatives'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/individual', label: 'Individual', end: false },
  { to: '/team', label: 'Team', end: false },
  { to: '/about', label: 'About', end: false },
] as const

export function Layout() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={`relative min-h-dvh overflow-x-hidden text-slate-100 ${theme === 'dark' ? '' : ''}`}>
      <CommandBackground />
      {!isHome ? <HologramOperatives /> : null}

      <header className="safe-pt relative z-30 border-b border-white/5 bg-slate-950/45 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 safe-px py-3 sm:px-8 sm:py-4">
          <Link to="/" className="group flex min-h-11 shrink-0 items-center gap-2.5">
            <motion.span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-slate-200 to-sky-600 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(220,38,38,0.45)]"
              animate={{
                boxShadow: [
                  '0 0 16px rgba(220,38,38,0.4)',
                  '0 0 28px rgba(37,99,235,0.5)',
                  '0 0 16px rgba(220,38,38,0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              SX
            </motion.span>
            <span className="font-orbitron text-sm font-bold tracking-wider text-white sm:text-base">
              SPINXI
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 font-orbitron text-[10px] font-semibold uppercase tracking-[0.16em] transition',
                    isActive
                      ? 'bg-red-500/15 text-red-300 shadow-[0_0_16px_rgba(220,38,38,0.2)]'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-0.5 md:hidden">
              {NAV.filter((n) => n.to !== '/').map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-2 py-2 font-orbitron text-[8px] font-semibold uppercase tracking-wider',
                      isActive ? 'text-red-300' : 'text-slate-500',
                    ].join(' ')
                  }
                >
                  {item.label.slice(0, 4)}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="relative z-20 mx-auto w-full max-w-6xl safe-px pb-12 pt-4 sm:px-8 sm:pb-16 sm:pt-6">
        <Outlet />
      </main>

      <footer className="safe-pb relative z-20 border-t border-white/5 bg-slate-950/30 py-4 text-center font-grotesk text-xs text-slate-500 backdrop-blur">
        SpinXI Command · Secure decisions · No accounts required
      </footer>
    </div>
  )
}

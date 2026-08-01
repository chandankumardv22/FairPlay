import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2'
import { FiArrowRight } from 'react-icons/fi'
import { PageTransition } from '../components/ui/PageTransition'
import { ArcOperative, WebOperative } from '../components/layout/HeroFigures'

const modes = [
  {
    to: '/individual',
    title: 'Individual Mode',
    description: 'Shield wheel. Unique numbers. Equal odds for every player.',
    icon: HiOutlineUsers,
    glow: 'from-red-500/20 to-sky-600/10',
  },
  {
    to: '/team',
    title: 'Team Mode',
    description: 'Cinematic coin toss. Who picks first. Who bats or bowls.',
    icon: HiOutlineUserGroup,
    glow: 'from-sky-500/15 to-amber-500/10',
  },
] as const

export function HomePage() {
  const [showModes, setShowModes] = useState(false)

  const handleStart = () => {
    setShowModes(true)
    requestAnimationFrame(() => {
      document.getElementById('choose-mode')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <PageTransition>
      {/* Full-viewport cinematic hero */}
      <section className="relative flex min-h-[calc(100dvh-7.5rem)] flex-col justify-center overflow-hidden pb-8 pt-2 sm:pb-12">
        <div className="pointer-events-none absolute bottom-0 left-[-8%] z-0 hidden h-[85%] w-[42%] max-w-md opacity-80 lg:block xl:left-[-4%] xl:opacity-90">
          <ArcOperative />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-[-10%] z-0 hidden h-[82%] w-[40%] max-w-md opacity-80 lg:block xl:right-[-4%] xl:opacity-90">
          <WebOperative />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-24 bg-gradient-to-r from-amber-500/15 to-transparent lg:hidden" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-24 bg-gradient-to-l from-red-500/15 to-transparent lg:hidden" />

        <div className="relative z-10 mx-auto max-w-2xl px-2 text-center">
          <motion.p
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 font-orbitron text-[10px] font-semibold uppercase tracking-[0.28em] text-red-300"
            animate={{
              boxShadow: [
                '0 0 0 rgba(220,38,38,0)',
                '0 0 18px rgba(220,38,38,0.3)',
                '0 0 0 rgba(220,38,38,0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Command Center Online
          </motion.p>

          <motion.h1
            className="font-orbitron text-5xl font-extrabold tracking-[0.1em] text-white sm:text-7xl md:text-8xl"
            style={{
              textShadow:
                '0 0 40px rgba(220,38,38,0.35), 0 0 80px rgba(56,189,248,0.25), 0 4px 24px rgba(0,0,0,0.5)',
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            SpinXI
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-md font-rajdhani text-lg font-medium tracking-wide text-slate-200 sm:mt-5 sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            Every Decision.
            <br className="sm:hidden" /> Fair by Design.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
          >
            <button
              type="button"
              onClick={handleStart}
              className="group relative inline-flex min-h-12 w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border border-red-400/50 bg-red-600/20 px-8 font-orbitron text-xs font-bold uppercase tracking-[0.24em] text-red-50 shadow-[0_0_28px_rgba(220,38,38,0.35)] transition hover:-translate-y-0.5 hover:bg-red-500/30 sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              Start
            </button>
            <a
              href="#how-it-works"
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-2xl border border-sky-400/35 bg-sky-500/10 px-8 font-orbitron text-xs font-bold uppercase tracking-[0.24em] text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-sky-500/20 sm:w-auto"
            >
              How It Works
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showModes ? (
          <motion.section
            id="choose-mode"
            key="modes"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 mx-auto mt-2 scroll-mt-24 max-w-4xl pb-4"
          >
            <p className="mb-5 text-center font-orbitron text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-300">
              Choose Mode
            </p>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {modes.map((mode, index) => {
                const Icon = mode.icon
                return (
                  <motion.div
                    key={mode.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.1 }}
                  >
                    <Link to={mode.to} className="group block h-full touch-manipulation">
                      <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition group-hover:-translate-y-1 group-hover:border-red-400/30 sm:p-8">
                        <div
                          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${mode.glow}`}
                        />
                        <div className="relative">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-sky-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h2 className="font-orbitron text-lg font-bold tracking-wide text-white sm:text-xl">
                            {mode.title}
                          </h2>
                          <p className="mt-2 font-grotesk text-sm leading-relaxed text-slate-400">
                            {mode.description}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300 transition group-hover:gap-3">
                            Enter <FiArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <div
        id="how-it-works"
        className="relative z-10 mx-auto mt-12 max-w-3xl scroll-mt-24 rounded-3xl border border-white/10 bg-slate-950/50 p-6 backdrop-blur-xl sm:mt-16 sm:p-8"
      >
        <h3 className="font-orbitron text-sm font-bold uppercase tracking-[0.22em] text-red-300">
          How It Works
        </h3>
        <ul className="mt-4 space-y-3 font-rajdhani text-base text-slate-300 sm:text-lg">
          <li>
            <span className="font-semibold text-white">Individual</span> — Spin the shield wheel.
            Each player gets one unique number via secure random selection.
          </li>
          <li>
            <span className="font-semibold text-white">Team</span> — Two independent coin tosses
            decide first pick and bat/bowl — fair 50/50 every time.
          </li>
          <li>
            <span className="font-semibold text-white">Trust</span> — Outcomes use{' '}
            <code className="text-sky-300">crypto.getRandomValues()</code>, never Math.random().
          </li>
        </ul>
      </div>
    </PageTransition>
  )
}

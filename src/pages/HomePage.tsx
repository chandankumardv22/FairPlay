import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2'
import { FiArrowRight } from 'react-icons/fi'
import { GlassCard } from '../components/ui/GlassCard'
import { PageTransition } from '../components/ui/PageTransition'
import { TrustBadge } from '../components/ui/TrustBadge'

const modes = [
  {
    to: '/individual',
    title: 'Individual Mode',
    description:
      'Assign a unique random order to every player with a cryptographically fair spinning wheel. No repeats. No bias.',
    icon: HiOutlineUsers,
    accent: 'from-brand-500/20 to-sky-500/10',
  },
  {
    to: '/team',
    title: 'Team Mode',
    description:
      'Mid-pitch toss — who picks first, then who elects to bat or bowl. Secure coin. Cricket ceremony.',
    icon: HiOutlineUserGroup,
    accent: 'from-pitch-500/25 to-ball-500/10',
  },
] as const

export function HomePage() {
  return (
    <PageTransition>
      <section className="relative pb-10 pt-6 sm:pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-800 dark:text-brand-200"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Secure · Fair · Transparent
            </motion.p>

            <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl">
              FairPlay
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
              No Arguments. Just Fair Decisions.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
          {modes.map((mode, index) => {
            const Icon = mode.icon
            return (
              <motion.div
                key={mode.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
              >
                <Link to={mode.to} className="block h-full focus-visible:outline-none">
                  <GlassCard
                    hoverLift
                    strong
                    className="group relative h-full overflow-hidden p-6 sm:p-8"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${mode.accent} opacity-70 transition group-hover:opacity-100`}
                    />
                    <div className="relative">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {mode.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {mode.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:gap-3 dark:text-brand-300">
                        Start
                        <FiArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <TrustBadge compact />
        </motion.div>
      </section>
    </PageTransition>
  )
}

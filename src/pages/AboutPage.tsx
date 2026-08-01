import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '../components/ui/PageTransition'

export function AboutPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-3xl pb-10 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 backdrop-blur-xl sm:p-10"
        >
          <p className="font-orbitron text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400">
            About
          </p>
          <h1 className="mt-3 font-orbitron text-3xl font-bold text-white sm:text-4xl">SpinXI</h1>
          <p className="mt-4 font-grotesk text-base leading-relaxed text-slate-300">
            SpinXI is a premium, client-side decision tool for fair player order and team tosses.
            No accounts. No backend. Every outcome is generated with the Web Crypto API so nobody gets
            an unfair edge.
          </p>
          <p className="mt-4 font-grotesk text-sm leading-relaxed text-slate-400">
            The command-center aesthetic is an original high-tech sci-fi theme. Operative holograms
            are abstract energy signatures — not affiliated with any film studio or franchise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/individual"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 px-5 font-orbitron text-[10px] font-bold uppercase tracking-widest text-sky-200"
            >
              Individual Mode
            </Link>
            <Link
              to="/team"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 font-orbitron text-[10px] font-bold uppercase tracking-widest text-slate-200"
            >
              Team Mode
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}

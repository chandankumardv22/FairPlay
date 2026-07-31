import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

type CelebrationProps = {
  show: boolean
  title: string
  subtitle?: string
  onDone?: () => void
  durationMs?: number
}

export function Celebration({
  show,
  title,
  subtitle,
  onDone,
  durationMs = 500,
}: CelebrationProps) {
  useEffect(() => {
    if (!show || !onDone) return
    const timer = window.setTimeout(onDone, durationMs)
    return () => window.clearTimeout(timer)
  }, [show, onDone, durationMs])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-brand-500/10 backdrop-blur-[2px]" />
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                backgroundColor: ['#14b8a6', '#38bdf8', '#fbbf24', '#f472b6', '#a78bfa'][i % 5],
                left: `${8 + ((i * 17) % 84)}%`,
                top: '55%',
              }}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{
                y: -120 - (i % 5) * 30,
                opacity: 0,
                scale: 0.4,
                x: ((i % 2 === 0 ? 1 : -1) * (20 + (i % 7) * 8)),
              }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: i * 0.02 }}
            />
          ))}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative glass-strong rounded-3xl px-8 py-6 text-center shadow-2xl"
          >
            <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </p>
            {subtitle ? (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

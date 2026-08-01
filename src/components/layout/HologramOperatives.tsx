import { motion } from 'framer-motion'

/**
 * Original holographic "operatives" — thematic energy signatures only.
 * No copyrighted character likenesses, costumes, or trademarks.
 */
const OPERATIVES = [
  { id: 'arc', label: 'ARC', accent: '#f59e0b', glow: 'rgba(245,158,11,0.45)', effect: 'reactor' },
  { id: 'aegis', label: 'AEGIS', accent: '#3b82f6', glow: 'rgba(59,130,246,0.4)', effect: 'shield' },
  { id: 'storm', label: 'STORM', accent: '#38bdf8', glow: 'rgba(56,189,248,0.45)', effect: 'lightning' },
  { id: 'titan', label: 'TITAN', accent: '#22c55e', glow: 'rgba(34,197,94,0.4)', effect: 'pulse' },
  { id: 'spectre', label: 'SPECTRE', accent: '#ef4444', glow: 'rgba(239,68,68,0.35)', effect: 'stealth' },
  { id: 'mark', label: 'MARK', accent: '#94a3b8', glow: 'rgba(148,163,184,0.35)', effect: 'pulse' },
  { id: 'mystic', label: 'MYSTIC', accent: '#a855f7', glow: 'rgba(168,85,247,0.45)', effect: 'portal' },
  { id: 'weave', label: 'WEAVE', accent: '#f43f5e', glow: 'rgba(244,63,94,0.4)', effect: 'pulse' },
  { id: 'king', label: 'KING', accent: '#c084fc', glow: 'rgba(192,132,252,0.45)', effect: 'kinetic' },
  { id: 'chaos', label: 'CHAOS', accent: '#dc2626', glow: 'rgba(220,38,38,0.45)', effect: 'chaos' },
  { id: 'synth', label: 'SYNTH', accent: '#eab308', glow: 'rgba(234,179,8,0.4)', effect: 'reactor' },
  { id: 'wing', label: 'WING', accent: '#60a5fa', glow: 'rgba(96,165,250,0.4)', effect: 'pulse' },
  { id: 'quantum', label: 'QUANTUM', accent: '#f97316', glow: 'rgba(249,115,22,0.4)', effect: 'pulse' },
  { id: 'sting', label: 'STING', accent: '#eab308', glow: 'rgba(234,179,8,0.35)', effect: 'pulse' },
  { id: 'nova', label: 'NOVA', accent: '#fbbf24', glow: 'rgba(251,191,36,0.5)', effect: 'reactor' },
] as const

function OperativeFigure({
  accent,
  glow,
  effect,
  label,
}: {
  accent: string
  glow: string
  effect: string
  label: string
}) {
  return (
    <div className="relative flex h-28 w-16 flex-col items-center justify-end sm:h-36 sm:w-20">
      {/* Soft energy body (abstract silhouette) */}
      <div
        className="absolute bottom-6 h-16 w-8 rounded-full opacity-40 blur-[2px] sm:h-20 sm:w-10"
        style={{
          background: `linear-gradient(180deg, ${accent}88, transparent)`,
          boxShadow: `0 0 24px ${glow}`,
        }}
      />
      <div
        className="absolute bottom-14 h-6 w-6 rounded-full opacity-70 sm:bottom-16 sm:h-7 sm:w-7"
        style={{ background: accent, boxShadow: `0 0 16px ${glow}` }}
      />

      {effect === 'reactor' ? (
        <motion.div
          className="absolute bottom-[4.5rem] h-3 w-3 rounded-full sm:bottom-24"
          style={{ background: accent, boxShadow: `0 0 12px ${glow}` }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      ) : null}

      {effect === 'lightning' ? (
        <motion.div
          className="absolute inset-x-2 top-2 h-10 opacity-60"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{
            background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
            clipPath: 'polygon(40% 0, 60% 0, 45% 45%, 70% 45%, 30% 100%, 40% 55%, 20% 55%)',
          }}
        />
      ) : null}

      {effect === 'portal' ? (
        <motion.div
          className="absolute top-1 h-10 w-10 rounded-full border sm:h-12 sm:w-12"
          style={{ borderColor: accent, boxShadow: `0 0 16px ${glow}` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      ) : null}

      {effect === 'chaos' || effect === 'kinetic' ? (
        <motion.div
          className="absolute top-4 h-8 w-8 rounded-full opacity-40 blur-md"
          style={{ background: accent }}
          animate={{ scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      ) : null}

      {effect === 'shield' ? (
        <div
          className="absolute top-3 h-8 w-8 rounded-full border-2 opacity-70"
          style={{ borderColor: accent, boxShadow: `0 0 12px ${glow}` }}
        />
      ) : null}

      <span
        className="font-orbitron text-[7px] font-bold tracking-widest sm:text-[8px]"
        style={{ color: accent, textShadow: `0 0 8px ${glow}` }}
      >
        {label}
      </span>
    </div>
  )
}

export function HologramOperatives() {
  const left = OPERATIVES.slice(0, 8)
  const right = OPERATIVES.slice(8)

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden>
      <div className="absolute bottom-[8%] left-2 flex flex-col gap-3 opacity-50 xl:left-4 xl:opacity-60">
        {left.map((op, i) => (
          <motion.div
            key={op.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.6 }}
          >
            <OperativeFigure {...op} />
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-[8%] right-2 flex flex-col gap-3 opacity-50 xl:right-4 xl:opacity-60">
        {right.map((op, i) => (
          <motion.div
            key={op.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.6 }}
          >
            <OperativeFigure {...op} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

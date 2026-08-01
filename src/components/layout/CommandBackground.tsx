import { motion } from 'framer-motion'

/** Cinematic HQ backdrop — dark navy command center */
export function CommandBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050814]" aria-hidden>
      {/* Control room gradients — blue + red energy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,#1e3a8a44,transparent_45%),radial-gradient(ellipse_at_85%_15%,#7f1d1d40,transparent_42%),radial-gradient(ellipse_at_50%_100%,#17255455,transparent_45%),linear-gradient(180deg,#030712_0%,#0B1020_45%,#111827_100%)]" />

      {/* Animated energy wash */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'linear-gradient(120deg, transparent 30%, rgba(37,99,235,0.12) 50%, transparent 70%)',
        }}
        animate={{ x: ['-20%', '20%', '-20%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stars */}
      <div className="hq-stars absolute inset-0 opacity-60" />

      {/* Metallic wall suggestion */}
      <div
        className="absolute inset-y-0 left-0 w-24 opacity-20 sm:w-40"
        style={{
          background:
            'linear-gradient(90deg, rgba(148,163,184,0.25), transparent), repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(56,189,248,0.08) 24px, rgba(56,189,248,0.08) 25px)',
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 opacity-20 sm:w-40"
        style={{
          background:
            'linear-gradient(270deg, rgba(148,163,184,0.25), transparent), repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(220,38,38,0.08) 24px, rgba(220,38,38,0.08) 25px)',
        }}
      />

      {/* Earth from space */}
      <div className="absolute -bottom-36 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full opacity-35 sm:h-[520px] sm:w-[520px] md:opacity-45">
        <div className="hq-earth absolute inset-0 rounded-full" />
        <div className="absolute inset-0 rounded-full shadow-[inset_-40px_-20px_60px_rgba(0,0,0,0.7)]" />
        <div className="absolute -inset-10 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* Energy portals */}
      <motion.div
        className="absolute left-[-6%] top-[26%] h-44 w-44 rounded-full border border-red-400/25 sm:h-60 sm:w-60"
        style={{ boxShadow: '0 0 50px rgba(220,38,38,0.2), inset 0 0 35px rgba(220,38,38,0.12)' }}
        animate={{ rotate: 360, scale: [1, 1.04, 1] }}
        transition={{
          rotate: { duration: 36, repeat: Infinity, ease: 'linear' },
          scale: { duration: 5, repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[-5%] h-36 w-36 rounded-full border border-sky-400/30 sm:h-52 sm:w-52"
        style={{ boxShadow: '0 0 50px rgba(37,99,235,0.25), inset 0 0 30px rgba(56,189,248,0.12)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
      />

      {/* Circuit HUD */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ckt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M0 120 H180 L220 160 H400" stroke="url(#ckt)" strokeWidth="1" fill="none" />
        <path d="M0 400 H120 L160 360 H300 L340 400 H800" stroke="url(#ckt)" strokeWidth="1" fill="none" />
        <path d="M900 80 V200 L860 240 V500" stroke="url(#ckt)" strokeWidth="1" fill="none" />
        <circle cx="220" cy="160" r="3" fill="#38bdf8" />
        <circle cx="160" cy="360" r="3" fill="#ef4444" />
      </svg>

      {/* Fog / volumetric */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-sky-500/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 29) % 100}%`,
            backgroundColor: i % 3 === 0 ? 'rgba(220,38,38,0.55)' : 'rgba(56,189,248,0.55)',
          }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.18 }}
        />
      ))}

      {/* HUD rings */}
      <div className="absolute left-1/2 top-[16%] h-64 w-64 -translate-x-1/2 rounded-full border border-white/5 sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-[20%] h-48 w-48 -translate-x-1/2 rounded-full border border-red-400/10 sm:h-60 sm:w-60" />
    </div>
  )
}

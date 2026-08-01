import { motion } from 'framer-motion'

/** Stylized armored operative — original geometric silhouette (left frame) */
export function ArcOperative() {
  return (
    <motion.div
      className="pointer-events-none relative h-full w-full select-none"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      {/* Blue energy aura */}
      <div className="absolute inset-[10%] rounded-full bg-sky-500/15 blur-3xl" />
      <motion.div
        className="absolute left-[38%] top-[28%] h-16 w-16 -translate-x-1/2 rounded-full bg-sky-400/40 blur-xl"
        animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />

      {/* HUD projections */}
      <motion.div
        className="absolute left-[8%] top-[18%] h-20 w-20 rounded-full border border-sky-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-[12%] top-[22%] h-14 w-14 rounded-full border border-dashed border-amber-400/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute left-[5%] top-[42%] space-y-1 opacity-40">
        {['SYS ONLINE', 'ARC CORE', 'HUD v4'].map((t) => (
          <p key={t} className="font-orbitron text-[7px] tracking-[0.2em] text-sky-300/80">
            {t}
          </p>
        ))}
      </div>

      <svg viewBox="0 0 220 480" className="relative h-full w-full drop-shadow-[0_0_28px_rgba(56,189,248,0.35)]">
        <defs>
          <linearGradient id="armorGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="armorRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="40%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <radialGradient id="arcCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
          </radialGradient>
          <filter id="metalGlow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Legs */}
        <path d="M78 300 L68 420 L88 420 L98 310 Z" fill="url(#armorRed)" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M142 300 L122 310 L132 420 L152 420 Z" fill="url(#armorRed)" stroke="#fbbf24" strokeWidth="1.5" />
        <rect x="64" y="412" width="28" height="14" rx="3" fill="url(#armorGold)" />
        <rect x="128" y="412" width="28" height="14" rx="3" fill="url(#armorGold)" />

        {/* Torso */}
        <path
          d="M70 150 L150 150 L165 220 L155 300 L65 300 L55 220 Z"
          fill="url(#armorRed)"
          stroke="#fbbf24"
          strokeWidth="2"
        />
        <path d="M85 160 L135 160 L140 210 L80 210 Z" fill="url(#armorGold)" opacity="0.85" />

        {/* Arc reactor */}
        <circle cx="110" cy="205" r="22" fill="url(#arcCore)" filter="url(#metalGlow)" />
        <circle cx="110" cy="205" r="14" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.9" />
        <circle cx="110" cy="205" r="6" fill="#f0f9ff" />

        {/* Arms */}
        <path d="M70 165 L28 230 L42 245 L78 195 Z" fill="url(#armorRed)" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M150 165 L192 230 L178 245 L142 195 Z" fill="url(#armorRed)" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="30" cy="238" r="12" fill="url(#armorGold)" />
        <circle cx="190" cy="238" r="12" fill="url(#armorGold)" />

        {/* Helmet */}
        <path
          d="M78 70 L142 70 L155 120 L148 155 L72 155 L65 120 Z"
          fill="url(#armorRed)"
          stroke="#fbbf24"
          strokeWidth="2"
        />
        <path d="M88 105 L132 105 L128 130 L92 130 Z" fill="#0ea5e9" opacity="0.85" filter="url(#metalGlow)" />
        <path d="M95 78 L125 78 L130 95 L90 95 Z" fill="url(#armorGold)" opacity="0.7" />

        {/* Shoulder pads */}
        <ellipse cx="62" cy="155" rx="22" ry="14" fill="url(#armorGold)" />
        <ellipse cx="158" cy="155" rx="22" ry="14" fill="url(#armorGold)" />
      </svg>

      {/* Floating energy particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-sky-300"
          style={{ left: `${20 + (i % 4) * 18}%`, top: `${30 + (i % 5) * 12}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  )
}

/** Stylized web-slinger silhouette — original geometric figure (right frame) */
export function WebOperative() {
  return (
    <motion.div
      className="pointer-events-none relative h-full w-full select-none"
      animate={{ y: [0, -10, 0], rotate: [2, -1, 2] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <div className="absolute inset-[15%] rounded-full bg-red-500/10 blur-3xl" />

      {/* Web lines */}
      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 220 480">
        <path
          d="M180 40 Q140 120 110 180"
          fill="none"
          stroke="rgba(248,250,252,0.45)"
          strokeWidth="1.5"
        />
        <path
          d="M200 80 Q150 140 120 200"
          fill="none"
          stroke="rgba(248,250,252,0.25)"
          strokeWidth="1"
        />
        <path
          d="M160 20 Q130 100 95 160"
          fill="none"
          stroke="rgba(56,189,248,0.3)"
          strokeWidth="1"
        />
      </svg>

      <svg viewBox="0 0 220 480" className="relative h-full w-full drop-shadow-[0_0_24px_rgba(220,38,38,0.4)]">
        <defs>
          <linearGradient id="suitRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="suitBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        {/* Dynamic swinging pose — body tilted */}
        <g transform="translate(10,20) rotate(-12 110 240)">
          {/* Legs */}
          <path d="M95 280 L70 400 L90 405 L110 290 Z" fill="url(#suitRed)" />
          <path d="M125 285 L155 395 L175 390 L140 290 Z" fill="url(#suitBlue)" />

          {/* Torso */}
          <path
            d="M85 140 L145 135 L155 280 L75 285 Z"
            fill="url(#suitRed)"
            stroke="#1e3a8a"
            strokeWidth="1"
          />
          <path d="M100 160 L130 158 L135 230 L95 232 Z" fill="url(#suitBlue)" opacity="0.85" />

          {/* Arms — one raised (web), one back */}
          <path d="M145 150 L195 90 L205 105 L155 175 Z" fill="url(#suitRed)" />
          <path d="M85 155 L35 210 L48 222 L95 175 Z" fill="url(#suitBlue)" />
          <circle cx="200" cy="92" r="10" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />

          {/* Head */}
          <ellipse cx="115" cy="115" rx="32" ry="36" fill="url(#suitRed)" />
          {/* Eye lenses */}
          <ellipse cx="100" cy="112" rx="12" ry="8" fill="#e0f2fe" opacity="0.95" />
          <ellipse cx="130" cy="112" rx="12" ry="8" fill="#e0f2fe" opacity="0.95" />
          {/* Web pattern hints */}
          <path
            d="M90 130 Q115 145 140 128"
            fill="none"
            stroke="rgba(15,23,42,0.35)"
            strokeWidth="1"
          />
          <path
            d="M95 95 Q115 85 135 95"
            fill="none"
            stroke="rgba(15,23,42,0.3)"
            strokeWidth="1"
          />
        </g>
      </svg>

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{ left: `${30 + (i % 5) * 12}%`, top: `${20 + (i % 4) * 15}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: 2 + i * 0.18, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </motion.div>
  )
}

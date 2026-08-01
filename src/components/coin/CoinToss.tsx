import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { secureCoinFlip, secureRandomInt } from '../../utils/secureRandom'
import type { CoinSide } from '../../types'

type CoinTossProps = {
  title: string
  subtitle: string
  headsLabel: string
  tailsLabel: string
  disabled?: boolean
  buttonLabel?: string
  onComplete: (result: { side: CoinSide; winnerLabel: string }) => void
}

const FLIP_MS = 2800
const REVEAL_MS = 1400
const MUTE_KEY = 'spinxi-coin-muted'

function playTone(
  ctx: AudioContext,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  gain = 0.04,
) {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + dur + 0.02)
}

function HeadsFace() {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(0deg) translateZ(1px)',
        background:
          'radial-gradient(circle at 30% 26%, #e2e8f0 0%, #64748b 24%, #1e293b 58%, #0f172a 100%)',
        boxShadow:
          'inset 0 2px 12px rgba(255,255,255,0.32), inset 0 -10px 20px rgba(0,0,0,0.55), 0 0 28px rgba(37,99,235,0.4)',
      }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <radialGradient id="hGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="url(#hRing)" strokeWidth="4" opacity="0.7" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.65" />
        <circle cx="100" cy="100" r="64" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.4" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 42}
              y1={100 + Math.sin(a) * 42}
              x2={100 + Math.cos(a) * 70}
              y2={100 + Math.sin(a) * 70}
              stroke="#38bdf8"
              strokeWidth="1.2"
              opacity="0.4"
            />
          )
        })}
        <circle cx="100" cy="100" r="38" fill="url(#hGlow)" />
        <circle cx="100" cy="100" r="28" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.5" />
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="#020617"
          fontSize="64"
          fontWeight="800"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
          opacity="0.45"
          transform="translate(1.5 1.5)"
        >
          H
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="#e0f2fe"
          fontSize="64"
          fontWeight="800"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          H
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-[8%] rounded-full border border-sky-300/30" />
    </div>
  )
}

function TailsFace() {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        // Opposite face of the coin — must face away at rest (rotateY 180)
        transform: 'rotateY(180deg) translateZ(1px)',
        background:
          'radial-gradient(circle at 30% 26%, #fecaca 0%, #dc2626 28%, #7f1d1d 58%, #1c1917 100%)',
        boxShadow:
          'inset 0 2px 12px rgba(255,255,255,0.25), inset 0 -10px 20px rgba(0,0,0,0.55), 0 0 28px rgba(220,38,38,0.35)',
      }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="tGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="url(#tGold)" strokeWidth="3.5" opacity="0.7" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.55" />
        <circle cx="100" cy="100" r="52" fill="none" stroke="#f8fafc" strokeWidth="2" opacity="0.35" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2
          return (
            <circle
              key={i}
              cx={100 + Math.cos(a) * 64}
              cy={100 + Math.sin(a) * 64}
              r="2.5"
              fill="#fde68a"
              opacity="0.65"
            />
          )
        })}
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="#450a0a"
          fontSize="64"
          fontWeight="800"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
          opacity="0.5"
          transform="translate(1.5 1.5)"
        >
          T
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="#fff1f2"
          fontSize="64"
          fontWeight="800"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          T
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-[8%] rounded-full border border-amber-200/25" />
    </div>
  )
}

export function CoinToss({
  title,
  subtitle,
  headsLabel,
  tailsLabel,
  disabled = false,
  buttonLabel = 'Flip Coin',
  onComplete,
}: CoinTossProps) {
  const [flipping, setFlipping] = useState(false)
  const [result, setResult] = useState<CoinSide | null>(null)
  const [winnerLabel, setWinnerLabel] = useState('')
  // Primary flip axis is rotateY (0 = heads, 180 = tails)
  const [rotateY, setRotateY] = useState(0)
  const [tiltX, setTiltX] = useState(0)
  const [liftY, setLiftY] = useState(0)
  const [scale, setScale] = useState(1)
  const [showFx, setShowFx] = useState(false)
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === '1'
    } catch {
      return false
    }
  })
  const finishedRef = useRef(false)
  const timersRef = useRef<number[]>([])
  const audioRef = useRef<AudioContext | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
      void audioRef.current?.close()
    }
  }, [])

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timersRef.current.push(id)
  }

  const ensureAudio = useCallback(() => {
    if (muted) return null
    if (!audioRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioRef.current = new Ctx()
    }
    if (audioRef.current.state === 'suspended') void audioRef.current.resume()
    return audioRef.current
  }, [muted])

  const playFlipSound = useCallback(() => {
    const ctx = ensureAudio()
    if (!ctx) return
    const now = ctx.currentTime
    playTone(ctx, 220, now, 0.12, 'triangle', 0.03)
    playTone(ctx, 340, now + 0.15, 0.1, 'sawtooth', 0.02)
    playTone(ctx, 180, now + 0.4, 0.15, 'triangle', 0.025)
    playTone(ctx, 280, now + 0.8, 0.12, 'square', 0.015)
    playTone(ctx, 160, now + 1.4, 0.18, 'triangle', 0.02)
  }, [ensureAudio])

  const playLandSound = useCallback(() => {
    const ctx = ensureAudio()
    if (!ctx) return
    const now = ctx.currentTime
    playTone(ctx, 90, now, 0.18, 'sine', 0.06)
    playTone(ctx, 520, now + 0.08, 0.25, 'triangle', 0.035)
    playTone(ctx, 780, now + 0.2, 0.35, 'sine', 0.025)
  }, [ensureAudio])

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev
      try {
        localStorage.setItem(MUTE_KEY, next ? '1' : '0')
      } catch {
        /* ignore */
      }
      return next
    })
  }

  const handleFlip = () => {
    if (flipping || disabled || result !== null) return

    finishedRef.current = false
    setFlipping(true)
    setResult(null)
    setWinnerLabel('')
    setShowFx(false)
    setScale(1)

    const isHeads = secureCoinFlip()
    const side: CoinSide = isHeads ? 'heads' : 'tails'
    const winner = isHeads ? headsLabel : tailsLabel

    // Land on 0° (heads) or 180° (tails), with several full spins from current angle
    const targetMod = isHeads ? 0 : 180
    const currentMod = ((rotateY % 360) + 360) % 360
    const deltaToTarget = (targetMod - currentMod + 360) % 360
    const extraSpins = 5 + secureRandomInt(3)
    const nextRotateY = rotateY + extraSpins * 360 + deltaToTarget
    const wobble = (secureRandomInt(2) === 0 ? 1 : -1) * (12 + secureRandomInt(10))

    setTiltX(0)
    setLiftY(0)

    playFlipSound()

    requestAnimationFrame(() => {
      setRotateY(nextRotateY)
      setTiltX(wobble)
      setLiftY(-120)
      schedule(() => setLiftY(-100), FLIP_MS * 0.28)
      schedule(() => setLiftY(4), FLIP_MS * 0.62)
      schedule(() => setLiftY(-28), FLIP_MS * 0.72)
      schedule(() => setLiftY(0), FLIP_MS * 0.84)
      schedule(() => setTiltX(0), FLIP_MS * 0.88)
    })

    schedule(() => {
      if (finishedRef.current) return
      setTiltX(0)
      setFlipping(false)
      setResult(side)
      setWinnerLabel(winner)
      setShowFx(true)
      setScale(1.06)
      playLandSound()
      schedule(() => setScale(1), 220)

      schedule(() => {
        if (finishedRef.current) return
        finishedRef.current = true
        onCompleteRef.current({ side, winnerLabel: winner })
      }, REVEAL_MS)
    }, FLIP_MS)
  }

  return (
    <div className="relative flex w-full flex-col items-center gap-5 sm:gap-6">
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute sound' : 'Mute sound'}
        className="absolute right-0 top-0 z-20 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur transition hover:bg-white/10"
      >
        {muted ? <HiSpeakerXMark className="h-5 w-5" /> : <HiSpeakerWave className="h-5 w-5" />}
      </button>

      <div className="w-full pr-10 text-center sm:pr-0">
        <p className="font-orbitron text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400">
          Secure Toss
        </p>
        <h2 className="mt-2 font-orbitron text-xl font-bold text-slate-100 sm:text-2xl">{title}</h2>
        <p className="mt-1 font-grotesk text-sm text-slate-400">{subtitle}</p>
      </div>

      <div className="flex w-full max-w-md gap-2 text-center text-sm sm:gap-3">
        <div className="min-w-0 flex-1 rounded-2xl border border-sky-400/20 bg-sky-500/10 px-2.5 py-3 backdrop-blur sm:px-3">
          <p className="font-orbitron text-[9px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Heads
          </p>
          <p className="mt-1 truncate font-grotesk font-semibold text-slate-100">{headsLabel}</p>
        </div>
        <div className="flex items-center px-1 font-orbitron text-[10px] text-slate-500">VS</div>
        <div className="min-w-0 flex-1 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-2.5 py-3 backdrop-blur sm:px-3">
          <p className="font-orbitron text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-300">
            Tails
          </p>
          <p className="mt-1 truncate font-grotesk font-semibold text-slate-100">{tailsLabel}</p>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex h-56 w-full max-w-sm items-end justify-center pb-4 sm:h-64">
        {/* HUD rings */}
        <div className="pointer-events-none absolute inset-x-8 top-6 bottom-10 rounded-full border border-sky-400/10" />
        <div className="pointer-events-none absolute inset-x-14 top-12 bottom-16 rounded-full border border-violet-400/10" />

        {/* Ground shadow */}
        <motion.div
          animate={{
            scaleX: flipping ? [1, 0.45, 0.55, 1, 0.7, 1] : 1,
            opacity: flipping ? [0.45, 0.15, 0.2, 0.4, 0.25, 0.45] : 0.4,
          }}
          transition={{ duration: FLIP_MS / 1000, times: [0, 0.25, 0.4, 0.65, 0.8, 1] }}
          className="absolute bottom-3 h-4 w-28 rounded-[100%] bg-black/50 blur-md"
        />

        {/* Energy particles while flipping */}
        {flipping
          ? Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
                style={{
                  backgroundColor: ['#38bdf8', '#a855f7', '#fbbf24', '#f87171'][i % 4],
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: ((i % 2 === 0 ? 1 : -1) * (30 + (i % 5) * 12)),
                  y: -40 - (i % 6) * 14,
                  opacity: [0, 0.9, 0],
                }}
                transition={{ duration: 1.1, delay: i * 0.08, repeat: 1 }}
              />
            ))
          : null}

        <div style={{ perspective: 1200 }} className="relative z-10">
          {/* Blur on wrapper — never on the 3D coin (filter flattens preserve-3d) */}
          <motion.div
            animate={{
              y: liftY,
              scale,
              opacity: flipping ? 0.96 : 1,
            }}
            transition={{
              y: { duration: 0.35, ease: 'easeInOut' },
              scale: { duration: 0.22 },
            }}
          >
            <motion.div
              animate={{
                rotateY,
                rotateX: tiltX,
              }}
              transition={{
                rotateY: { duration: flipping ? FLIP_MS / 1000 : 0.2, ease: [0.12, 0.65, 0.15, 1] },
                rotateX: { duration: 0.45, ease: 'easeInOut' },
              }}
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
              }}
              className="relative h-32 w-32 sm:h-40 sm:w-40"
            >
              <div
                className="absolute inset-[-3px] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #334155, #94a3b8, #334155)',
                  transform: 'translateZ(0px)',
                  opacity: 0.9,
                }}
                aria-hidden
              />
              <HeadsFace />
              <TailsFace />
            </motion.div>
          </motion.div>

          {showFx ? (
            <div className="coin-shine pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          ) : null}
        </div>

        <AnimatePresence>
          {showFx ? (
            <motion.div
              key="pulse"
              className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-400/60"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ) : null}
        </AnimatePresence>

        {showFx
          ? Array.from({ length: 14 }).map((_, i) => (
              <span
                key={`burst-${i}`}
                className="pointer-events-none absolute left-1/2 top-[42%] h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: ['#38bdf8', '#a855f7', '#fbbf24', '#f87171', '#e2e8f0'][i % 5],
                  marginLeft: `${((i * 41) % 90) - 45}px`,
                  animation: `wheel-particle-float 0.95s ease-out ${i * 0.025}s forwards`,
                }}
              />
            ))
          : null}
      </div>

      <AnimatePresence>
        {result && winnerLabel ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm rounded-2xl border border-sky-400/25 bg-slate-950/80 p-5 text-center shadow-[0_0_40px_rgba(56,189,248,0.2)] backdrop-blur-xl"
          >
            <p className="font-orbitron text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400">
              Winner
            </p>
            <p className="mt-2 font-orbitron text-2xl font-bold text-slate-50 sm:text-3xl">
              {winnerLabel}
            </p>
            <p className="mt-1 font-grotesk text-sm text-slate-400">
              {result === 'heads' ? 'Heads' : 'Tails'} · fair secure toss
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleFlip}
        disabled={flipping || disabled || result !== null}
        className="coin-flip-btn touch-manipulation"
      >
        {flipping ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-sky-300 border-r-transparent" />
            In flight…
          </span>
        ) : (
          buttonLabel
        )}
      </button>

      {!result ? (
        <p className="font-grotesk text-center text-xs text-slate-500">
          {flipping ? 'Cryptographic toss in progress…' : '50 / 50 · powered by secure random'}
        </p>
      ) : null}
    </div>
  )
}

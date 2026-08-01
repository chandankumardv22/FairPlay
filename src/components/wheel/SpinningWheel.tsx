import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { securePickIndex } from '../../utils/secureRandom'

/** Cap-inspired shield segment palette — red / white / blue */
const SEGMENT_FILLS = [
  ['#b91c1c', '#dc2626'],
  ['#f8fafc', '#e2e8f0'],
  ['#1e40af', '#2563eb'],
  ['#991b1b', '#ef4444'],
  ['#f1f5f9', '#cbd5e1'],
  ['#1d4ed8', '#3b82f6'],
]

const SPIN_MS = 3800
const CX = 200
const CY = 200
const OUTER_R = 162
const INNER_R = 42

type SpinningWheelProps = {
  remainingNumbers: number[]
  disabled?: boolean
  onSpinComplete: (selected: number) => void
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function slicePath(startAngle: number, endAngle: number) {
  const start = polar(CX, CY, OUTER_R, endAngle)
  const end = polar(CX, CY, OUTER_R, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${CX} ${CY} L ${start.x} ${start.y} A ${OUTER_R} ${OUTER_R} 0 ${largeArc} 0 ${end.x} ${end.y} Z`
}

function StarPath(cx: number, cy: number, outer: number, inner: number, points = 5) {
  const coords: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (i * Math.PI) / points - Math.PI / 2
    coords.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`)
  }
  return coords.join(' ')
}

export function SpinningWheel({
  remainingNumbers,
  disabled = false,
  onSpinComplete,
}: SpinningWheelProps) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [showImpact, setShowImpact] = useState(false)
  const [shake, setShake] = useState(false)
  const finishedRef = useRef(false)
  const timerRef = useRef<number | null>(null)
  const impactTimerRef = useRef<number | null>(null)
  const onCompleteRef = useRef(onSpinComplete)
  onCompleteRef.current = onSpinComplete

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      if (impactTimerRef.current !== null) window.clearTimeout(impactTimerRef.current)
    }
  }, [])

  const slices = useMemo(() => {
    const count = remainingNumbers.length
    if (count === 0) return []
    const sweep = 360 / count
    return remainingNumbers.map((number, index) => {
      const startAngle = index * sweep
      const endAngle = startAngle + sweep
      const midAngle = startAngle + sweep / 2
      const labelR = count === 1 ? 0 : count > 20 ? 118 : 108
      const labelPos = polar(CX, CY, labelR, midAngle)
      const [c0, c1] = SEGMENT_FILLS[index % SEGMENT_FILLS.length]!
      const isLight = c0.startsWith('#f') || c0.startsWith('#e') || c0 === '#f8fafc' || c0 === '#f1f5f9'
      return {
        number,
        index,
        path: count === 1 ? undefined : slicePath(startAngle, endAngle),
        labelPos,
        fillId: `shieldSeg-${index}`,
        c0,
        c1,
        labelFill: isLight ? '#0f172a' : '#f8fafc',
        fontSize: count > 24 ? 11 : count > 16 ? 13 : count > 10 ? 16 : 20,
      }
    })
  }, [remainingNumbers])

  const handleSpin = () => {
    if (spinning || disabled || remainingNumbers.length === 0) return

    finishedRef.current = false
    setSpinning(true)
    setSelectedNumber(null)
    setShowImpact(false)
    setShake(false)

    const selectedIndex = securePickIndex(remainingNumbers.length)
    const selected = remainingNumbers[selectedIndex]!

    const sweep = 360 / remainingNumbers.length
    const segmentMid = selectedIndex * sweep + sweep / 2
    const targetModulo = (360 - segmentMid + 360) % 360
    const currentModulo = ((rotation % 360) + 360) % 360
    const deltaToTarget = (targetModulo - currentModulo + 360) % 360
    const extraSpins = 5 + securePickIndex(3)
    const nextRotation = rotation + extraSpins * 360 + deltaToTarget

    setRotation(nextRotation)

    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (finishedRef.current) return
      finishedRef.current = true
      setSpinning(false)
      setSelectedNumber(selected)
      setShowImpact(true)
      setShake(true)

      impactTimerRef.current = window.setTimeout(() => {
        setShake(false)
        setShowImpact(false)
        onCompleteRef.current(selected)
      }, 1100)
    }, SPIN_MS)
  }

  const isBusy = spinning || disabled

  return (
    <div className="flex w-full flex-col items-center gap-5 sm:gap-6">
      <motion.div
        animate={
          shake
            ? { x: [0, -5, 6, -3, 2, 0], y: [0, 4, -3, 2, 0], rotate: [0, -1.5, 1.2, -0.6, 0] }
            : { x: 0, y: 0, rotate: 0 }
        }
        transition={{ duration: 0.55, ease: [0.22, 1.2, 0.36, 1] }}
        className="relative w-full max-w-[min(100%,400px)]"
      >
        {/* Shield ambient aura */}
        <div
          className={`wheel-idle-aura pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.4),rgba(220,38,38,0.12),transparent_70%)] ${
            spinning ? 'opacity-95' : ''
          }`}
        />

        {/* Futuristic metallic pointer */}
        <div className="wheel-pointer absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-0.5">
          <svg width="40" height="52" viewBox="0 0 40 52" aria-hidden>
            <defs>
              <linearGradient id="ptrSilver" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="35%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="ptrRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            <path
              d="M20 2 L34 30 L20 48 L6 30 Z"
              fill="url(#ptrSilver)"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            <path d="M20 26 L28 34 L20 48 L12 34 Z" fill="url(#ptrRed)" />
            <circle cx="20" cy="16" r="3.5" fill="#38bdf8" opacity="0.95" />
            <circle cx="20" cy="16" r="1.5" fill="#e0f2fe" />
          </svg>
        </div>

        <div className="relative overflow-hidden rounded-full p-[4px] shadow-[0_0_50px_rgba(37,99,235,0.35),0_0_30px_rgba(220,38,38,0.2),0_25px_50px_rgba(0,0,0,0.55)]">
          {/* Outer metallic rim */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #94a3b8, #e2e8f0, #64748b, #cbd5e1, #475569, #f1f5f9, #94a3b8)',
            }}
          />
          <div className="relative rounded-full bg-[#0a0a0f] p-1.5 sm:p-2">
            <motion.div
              animate={{ rotate: rotation }}
              transition={{
                duration: spinning ? SPIN_MS / 1000 : 0,
                // Heavy shield: snappy accel, long deceleration, slight overshoot feel via bounce shake
                ease: [0.12, 0.75, 0.08, 1],
              }}
              className="relative aspect-square w-full"
              style={{
                filter: spinning
                  ? 'blur(0.85px) brightness(1.12) contrast(1.05)'
                  : undefined,
              }}
            >
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <defs>
                  <radialGradient id="shieldMetal" cx="32%" cy="28%" r="78%">
                    <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.45" />
                    <stop offset="40%" stopColor="#94a3b8" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#020617" stopOpacity="0.75" />
                  </radialGradient>
                  <linearGradient id="brushed" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="50%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>
                  <filter id="numGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.2" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="starGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {slices.map((s) => (
                    <linearGradient key={s.fillId} id={s.fillId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={s.c0} />
                      <stop offset="100%" stopColor={s.c1} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Concentric shield rings (static under segments for Cap look) */}
                <circle cx={CX} cy={CY} r={OUTER_R + 8} fill="url(#brushed)" opacity="0.55" />
                <circle cx={CX} cy={CY} r={OUTER_R + 2} fill="#7f1d1d" />

                {slices.length === 1 ? (
                  <circle cx={CX} cy={CY} r={OUTER_R} fill={`url(#${slices[0]!.fillId})`} />
                ) : (
                  slices.map((slice) => (
                    <path
                      key={slice.number}
                      d={slice.path}
                      fill={`url(#${slice.fillId})`}
                      stroke="rgba(15,23,42,0.35)"
                      strokeWidth="1.5"
                      style={{
                        filter:
                          selectedNumber === slice.number
                            ? 'brightness(1.35) drop-shadow(0 0 12px #38bdf8)'
                            : undefined,
                      }}
                    />
                  ))
                )}

                {/* Metallic reflection overlay */}
                <circle cx={CX} cy={CY} r={OUTER_R} fill="url(#shieldMetal)" />

                {/* Cap concentric ring guides */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={OUTER_R - 8}
                  fill="none"
                  stroke="#f8fafc"
                  strokeWidth="5"
                  opacity="0.35"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={OUTER_R - 28}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="10"
                  opacity="0.25"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={INNER_R + 28}
                  fill="none"
                  stroke="#f8fafc"
                  strokeWidth="4"
                  opacity="0.3"
                />
                <circle cx={CX} cy={CY} r={INNER_R + 18} fill="#1e3a8a" opacity="0.55" />

                {/* Numbers */}
                {slices.map((slice) => (
                  <text
                    key={`label-${slice.number}`}
                    x={slice.labelPos.x}
                    y={slice.labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={selectedNumber === slice.number ? '#fde68a' : slice.labelFill}
                    fontSize={slice.fontSize}
                    fontWeight="800"
                    filter="url(#numGlow)"
                    style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.04em' }}
                  >
                    {slice.number}
                  </text>
                ))}

                {/* Star hub */}
                <circle cx={CX} cy={CY} r={INNER_R + 6} fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                <circle cx={CX} cy={CY} r={INNER_R} fill="#1e40af" />
                <polygon
                  points={StarPath(CX, CY, 26, 11)}
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  filter="url(#starGlow)"
                />
                <circle cx={CX} cy={CY} r={5} fill="#38bdf8" opacity="0.9" />
              </svg>

              {/* Motion blur / energy trail */}
              {spinning ? (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0%, rgba(220,38,38,0.2) 18%, transparent 32%, rgba(37,99,235,0.25) 55%, transparent 70%)',
                      mixBlendMode: 'screen',
                    }}
                  />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={`spark-${i}`}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-amber-200"
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-${70 + (i % 3) * 12}%)`,
                        animation: `wheel-spark ${0.4 + (i % 3) * 0.1}s ease-out infinite`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </>
              ) : null}
            </motion.div>
          </div>
        </div>

        {/* Landing: blue energy pulse + confetti */}
        <AnimatePresence>
          {showImpact ? (
            <>
              <motion.div
                key="pulse"
                className="pointer-events-none absolute inset-[10%] rounded-full border-2 border-sky-400/80 wheel-landing-pulse"
                initial={{ opacity: 0.9, scale: 0.55 }}
                animate={{ opacity: 0, scale: 1.55 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                key="pulse2"
                className="pointer-events-none absolute inset-[18%] rounded-full border border-red-400/50"
                initial={{ opacity: 0.7, scale: 0.7 }}
                animate={{ opacity: 0, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
              />
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={`confetti-${i}`}
                  className="pointer-events-none absolute left-1/2 top-1/2"
                  style={{
                    width: i % 3 === 0 ? 6 : 4,
                    height: i % 3 === 0 ? 10 : 4,
                    borderRadius: i % 3 === 0 ? 1 : 999,
                    backgroundColor: ['#dc2626', '#2563eb', '#f8fafc', '#fbbf24', '#38bdf8'][i % 5],
                    ['--cx' as string]: `${((i * 53) % 120) - 60}px`,
                    animation: `wheel-confetti 1.1s ease-out ${i * 0.02}s forwards`,
                  }}
                />
              ))}
            </>
          ) : null}
        </AnimatePresence>

        {selectedNumber !== null && showImpact ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute inset-x-0 bottom-3 z-30 mx-auto w-fit rounded-full border border-sky-400/40 bg-slate-950/85 px-4 py-1.5 font-orbitron text-xs font-bold tracking-[0.2em] text-sky-100 shadow-[0_0_24px_rgba(37,99,235,0.45)] backdrop-blur"
          >
            LOCKED · {selectedNumber}
          </motion.div>
        ) : null}
      </motion.div>

      <button
        type="button"
        onClick={handleSpin}
        disabled={isBusy || remainingNumbers.length === 0}
        className="wheel-spin-btn touch-manipulation"
      >
        {spinning ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-300 border-r-transparent" />
            Spinning…
          </span>
        ) : (
          'Spin'
        )}
      </button>

      <p className="font-rajdhani text-center text-sm tracking-wide text-slate-400">
        {remainingNumbers.length} number{remainingNumbers.length === 1 ? '' : 's'} remaining ·
        secure random
      </p>
    </div>
  )
}

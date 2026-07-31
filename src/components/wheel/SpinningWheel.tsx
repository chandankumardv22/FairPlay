import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { securePickIndex } from '../../utils/secureRandom'

const SEGMENT_COLORS = [
  '#0f766e',
  '#0e7490',
  '#1d4ed8',
  '#7c3aed',
  '#be185d',
  '#c2410c',
  '#15803d',
  '#0369a1',
]

const SPIN_MS = 1600

type SpinningWheelProps = {
  remainingNumbers: number[]
  disabled?: boolean
  onSpinComplete: (selected: number) => void
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeSlice(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`
}

export function SpinningWheel({
  remainingNumbers,
  disabled = false,
  onSpinComplete,
}: SpinningWheelProps) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const finishedRef = useRef(false)
  const timerRef = useRef<number | null>(null)
  const onCompleteRef = useRef(onSpinComplete)
  onCompleteRef.current = onSpinComplete

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
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
      const labelPos = polarToCartesian(160, 160, count === 1 ? 0 : 105, midAngle)
      return {
        number,
        path: count === 1 ? undefined : describeSlice(160, 160, 150, startAngle, endAngle),
        labelPos,
        color: SEGMENT_COLORS[index % SEGMENT_COLORS.length]!,
      }
    })
  }, [remainingNumbers])

  const handleSpin = () => {
    if (spinning || disabled || remainingNumbers.length === 0) return

    finishedRef.current = false
    setSpinning(true)

    const selectedIndex = securePickIndex(remainingNumbers.length)
    const selected = remainingNumbers[selectedIndex]!

    const sweep = 360 / remainingNumbers.length
    const segmentMid = selectedIndex * sweep + sweep / 2
    const targetModulo = (360 - segmentMid + 360) % 360
    const currentModulo = ((rotation % 360) + 360) % 360
    const deltaToTarget = (targetModulo - currentModulo + 360) % 360
    const extraSpins = 3 + securePickIndex(2)
    const nextRotation = rotation + extraSpins * 360 + deltaToTarget

    setRotation(nextRotation)

    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (finishedRef.current) return
      finishedRef.current = true
      setSpinning(false)
      onCompleteRef.current(selected)
    }, SPIN_MS)
  }

  const isBusy = spinning || disabled

  return (
    <div className="flex w-full flex-col items-center gap-5 sm:gap-6">
      <div className="relative w-full max-w-[min(100%,320px)]">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
          <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-amber-400 drop-shadow-md" />
        </div>

        <div className="rounded-full bg-gradient-to-br from-white/60 to-white/10 p-1.5 shadow-2xl shadow-slate-900/20 ring-1 ring-white/40 sm:p-2 dark:from-white/10 dark:to-white/5 dark:ring-white/10">
          <motion.div
            animate={{ rotate: rotation }}
            transition={{
              duration: spinning ? SPIN_MS / 1000 : 0,
              ease: [0.12, 0.75, 0.15, 1],
            }}
            className="relative aspect-square w-full"
          >
            <svg viewBox="0 0 320 320" className="h-full w-full">
              <circle cx="160" cy="160" r="152" fill="#0f172a" opacity="0.08" />
              {slices.length === 1 ? (
                <circle cx="160" cy="160" r="150" fill={slices[0]!.color} />
              ) : (
                slices.map((slice) => (
                  <path
                    key={slice.number}
                    d={slice.path}
                    fill={slice.color}
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  />
                ))
              )}
              {slices.map((slice) => (
                <text
                  key={`label-${slice.number}`}
                  x={slice.labelPos.x}
                  y={slice.labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize={remainingNumbers.length > 20 ? 12 : remainingNumbers.length > 12 ? 14 : 18}
                  fontWeight="700"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  {slice.number}
                </text>
              ))}
              <circle cx="160" cy="160" r="28" fill="white" className="dark:fill-slate-900" />
              <circle cx="160" cy="160" r="22" fill="#0d9488" />
              <text
                x="160"
                y="160"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="11"
                fontWeight="700"
              >
                SX
              </text>
            </svg>
          </motion.div>
        </div>
      </div>

      <Button
        type="button"
        size="lg"
        fullWidth
        onClick={handleSpin}
        disabled={isBusy || remainingNumbers.length === 0}
        isLoading={spinning}
        className="max-w-[min(100%,320px)] uppercase tracking-[0.2em]"
      >
        {spinning ? 'Spinning…' : 'Spin'}
      </Button>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        {remainingNumbers.length} number{remainingNumbers.length === 1 ? '' : 's'} remaining · equal
        odds
      </p>
    </div>
  )
}

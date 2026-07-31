import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
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

const FLIP_MS = 1100

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
  const [rotateX, setRotateX] = useState(0)
  const [liftY, setLiftY] = useState(0)
  const finishedRef = useRef(false)
  const timersRef = useRef<number[]>([])
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
    }
  }, [])

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timersRef.current.push(id)
  }

  const finish = (side: CoinSide, winnerLabel: string) => {
    if (finishedRef.current) return
    finishedRef.current = true
    setResult(side)
    setFlipping(false)
    setLiftY(0)
    onCompleteRef.current({ side, winnerLabel })
  }

  const handleFlip = () => {
    if (flipping || disabled || result !== null) return

    finishedRef.current = false
    setFlipping(true)
    setResult(null)

    const isHeads = secureCoinFlip()
    const side: CoinSide = isHeads ? 'heads' : 'tails'
    const winnerLabel = isHeads ? headsLabel : tailsLabel

    const fullSpins = 2 + secureRandomInt(2)
    const halfTurns = fullSpins * 2 + (isHeads ? 0 : 1)
    const nextRotation = halfTurns * 180

    setRotateX(0)
    setLiftY(0)

    requestAnimationFrame(() => {
      setRotateX(nextRotation)
      setLiftY(-70)
      schedule(() => setLiftY(0), FLIP_MS * 0.45)
    })

    schedule(() => finish(side, winnerLabel), FLIP_MS)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="flex w-full max-w-md justify-between gap-4 text-center text-sm">
        <div className="glass flex-1 rounded-2xl px-3 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Heads</p>
          <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{headsLabel}</p>
        </div>
        <div className="glass flex-1 rounded-2xl px-3 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tails</p>
          <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{tailsLabel}</p>
        </div>
      </div>

      <div className="py-6" style={{ perspective: 1000 }}>
        <motion.div
          animate={{ rotateX, y: liftY }}
          transition={{
            rotateX: { duration: FLIP_MS / 1000, ease: [0.33, 0, 0.2, 1] },
            y: { duration: 0.35, ease: 'easeInOut' },
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative h-36 w-36"
        >
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-xl shadow-amber-900/30 ring-4 ring-amber-200/50"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <p className="font-display text-2xl font-extrabold text-amber-950">H</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-900/80">
                Heads
              </p>
            </div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 shadow-xl shadow-slate-900/30 ring-4 ring-slate-200/40"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }}
          >
            <div className="text-center">
              <p className="font-display text-2xl font-extrabold text-slate-950">T</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-900/80">
                Tails
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {result ? (
        <p className="rounded-full bg-brand-500/15 px-4 py-1.5 text-sm font-semibold text-brand-800 dark:text-brand-200">
          Result: {result === 'heads' ? 'Heads' : 'Tails'} —{' '}
          {result === 'heads' ? headsLabel : tailsLabel}
        </p>
      ) : null}

      <Button
        type="button"
        size="lg"
        onClick={handleFlip}
        disabled={flipping || disabled || result !== null}
        isLoading={flipping}
        className="min-w-[12rem]"
      >
        {flipping ? 'Flipping…' : buttonLabel}
      </Button>
    </div>
  )
}

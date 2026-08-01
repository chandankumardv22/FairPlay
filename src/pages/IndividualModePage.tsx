import { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi2'
import { PlayerSetup } from '../components/shared/PlayerSetup'
import { SpinningWheel } from '../components/wheel/SpinningWheel'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { PageTransition } from '../components/ui/PageTransition'
import type { Assignment, IndividualStep, Player } from '../types'

export function IndividualModePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<IndividualStep>('setup')
  const [players, setPlayers] = useState<Player[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [remaining, setRemaining] = useState<number[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])

  const currentPlayer = players[currentIndex]

  const sortedResults = useMemo(
    () => [...assignments].sort((a, b) => a.number - b.number),
    [assignments],
  )

  const startSession = (nextPlayers: Player[]) => {
    const numbers = Array.from({ length: nextPlayers.length }, (_, i) => i + 1)
    setPlayers(nextPlayers)
    setRemaining(numbers)
    setAssignments([])
    setCurrentIndex(0)
    setStep('spinning')
  }

  const handleSpinComplete = useCallback(
    (selected: number) => {
      const player = players[currentIndex]
      if (!player) return

      const nextAssignments = [...assignments, { player, number: selected }]
      const nextRemaining = remaining.filter((n) => n !== selected)

      setAssignments(nextAssignments)
      setRemaining(nextRemaining)

      if (currentIndex >= players.length - 1) {
        setStep('results')
        return
      }
      setCurrentIndex((i) => i + 1)
    },
    [players, currentIndex, assignments, remaining],
  )

  const resetAll = () => {
    setStep('setup')
    setPlayers([])
    setRemaining([])
    setAssignments([])
    setCurrentIndex(0)
  }

  return (
    <PageTransition>
      <div className="mb-6 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-sky-300"
        >
          <HiArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <span className="text-slate-600">/</span>
        <span className="font-orbitron text-[10px] font-semibold uppercase tracking-wider text-sky-300">
          Individual Mode
        </span>
      </div>

      {step === 'setup' ? (
        <PlayerSetup
          title="Individual Mode"
          subtitle="Enter every player. Each will spin for a unique number from 1 to N — assigned with equal probability."
          minPlayers={2}
          maxPlayers={50}
          submitLabel="Start Spinning"
          onSubmit={startSession}
        />
      ) : null}

      {step === 'spinning' && currentPlayer ? (
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div className="wheel-chamber relative p-5 sm:p-8">
            <div className="wheel-hud-ring hidden sm:block" aria-hidden />
            {/* Floating particles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-sky-400/50"
                  style={{
                    left: `${8 + ((i * 17) % 84)}%`,
                    top: `${12 + ((i * 23) % 70)}%`,
                    animation: `wheel-particle-float ${2.8 + (i % 4) * 0.4}s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>

            <div className="relative mb-6 text-center sm:mb-8">
              <p className="font-orbitron text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400 sm:text-[11px]">
                Now Spinning
              </p>
              <h1 className="mt-2 break-words font-orbitron text-3xl font-extrabold tracking-tight text-slate-100 sm:text-5xl">
                {currentPlayer.name}
              </h1>
              <p className="mt-2 font-grotesk text-sm text-slate-400">
                Player {currentIndex + 1} of {players.length}
              </p>
            </div>

            <SpinningWheel
              key={`${currentPlayer.id}-${remaining.join('-')}`}
              remainingNumbers={remaining}
              onSpinComplete={handleSpinComplete}
            />
          </div>

          <div className="order-first space-y-4 lg:order-none">
            <GlassCard className="border-sky-500/10 bg-slate-950/40 p-4 sm:p-5 dark:border-sky-400/15">
              <p className="mb-3 font-orbitron text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-400/90">
                Assigned so far
              </p>
              {assignments.length === 0 ? (
                <p className="font-grotesk text-sm text-slate-500">No assignments yet.</p>
              ) : (
                <ul className="touch-scroll max-h-40 space-y-2 overflow-y-auto sm:max-h-64">
                  {assignments.map((a) => (
                    <li
                      key={a.player.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 text-sm"
                    >
                      <span className="min-w-0 truncate font-medium text-slate-200">
                        {a.player.name}
                      </span>
                      <span className="shrink-0 font-orbitron font-bold text-amber-300">
                        {a.number}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
          </div>
        </div>
      ) : null}

      {step === 'results' ? (
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl sm:p-8">
          <div className="mb-6 text-center sm:mb-8">
            <p className="font-orbitron text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Complete
            </p>
            <h1 className="mt-2 font-orbitron text-2xl font-bold text-white sm:text-4xl">
              Final Assigned Order
            </h1>
            <p className="mt-2 font-grotesk text-sm text-slate-400">
              Every number used exactly once. Equal odds throughout.
            </p>
          </div>

          <ol className="space-y-2.5">
            {sortedResults.map((item) => (
              <li
                key={item.player.id}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:gap-4 sm:px-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 font-orbitron text-lg font-bold text-white shadow-[0_0_16px_rgba(56,189,248,0.35)]">
                  {item.number}
                </span>
                <span className="hidden text-slate-500 sm:inline">→</span>
                <span className="min-w-0 truncate font-semibold text-slate-100">
                  {item.player.name}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button fullWidth size="lg" onClick={resetAll}>
              Play Again
            </Button>
            <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('/')}>
              Back Home
            </Button>
          </div>
        </div>
      ) : null}
    </PageTransition>
  )
}

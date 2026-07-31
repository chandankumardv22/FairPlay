import { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi2'
import { PlayerSetup } from '../components/shared/PlayerSetup'
import { SpinningWheel } from '../components/wheel/SpinningWheel'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { PageTransition } from '../components/ui/PageTransition'
import { TrustBadge } from '../components/ui/TrustBadge'
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
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-300"
        >
          <HiArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
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
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard strong className="relative overflow-hidden p-6 sm:p-8">
            <div className="mb-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700 dark:text-brand-300">
                Now Spinning
              </p>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {currentPlayer.name}
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Player {currentIndex + 1} of {players.length}
              </p>
            </div>

            <SpinningWheel
              key={`${currentPlayer.id}-${remaining.join('-')}`}
              remainingNumbers={remaining}
              onSpinComplete={handleSpinComplete}
            />
          </GlassCard>

          <div className="space-y-4">
            <TrustBadge />
            <GlassCard className="p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Assigned so far
              </p>
              {assignments.length === 0 ? (
                <p className="text-sm text-slate-500">No assignments yet.</p>
              ) : (
                <ul className="max-h-64 space-y-2 overflow-y-auto">
                  {assignments.map((a) => (
                    <li
                      key={a.player.id}
                      className="flex items-center justify-between rounded-xl bg-white/50 px-3 py-2 text-sm dark:bg-white/5"
                    >
                      <span className="font-medium text-slate-800 dark:text-slate-100">
                        {a.player.name}
                      </span>
                      <span className="font-display font-bold text-brand-700 dark:text-brand-300">
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
        <GlassCard strong className="mx-auto max-w-2xl p-6 sm:p-8">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
              Complete
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Final Assigned Order
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Every number used exactly once. Equal odds throughout.
            </p>
          </div>

          <ol className="space-y-2.5">
            {sortedResults.map((item) => (
              <li
                key={item.player.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 font-display text-lg font-bold text-white">
                  {item.number}
                </span>
                <span className="text-slate-400">→</span>
                <span className="font-semibold text-slate-900 dark:text-white">{item.player.name}</span>
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
        </GlassCard>
      ) : null}
    </PageTransition>
  )
}

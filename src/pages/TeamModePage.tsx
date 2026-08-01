import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi2'
import { CoinToss } from '../components/coin/CoinToss'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { PageTransition } from '../components/ui/PageTransition'
import type { BatBowlChoice, TeamStep } from '../types'

const CAPTAIN_A = 'Captain A'
const CAPTAIN_B = 'Captain B'

function BatIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="28" y="6" width="8" height="30" rx="2" fill="#7a4f28" />
      <rect x="27" y="6" width="10" height="5" rx="1.5" fill="#5c3a1e" />
      <rect x="29" y="36" width="6" height="18" rx="1.5" fill="#d4a574" />
      <ellipse cx="32" cy="56" rx="4" ry="3" fill="#c4925e" />
    </svg>
  )
}

function BallIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="22" fill="#b91c1c" />
      <path
        d="M14 24 Q32 30 50 24"
        fill="none"
        stroke="#f8fafc"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M15 34 Q32 40 49 34"
        fill="none"
        stroke="#f8fafc"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TeamModePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<TeamStep>('toss-select')
  const [sessionKey, setSessionKey] = useState(0)
  const [firstPickCaptain, setFirstPickCaptain] = useState<string | null>(null)
  const [batBowlWinner, setBatBowlWinner] = useState<string | null>(null)
  const [batBowlChoice, setBatBowlChoice] = useState<BatBowlChoice | null>(null)

  const otherCaptain = (winner: string) =>
    winner === CAPTAIN_A ? CAPTAIN_B : CAPTAIN_A

  const handleSelectToss = (result: { winnerLabel: string }) => {
    setFirstPickCaptain(result.winnerLabel)
    setStep('toss-batbowl')
  }

  const handleBatBowlToss = (result: { winnerLabel: string }) => {
    setBatBowlWinner(result.winnerLabel)
    setStep('toss-batbowl')
    // Stay on batbowl step but switch UI to election via batBowlWinner
  }

  const chooseBatOrBowl = (choice: BatBowlChoice) => {
    setBatBowlChoice(choice)
    setStep('results')
  }

  const resetAll = () => {
    setStep('toss-select')
    setSessionKey((k) => k + 1)
    setFirstPickCaptain(null)
    setBatBowlWinner(null)
    setBatBowlChoice(null)
  }

  const showElection = step === 'toss-batbowl' && batBowlWinner !== null
  const showSecondToss = step === 'toss-batbowl' && batBowlWinner === null

  return (
    <PageTransition>
      <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-sky-300"
        >
          <HiArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <span className="text-slate-600">/</span>
        <span className="font-orbitron text-[10px] font-semibold uppercase tracking-wider text-sky-300">
          Team Mode
        </span>
      </div>

      {step === 'toss-select' ? (
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div className="toss-chamber relative p-5 sm:p-8">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-sky-400/40"
                  style={{
                    left: `${10 + ((i * 19) % 80)}%`,
                    top: `${15 + ((i * 27) % 65)}%`,
                    animation: `wheel-particle-float ${3 + (i % 3) * 0.5}s ease-in-out ${i * 0.25}s infinite`,
                  }}
                />
              ))}
            </div>
            <CoinToss
              key={`select-toss-${sessionKey}`}
              title="Who selects first?"
              subtitle="The toss decides which captain gets first pick."
              headsLabel={CAPTAIN_A}
              tailsLabel={CAPTAIN_B}
              buttonLabel="Flip Coin"
              onComplete={handleSelectToss}
            />
          </div>
          <div className="hidden space-y-4 lg:block">
            <GlassCard className="border-sky-500/15 bg-slate-950/40 p-5">
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400">
                Match protocol
              </p>
              <p className="mt-2 font-grotesk text-sm leading-relaxed text-slate-300">
                Captains call heads or tails. A cryptographically secure flip decides who picks first.
              </p>
            </GlassCard>
          </div>
        </div>
      ) : null}

      {showSecondToss ? (
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div className="toss-chamber relative p-5 sm:p-8">
            <CoinToss
              key={`batbowl-toss-${sessionKey}`}
              title="Bat or Bowl?"
              subtitle="Second toss — winner elects to bat or bowl."
              headsLabel={CAPTAIN_A}
              tailsLabel={CAPTAIN_B}
              buttonLabel="Flip Coin"
              onComplete={handleBatBowlToss}
            />
          </div>
          <div className="space-y-4">
            {firstPickCaptain ? (
              <GlassCard className="border-sky-500/15 bg-slate-950/40 p-4 sm:p-5">
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400">
                  First pick
                </p>
                <p className="mt-2 font-orbitron text-xl font-bold text-slate-100">
                  {firstPickCaptain}
                </p>
                <p className="mt-1 font-grotesk text-sm text-slate-400">selects a player first</p>
              </GlassCard>
            ) : null}
          </div>
        </div>
      ) : null}

      {showElection && batBowlWinner ? (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
          <div className="toss-chamber relative overflow-hidden p-5 sm:p-8">
            <div className="flex flex-col items-center gap-5 py-2 text-center sm:gap-6 sm:py-4">
              <div>
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400">
                  Election
                </p>
                <h2 className="mt-2 font-orbitron text-2xl font-bold text-white sm:text-3xl">
                  {batBowlWinner} elects
                </h2>
                <p className="mt-2 font-grotesk text-sm text-slate-400">
                  Choose your innings. The other captain takes the rest.
                </p>
              </div>
              <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => chooseBatOrBowl('bat')}
                  className="choice-bat flex min-h-[7.5rem] touch-manipulation flex-col items-center justify-center gap-2 rounded-3xl px-4 py-5 active:scale-[0.98]"
                >
                  <BatIcon />
                  <span className="font-orbitron text-lg font-bold text-amber-100">Bat</span>
                  <span className="font-grotesk text-xs text-amber-200/60">Take first innings</span>
                </button>
                <button
                  type="button"
                  onClick={() => chooseBatOrBowl('bowl')}
                  className="choice-bowl flex min-h-[7.5rem] touch-manipulation flex-col items-center justify-center gap-2 rounded-3xl px-4 py-5 active:scale-[0.98]"
                >
                  <BallIcon />
                  <span className="font-orbitron text-lg font-bold text-red-100">Bowl</span>
                  <span className="font-grotesk text-xs text-red-200/60">Open the attack</span>
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {firstPickCaptain ? (
              <GlassCard className="border-sky-500/15 bg-slate-950/40 p-4 sm:p-5">
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400">
                  First pick
                </p>
                <p className="mt-2 font-orbitron text-xl font-bold text-slate-100">
                  {firstPickCaptain}
                </p>
                <p className="mt-1 font-grotesk text-sm text-slate-400">selects a player first</p>
              </GlassCard>
            ) : null}
          </div>
        </div>
      ) : null}

      {step === 'results' && firstPickCaptain && batBowlWinner && batBowlChoice ? (
        <div className="toss-chamber mx-auto max-w-2xl p-5 sm:p-8">
          <div className="mb-6 text-center sm:mb-8">
            <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400">
              Toss Complete
            </p>
            <h1 className="mt-2 font-orbitron text-3xl font-bold text-white sm:text-4xl">Play!</h1>
            <p className="mt-2 font-grotesk text-sm text-slate-400">
              Both decisions locked by secure coin tosses
            </p>
          </div>

          <div className="space-y-4">
            <ResultRow
              label="First player selection"
              value={`${firstPickCaptain} chooses first`}
              detail={`${otherCaptain(firstPickCaptain)} picks second`}
              accent="pitch"
            />
            <ResultRow
              label="Bat / Bowl"
              value={`${batBowlWinner} elects to ${batBowlChoice === 'bat' ? 'Bat' : 'Bowl'}`}
              detail={`${otherCaptain(batBowlWinner)} gets ${
                batBowlChoice === 'bat' ? 'Bowl' : 'Bat'
              }`}
              accent={batBowlChoice === 'bat' ? 'bat' : 'bowl'}
              icon={
                batBowlChoice === 'bat' ? (
                  <BatIcon className="h-8 w-8" />
                ) : (
                  <BallIcon className="h-8 w-8" />
                )
              }
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button fullWidth size="lg" variant="cricket" onClick={resetAll}>
              New Toss
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

function ResultRow({
  label,
  value,
  detail,
  accent,
  icon,
}: {
  label: string
  value: string
  detail: string
  accent: 'pitch' | 'bat' | 'bowl'
  icon?: ReactNode
}) {
  const accentClass =
    accent === 'bowl'
      ? 'border-red-500/25 bg-red-950/30'
      : accent === 'bat'
        ? 'border-amber-500/25 bg-amber-950/30'
        : 'border-sky-500/25 bg-sky-950/30'

  return (
    <div className={`flex items-start gap-4 rounded-2xl border p-5 ${accentClass}`}>
      {icon ? <div className="mt-0.5 shrink-0">{icon}</div> : null}
      <div>
        <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        <p className="mt-2 font-orbitron text-xl font-bold text-white">{value}</p>
        <p className="mt-1 font-grotesk text-sm text-slate-400">{detail}</p>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { Input } from '../ui/Input'
import type { Player } from '../../types'

type PlayerSetupProps = {
  title: string
  subtitle: string
  minPlayers?: number
  maxPlayers?: number
  submitLabel?: string
  onSubmit: (players: Player[]) => void
}

function createEmptyNames(count: number): string[] {
  return Array.from({ length: count }, () => '')
}

export function PlayerSetup({
  title,
  subtitle,
  minPlayers = 2,
  maxPlayers = 50,
  submitLabel = 'Continue',
  onSubmit,
}: PlayerSetupProps) {
  const [countInput, setCountInput] = useState(String(minPlayers))
  const [names, setNames] = useState<string[]>(() => createEmptyNames(minPlayers))
  const [error, setError] = useState('')

  const playerCount = useMemo(() => {
    const n = Number.parseInt(countInput, 10)
    return Number.isFinite(n) ? n : NaN
  }, [countInput])

  useEffect(() => {
    if (!Number.isInteger(playerCount)) return
    if (playerCount < minPlayers || playerCount > maxPlayers) return
    setNames((prev) => {
      if (prev.length === playerCount) return prev
      if (prev.length < playerCount) {
        return [...prev, ...createEmptyNames(playerCount - prev.length)]
      }
      return prev.slice(0, playerCount)
    })
  }, [playerCount, minPlayers, maxPlayers])

  const handleNameChange = (index: number, value: string) => {
    setNames((prev) => prev.map((name, i) => (i === index ? value : name)))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!Number.isInteger(playerCount) || playerCount < minPlayers || playerCount > maxPlayers) {
      setError(`Enter a player count between ${minPlayers} and ${maxPlayers}.`)
      return
    }

    const trimmed = names.map((n) => n.trim())
    if (trimmed.some((n) => !n)) {
      setError('Please enter a name for every player.')
      return
    }

    const unique = new Set(trimmed.map((n) => n.toLowerCase()))
    if (unique.size !== trimmed.length) {
      setError('Player names must be unique.')
      return
    }

    const players: Player[] = trimmed.map((name, index) => ({
      id: `player-${index + 1}-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name,
    }))

    onSubmit(players)
  }

  return (
    <GlassCard strong className="mx-auto max-w-2xl p-6 sm:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="How many players?"
          type="number"
          min={minPlayers}
          max={maxPlayers}
          value={countInput}
          onChange={(e) => setCountInput(e.target.value)}
          hint={`Minimum ${minPlayers}, maximum ${maxPlayers}`}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Player names</p>
            <p className="text-xs text-slate-500">{names.length} fields</p>
          </div>
          <div className="max-h-[min(50vh,28rem)] space-y-2.5 overflow-y-auto pr-1">
            {names.map((name, index) => (
              <motion.div
                key={`name-field-${index}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
              >
                <Input
                  label={`Player ${index + 1}`}
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Enter player ${index + 1} name`}
                  autoComplete="off"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {error ? (
          <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-300">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" fullWidth>
          {submitLabel}
        </Button>
      </form>
    </GlassCard>
  )
}

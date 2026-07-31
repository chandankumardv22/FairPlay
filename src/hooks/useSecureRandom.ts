import { useCallback } from 'react'
import {
  secureCoinFlip,
  securePickIndex,
  securePickOne,
  secureRandomInt,
} from '../utils/secureRandom'

/**
 * Hook exposing cryptographically secure random helpers for UI components.
 */
export function useSecureRandom() {
  const randomInt = useCallback((maxExclusive: number) => secureRandomInt(maxExclusive), [])
  const pickIndex = useCallback((length: number) => securePickIndex(length), [])
  const pickOne = useCallback(<T,>(items: readonly T[]) => securePickOne(items), [])
  const coinFlip = useCallback(() => secureCoinFlip(), [])

  return { randomInt, pickIndex, pickOne, coinFlip }
}

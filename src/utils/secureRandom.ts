/**
 * Cryptographically secure randomness utilities.
 * Uses window.crypto.getRandomValues — never Math.random().
 * Rejection sampling avoids modulo bias so every outcome is equiprobable.
 */

/** Returns an integer in [0, maxExclusive). Unbiased via rejection sampling. */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error('maxExclusive must be a positive integer')
  }

  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Secure random generation is not available in this environment')
  }

  const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive
  const buffer = new Uint32Array(1)

  let value: number
  do {
    crypto.getRandomValues(buffer)
    value = buffer[0]!
  } while (value >= limit)

  return value % maxExclusive
}

/** Uniformly picks an index from an array of the given length. */
export function securePickIndex(length: number): number {
  return secureRandomInt(length)
}

/** Uniformly picks one element from a non-empty array. */
export function securePickOne<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot pick from an empty collection')
  }
  return items[securePickIndex(items.length)]!
}

/** Fair coin flip — true / false each with probability 1/2. */
export function secureCoinFlip(): boolean {
  return secureRandomInt(2) === 0
}

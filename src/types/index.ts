export type Player = {
  id: string
  name: string
}

export type Assignment = {
  player: Player
  number: number
}

export type IndividualStep = 'setup' | 'spinning' | 'results'

export type TeamStep = 'toss-select' | 'toss-batbowl' | 'results'

export type CoinSide = 'heads' | 'tails'

export type BatBowlChoice = 'bat' | 'bowl'

export interface Region {
  id: string
  name: string
  emoji: string
  weight: number
  utcOffset: number
  unemployment: number
}

export interface DeathStats {
  murder: number
  suicide: number
  tobacco: number
  hunger: number
  road: number
  other: number
  total: number
}

export interface InjuryStats {
  brokenLeg: number
  brokenArm: number
}

export interface SocialStats {
  marriages: number
  divorces: number
  abandonments: number
  adoptions: number
}

export interface PhysiologicalStats {
  poop: number
  pee: number
  sneezes: number
  waterConsumed: number
}

export interface PoolStats {
  poopPools: number
  peePools: number
}

export interface CumulativeStats {
  deaths: DeathStats
  births: number
  netGrowth: number
  injuries: InjuryStats
  social: SocialStats
  physiological: PhysiologicalStats
  pools: PoolStats
}

export interface SnapshotStats {
  region: Region
  atHome: number
  atWork: number
  inTransit: number
  unemployed: number
}

export interface StatsState {
  currentPopulation: number
  sessionStartTime: number
  elapsedSeconds: number
  cumulative: CumulativeStats
  snapshot: SnapshotStats[]
}

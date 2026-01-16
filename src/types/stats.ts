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
  coupleFormations: number
  breakups: number
  infidelities: number
  sexualIntercourse: number
  maleOrgasms: number
  femaleOrgasms: number
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

/**
 * Stats for a single metric across all time periods
 */
export interface MultiPeriodValue {
  year: number
  month: number
  today: number
  session: number
}

/**
 * Time periods data for calculations
 */
export interface TimePeriods {
  yearSeconds: number
  monthSeconds: number
  todaySeconds: number
  sessionSeconds: number
}

/**
 * Complete multi-period stats structure
 */
export interface MultiPeriodStats {
  // Deaths breakdown
  deaths: {
    murder: MultiPeriodValue
    suicide: MultiPeriodValue
    tobacco: MultiPeriodValue
    hunger: MultiPeriodValue
    road: MultiPeriodValue
    other: MultiPeriodValue
    total: MultiPeriodValue
  }
  // Births & growth
  births: MultiPeriodValue
  netGrowth: MultiPeriodValue
  // Injuries
  injuries: {
    brokenLeg: MultiPeriodValue
    brokenArm: MultiPeriodValue
  }
  // Social
  social: {
    marriages: MultiPeriodValue
    divorces: MultiPeriodValue
    coupleFormations: MultiPeriodValue
    breakups: MultiPeriodValue
    infidelities: MultiPeriodValue
    sexualIntercourse: MultiPeriodValue
    maleOrgasms: MultiPeriodValue
    femaleOrgasms: MultiPeriodValue
    abandonments: MultiPeriodValue
    adoptions: MultiPeriodValue
  }
  // Physiological
  physiological: {
    poop: MultiPeriodValue
    pee: MultiPeriodValue
    sneezes: MultiPeriodValue
    waterConsumed: MultiPeriodValue
  }
  // Pool equivalents
  pools: {
    poopPools: MultiPeriodValue
    peePools: MultiPeriodValue
  }
}

export interface StatsState {
  currentPopulation: number
  sessionStartTime: number
  elapsedSeconds: number
  cumulative: CumulativeStats
  snapshot: SnapshotStats[]
}


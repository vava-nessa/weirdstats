import {
  CumulativeStats,
  DeathStats,
  InjuryStats,
  PhysiologicalStats,
  PoolStats,
  Region,
  SnapshotStats,
  SocialStats,
} from '@/types/stats'
import { BASE_POPULATION_2026, POOL_VOLUME, RATES } from './constants'

/**
 * Calculates death statistics based on elapsed time
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Death statistics broken down by cause
 */
export function calculateDeaths(elapsedSeconds: number): DeathStats {
  const murder = RATES.murder * elapsedSeconds
  const suicide = RATES.suicide * elapsedSeconds
  const tobacco = RATES.tobacco * elapsedSeconds
  const hunger = RATES.hunger * elapsedSeconds
  const road = RATES.road * elapsedSeconds
  const other = RATES.otherDeaths * elapsedSeconds
  
  return {
    murder,
    suicide,
    tobacco,
    hunger,
    road,
    other,
    total: murder + suicide + tobacco + hunger + road + other,
  }
}

/**
 * Calculates total births based on elapsed time
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Number of births
 */
export function calculateBirths(elapsedSeconds: number): number {
  return RATES.birth * elapsedSeconds
}

/**
 * Calculates net population growth (births - deaths)
 * @param births - Total births
 * @param deaths - Total deaths
 * @returns Net population change
 */
export function calculateNetGrowth(births: number, deaths: number): number {
  return births - deaths
}

/**
 * Calculates injury statistics based on elapsed time
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Injury statistics
 */
export function calculateInjuries(elapsedSeconds: number): InjuryStats {
  return {
    brokenLeg: RATES.brokenLeg * elapsedSeconds,
    brokenArm: RATES.brokenArm * elapsedSeconds,
  }
}

/**
 * Calculates social event statistics based on elapsed time
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Social event statistics
 */
export function calculateSocial(elapsedSeconds: number): SocialStats {
  return {
    marriages: RATES.marriage * elapsedSeconds,
    divorces: RATES.divorce * elapsedSeconds,
    abandonments: RATES.abandoned * elapsedSeconds,
    adoptions: RATES.adopted * elapsedSeconds,
  }
}

/**
 * Calculates physiological event statistics based on elapsed time
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Physiological event statistics
 */
export function calculatePhysiological(
  elapsedSeconds: number
): PhysiologicalStats {
  return {
    poop: RATES.poop * elapsedSeconds,
    pee: RATES.pee * elapsedSeconds,
    sneezes: RATES.sneeze * elapsedSeconds,
    waterConsumed: RATES.water * elapsedSeconds,
  }
}

/**
 * Calculates pool equivalents for waste products
 * @param physiological - Physiological statistics
 * @returns Pool statistics (number of Olympic pools)
 */
export function calculatePools(
  physiological: PhysiologicalStats
): PoolStats {
  return {
    poopPools: physiological.poop / POOL_VOLUME,
    peePools: physiological.pee / POOL_VOLUME,
  }
}

/**
 * Calculates all cumulative statistics for a given elapsed time
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Complete cumulative statistics
 */
export function calculateCumulativeStats(
  elapsedSeconds: number
): CumulativeStats {
  const deaths = calculateDeaths(elapsedSeconds)
  const births = calculateBirths(elapsedSeconds)
  const netGrowth = calculateNetGrowth(births, deaths.total)
  const injuries = calculateInjuries(elapsedSeconds)
  const social = calculateSocial(elapsedSeconds)
  const physiological = calculatePhysiological(elapsedSeconds)
  const pools = calculatePools(physiological)

  return {
    deaths,
    births,
    netGrowth,
    injuries,
    social,
    physiological,
    pools,
  }
}

/**
 * Calculates current population based on elapsed time
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Current estimated population
 */
export function calculateCurrentPopulation(elapsedSeconds: number): number {
  const stats = calculateCumulativeStats(elapsedSeconds)
  return BASE_POPULATION_2026 + stats.netGrowth
}

/**
 * Determines if it's work hours in a given timezone
 * @param utcOffset - UTC offset in hours
 * @returns True if within work hours (9am-6pm)
 */
function isWorkHours(utcOffset: number): boolean {
  const now = new Date()
  const utcHour = now.getUTCHours()
  const localHour = (utcHour + utcOffset + 24) % 24
  return localHour >= 9 && localHour < 18
}

/**
 * Determines if it's commute hours in a given timezone
 * @param utcOffset - UTC offset in hours
 * @returns True if within commute hours (7-9am or 6-8pm)
 */
function isCommuteHours(utcOffset: number): boolean {
  const now = new Date()
  const utcHour = now.getUTCHours()
  const localHour = (utcHour + utcOffset + 24) % 24
  return (localHour >= 7 && localHour < 9) || (localHour >= 18 && localHour < 20)
}

/**
 * Calculates snapshot statistics for a specific region
 * @param region - Region to calculate for
 * @param currentPopulation - Current world population
 * @returns Snapshot statistics for the region
 */
export function calculateRegionSnapshot(
  region: Region,
  currentPopulation: number
): SnapshotStats {
  const regionPopulation = currentPopulation * region.weight
  const unemployed = regionPopulation * region.unemployment
  const employed = regionPopulation - unemployed

  let atWork = 0
  let inTransit = 0
  let atHome = 0

  if (isWorkHours(region.utcOffset)) {
    atWork = employed * 0.85
    inTransit = employed * 0.05
    atHome = regionPopulation - atWork - inTransit
  } else if (isCommuteHours(region.utcOffset)) {
    atWork = employed * 0.3
    inTransit = employed * 0.4
    atHome = regionPopulation - atWork - inTransit
  } else {
    atWork = employed * 0.05
    inTransit = employed * 0.02
    atHome = regionPopulation - atWork - inTransit
  }

  return {
    region,
    atHome,
    atWork,
    inTransit,
    unemployed,
  }
}

/**
 * Calculates snapshot statistics for all regions
 * @param regions - Array of regions
 * @param currentPopulation - Current world population
 * @returns Array of snapshot statistics for all regions
 */
export function calculateSnapshotStats(
  regions: Region[],
  currentPopulation: number
): SnapshotStats[] {
  return regions.map((region) =>
    calculateRegionSnapshot(region, currentPopulation)
  )
}

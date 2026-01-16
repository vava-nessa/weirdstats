import {
  MultiPeriodStats,
  MultiPeriodValue,
  TimePeriods,
  Region,
  SnapshotStats,
} from '@/types/stats'
import { BASE_POPULATION_2026, POOL_VOLUME, RATES } from './constants'

/**
 * Calculates seconds elapsed for different time periods
 * @param sessionSeconds - Seconds elapsed in current session
 */
function calculateTimePeriods(sessionSeconds: number): TimePeriods {
  const now = new Date()

  // Start of Year
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const yearSeconds = (now.getTime() - startOfYear.getTime()) / 1000

  // Start of Month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthSeconds = (now.getTime() - startOfMonth.getTime()) / 1000

  // Start of Day (Today)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const todaySeconds = (now.getTime() - startOfDay.getTime()) / 1000

  return {
    yearSeconds,
    monthSeconds,
    todaySeconds,
    sessionSeconds,
  }
}

/**
 * Helper to calculate a stat value across all time periods
 */
function getMultiPeriodValue(rate: number, periods: TimePeriods): MultiPeriodValue {
  return {
    year: rate * periods.yearSeconds,
    month: rate * periods.monthSeconds,
    today: rate * periods.todaySeconds,
    session: rate * periods.sessionSeconds,
  }
}

/**
 * Calculates all cumulative statistics for all time periods
 * @param sessionSeconds - Time elapsed since session start
 * @returns Complete multi-period statistics
 */
export function calculateCumulativeStats(
  sessionSeconds: number
): MultiPeriodStats {
  const periods = calculateTimePeriods(sessionSeconds)

  // Deaths
  const deaths = {
    murder: getMultiPeriodValue(RATES.murder, periods),
    suicide: getMultiPeriodValue(RATES.suicide, periods),
    tobacco: getMultiPeriodValue(RATES.tobacco, periods),
    hunger: getMultiPeriodValue(RATES.hunger, periods),
    road: getMultiPeriodValue(RATES.road, periods),
    other: getMultiPeriodValue(RATES.otherDeaths, periods),
    total: { year: 0, month: 0, today: 0, session: 0 } // Placeholder, calculated below
  }

  // Calculate total deaths for each period
  deaths.total = {
    year: deaths.murder.year + deaths.suicide.year + deaths.tobacco.year + deaths.hunger.year + deaths.road.year + deaths.other.year,
    month: deaths.murder.month + deaths.suicide.month + deaths.tobacco.month + deaths.hunger.month + deaths.road.month + deaths.other.month,
    today: deaths.murder.today + deaths.suicide.today + deaths.tobacco.today + deaths.hunger.today + deaths.road.today + deaths.other.today,
    session: deaths.murder.session + deaths.suicide.session + deaths.tobacco.session + deaths.hunger.session + deaths.road.session + deaths.other.session,
  }

  // Births
  const births = getMultiPeriodValue(RATES.birth, periods)

  // Net Growth
  const netGrowth = {
    year: births.year - deaths.total.year,
    month: births.month - deaths.total.month,
    today: births.today - deaths.total.today,
    session: births.session - deaths.total.session,
  }

  // Injuries
  const injuries = {
    brokenLeg: getMultiPeriodValue(RATES.brokenLeg, periods),
    brokenArm: getMultiPeriodValue(RATES.brokenArm, periods),
  }

  // Social
  const social = {
    marriages: getMultiPeriodValue(RATES.marriage, periods),
    divorces: getMultiPeriodValue(RATES.divorce, periods),
    coupleFormations: getMultiPeriodValue(RATES.coupleFormation, periods),
    breakups: getMultiPeriodValue(RATES.breakup, periods),
    infidelities: getMultiPeriodValue(RATES.infidelity, periods),
    sexualIntercourse: getMultiPeriodValue(RATES.sexualIntercourse, periods),
    maleOrgasms: getMultiPeriodValue(RATES.maleOrgasm, periods),
    femaleOrgasms: getMultiPeriodValue(RATES.femaleOrgasm, periods),
    abandonments: getMultiPeriodValue(RATES.abandoned, periods),
    adoptions: getMultiPeriodValue(RATES.adopted, periods),
  }

  // Physiological
  const physiological = {
    poop: getMultiPeriodValue(RATES.poop, periods),
    pee: getMultiPeriodValue(RATES.pee, periods),
    sneezes: getMultiPeriodValue(RATES.sneeze, periods),
    waterConsumed: getMultiPeriodValue(RATES.water, periods),
  }

  // Pools (calculated from physiological volume / POOL_VOLUME)
  const pools = {
    poopPools: {
      year: physiological.poop.year / POOL_VOLUME,
      month: physiological.poop.month / POOL_VOLUME,
      today: physiological.poop.today / POOL_VOLUME,
      session: physiological.poop.session / POOL_VOLUME,
    },
    peePools: {
      year: physiological.pee.year / POOL_VOLUME,
      month: physiological.pee.month / POOL_VOLUME,
      today: physiological.pee.today / POOL_VOLUME,
      session: physiological.pee.session / POOL_VOLUME,
    },
  }

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
  return BASE_POPULATION_2026 + stats.netGrowth.year
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

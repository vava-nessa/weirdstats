import { Region } from '@/types/stats'

/**
 * Volume of an Olympic-sized swimming pool in liters
 */
export const POOL_VOLUME = 2_500_000

/**
 * Base world population estimate for 2026
 */
export const BASE_POPULATION_2026 = 8_235_450_000

/**
 * Statistical rates per second for various global events
 * These rates represent occurrences per second globally
 */
export const RATES = {
  // Deaths per second
  murder: 1 / 75,
  suicide: 1 / 40,
  tobacco: 1 / 4,
  hunger: 1 / 3.5,
  road: 1 / 24,
  otherDeaths: 1.3,
  
  // Births per second
  birth: 4.43,
  
  // Injuries per second
  brokenLeg: 0.48,
  brokenArm: 0.57,
  
  // Social events per second
  marriage: 1 / 0.7,
  divorce: 1 / 1.8,
  coupleFormation: 12,
  breakup: 4,
  infidelity: 10,
  sexualIntercourse: 1157, // 100M per day / 86400 seconds
  maleOrgasm: 21875, // ~3B men × 0.63 orgasms/day / 86400
  femaleOrgasm: 12500, // ~3B women × 0.36 orgasms/day / 86400
  abandoned: 1 / 15,
  adopted: 1 / 120,
  
  // Physiological events per second
  poop: 17187.45,
  pee: 143229.1,
  sneeze: 104642,
  water: 190972,
} as const

/**
 * World regions with population distribution and timezone information
 */
export const REGIONS: Region[] = [
  {
    id: 'asia',
    name: 'Asie',
    emoji: '🌏',
    weight: 0.595,
    utcOffset: 7,
    unemployment: 0.045,
  },
  {
    id: 'africa',
    name: 'Afrique',
    emoji: '🌍',
    weight: 0.18,
    utcOffset: 2,
    unemployment: 0.12,
  },
  {
    id: 'northAmerica',
    name: 'USA/Can',
    emoji: '🇺🇸',
    weight: 0.047,
    utcOffset: -6,
    unemployment: 0.04,
  },
  {
    id: 'europe',
    name: 'Europe',
    emoji: '🇪🇺',
    weight: 0.09,
    utcOffset: 1,
    unemployment: 0.065,
  },
  {
    id: 'latinAmerica',
    name: 'Am. Lat.',
    emoji: '💃',
    weight: 0.083,
    utcOffset: -4,
    unemployment: 0.08,
  },
  {
    id: 'oceania',
    name: 'Océanie',
    emoji: '🦘',
    weight: 0.005,
    utcOffset: 10,
    unemployment: 0.05,
  },
]

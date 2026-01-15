import { RATES } from './constants'

/**
 * Metadata for each statistic including rate, source, and explanation
 */
export interface StatMetadata {
  id: string
  ratePerSecond: number
  unit: string
  source: string
  sourceUrl?: string
  explanation: string
}

/**
 * Remove trailing zeros from a number string
 * e.g., "1.50" → "1.5", "15.00" → "15", "0.0133" → "0.0133"
 */
function stripTrailingZeros(numStr: string): string {
  if (!numStr.includes('.')) return numStr
  return numStr.replace(/\.?0+$/, '')
}

/**
 * Helper to format rate as human-readable interval
 * For rates >= 1/sec: shows "X.XX per second"
 * For rates < 1/sec: shows "X.XX per minute (0.0XXX per second)"
 */
export function formatRateInterval(rate: number): {
  primary: string
  primaryUnit: 'second' | 'minute'
  secondary?: string
  interval?: string
} {
  if (rate >= 1) {
    return {
      primary: stripTrailingZeros(rate.toFixed(2)),
      primaryUnit: 'second',
    }
  }
  // For rates under 1 per second, show per minute as primary
  const perMinute = rate * 60
  const seconds = Math.round(1 / rate)
  return {
    primary: stripTrailingZeros(perMinute.toFixed(2)),
    primaryUnit: 'minute',
    secondary: stripTrailingZeros(rate.toFixed(4)),
    interval: `${seconds}`,
  }
}

/**
 * Central registry of metadata for all cumulative statistics
 */
export const STAT_METADATA: Record<string, StatMetadata> = {
  // ═══════════════════════════════════════════════════════════════
  // DEATHS
  // ═══════════════════════════════════════════════════════════════
  'deaths.total': {
    id: 'deaths.total',
    ratePerSecond:
      RATES.murder + RATES.suicide + RATES.tobacco + RATES.hunger + RATES.road + RATES.otherDeaths,
    unit: 'deaths',
    source: 'WHO Global Health Observatory',
    sourceUrl: 'https://www.who.int/data/gho',
    explanation:
      'Total deaths worldwide from all causes. Approximately 1.8 people die every second globally.',
  },
  'deaths.murder': {
    id: 'deaths.murder',
    ratePerSecond: RATES.murder,
    unit: 'deaths',
    source: 'UNODC Global Study on Homicide',
    sourceUrl: 'https://www.unodc.org/unodc/en/data-and-analysis/global-study-on-homicide.html',
    explanation:
      'Intentional homicides worldwide. Rate varies significantly by region, with Latin America having the highest rates.',
  },
  'deaths.suicide': {
    id: 'deaths.suicide',
    ratePerSecond: RATES.suicide,
    unit: 'deaths',
    source: 'WHO Suicide Prevention',
    sourceUrl: 'https://www.who.int/health-topics/suicide',
    explanation:
      'Deaths by suicide globally. Mental health support can prevent many of these deaths.',
  },
  'deaths.tobacco': {
    id: 'deaths.tobacco',
    ratePerSecond: RATES.tobacco,
    unit: 'deaths',
    source: 'WHO Tobacco Fact Sheet',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    explanation:
      'Deaths caused by tobacco use, including lung cancer, heart disease, COPD, and stroke. Tobacco kills more than 8 million people annually.',
  },
  'deaths.hunger': {
    id: 'deaths.hunger',
    ratePerSecond: RATES.hunger,
    unit: 'deaths',
    source: 'UN World Food Programme',
    sourceUrl: 'https://www.wfp.org/hunger',
    explanation:
      'Deaths from hunger and malnutrition-related causes. Most victims are children under 5 in developing regions.',
  },
  'deaths.road': {
    id: 'deaths.road',
    ratePerSecond: RATES.road,
    unit: 'deaths',
    source: 'WHO Road Safety Report',
    sourceUrl: 'https://www.who.int/publications/i/item/9789241565684',
    explanation:
      'Road traffic fatalities worldwide. Approximately 1.35 million people die in road crashes annually.',
  },
  'deaths.other': {
    id: 'deaths.other',
    ratePerSecond: RATES.otherDeaths,
    unit: 'deaths',
    source: 'WHO Global Health Estimates',
    sourceUrl: 'https://www.who.int/data/global-health-estimates',
    explanation:
      'Deaths from other causes including cardiovascular disease, cancer, respiratory illness, and natural causes.',
  },

  // ═══════════════════════════════════════════════════════════════
  // BIRTHS
  // ═══════════════════════════════════════════════════════════════
  births: {
    id: 'births',
    ratePerSecond: RATES.birth,
    unit: 'births',
    source: 'UN World Population Prospects',
    sourceUrl: 'https://population.un.org/wpp/',
    explanation:
      'Live births worldwide. The global birth rate has been declining but remains high in Africa and parts of Asia.',
  },

  // ═══════════════════════════════════════════════════════════════
  // NET GROWTH
  // ═══════════════════════════════════════════════════════════════
  netGrowth: {
    id: 'netGrowth',
    ratePerSecond:
      RATES.birth -
      (RATES.murder +
        RATES.suicide +
        RATES.tobacco +
        RATES.hunger +
        RATES.road +
        RATES.otherDeaths),
    unit: 'people',
    source: 'UN Population Division',
    sourceUrl: 'https://www.un.org/development/desa/pd/',
    explanation:
      'Net population growth (births minus deaths). The world population grows by approximately 2.5 people per second.',
  },

  // ═══════════════════════════════════════════════════════════════
  // INJURIES
  // ═══════════════════════════════════════════════════════════════
  'injuries.brokenLeg': {
    id: 'injuries.brokenLeg',
    ratePerSecond: RATES.brokenLeg,
    unit: 'injuries',
    source: 'Global Burden of Disease Study',
    sourceUrl: 'https://www.healthdata.org/gbd',
    explanation:
      'Leg fractures occurring worldwide from accidents, falls, sports injuries, and other causes.',
  },
  'injuries.brokenArm': {
    id: 'injuries.brokenArm',
    ratePerSecond: RATES.brokenArm,
    unit: 'injuries',
    source: 'Global Burden of Disease Study',
    sourceUrl: 'https://www.healthdata.org/gbd',
    explanation:
      'Arm fractures occurring worldwide. More common than leg fractures due to instinctive fall protection.',
  },

  // ═══════════════════════════════════════════════════════════════
  // SOCIAL EVENTS
  // ═══════════════════════════════════════════════════════════════
  'social.marriages': {
    id: 'social.marriages',
    ratePerSecond: RATES.marriage,
    unit: 'marriages',
    source: 'UN Demographic Yearbook',
    sourceUrl: 'https://unstats.un.org/unsd/demographic-social/products/dyb/',
    explanation:
      'Marriages registered worldwide. Rates vary significantly by culture and legal frameworks.',
  },
  'social.divorces': {
    id: 'social.divorces',
    ratePerSecond: RATES.divorce,
    unit: 'divorces',
    source: 'UN Demographic Yearbook',
    sourceUrl: 'https://unstats.un.org/unsd/demographic-social/products/dyb/',
    explanation:
      'Divorces finalized worldwide. Divorce rates are highest in developed countries with accessible legal systems.',
  },
  'social.coupleFormations': {
    id: 'social.coupleFormations',
    ratePerSecond: RATES.coupleFormation,
    unit: 'couples',
    source: 'Global Relationship Statistics',
    explanation:
      'New romantic relationships (unmarried couples) formed worldwide each second. Includes dating, partnerships, and cohabitation.',
  },
  'social.breakups': {
    id: 'social.breakups',
    ratePerSecond: RATES.breakup,
    unit: 'breakups',
    source: 'Global Relationship Statistics',
    explanation:
      'Romantic relationship breakups (unmarried couples) worldwide. More common than divorces as they include all types of partnerships.',
  },
  'social.abandonments': {
    id: 'social.abandonments',
    ratePerSecond: RATES.abandoned,
    unit: 'children',
    source: 'UNICEF Child Protection',
    sourceUrl: 'https://www.unicef.org/protection',
    explanation:
      'Children abandoned or placed in institutional care. A significant global child welfare challenge.',
  },
  'social.adoptions': {
    id: 'social.adoptions',
    ratePerSecond: RATES.adopted,
    unit: 'adoptions',
    source: 'Hague Conference on Private International Law',
    sourceUrl: 'https://www.hcch.net/en/instruments/conventions/specialised-sections/intercountry-adoption',
    explanation:
      'Legal adoptions completed worldwide, including domestic and international adoptions.',
  },

  // ═══════════════════════════════════════════════════════════════
  // PHYSIOLOGICAL
  // ═══════════════════════════════════════════════════════════════
  'physiological.poop': {
    id: 'physiological.poop',
    ratePerSecond: RATES.poop,
    unit: 'liters',
    source: 'Medical physiology estimates',
    explanation:
      'Global fecal matter production. Average adult produces 100-250g per day. Based on 8 billion people.',
  },
  'physiological.pee': {
    id: 'physiological.pee',
    ratePerSecond: RATES.pee,
    unit: 'liters',
    source: 'Medical physiology estimates',
    explanation:
      'Global urine production. Average adult produces 1-2 liters per day. A massive volume globally.',
  },
  'physiological.sneezes': {
    id: 'physiological.sneezes',
    ratePerSecond: RATES.sneeze,
    unit: 'sneezes',
    source: 'Medical research estimates',
    explanation:
      'Sneezes occurring worldwide. People sneeze 1-4 times per day on average, more during allergy seasons.',
  },
  'physiological.waterConsumed': {
    id: 'physiological.waterConsumed',
    ratePerSecond: RATES.water,
    unit: 'liters',
    source: 'WHO Water Requirements',
    sourceUrl: 'https://www.who.int/water_sanitation_health/dwq/nutrientschap3.pdf',
    explanation:
      'Drinking water consumed globally. Recommended intake is 2-3 liters per day per person.',
  },

  // ═══════════════════════════════════════════════════════════════
  // POOLS
  // ═══════════════════════════════════════════════════════════════
  'pools.poopPools': {
    id: 'pools.poopPools',
    ratePerSecond: RATES.poop / 2_500_000,
    unit: 'pools',
    source: 'Calculated from physiological data',
    explanation:
      'Olympic swimming pools (2.5 million liters each) that could be filled with global fecal matter production.',
  },
  'pools.peePools': {
    id: 'pools.peePools',
    ratePerSecond: RATES.pee / 2_500_000,
    unit: 'pools',
    source: 'Calculated from physiological data',
    explanation:
      'Olympic swimming pools (2.5 million liters each) that could be filled with global urine production.',
  },
}

/**
 * Get metadata for a stat by its key
 */
export function getStatMetadata(statKey: string): StatMetadata | undefined {
  return STAT_METADATA[statKey]
}

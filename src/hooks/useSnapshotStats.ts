'use client'

import { useMemo } from 'react'
import { calculateSnapshotStats, calculateCurrentPopulation } from '@/lib/calculations'
import { REGIONS } from '@/lib/constants'
import { SnapshotStats } from '@/types/stats'

/**
 * Custom hook for calculating snapshot statistics
 * Uses useMemo to recalculate based on elapsedSeconds without triggering re-fetches
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Object with snapshot statistics, current population, and loading state
 */
export function useSnapshotStats(elapsedSeconds: number) {
  const data = useMemo<{ snapshot: SnapshotStats[]; currentPopulation: number }>(
    () => {
      const currentPopulation = calculateCurrentPopulation(elapsedSeconds)
      const snapshot = calculateSnapshotStats(REGIONS, currentPopulation)
      return { snapshot, currentPopulation }
    },
    [elapsedSeconds]
  )

  return {
    data,
    isLoading: false,
  }
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { calculateSnapshotStats, calculateCurrentPopulation } from '@/lib/calculations'
import { REGIONS } from '@/lib/constants'
import { SnapshotStats } from '@/types/stats'

/**
 * Custom hook for fetching snapshot statistics
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Query result with snapshot statistics and current population
 */
export function useSnapshotStats(elapsedSeconds: number) {
  return useQuery<{ snapshot: SnapshotStats[]; currentPopulation: number }>({
    queryKey: ['snapshotStats', elapsedSeconds],
    queryFn: () => {
      const currentPopulation = calculateCurrentPopulation(elapsedSeconds)
      const snapshot = calculateSnapshotStats(REGIONS, currentPopulation)
      return { snapshot, currentPopulation }
    },
    refetchInterval: 100,
    staleTime: 0,
  })
}

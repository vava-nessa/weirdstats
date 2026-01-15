'use client'

import { useQuery } from '@tanstack/react-query'
import { calculateCumulativeStats } from '@/lib/calculations'
import { CumulativeStats } from '@/types/stats'

/**
 * Custom hook for fetching cumulative statistics
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Query result with cumulative statistics
 */
export function useCumulativeStats(elapsedSeconds: number) {
  return useQuery<CumulativeStats>({
    queryKey: ['cumulativeStats', elapsedSeconds],
    queryFn: () => calculateCumulativeStats(elapsedSeconds),
    refetchInterval: 100,
    staleTime: 0,
  })
}

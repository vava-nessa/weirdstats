import { useMemo } from 'react'
import { calculateCumulativeStats } from '@/lib/calculations'
import { MultiPeriodStats } from '@/types/stats'

/**
 * Custom hook for calculating cumulative statistics
 * Uses useMemo to recalculate based on elapsedSeconds without triggering re-fetches
 * @param elapsedSeconds - Time elapsed since session start
 * @returns Object with cumulative statistics data and loading state
 */
export function useCumulativeStats(elapsedSeconds: number) {
  const data = useMemo<MultiPeriodStats>(
    () => calculateCumulativeStats(elapsedSeconds),
    [elapsedSeconds]
  )

  return {
    data,
    isLoading: false,
  }
}

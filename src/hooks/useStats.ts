'use client'

import { useSessionTimer } from './useSessionTimer'
import { useCumulativeStats } from './useCumulativeStats'
import { useSnapshotStats } from './useSnapshotStats'

/**
 * Main hook that aggregates all statistics
 * Combines session timer, cumulative stats, and snapshot stats
 * @returns Object containing all statistics and loading states
 */
export function useStats() {
  const { sessionStartTime, elapsedSeconds } = useSessionTimer()
  const cumulativeQuery = useCumulativeStats(elapsedSeconds)
  const snapshotQuery = useSnapshotStats(elapsedSeconds)

  return {
    sessionStartTime,
    elapsedSeconds,
    cumulative: cumulativeQuery.data,
    snapshot: snapshotQuery.data?.snapshot ?? [],
    currentPopulation: snapshotQuery.data?.currentPopulation ?? 0,
    isLoading: cumulativeQuery.isLoading || snapshotQuery.isLoading,
  }
}

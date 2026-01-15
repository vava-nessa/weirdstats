'use client'

import { StatsLayout } from '@/components/layout/StatsLayout'
import { SessionTimer } from '@/components/stats/SessionTimer'
import { CumulativeStatsTable } from '@/components/stats/CumulativeStatsTable'
import { SnapshotStatsTable } from '@/components/stats/SnapshotStatsTable'
import { PopulationCounter } from '@/components/stats/PopulationCounter'
import { useStats } from '@/hooks/useStats'

export default function Home() {
  const { elapsedSeconds, cumulative, snapshot, currentPopulation, isLoading } =
    useStats()

  if (isLoading || !cumulative) {
    return (
      <StatsLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-lg text-gray-600">
              Chargement des statistiques...
            </div>
          </div>
        </div>
      </StatsLayout>
    )
  }

  return (
    <StatsLayout>
      <div className="space-y-6">
        {/* Session Timer */}
        <SessionTimer elapsedSeconds={elapsedSeconds} />

        {/* Cumulative Stats Table */}
        <CumulativeStatsTable stats={cumulative} />

        {/* Snapshot Stats Table */}
        <SnapshotStatsTable stats={snapshot} />

        {/* Population Counter - Footer */}
        <PopulationCounter population={currentPopulation} />
      </div>
    </StatsLayout>
  )
}

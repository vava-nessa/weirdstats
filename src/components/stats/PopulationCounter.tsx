'use client'

import { formatWithSpaces } from '@/lib/formatters'

interface PopulationCounterProps {
  population: number
}

export function PopulationCounter({ population }: PopulationCounterProps) {
  return (
    <div className="bg-gray-900 text-white py-6 px-4 text-center">
      <div className="text-sm uppercase tracking-wide mb-2 text-gray-400">
        Population Mondiale
      </div>
      <div className="text-4xl md:text-5xl font-bold font-mono tabular-nums">
        {formatWithSpaces(population)}
      </div>
    </div>
  )
}

'use client'

import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { ANIMATION_PRESETS } from '@/lib/animationConfig'

interface PopulationCounterProps {
  population: number
}

export function PopulationCounter({ population }: PopulationCounterProps) {
  return (
    <div className="bg-gray-900 text-white py-6 px-4 text-center rounded-lg">
      <div className="text-sm uppercase tracking-wide mb-2 text-gray-400">
        Population Mondiale
      </div>
      <div className="text-4xl md:text-5xl font-bold font-mono">
        <AnimatedNumber
          to={population}
          {...ANIMATION_PRESETS.smooth}
          useCompactNotation={false}
          separator=" "
          className="text-blue-400"
        />
      </div>
    </div>
  )
}


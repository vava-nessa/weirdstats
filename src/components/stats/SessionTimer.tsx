'use client'

import { formatTime } from '@/lib/formatters'

interface SessionTimerProps {
  elapsedSeconds: number
}

export function SessionTimer({ elapsedSeconds }: SessionTimerProps) {
  return (
    <div className="text-center py-4">
      <div className="text-sm text-gray-600 mb-1">Temps de session</div>
      <div className="text-2xl font-mono tabular-nums font-semibold text-gray-900">
        {formatTime(elapsedSeconds)}
      </div>
    </div>
  )
}

'use client'

import { useTranslations } from 'next-intl'

import { formatTime } from '@/lib/formatters'

interface SessionTimerProps {
  elapsedSeconds: number
}

export function SessionTimer({ elapsedSeconds }: SessionTimerProps) {
  const t = useTranslations('sessionTimer')

  return (
    <div className="text-center py-4">
      <div className="text-sm text-gray-600 mb-1">{t('label')}</div>
      <div className="text-2xl font-mono tabular-nums font-semibold text-gray-900">
        {formatTime(elapsedSeconds)}
      </div>
    </div>
  )
}

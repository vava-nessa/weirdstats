'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { StatMetadata, formatRateInterval } from '@/lib/statMetadata'

interface StatDetailPanelProps {
  metadata: StatMetadata
  bgColor: string
  textColor: string
}

export function StatDetailPanel({ metadata, bgColor, textColor }: StatDetailPanelProps) {
  const t = useTranslations('statDetails')
  const { primary, primaryUnit, secondary, interval } = formatRateInterval(metadata.ratePerSecond)

  return (
    <motion.tr
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <td colSpan={5} className={`${bgColor} border-t border-gray-200/50`}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className="px-4 py-3 pl-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {/* Rate Information */}
            <div className="flex items-start gap-2">
              <span className="text-base">📊</span>
              <div>
                <span className={`font-medium ${textColor}`}>{t('rate')}:</span>{' '}
                <span className="font-mono text-gray-700">
                  {primary} {metadata.unit}/{t(primaryUnit)}
                </span>
                {secondary && (
                  <span className="text-gray-500 ml-1">
                    ({secondary}/{t('second')})
                  </span>
                )}
                {interval && (
                  <span className="text-gray-500 ml-1">
                    — {t('every')} {interval}s
                  </span>
                )}
              </div>
            </div>

            {/* Formula */}
            <div className="flex items-start gap-2">
              <span className="text-base">📐</span>
              <div>
                <span className={`font-medium ${textColor}`}>{t('formula')}:</span>{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-700">
                  {secondary || primary} × {t('elapsedSeconds')}
                </code>
              </div>
            </div>

            {/* Source */}
            <div className="flex items-start gap-2">
              <span className="text-base">📖</span>
              <div>
                <span className={`font-medium ${textColor}`}>{t('source')}:</span>{' '}
                {metadata.sourceUrl ? (
                  <a
                    href={metadata.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
                  >
                    {metadata.source}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-600">{metadata.source}</span>
                )}
              </div>
            </div>

            {/* Explanation - spans full width */}
            <div className="flex items-start gap-2 md:col-span-2">
              <span className="text-base">ℹ️</span>
              <div>
                <span className={`font-medium ${textColor}`}>{t('about')}:</span>{' '}
                <span className="text-gray-600">{metadata.explanation}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </td>
    </motion.tr>
  )
}

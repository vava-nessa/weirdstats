'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { StatMetadata, formatRateInterval } from '@/lib/statMetadata'
import { OlympicPool } from './OlympicPool'

interface StatDetailPanelProps {
  metadata: StatMetadata
  bgColor: string
  textColor: string
  statKey: string
  currentValue: number
}

export function StatDetailPanel({ metadata, bgColor, textColor, statKey, currentValue }: StatDetailPanelProps) {
  const t = useTranslations('statDetails')
  const { primary, primaryUnit, secondary, interval } = formatRateInterval(metadata.ratePerSecond)
  const [showTooltip, setShowTooltip] = useState(false)

  // Check if this is a pool stat
  const isPoolStat = statKey === 'pools.poopPools' || statKey === 'pools.peePools'
  const poolColor = statKey === 'pools.poopPools' ? 'brown' : 'yellow'

  // Calculate pools: full pools + current filling pool
  const poolsData = useMemo(() => {
    if (!isPoolStat) return null

    const fullPools = Math.floor(currentValue)
    const currentPoolPercentage = (currentValue - fullPools) * 100

    const pools = []
    // Add full pools
    for (let i = 0; i < fullPools; i++) {
      pools.push({ index: i, fillPercentage: 100 })
    }
    // Add currently filling pool
    if (currentPoolPercentage > 0 || fullPools === 0) {
      pools.push({ index: fullPools, fillPercentage: currentPoolPercentage })
    }

    return pools
  }, [isPoolStat, currentValue])

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
          className="px-4 py-3 pl-8 relative"
        >
          {/* Explanation text at the top (no label) */}
          <div className="text-sm text-gray-600 mb-4">
            {metadata.explanation}
          </div>

          {/* Large space for animations */}
          <div className="min-h-[80px] mb-3">
            {isPoolStat && poolsData && poolsData.length > 0 && (
              <div className="flex flex-wrap gap-3 items-end justify-start py-2">
                {poolsData.map((pool) => (
                  <OlympicPool
                    key={pool.index}
                    fillPercentage={pool.fillPercentage}
                    color={poolColor as 'brown' | 'yellow'}
                    index={pool.index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom-right info box */}
          <div className="flex justify-end">
            <div className="flex flex-col gap-1.5 text-xs">
              {/* Source - compact */}
              <div className="text-right">
                {metadata.sourceUrl ? (
                  <a
                    href={metadata.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 hover:underline inline-flex items-center gap-1 text-[10px]"
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                    {metadata.source}
                  </a>
                ) : (
                  <span className="text-gray-500 text-[10px]">{metadata.source}</span>
                )}
              </div>

              {/* Rate box - compact with tooltip */}
              <div className="relative">
                <div
                  className={`${bgColor} border-2 border-gray-300/60 rounded px-2 py-1.5 text-center shadow-sm cursor-help`}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <div className="font-mono font-bold text-gray-800 text-xs">
                    {primary} {metadata.unit}/{t(primaryUnit)}
                  </div>
                  {secondary && (
                    <div className="text-gray-500 text-[10px] mt-0.5">
                      ({secondary}/{t('second')})
                    </div>
                  )}
                  {interval && (
                    <div className="text-gray-500 text-[10px] mt-0.5">
                      1 / {interval}s
                    </div>
                  )}
                </div>

                {/* Tooltip with formula */}
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-2 py-1.5 rounded shadow-lg text-xs whitespace-nowrap z-10"
                  >
                    <div className="font-semibold mb-0.5">{t('formula')}:</div>
                    <code className="font-mono text-[10px]">
                      {secondary || primary} × {t('elapsedSeconds')}
                    </code>
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </td>
    </motion.tr>
  )
}

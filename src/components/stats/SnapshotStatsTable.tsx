'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useVirtualizer } from '@tanstack/react-virtual'

import { SnapshotStats } from '@/types/stats'
import { Card } from '@/components/ui/Card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { ANIMATION_PRESETS } from '@/lib/animationConfig'

interface SnapshotStatsTableProps {
  stats: SnapshotStats[]
}

export function SnapshotStatsTable({ stats }: SnapshotStatsTableProps) {
  const t = useTranslations('snapshotTable')
  const tRegions = useTranslations('regions')
  const parentRef = useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: stats.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 6,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - virtualRows[virtualRows.length - 1].end
      : 0

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{t('title')}</h2>
        <p className="text-sm text-gray-600 mt-1">{t('subtitle')}</p>
      </div>

      <div ref={parentRef} className="max-h-[420px] overflow-y-auto">
        <Table tableClassName="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[32%]">{t('columns.region')}</TableHead>
              <TableHead className="text-right w-[17%]">
                {t('columns.home')}
              </TableHead>
              <TableHead className="text-right w-[17%]">
                {t('columns.work')}
              </TableHead>
              <TableHead className="text-right w-[17%]">
                {t('columns.transit')}
              </TableHead>
              <TableHead className="text-right w-[17%]">
                {t('columns.unemployed')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paddingTop > 0 && (
              <TableRow>
                <TableCell colSpan={5} style={{ height: paddingTop }}>
                  <span aria-hidden="true" />
                </TableCell>
              </TableRow>
            )}
            {virtualRows.map((virtualRow) => {
              const stat = stats[virtualRow.index]

              return (
                <TableRow
                  key={stat.region.id}
                  ref={rowVirtualizer.measureElement}
                  dataIndex={virtualRow.index}
                  className="hover:bg-gray-50"
                >
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{stat.region.emoji}</span>
                      <span className="font-medium text-gray-900">
                        {tRegions(stat.region.id)}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <AnimatedNumber
                      to={stat.atHome}
                      className="font-mono text-gray-700"
                      {...ANIMATION_PRESETS.snappy}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <AnimatedNumber
                      to={stat.atWork}
                      className="font-mono text-gray-700"
                      {...ANIMATION_PRESETS.snappy}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <AnimatedNumber
                      to={stat.inTransit}
                      className="font-mono text-gray-700"
                      {...ANIMATION_PRESETS.snappy}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <AnimatedNumber
                      to={stat.unemployed}
                      className="font-mono text-gray-700"
                      {...ANIMATION_PRESETS.snappy}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
            {paddingBottom > 0 && (
              <TableRow>
                <TableCell colSpan={5} style={{ height: paddingBottom }}>
                  <span aria-hidden="true" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

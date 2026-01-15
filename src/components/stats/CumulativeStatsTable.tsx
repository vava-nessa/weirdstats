'use client'

import { useState, useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { MultiPeriodStats } from '@/types/stats'
import { Card } from '@/components/ui/Card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from '@/components/ui/Table'
import { ExpandableStatRow } from './ExpandableStatRow'
import { formatTime } from '@/lib/formatters'
import { STAT_METADATA } from '@/lib/statMetadata'

interface CumulativeStatsTableProps {
  stats: MultiPeriodStats
  elapsedSeconds: number
}

export function CumulativeStatsTable({ stats, elapsedSeconds }: CumulativeStatsTableProps) {
  const t = useTranslations('cumulativeTable')
  const locale = useLocale()
  const currentMonth = new Date().toLocaleString(locale, { month: 'long' })
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)

  // Track which rows are expanded
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = useCallback((statKey: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(statKey)) {
        next.delete(statKey)
      } else {
        next.add(statKey)
      }
      return next
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* First Table: Main Stats */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('title')}
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[34%]">{t('columns.indicator')}</TableHead>
              <TableHead className="text-right w-[15%] text-gray-500">
                {t('columns.year')}
              </TableHead>
              <TableHead className="text-right w-[15%] text-gray-500">{capitalizedMonth}</TableHead>
              <TableHead className="text-right w-[15%] text-gray-800">
                {t('columns.today')}
              </TableHead>
              <TableHead className="text-right w-[21%] text-blue-500">
                {t('columns.now')}{' '}
                <span className="font-mono opacity-70 ml-1">
                  {formatTime(elapsedSeconds)}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Deaths Section */}
            <ExpandableStatRow
              statKey="deaths.total"
              label={t('labels.deathsTotal')}
              values={stats.deaths.total}
              metadata={STAT_METADATA['deaths.total']}
              bgColor="bg-red-100"
              textColor="text-red-800"
              isTotal={true}
              isExpanded={expandedRows.has('deaths.total')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="deaths.murder"
              label={t('labels.deathsMurder')}
              values={stats.deaths.murder}
              metadata={STAT_METADATA['deaths.murder']}
              bgColor="bg-red-50"
              textColor="text-red-600"
              indent
              isExpanded={expandedRows.has('deaths.murder')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="deaths.suicide"
              label={t('labels.deathsSuicide')}
              values={stats.deaths.suicide}
              metadata={STAT_METADATA['deaths.suicide']}
              bgColor="bg-red-50"
              textColor="text-red-600"
              indent
              isExpanded={expandedRows.has('deaths.suicide')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="deaths.tobacco"
              label={t('labels.deathsTobacco')}
              values={stats.deaths.tobacco}
              metadata={STAT_METADATA['deaths.tobacco']}
              bgColor="bg-red-50"
              textColor="text-red-600"
              indent
              isExpanded={expandedRows.has('deaths.tobacco')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="deaths.hunger"
              label={t('labels.deathsHunger')}
              values={stats.deaths.hunger}
              metadata={STAT_METADATA['deaths.hunger']}
              bgColor="bg-red-50"
              textColor="text-red-600"
              indent
              isExpanded={expandedRows.has('deaths.hunger')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="deaths.road"
              label={t('labels.deathsRoad')}
              values={stats.deaths.road}
              metadata={STAT_METADATA['deaths.road']}
              bgColor="bg-red-50"
              textColor="text-red-600"
              indent
              isExpanded={expandedRows.has('deaths.road')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="deaths.other"
              label={t('labels.deathsOther')}
              values={stats.deaths.other}
              metadata={STAT_METADATA['deaths.other']}
              bgColor="bg-red-50"
              textColor="text-red-600"
              indent
              isExpanded={expandedRows.has('deaths.other')}
              onToggle={toggleRow}
            />

            {/* Births Section */}
            <ExpandableStatRow
              statKey="births"
              label={t('labels.births')}
              values={stats.births}
              metadata={STAT_METADATA['births']}
              bgColor="bg-green-50"
              textColor="text-green-700"
              isTotal={true}
              isExpanded={expandedRows.has('births')}
              onToggle={toggleRow}
            />

            {/* Net Growth Section */}
            <ExpandableStatRow
              statKey="netGrowth"
              label={t('labels.netGrowth')}
              values={stats.netGrowth}
              metadata={STAT_METADATA['netGrowth']}
              bgColor="bg-blue-50"
              textColor="text-blue-600"
              isTotal={true}
              isExpanded={expandedRows.has('netGrowth')}
              onToggle={toggleRow}
            />
          </TableBody>
        </Table>
      </Card>

      {/* Second Table: Weird Stats */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('weirdTitle')}
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[34%]">{t('columns.indicator')}</TableHead>
              <TableHead className="text-right w-[15%] text-gray-500">
                {t('columns.year')}
              </TableHead>
              <TableHead className="text-right w-[15%] text-gray-500">{capitalizedMonth}</TableHead>
              <TableHead className="text-right w-[15%] text-gray-800">
                {t('columns.today')}
              </TableHead>
              <TableHead className="text-right w-[21%] text-blue-500">
                {t('columns.now')}{' '}
                <span className="font-mono opacity-70 ml-1">
                  {formatTime(elapsedSeconds)}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Injuries Section */}
            <ExpandableStatRow
              statKey="injuries.brokenLeg"
              label={t('labels.injuriesBrokenLeg')}
              values={stats.injuries.brokenLeg}
              metadata={STAT_METADATA['injuries.brokenLeg']}
              bgColor="bg-orange-50"
              textColor="text-orange-700"
              isExpanded={expandedRows.has('injuries.brokenLeg')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="injuries.brokenArm"
              label={t('labels.injuriesBrokenArm')}
              values={stats.injuries.brokenArm}
              metadata={STAT_METADATA['injuries.brokenArm']}
              bgColor="bg-orange-50"
              textColor="text-orange-700"
              isExpanded={expandedRows.has('injuries.brokenArm')}
              onToggle={toggleRow}
            />

            {/* Social Section */}
            <ExpandableStatRow
              statKey="social.marriages"
              label={t('labels.socialMarriages')}
              values={stats.social.marriages}
              metadata={STAT_METADATA['social.marriages']}
              bgColor="bg-amber-50"
              textColor="text-amber-700"
              isExpanded={expandedRows.has('social.marriages')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.divorces"
              label={t('labels.socialDivorces')}
              values={stats.social.divorces}
              metadata={STAT_METADATA['social.divorces']}
              bgColor="bg-amber-50"
              textColor="text-amber-700"
              isExpanded={expandedRows.has('social.divorces')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.abandonments"
              label={t('labels.socialAbandonments')}
              values={stats.social.abandonments}
              metadata={STAT_METADATA['social.abandonments']}
              bgColor="bg-amber-50"
              textColor="text-amber-700"
              isExpanded={expandedRows.has('social.abandonments')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.adoptions"
              label={t('labels.socialAdoptions')}
              values={stats.social.adoptions}
              metadata={STAT_METADATA['social.adoptions']}
              bgColor="bg-amber-50"
              textColor="text-amber-700"
              isExpanded={expandedRows.has('social.adoptions')}
              onToggle={toggleRow}
            />

            {/* Physiological Section */}
            <ExpandableStatRow
              statKey="physiological.poop"
              label={t('labels.physiologicalPoop')}
              values={stats.physiological.poop}
              metadata={STAT_METADATA['physiological.poop']}
              bgColor="bg-purple-50"
              textColor="text-purple-700"
              isExpanded={expandedRows.has('physiological.poop')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="physiological.pee"
              label={t('labels.physiologicalPee')}
              values={stats.physiological.pee}
              metadata={STAT_METADATA['physiological.pee']}
              bgColor="bg-purple-50"
              textColor="text-purple-700"
              isExpanded={expandedRows.has('physiological.pee')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="physiological.sneezes"
              label={t('labels.physiologicalSneezes')}
              values={stats.physiological.sneezes}
              metadata={STAT_METADATA['physiological.sneezes']}
              bgColor="bg-purple-50"
              textColor="text-purple-700"
              isExpanded={expandedRows.has('physiological.sneezes')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="physiological.waterConsumed"
              label={t('labels.physiologicalWaterConsumed')}
              values={stats.physiological.waterConsumed}
              metadata={STAT_METADATA['physiological.waterConsumed']}
              bgColor="bg-purple-50"
              textColor="text-purple-700"
              isExpanded={expandedRows.has('physiological.waterConsumed')}
              onToggle={toggleRow}
            />

            {/* Pools Section */}
            <ExpandableStatRow
              statKey="pools.poopPools"
              label={t('labels.poolsPoop')}
              values={stats.pools.poopPools}
              metadata={STAT_METADATA['pools.poopPools']}
              bgColor="bg-cyan-50"
              textColor="text-cyan-800"
              fractionDigits={1}
              isExpanded={expandedRows.has('pools.poopPools')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="pools.peePools"
              label={t('labels.poolsPee')}
              values={stats.pools.peePools}
              metadata={STAT_METADATA['pools.peePools']}
              bgColor="bg-cyan-50"
              textColor="text-cyan-800"
              fractionDigits={1}
              isExpanded={expandedRows.has('pools.peePools')}
              onToggle={toggleRow}
            />
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

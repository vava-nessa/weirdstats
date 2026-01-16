'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

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
      <Card className="overflow-hidden border border-border bg-card dark:bg-card">
        <div className="px-4 py-3 bg-gray-100 dark:bg-secondary/50 border-b border-border">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-foreground">
            {t('title')}
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[40%] text-muted-foreground">{t('columns.indicator')}</TableHead>
              <TableHead className="text-right w-[20%] text-muted-foreground/80">
                {t('columns.year')}
              </TableHead>
              <TableHead className="text-right w-[20%] text-muted-foreground/80">{capitalizedMonth}</TableHead>
              <TableHead className="text-right w-[20%] text-foreground/80">
                {t('columns.today')}
              </TableHead>
              <TableHead className="text-right w-[20%] text-blue-500 dark:text-blue-400">
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

      {/* Second Table: Love & Family */}
      <Card className="overflow-hidden border border-border bg-card dark:bg-card">
        <div className="px-4 py-3 bg-gray-100 dark:bg-secondary/50 border-b border-border">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-foreground">
            {t('loveFamilyTitle')}
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[40%] text-muted-foreground">{t('columns.indicator')}</TableHead>
              <TableHead className="text-right w-[20%] text-muted-foreground/80">
                {t('columns.year')}
              </TableHead>
              <TableHead className="text-right w-[20%] text-muted-foreground/80">{capitalizedMonth}</TableHead>
              <TableHead className="text-right w-[20%] text-foreground/80">
                {t('columns.today')}
              </TableHead>
              <TableHead className="text-right w-[20%] text-blue-500 dark:text-blue-400">
                {t('columns.now')}{' '}
                <span className="font-mono opacity-70 ml-1">
                  {formatTime(elapsedSeconds)}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
              statKey="social.coupleFormations"
              label={t('labels.socialCoupleFormations')}
              values={stats.social.coupleFormations}
              metadata={STAT_METADATA['social.coupleFormations']}
              bgColor="bg-pink-50"
              textColor="text-pink-700"
              isExpanded={expandedRows.has('social.coupleFormations')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.breakups"
              label={t('labels.socialBreakups')}
              values={stats.social.breakups}
              metadata={STAT_METADATA['social.breakups']}
              bgColor="bg-pink-50"
              textColor="text-pink-700"
              isExpanded={expandedRows.has('social.breakups')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.infidelities"
              label={t('labels.socialInfidelities')}
              values={stats.social.infidelities}
              metadata={STAT_METADATA['social.infidelities']}
              bgColor="bg-red-50"
              textColor="text-red-700"
              isExpanded={expandedRows.has('social.infidelities')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.sexualIntercourse"
              label={t('labels.socialSexualIntercourse')}
              values={stats.social.sexualIntercourse}
              metadata={STAT_METADATA['social.sexualIntercourse']}
              bgColor="bg-rose-50"
              textColor="text-rose-700"
              isExpanded={expandedRows.has('social.sexualIntercourse')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.maleOrgasms"
              label={t('labels.socialMaleOrgasms')}
              values={stats.social.maleOrgasms}
              metadata={STAT_METADATA['social.maleOrgasms']}
              bgColor="bg-indigo-50"
              textColor="text-indigo-700"
              isExpanded={expandedRows.has('social.maleOrgasms')}
              onToggle={toggleRow}
            />
            <ExpandableStatRow
              statKey="social.femaleOrgasms"
              label={t('labels.socialFemaleOrgasms')}
              values={stats.social.femaleOrgasms}
              metadata={STAT_METADATA['social.femaleOrgasms']}
              bgColor="bg-pink-50"
              textColor="text-pink-700"
              isExpanded={expandedRows.has('social.femaleOrgasms')}
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
          </TableBody>
        </Table>
      </Card>

      {/* Third Table: Weird Stats */}
      <Card className="overflow-hidden border border-border bg-card dark:bg-card">
        <div className="px-4 py-3 bg-gray-100 dark:bg-secondary/50 border-b border-border">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-foreground">
            {t('weirdTitle')}
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[40%] text-muted-foreground">{t('columns.indicator')}</TableHead>
              <TableHead className="text-right w-[20%] text-muted-foreground/80">
                {t('columns.year')}
              </TableHead>
              <TableHead className="text-right w-[20%] text-muted-foreground/80">{capitalizedMonth}</TableHead>
              <TableHead className="text-right w-[20%] text-foreground/80">
                {t('columns.today')}
              </TableHead>
              <TableHead className="text-right w-[20%] text-blue-500 dark:text-blue-400">
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

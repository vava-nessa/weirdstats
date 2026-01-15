'use client'

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
import { StatRow } from './StatRow'
import { formatTime } from '@/lib/formatters'

interface CumulativeStatsTableProps {
  stats: MultiPeriodStats
  elapsedSeconds: number
}

export function CumulativeStatsTable({ stats, elapsedSeconds }: CumulativeStatsTableProps) {
  const t = useTranslations('cumulativeTable')
  const locale = useLocale()
  const currentMonth = new Date().toLocaleString(locale, { month: 'long' })
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)

  return (
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
          <StatRow
            label={t('labels.deathsTotal')}
            values={stats.deaths.total}
            bgColor="bg-red-100"
            textColor="text-red-800"
            isTotal={true}
          />
          <StatRow
            label={t('labels.deathsMurder')}
            values={stats.deaths.murder}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label={t('labels.deathsSuicide')}
            values={stats.deaths.suicide}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label={t('labels.deathsTobacco')}
            values={stats.deaths.tobacco}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label={t('labels.deathsHunger')}
            values={stats.deaths.hunger}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label={t('labels.deathsRoad')}
            values={stats.deaths.road}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label={t('labels.deathsOther')}
            values={stats.deaths.other}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />

          {/* Births Section */}
          <StatRow
            label={t('labels.births')}
            values={stats.births}
            bgColor="bg-green-50"
            textColor="text-green-700"
            isTotal={true}
          />

          {/* Net Growth Section */}
          <StatRow
            label={t('labels.netGrowth')}
            values={stats.netGrowth}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
            isTotal={true}
          />

          {/* Injuries Section */}
          <StatRow
            label={t('labels.injuriesBrokenLeg')}
            values={stats.injuries.brokenLeg}
            bgColor="bg-orange-50"
            textColor="text-orange-700"
          />
          <StatRow
            label={t('labels.injuriesBrokenArm')}
            values={stats.injuries.brokenArm}
            bgColor="bg-orange-50"
            textColor="text-orange-700"
          />

          {/* Social Section */}
          <StatRow
            label={t('labels.socialMarriages')}
            values={stats.social.marriages}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label={t('labels.socialDivorces')}
            values={stats.social.divorces}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label={t('labels.socialAbandonments')}
            values={stats.social.abandonments}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label={t('labels.socialAdoptions')}
            values={stats.social.adoptions}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />

          {/* Physiological Section */}
          <StatRow
            label={t('labels.physiologicalPoop')}
            values={stats.physiological.poop}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label={t('labels.physiologicalPee')}
            values={stats.physiological.pee}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label={t('labels.physiologicalSneezes')}
            values={stats.physiological.sneezes}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label={t('labels.physiologicalWaterConsumed')}
            values={stats.physiological.waterConsumed}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />

          {/* Pools Section */}
          <StatRow
            label={t('labels.poolsPoop')}
            values={stats.pools.poopPools}
            bgColor="bg-cyan-50"
            textColor="text-cyan-800"
            fractionDigits={1}
          />
          <StatRow
            label={t('labels.poolsPee')}
            values={stats.pools.peePools}
            bgColor="bg-cyan-50"
            textColor="text-cyan-800"
            fractionDigits={1}
          />
        </TableBody>
      </Table>
    </Card>
  )
}

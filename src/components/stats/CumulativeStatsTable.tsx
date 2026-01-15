'use client'

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
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' })
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          📊 Événements Cumulés
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[34%]">Indicateur</TableHead>
            <TableHead className="text-right w-[15%] text-gray-500">2026</TableHead>
            <TableHead className="text-right w-[15%] text-gray-500">{capitalizedMonth}</TableHead>
            <TableHead className="text-right w-[15%] text-gray-800">Aujourd'hui</TableHead>
            <TableHead className="text-right w-[21%] text-blue-500">
              Maintenant <span className="font-mono opacity-70 ml-1">{formatTime(elapsedSeconds)}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Deaths Section */}
          <StatRow
            label="⚠️ Total des morts"
            values={stats.deaths.total}
            bgColor="bg-red-100"
            textColor="text-red-800"
            isTotal={true}
          />
          <StatRow
            label="💀 🔫 Meurtres"
            values={stats.deaths.murder}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="💀 💊 Suicides"
            values={stats.deaths.suicide}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="💀 🚬 Tabac"
            values={stats.deaths.tobacco}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="💀 🌾 Faim"
            values={stats.deaths.hunger}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="💀 🚗 Accidents routiers"
            values={stats.deaths.road}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="💀 ⚰️ Autres causes"
            values={stats.deaths.other}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />

          {/* Births Section */}
          <StatRow
            label="👶 Naissances"
            values={stats.births}
            bgColor="bg-green-50"
            textColor="text-green-700"
            isTotal={true}
          />

          {/* Net Growth Section */}
          <StatRow
            label="📈 Croissance nette"
            values={stats.netGrowth}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
            isTotal={true}
          />

          {/* Injuries Section */}
          <StatRow
            label="🦴 Jambes cassées"
            values={stats.injuries.brokenLeg}
            bgColor="bg-orange-50"
            textColor="text-orange-700"
          />
          <StatRow
            label="💪 Bras cassés"
            values={stats.injuries.brokenArm}
            bgColor="bg-orange-50"
            textColor="text-orange-700"
          />

          {/* Social Section */}
          <StatRow
            label="💑 Mariages"
            values={stats.social.marriages}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label="💔 Divorces"
            values={stats.social.divorces}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label="📦 Abandons"
            values={stats.social.abandonments}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label="🏠 Adoptions"
            values={stats.social.adoptions}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />

          {/* Physiological Section */}
          <StatRow
            label="💩 Cacas (litres)"
            values={stats.physiological.poop}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label="💧 Pipis (litres)"
            values={stats.physiological.pee}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label="🤧 Éternuements"
            values={stats.physiological.sneezes}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label="🚰 Eau consommée (litres)"
            values={stats.physiological.waterConsumed}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />

          {/* Pools Section */}
          <StatRow
            label="🏊 Piscine Olympique de caca"
            values={stats.pools.poopPools}
            bgColor="bg-cyan-50"
            textColor="text-cyan-800"
            fractionDigits={1}
          />
          <StatRow
            label="🏊 Piscine Olympique de pipi"
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

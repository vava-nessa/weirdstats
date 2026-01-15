'use client'

import { CumulativeStats } from '@/types/stats'
import { Card } from '@/components/ui/Card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from '@/components/ui/Table'
import { StatRow } from './StatRow'

interface CumulativeStatsTableProps {
  stats: CumulativeStats
}

export function CumulativeStatsTable({ stats }: CumulativeStatsTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Statistiques Cumulatives
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Depuis le début de votre session
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Événement</TableHead>
            <TableHead className="text-right">Nombre</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Deaths Section */}
          <StatRow
            label="💀 Décès"
            value={stats.deaths.total}
            bgColor="bg-red-50"
            textColor="text-red-700"
          />
          <StatRow
            label="Meurtres"
            value={stats.deaths.murder}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="Suicides"
            value={stats.deaths.suicide}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="Tabac"
            value={stats.deaths.tobacco}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="Faim"
            value={stats.deaths.hunger}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="Accidents routiers"
            value={stats.deaths.road}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />
          <StatRow
            label="Autres causes"
            value={stats.deaths.other}
            bgColor="bg-red-50"
            textColor="text-red-600"
            indent
          />

          {/* Births Section */}
          <StatRow
            label="👶 Naissances"
            value={stats.births}
            bgColor="bg-green-50"
            textColor="text-green-700"
          />

          {/* Net Growth Section */}
          <StatRow
            label="📈 Croissance nette"
            value={stats.netGrowth}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />

          {/* Injuries Section */}
          <StatRow
            label="🦴 Jambes cassées"
            value={stats.injuries.brokenLeg}
            bgColor="bg-orange-50"
            textColor="text-orange-700"
          />
          <StatRow
            label="💪 Bras cassés"
            value={stats.injuries.brokenArm}
            bgColor="bg-orange-50"
            textColor="text-orange-700"
          />

          {/* Social Section */}
          <StatRow
            label="💑 Mariages"
            value={stats.social.marriages}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label="💔 Divorces"
            value={stats.social.divorces}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label="👶 Abandons"
            value={stats.social.abandonments}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />
          <StatRow
            label="🏠 Adoptions"
            value={stats.social.adoptions}
            bgColor="bg-amber-50"
            textColor="text-amber-700"
          />

          {/* Physiological Section */}
          <StatRow
            label="💩 Cacas (litres)"
            value={stats.physiological.poop}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label="💧 Pipis (litres)"
            value={stats.physiological.pee}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label="🤧 Éternuements"
            value={stats.physiological.sneezes}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />
          <StatRow
            label="🚰 Eau consommée (litres)"
            value={stats.physiological.waterConsumed}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
          />

          {/* Pools Section */}
          <StatRow
            label="🏊 Piscines de caca"
            value={stats.pools.poopPools}
            bgColor="bg-cyan-50"
            textColor="text-cyan-800"
          />
          <StatRow
            label="🏊 Piscines de pipi"
            value={stats.pools.peePools}
            bgColor="bg-cyan-50"
            textColor="text-cyan-800"
          />
        </TableBody>
      </Table>
    </Card>
  )
}

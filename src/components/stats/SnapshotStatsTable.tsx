'use client'

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
  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Distribution en Temps Réel
        </h2>
        <p className="text-sm text-gray-600 mt-1">Par continent</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Région</TableHead>
            <TableHead className="text-right">Maison</TableHead>
            <TableHead className="text-right">Travail</TableHead>
            <TableHead className="text-right">Transit</TableHead>
            <TableHead className="text-right">Chômage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.region.id} className="hover:bg-gray-50">
              <TableCell>
                <span className="flex items-center gap-2">
                  <span className="text-lg">{stat.region.emoji}</span>
                  <span className="font-medium text-gray-900">
                    {stat.region.name}
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
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

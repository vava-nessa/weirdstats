'use client'

import { formatNumber } from '@/lib/formatters'
import { TableRow, TableCell } from '@/components/ui/Table'

interface StatRowProps {
  label: string
  value: number
  bgColor: string
  textColor: string
  indent?: boolean
}

export function StatRow({
  label,
  value,
  bgColor,
  textColor,
  indent = false,
}: StatRowProps) {
  return (
    <TableRow className={bgColor}>
      <TableCell className={indent ? 'pl-8' : ''}>
        <span className={`font-medium ${textColor}`}>{label}</span>
      </TableCell>
      <TableCell className="text-right">
        <span className={`font-mono tabular-nums ${textColor}`}>
          {formatNumber(value)}
        </span>
      </TableCell>
    </TableRow>
  )
}

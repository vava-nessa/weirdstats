'use client'

import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { TableRow, TableCell } from '@/components/ui/Table'
import { ANIMATION_PRESETS } from '@/lib/animationConfig'
import { MultiPeriodValue } from '@/types/stats'

interface StatRowProps {
  label: string
  values: MultiPeriodValue
  bgColor: string
  textColor: string
  indent?: boolean
  isTotal?: boolean // For main categories like Total Deaths
  fractionDigits?: number
}

export function StatRow({
  label,
  values,
  bgColor,
  textColor,
  indent = false,
  isTotal = false,
  fractionDigits = 0,
}: StatRowProps) {
  return (
    <TableRow className={bgColor}>
      <TableCell className={indent ? 'pl-8' : ''}>
        <span className={`font-medium ${textColor} ${isTotal ? 'uppercase tracking-wider font-bold' : ''}`}>
          {label}
        </span>
      </TableCell>

      {/* Year 2026 */}
      <TableCell className="text-right">
        <AnimatedNumber
          to={values.year}
          className={`font-mono ${textColor} ${isTotal ? 'font-bold' : ''}`}
          {...ANIMATION_PRESETS.snappy}
          fractionDigits={fractionDigits}
        />
      </TableCell>

      {/* This Month */}
      <TableCell className="text-right">
        <AnimatedNumber
          to={values.month}
          className={`font-mono ${textColor} opacity-80`}
          {...ANIMATION_PRESETS.snappy}
          fractionDigits={fractionDigits}
        />
      </TableCell>

      {/* Today */}
      <TableCell className="text-right">
        <AnimatedNumber
          to={values.today}
          className={`font-mono ${textColor} opacity-80`}
          {...ANIMATION_PRESETS.snappy}
          fractionDigits={fractionDigits}
        />
      </TableCell>

      {/* Session */}
      <TableCell className="text-right">
        <AnimatedNumber
          to={values.session}
          className={`font-mono font-bold text-blue-600`}
          {...ANIMATION_PRESETS.snappy}
          fractionDigits={fractionDigits}
        />
      </TableCell>
    </TableRow>
  )
}

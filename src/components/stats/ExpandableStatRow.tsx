'use client'

import { AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { TableRow, TableCell } from '@/components/ui/Table'
import { ANIMATION_PRESETS } from '@/lib/animationConfig'
import { MultiPeriodValue } from '@/types/stats'
import { StatMetadata } from '@/lib/statMetadata'
import { StatDetailPanel } from './StatDetailPanel'

interface ExpandableStatRowProps {
  statKey: string
  label: string
  values: MultiPeriodValue
  metadata: StatMetadata | undefined
  bgColor: string
  textColor: string
  indent?: boolean
  isTotal?: boolean
  fractionDigits?: number
  isExpanded: boolean
  onToggle: (statKey: string) => void
}

export function ExpandableStatRow({
  statKey,
  label,
  values,
  metadata,
  bgColor,
  textColor,
  indent = false,
  isTotal = false,
  fractionDigits = 0,
  isExpanded,
  onToggle,
}: ExpandableStatRowProps) {
  const hasMetadata = !!metadata

  return (
    <>
      <TableRow
        className={`transition-all duration-200 border-b border-border/50 ${hasMetadata ? 'cursor-pointer hover:brightness-95 dark:hover:brightness-110' : ''} ${bgColor} dark:bg-opacity-10 dark:text-foreground`}
        onClick={() => hasMetadata && onToggle(statKey)}
      >
        <TableCell className={indent ? 'pl-8' : ''}>
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${textColor} dark:text-foreground ${isTotal ? 'uppercase tracking-wider font-bold' : ''}`}
            >
              {label}
            </span>
            {hasMetadata && (
              <span className={`${textColor} dark:text-foreground opacity-60`}>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            )}
          </div>
        </TableCell>

        {/* Year 2026 */}
        <TableCell className="text-right">
          <AnimatedNumber
            to={values.year}
            className={`font-mono ${textColor} dark:text-foreground/80 ${isTotal ? 'font-bold' : ''}`}
            {...ANIMATION_PRESETS.snappy}
            fractionDigits={fractionDigits}
          />
        </TableCell>

        {/* Today */}
        <TableCell className="text-right">
          <AnimatedNumber
            to={values.today}
            className={`font-mono ${textColor} dark:text-foreground/70 opacity-80`}
            {...ANIMATION_PRESETS.snappy}
            fractionDigits={fractionDigits}
          />
        </TableCell>

        {/* Session */}
        <TableCell className="text-right">
          <AnimatedNumber
            to={values.session}
            className={`font-mono font-bold text-blue-600 dark:text-blue-400`}
            {...ANIMATION_PRESETS.snappy}
            fractionDigits={fractionDigits}
          />
        </TableCell>
      </TableRow>

      {/* Expandable Detail Panel */}
      <AnimatePresence>
        {isExpanded && metadata && (
          <StatDetailPanel
            metadata={metadata}
            bgColor={bgColor}
            textColor={textColor}
            statKey={statKey}
            currentValue={values.session}
          />
        )}
      </AnimatePresence>
    </>
  )
}

import { ReactNode, forwardRef, CSSProperties } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
  tableClassName?: string
}

export function Table({
  children,
  className = '',
  tableClassName = '',
}: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`w-full border-collapse ${tableClassName}`}>
        {children}
      </table>
    </div>
  )
}

interface TableHeaderProps {
  children: ReactNode
}

export function TableHeader({ children }: TableHeaderProps) {
  return <thead className="bg-gray-50">{children}</thead>
}

interface TableBodyProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function TableBody({ children, className = '', style }: TableBodyProps) {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`} style={style}>
      {children}
    </tbody>
  )
}

interface TableRowProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: CSSProperties
  dataIndex?: number
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className = '', onClick, style, dataIndex }, ref) => {
    return (
      <tr
        ref={ref}
        className={className}
        onClick={onClick}
        style={style}
        data-index={dataIndex}
      >
        {children}
      </tr>
    )
  }
)
TableRow.displayName = 'TableRow'

interface TableHeadProps {
  children: ReactNode
  className?: string
}

export function TableHead({ children, className = '' }: TableHeadProps) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  )
}

interface TableCellProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  colSpan?: number
}

export function TableCell({
  children,
  className = '',
  style,
  colSpan,
}: TableCellProps) {
  return (
    <td
      className={`px-4 py-3 text-sm ${className}`}
      style={style}
      colSpan={colSpan}
    >
      {children}
    </td>
  )
}

import { ReactNode, TableHTMLAttributes } from 'react';
import { TableRow } from './TableRow';
import { TableHead, TableHeadCell } from './TableHead';
import { TableBody, TableBodyCell } from './TableBody';
import { cn } from '@/utils/cn';
import { LoadSpinner } from '@/components/ui/Loader';
/**
 * @param props - TableHTMLAttributes<HTMLTableElement>
 * @param props.columns - string[]
 * @param props.data - any[]
 * @returns 
 */

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  columns: Column[];
  data: any[];
  className?: string;
  align?: 'left' | 'center' | 'right';
  hover?: boolean;
  headClassName?: string;
  bodyClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  loading?: boolean;
  error?: string | null;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  }
}

export interface Column {
  label: string;
  key: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: any) => ReactNode;
  className?: string;
  cellClassName?: string;
}


export const Table = ({ columns, data, className, align = 'left', headClassName, bodyClassName, rowClassName, cellClassName, hover = false, loading = false, error = null, pagination, ...props }: TableProps) => {
  const rowHeight = 58;
  const tableHeight = rowHeight * (pagination?.pageSize || 10);

  return (
    <div className={cn(`flex flex-col items-center justify-center`, className)}>
      <table {...props} className={cn('w-full divide-y-2 divide-border', className)}>
        <TableHead className={cn('h-12', headClassName)}>
          <TableRow className={cn('', align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left')}>
            {columns.map((column, index) => (
              <TableHeadCell key={index} className={column.className} style={{ width: getColumnWidth(column).width, minWidth: getColumnWidth(column).minWidth, textAlign: column.align }}>{column.label}</TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={cn('divide-y-2 divide-border', bodyClassName)}>
          {data.map((row, index) => (
            <TableRow key={index} className={cn('bg-background', hover && 'hover:brightness-150', rowClassName)}>
              {columns.map((column, index) => (
                <TableBodyCell key={index} className={cn('h-14', column.cellClassName)} style={{ width: getColumnWidth(column).width, minWidth: getColumnWidth(column).minWidth, textAlign: column.align }}>{column.render ? column.render(row) : row[column.key]}</TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </table>
      {(loading || error) && <div className='flex flex-col gap-4 items-center justify-center' style={{ minHeight: `${tableHeight}px` }}>
        {loading && <LoadSpinner />}
        {error && <div>{error}</div>}
      </div>}
    </div>
  )
}

const getColumnWidth = (column: Column) => {
  if (column.width === 'max') return {
    width: '100%',
    minWidth: '100%',
  };
  if (column.width === 'min') return {
    width: 'min-content',
    minWidth: 'min-content',
  };
  return {
    width: column.width,
    minWidth: column.width,
  };
}

import { TableHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
export const TableHead = ({ children, className, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead {...props} className={cn('brightness-150 bg-background', className)}>
      {children}
    </thead>
  )
}

export const TableHeadCell = ({ children, className, ...props }: TableHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th {...props} className={cn('px-4 py-2', className)}>{children}</th>
  )
}

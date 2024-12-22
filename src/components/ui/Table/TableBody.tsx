import { TableHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const TableBody = ({ children, className, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <tbody {...props} className={cn('bg-background', className)}>
      {children}
    </tbody>
  )
}

export const TableBodyCell = ({ children, className, ...props }: TableHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td {...props} className={cn('justify-center items-center px-2', className)}>{children}</td>
  )
}


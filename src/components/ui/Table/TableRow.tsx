import { ReactNode, TableHTMLAttributes } from 'react';

/**
 * @param props - TableHTMLAttributes<HTMLTableRowElement>
 * @param props.children - ReactNode
 * @returns 
 */

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export const TableRow = ({ children, ...props }: TableRowProps) => {
  return (
    <tr {...props}>
      {children}
    </tr>
  )
}

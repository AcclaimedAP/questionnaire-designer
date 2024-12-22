import { HTMLAttributes } from 'react'

/**
 * @description Container component
 * @param props - ContainerHTMLAttributes<HTMLDivElement>
 * @param props.children - ReactNode
 * @param props.className - string
 * @returns 
 */

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Container = ({ children, className, ...props }: ContainerProps) => {


  return <div className={className} {...props}>{children}</div>
}
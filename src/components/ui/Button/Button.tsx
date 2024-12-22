import { ButtonHTMLAttributes } from 'react'
import { cn } from '@utils/cn'

/**
 * @description Button component
 * @param props - ButtonHTMLAttributes<HTMLButtonElement>
 * @param props.children - ReactNode
 * @param props.className - string
 * @returns 
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button = ({ children, className, ...props }: ButtonProps) => {

  const classes = "px-4 py-2"

  return <button className={cn("transition-all duration-100", classes, className)} {...props}>{children}</button>
}



import { Link } from "react-router"
import { useState } from "react"
import { Button } from "@/components/ui/Button"

export interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

interface MenuProps {
  items: MenuItem[]
}

export const Menu = ({ items }: MenuProps) => {
  return <nav className='flex'>
    {items.map((item, index) => <MenuLink key={`${item.label}-${index}`} {...item} />)}
  </nav>
}

const MenuLink = ({ label, href, children }: MenuItem) => {
  return children ? MenuDropdown({ label, children }) : <Link to={href} className='p-2 bg-background hover:brightness-125 w-32 text-center'>{label}</Link>
}

const MenuDropdown = ({ label, children }: Partial<MenuItem>) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return <Button className='flex flex-col gap-2 relative w-32 text-center bg-background hover:brightness-125 p-2' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={toggleDropdown}>
    <span>{label}</span>
    {isOpen && <div className='flex flex-col gap-2 absolute top-full left-0 bg-background p-2'>{children?.map((child, index) => <MenuDropdownItem key={`${label}-${index}`} {...child} />)}</div>}
  </Button>
}

const MenuDropdownItem = ({ label, href }: MenuItem) => {
  return <Link to={href}>{label}</Link>
}

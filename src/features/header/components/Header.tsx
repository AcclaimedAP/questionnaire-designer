import { Menu, MenuItem } from '@/components/ui/Navigation'
import { Container } from '@/components/layout/Container'

export const Header = () => {
  const items = [
    { label: 'Home', href: '/' },
    {
      label: 'Forms', href: '/form', children: [
        { label: 'All forms', href: '/form' },
        { label: 'Create form', href: '/form/create' },
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] satisfies MenuItem[]

  return (
    <Container className='flex items-center justify-between bg-background drop-shadow-lg brightness-110'>
      <Menu items={items} />
    </Container>
  )
}

import { Menu, MenuItem } from '@/components/ui/Navigation'
import { Container } from '@/components/layout/Container'

export const Header = () => {
  const items = [
    { label: 'Home', href: '/' },
    {
      label: 'dropdown test', href: '/dropdown-test', children: [
        { label: 'dropdown test 1', href: '/dropdown-test/1' },
        { label: 'dropdown test 2', href: '/dropdown-test/2' },
        { label: 'dropdown test 3', href: '/dropdown-test/3' },
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

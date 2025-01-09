import { Menu, MenuItem } from '@/components/ui/Navigation'
import { Container } from '@/components/layout/Container'

export const Header = () => {
  const items = [
    {
      label: 'See all forms', href: '/form'
    },
    { label: 'Create form', href: '/form/create' }
  ] satisfies MenuItem[]

  return (
    <Container className='flex items-center justify-between bg-background drop-shadow-lg brightness-110'>
      <Menu items={items} />
    </Container>
  )
}

import { Outlet } from 'react-router'
import { Header } from '@/features/header/components/Header'
import { Container } from '@/components/layout/Container'
export const BaseLayout = () => {
  return (
    <div className='flex flex-col min-h-screen gap-4'>
      <Header />
      <Container className='flex-1 max-w-screen-lg mx-auto w-full'>
        <Outlet />
      </Container>
    </div>
  )
}

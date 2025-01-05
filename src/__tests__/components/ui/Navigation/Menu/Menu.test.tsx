import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { Menu } from '@/components/ui/Navigation/Menu/Menu'
import { renderWithRouter } from '@/__tests__/utils/test-utils'

describe('Menu', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Settings',
      href: '#',
      children: [
        { label: 'Profile', href: '/profile' },
        { label: 'Account', href: '/account' }
      ]
    }
  ]

  it('renders menu items correctly', () => {
    renderWithRouter(<Menu items={mockItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('handles dropdown menu interactions', async () => {
    renderWithRouter(<Menu items={mockItems} />)

    const dropdown = screen.getByText('Settings')
    fireEvent.mouseEnter(dropdown)

    expect(await screen.findByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Account')).toBeInTheDocument()

    fireEvent.mouseLeave(dropdown)
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })

  it('navigates on menu item click', () => {
    renderWithRouter(<Menu items={mockItems} />)
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveAttribute('href', '/')

    fireEvent.click(homeLink)
    expect(window.location.pathname).toBe('/')
  })
}) 
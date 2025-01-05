import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container } from '@/components/layout/Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div data-testid="child">Test Content</div>
      </Container>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Container className="custom-class">
        <div data-testid="content">Content</div>
      </Container>
    )

    const container = screen.getByTestId('content').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    render(
      <Container data-testid="container" aria-label="test">
        <div>Content</div>
      </Container>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveAttribute('aria-label', 'test')
  })
}) 
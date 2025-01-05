import { describe, it, expect } from 'vitest'
import { cn } from '@/utils/cn'

describe('cn utility', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    const result = cn('base', {
      'active': true,
      'disabled': false
    })
    expect(result).toBe('base active')
  })

  it('should merge tailwind classes correctly', () => {
    const result = cn(
      'p-4 bg-blue-500',
      'p-6', // Should override p-4
      'bg-red-500' // Should override bg-blue-500
    )
    expect(result).toBe('p-6 bg-red-500')
  })

  it('should handle undefined and null values', () => {
    expect(cn('base', undefined, null, 'active')).toBe('base active')
  })
}) 
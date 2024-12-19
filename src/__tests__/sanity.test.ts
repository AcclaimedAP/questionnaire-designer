/**
 * Sanity check for the test environment.
 */
import { describe, it, expect } from 'vitest'

describe('Sanity check', () => {

  it('should be in test environment', () => {
    expect(import.meta.env.MODE).toBe('test')
  })

  it('should pass', () => {
    expect(true).toBe(true)
  })

  it('should fail', () => {
    expect(false).not.toBe(true)
  })
})


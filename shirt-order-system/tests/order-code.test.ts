import { describe, it, expect } from 'vitest'
import { generateOrderCode } from '../server/utils/order-code'

describe('Order Code Generator', () => {
  it('generates a code with prefix SHIRT-', () => {
    const code = generateOrderCode()
    expect(code.startsWith('SHIRT-')).toBe(true)
  })

  it('generates a code of exact length 11 (SHIRT- + 5 chars)', () => {
    const code = generateOrderCode()
    expect(code.length).toBe(11)
  })

  it('only uses unambiguous uppercase alphanumeric characters (no 0, O, 1, I, L)', () => {
    const ambiguousChars = ['0', 'O', '1', 'I', 'L']
    for (let i = 0; i < 500; i++) {
      const code = generateOrderCode()
      const suffix = code.replace('SHIRT-', '')
      for (const char of ambiguousChars) {
        expect(suffix).not.toContain(char)
      }
    }
  })

  it('generates unique codes across multiple invocations', () => {
    const generated = new Set<string>()
    const count = 1000
    for (let i = 0; i < count; i++) {
      generated.add(generateOrderCode())
    }
    // High collision safety (allowing for statistically normal birthday collision across 1000 items in 28M space)
    expect(generated.size).toBeGreaterThanOrEqual(count - 2)
  })
})


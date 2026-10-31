import { describe, it, expect } from 'vitest'
import { calculateUnitPrice, calculateLineTotal, calculateOrderTotal } from '../server/utils/pricing'

describe('Pricing Calculation Utility', () => {
  it('correctly calculates unit price with base, size, and sleeve surcharges', () => {
    // Base 35, Size 2XL (+2), Long Sleeve (+5) => 42.00
    const price = calculateUnitPrice(35, 2, 5)
    expect(price).toBe(42.00)
  })

  it('correctly calculates unit price when no surcharges exist', () => {
    // Base 35, Size M (+0), Short Sleeve (+0) => 35.00
    const price = calculateUnitPrice(35, 0, 0)
    expect(price).toBe(35.00)
  })

  it('handles floating point values with proper rounding', () => {
    const price = calculateUnitPrice(33.33, 1.55, 2.45)
    expect(price).toBe(37.33)
  })

  it('correctly calculates line total', () => {
    // 42.00 unit price * 3 quantity => 126.00
    const lineTotal = calculateLineTotal(42, 3)
    expect(lineTotal).toBe(126.00)
  })

  it('correctly computes order total across multiple item lines', () => {
    const items = [
      { unitPrice: 35.00, quantity: 2 }, // 70.00
      { unitPrice: 42.00, quantity: 1 }, // 42.00
      { unitPrice: 38.50, quantity: 4 }, // 154.00
    ]

    const result = calculateOrderTotal(items)
    expect(result.totalQuantity).toBe(7)
    expect(result.totalPrice).toBe(266.00)
  })

  it('handles empty order items gracefully', () => {
    const result = calculateOrderTotal([])
    expect(result.totalQuantity).toBe(0)
    expect(result.totalPrice).toBe(0)
  })
})


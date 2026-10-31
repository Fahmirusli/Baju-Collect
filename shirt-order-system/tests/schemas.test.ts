import { describe, it, expect } from 'vitest'
import {
  createOrderSchema,
  trackOrderSchema,
  contactSchema,
  shirtItemSchema,
  adminLoginSchema,
  updateSettingsSchema,
} from '../shared/schemas'

describe('Zod Validation Schemas', () => {
  describe('contactSchema', () => {
    it('accepts valid email addresses', () => {
      expect(contactSchema.safeParse('john@example.com').success).toBe(true)
      expect(contactSchema.safeParse('user.name+tag@domain.co.uk').success).toBe(true)
    })

    it('accepts valid phone numbers', () => {
      expect(contactSchema.safeParse('+60123456789').success).toBe(true)
      expect(contactSchema.safeParse('012-3456789').success).toBe(true)
      expect(contactSchema.safeParse('(60) 12-345 6789').success).toBe(true)
    })

    it('rejects invalid contact strings', () => {
      expect(contactSchema.safeParse('not-an-email-or-phone').success).toBe(false)
      expect(contactSchema.safeParse('').success).toBe(false)
      expect(contactSchema.safeParse('abc@').success).toBe(false)
    })
  })

  describe('shirtItemSchema', () => {
    it('validates a correct shirt item line', () => {
      const validItem = {
        shirtName: 'CAPTAIN',
        sizeLabel: 'XL',
        sleeveLabel: 'Long Sleeve',
        quantity: 2,
      }
      const result = shirtItemSchema.safeParse(validItem)
      expect(result.success).toBe(true)
    })

    it('trims shirt name automatically', () => {
      const item = {
        shirtName: '  ALICE  ',
        sizeLabel: 'M',
        sleeveLabel: 'Short Sleeve',
        quantity: 1,
      }
      const result = shirtItemSchema.safeParse(item)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.shirtName).toBe('ALICE')
      }
    })

    it('rejects name on shirt exceeding 20 characters', () => {
      const item = {
        shirtName: 'THIS_NAME_IS_DEFINITELY_WAY_TOO_LONG_FOR_A_SHIRT',
        sizeLabel: 'L',
        sleeveLabel: 'Short Sleeve',
        quantity: 1,
      }
      expect(shirtItemSchema.safeParse(item).success).toBe(false)
    })

    it('enforces quantity bounds between 1 and 20', () => {
      const zeroQty = {
        shirtName: 'BOB',
        sizeLabel: 'L',
        sleeveLabel: 'Short Sleeve',
        quantity: 0,
      }
      expect(shirtItemSchema.safeParse(zeroQty).success).toBe(false)

      const excessQty = {
        shirtName: 'BOB',
        sizeLabel: 'L',
        sleeveLabel: 'Short Sleeve',
        quantity: 21,
      }
      expect(shirtItemSchema.safeParse(excessQty).success).toBe(false)
    })

    it('requires sleeveLabel and sizeLabel to not be empty', () => {
      const missingSleeve = {
        shirtName: 'BOB',
        sizeLabel: 'L',
        sleeveLabel: '',
        quantity: 1,
      }
      expect(shirtItemSchema.safeParse(missingSleeve).success).toBe(false)
    })
  })

  describe('createOrderSchema', () => {
    it('validates a complete order submission', () => {
      const order = {
        customerName: 'Diana Prince',
        contact: '+60111222333',
        notes: 'Leave at front porch',
        honeypot: '',
        items: [
          {
            shirtName: 'WONDER',
            sizeLabel: 'M',
            sleeveLabel: 'Sleeveless',
            quantity: 1,
          },
        ],
      }
      expect(createOrderSchema.safeParse(order).success).toBe(true)
    })

    it('rejects submissions where the bot honeypot is populated', () => {
      const spambotOrder = {
        customerName: 'Spam Bot',
        contact: 'bot@spam.com',
        honeypot: 'http://spam-link.com',
        items: [
          {
            shirtName: 'SPAM',
            sizeLabel: 'M',
            sleeveLabel: 'Short Sleeve',
            quantity: 1,
          },
        ],
      }
      expect(createOrderSchema.safeParse(spambotOrder).success).toBe(false)
    })

    it('rejects orders with 0 shirt items', () => {
      const emptyOrder = {
        customerName: 'Diana Prince',
        contact: '+60111222333',
        items: [],
      }
      expect(createOrderSchema.safeParse(emptyOrder).success).toBe(false)
    })
  })

  describe('trackOrderSchema', () => {
    it('transforms lowercase order code to uppercase', () => {
      const result = trackOrderSchema.safeParse({
        code: 'shirt-7k2m9',
        contact: 'test@example.com',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.code).toBe('SHIRT-7K2M9')
      }
    })
  })
})


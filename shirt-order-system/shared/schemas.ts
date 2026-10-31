import { z } from 'zod'

// ── Contact validation ──
const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const contactSchema = z
  .string()
  .min(1, 'Contact is required')
  .refine(
    (val) => phoneRegex.test(val) || emailRegex.test(val),
    'Must be a valid phone number or email address'
  )

// ── Shirt item schema ──
export const shirtItemSchema = z.object({
  shirtName: z
    .string()
    .min(1, 'Name on shirt is required')
    .max(20, 'Name on shirt must be 20 characters or less')
    .transform((s) => s.trim()),
  sizeLabel: z.string().min(1, 'Size is required'),
  sleeveLabel: z.string().min(1, 'Sleeve type is required'),
  quantity: z.number().int().min(1, 'Minimum quantity is 1').max(20, 'Maximum quantity is 20'),
})

// ── Create order (public) ──
export const createOrderSchema = z.object({
  customerName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Name is too long')
    .transform((s) => s.trim()),
  contact: contactSchema,
  notes: z.string().max(500, 'Notes too long').optional().default(''),
  items: z
    .array(shirtItemSchema)
    .min(1, 'At least one shirt is required')
    .max(20, 'Maximum 20 shirts per order'),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
  idempotencyKey: z.string().uuid().optional(),
})

// ── Track order ──
export const trackOrderSchema = z.object({
  code: z
    .string()
    .min(1, 'Order code is required')
    .transform((s) => s.trim().toUpperCase()),
  contact: contactSchema,
})

// ── Admin login ──
export const adminLoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

// ── Order status ──
export const orderStatusValues = [
  'pending',
  'confirmed',
  'in_production',
  'ready',
  'delivered',
  'cancelled',
] as const
export type OrderStatus = (typeof orderStatusValues)[number]
export const orderStatusSchema = z.enum(orderStatusValues)

// ── Payment status ──
export const paymentStatusValues = ['unpaid', 'partial', 'paid'] as const
export type PaymentStatus = (typeof paymentStatusValues)[number]
export const paymentStatusSchema = z.enum(paymentStatusValues)

// ── Update order (admin) ──
export const updateOrderSchema = z.object({
  customerName: z.string().min(1).max(100).transform((s) => s.trim()).optional(),
  contact: contactSchema.optional(),
  notes: z.string().max(500).optional(),
  adminNotes: z.string().max(1000).optional(),
  status: orderStatusSchema.optional(),
  paymentStatus: paymentStatusSchema.optional(),
  amountPaid: z.number().min(0).optional(),
  items: z
    .array(shirtItemSchema)
    .min(1, 'At least one shirt is required')
    .max(20, 'Maximum 20 shirts per order')
    .optional(),
})

// ── Admin create order ──
export const adminCreateOrderSchema = z.object({
  customerName: z
    .string()
    .min(1, 'Full name is required')
    .max(100)
    .transform((s) => s.trim()),
  contact: contactSchema,
  notes: z.string().max(500).optional().default(''),
  adminNotes: z.string().max(1000).optional().default(''),
  status: orderStatusSchema.optional().default('pending'),
  paymentStatus: paymentStatusSchema.optional().default('unpaid'),
  amountPaid: z.number().min(0).optional().default(0),
  items: z
    .array(shirtItemSchema)
    .min(1, 'At least one shirt is required')
    .max(20, 'Maximum 20 shirts per order'),
})

// ── Bulk action ──
export const bulkActionSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'Select at least one order'),
  action: z.enum(['set_status', 'set_payment_status', 'delete']),
  value: z.string().optional(),
})

// ── Settings ──
export const sizeSettingSchema = z.object({
  id: z.number().optional(),
  label: z.string().min(1, 'Size label is required').max(10),
  surcharge: z.number().min(0).default(0),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean().default(true),
})

export const sleeveTypeSettingSchema = z.object({
  id: z.number().optional(),
  label: z.string().min(1, 'Sleeve type label is required').max(30),
  surcharge: z.number().min(0).default(0),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean().default(true),
})

export const updateSettingsSchema = z.object({
  eventTitle: z.string().min(1).max(200).optional(),
  eventDescription: z.string().max(2000).optional(),
  currency: z.string().min(1).max(10).optional(),
  basePrice: z.number().min(0).optional(),
  deadline: z.string().nullable().optional(),
  isOpen: z.boolean().optional(),
  sizeChartImage: z.string().nullable().optional(),
  sizes: z.array(sizeSettingSchema).optional(),
  sleeveTypes: z.array(sleeveTypeSettingSchema).optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

// ── Query params ──
export const ordersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  status: orderStatusSchema.optional(),
  paymentStatus: paymentStatusSchema.optional(),
  size: z.string().optional(),
  sleeve: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(['created_at', 'total_price', 'customer_name', 'code']).default('created_at'),
  sortDir: z.enum(['asc', 'desc']).default('desc'),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type TrackOrderInput = z.infer<typeof trackOrderSchema>
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>
export type AdminCreateOrderInput = z.infer<typeof adminCreateOrderSchema>
export type BulkActionInput = z.infer<typeof bulkActionSchema>
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type OrdersQueryInput = z.infer<typeof ordersQuerySchema>
export type ShirtItemInput = z.infer<typeof shirtItemSchema>
export type SizeSettingInput = z.infer<typeof sizeSettingSchema>
export type SleeveTypeSettingInput = z.infer<typeof sleeveTypeSettingSchema>


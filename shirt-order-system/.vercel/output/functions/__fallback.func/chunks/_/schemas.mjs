import { z } from 'zod';

const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactSchema = z.string().min(1, "Contact is required").refine(
  (val) => phoneRegex.test(val) || emailRegex.test(val),
  "Must be a valid phone number or email address"
);
const shirtItemSchema = z.object({
  shirtName: z.string().min(1, "Name on shirt is required").max(20, "Name on shirt must be 20 characters or less").transform((s) => s.trim()),
  sizeLabel: z.string().min(1, "Size is required"),
  sleeveLabel: z.string().min(1, "Sleeve type is required"),
  quantity: z.number().int().min(1, "Minimum quantity is 1").max(20, "Maximum quantity is 20")
});
const createOrderSchema = z.object({
  customerName: z.string().min(1, "Full name is required").max(100, "Name is too long").transform((s) => s.trim()),
  contact: contactSchema,
  notes: z.string().max(500, "Notes too long").optional().default(""),
  items: z.array(shirtItemSchema).min(1, "At least one shirt is required").max(20, "Maximum 20 shirts per order"),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
  idempotencyKey: z.string().uuid().optional()
});
const trackOrderSchema = z.object({
  code: z.string().min(1, "Order code is required").transform((s) => s.trim().toUpperCase()),
  contact: contactSchema
});
const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});
const orderStatusValues = [
  "pending",
  "confirmed",
  "in_production",
  "ready",
  "delivered",
  "cancelled"
];
const orderStatusSchema = z.enum(orderStatusValues);
const paymentStatusValues = ["unpaid", "partial", "paid"];
const paymentStatusSchema = z.enum(paymentStatusValues);
const updateOrderSchema = z.object({
  customerName: z.string().min(1).max(100).transform((s) => s.trim()).optional(),
  contact: contactSchema.optional(),
  notes: z.string().max(500).optional(),
  adminNotes: z.string().max(1e3).optional(),
  status: orderStatusSchema.optional(),
  paymentStatus: paymentStatusSchema.optional(),
  amountPaid: z.number().min(0).optional(),
  items: z.array(shirtItemSchema).min(1, "At least one shirt is required").max(20, "Maximum 20 shirts per order").optional()
});
const adminCreateOrderSchema = z.object({
  customerName: z.string().min(1, "Full name is required").max(100).transform((s) => s.trim()),
  contact: contactSchema,
  notes: z.string().max(500).optional().default(""),
  adminNotes: z.string().max(1e3).optional().default(""),
  status: orderStatusSchema.optional().default("pending"),
  paymentStatus: paymentStatusSchema.optional().default("unpaid"),
  amountPaid: z.number().min(0).optional().default(0),
  items: z.array(shirtItemSchema).min(1, "At least one shirt is required").max(20, "Maximum 20 shirts per order")
});
const bulkActionSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, "Select at least one order"),
  action: z.enum(["set_status", "set_payment_status", "delete"]),
  value: z.string().optional()
});
const sizeSettingSchema = z.object({
  id: z.number().optional(),
  label: z.string().min(1, "Size label is required").max(10),
  surcharge: z.number().min(0).default(0),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean().default(true)
});
const sleeveTypeSettingSchema = z.object({
  id: z.number().optional(),
  label: z.string().min(1, "Sleeve type label is required").max(30),
  surcharge: z.number().min(0).default(0),
  sortOrder: z.number().int().min(0),
  isActive: z.boolean().default(true)
});
const updateSettingsSchema = z.object({
  eventTitle: z.string().min(1).max(200).optional(),
  eventDescription: z.string().max(2e3).optional(),
  currency: z.string().min(1).max(10).optional(),
  basePrice: z.number().min(0).optional(),
  deadline: z.string().nullable().optional(),
  isOpen: z.boolean().optional(),
  sizeChartImage: z.string().nullable().optional(),
  sizes: z.array(sizeSettingSchema).optional(),
  sleeveTypes: z.array(sleeveTypeSettingSchema).optional()
});
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters")
});
const ordersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  status: orderStatusSchema.optional(),
  paymentStatus: paymentStatusSchema.optional(),
  size: z.string().optional(),
  sleeve: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(["created_at", "total_price", "customer_name", "code"]).default("created_at"),
  sortDir: z.enum(["asc", "desc"]).default("desc")
});

export { adminLoginSchema as a, bulkActionSchema as b, adminCreateOrderSchema as c, changePasswordSchema as d, updateSettingsSchema as e, createOrderSchema as f, ordersQuerySchema as o, trackOrderSchema as t, updateOrderSchema as u };
//# sourceMappingURL=schemas.mjs.map

import {
  pgTable,
  serial,
  text,
  numeric,
  integer,
  boolean,
  timestamp,
  uuid,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ─── Settings (single-row config, id=1) ─────────────────────────────────────
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  eventTitle: text('event_title').notNull().default('Group Shirt Order'),
  eventDescription: text('event_description').default(''),
  currency: text('currency').notNull().default('MYR'),
  basePrice: numeric('base_price', { precision: 10, scale: 2 }).notNull().default('35'),
  deadline: timestamp('deadline', { withTimezone: true }),
  isOpen: boolean('is_open').notNull().default(true),
  sizeChartImage: text('size_chart_image'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`now()`),
});

// ─── Users (Admin / Staff accounts) ─────────────────────────────────────────
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull().default('Admin'),
  email: text('email'),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`now()`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`now()`),
});

// ─── Sizes ───────────────────────────────────────────────────────────────────
export const sizes = pgTable('sizes', {
  id: serial('id').primaryKey(),
  label: text('label').unique().notNull(),
  surcharge: numeric('surcharge', { precision: 10, scale: 2 }).notNull().default('0'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
});

// ─── Sleeve Types ────────────────────────────────────────────────────────────
export const sleeveTypes = pgTable('sleeve_types', {
  id: serial('id').primaryKey(),
  label: text('label').unique().notNull(),
  surcharge: numeric('surcharge', { precision: 10, scale: 2 }).notNull().default('0'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
});

// ─── Orders ──────────────────────────────────────────────────────────────────
export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    code: text('code').unique().notNull(),
    customerName: text('customer_name').notNull(),
    contact: text('contact').notNull(),
    notes: text('notes').default(''),
    adminNotes: text('admin_notes').default(''),
    status: text('status').notNull().default('pending'),
    paymentStatus: text('payment_status').notNull().default('unpaid'),
    amountPaid: numeric('amount_paid', { precision: 10, scale: 2 }).default('0'),
    totalPrice: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
    totalQuantity: integer('total_quantity').notNull(),
    ipHash: text('ip_hash'),
    idempotencyKey: text('idempotency_key').unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).default(sql`now()`),
    updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`now()`),
  },
  (table) => [
    index('orders_code_idx').on(table.code),
    index('orders_created_at_idx').on(table.createdAt),
  ]
);

// ─── Order Items ─────────────────────────────────────────────────────────────
export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    shirtName: text('shirt_name').notNull(),
    sizeLabel: text('size_label').notNull(),
    sleeveLabel: text('sleeve_label').notNull().default('Short Sleeve'),
    quantity: integer('quantity').notNull(),
    unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
    lineTotal: numeric('line_total', { precision: 10, scale: 2 }).notNull(),
  },
  (table) => [
    index('order_items_order_id_idx').on(table.orderId),
    index('order_items_size_label_idx').on(table.sizeLabel),
    index('order_items_sleeve_label_idx').on(table.sleeveLabel),
  ]
);

// ─── Rate Limits ─────────────────────────────────────────────────────────────
export const rateLimits = pgTable(
  'rate_limits',
  {
    id: serial('id').primaryKey(),
    key: text('key').notNull(),
    windowStart: timestamp('window_start', { withTimezone: true }).notNull(),
    count: integer('count').notNull().default(1),
  },
  (table) => [index('rate_limits_key_idx').on(table.key)]
);

// ─── Inferred Types ──────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Settings = typeof settings.$inferSelect;
export type NewSettings = typeof settings.$inferInsert;

export type Size = typeof sizes.$inferSelect;
export type NewSize = typeof sizes.$inferInsert;

export type SleeveType = typeof sleeveTypes.$inferSelect;
export type NewSleeveType = typeof sleeveTypes.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

export type RateLimit = typeof rateLimits.$inferSelect;
export type NewRateLimit = typeof rateLimits.$inferInsert;

// ─── Order Status / Payment Status union types ───────────────────────────────
export type OrderStatus = 'pending' | 'confirmed' | 'in_production' | 'ready' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';

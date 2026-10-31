import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'

dotenv.config()

const databaseUrl = process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('\nError: NUXT_DATABASE_URL environment variable is missing.')
  console.error('Please set NUXT_DATABASE_URL in your .env file.\n')
  process.exit(1)
}

async function runMigration() {
  console.log('\n[db:migrate] Connecting to Neon PostgreSQL...')
  const sql = neon(databaseUrl!)

  console.log('[db:migrate] Applying schema definitions...')

  // 1. Settings table
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      event_title TEXT NOT NULL DEFAULT 'Group Shirt Order',
      event_description TEXT DEFAULT '',
      currency TEXT NOT NULL DEFAULT 'MYR',
      base_price NUMERIC(10, 2) NOT NULL DEFAULT 35.00,
      deadline TIMESTAMPTZ,
      is_open BOOLEAN NOT NULL DEFAULT true,
      size_chart_image TEXT,
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `

  // 2. Sizes table
  await sql`
    CREATE TABLE IF NOT EXISTS sizes (
      id SERIAL PRIMARY KEY,
      label TEXT UNIQUE NOT NULL,
      surcharge NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true
    );
  `

  // 3. Sleeve Types table
  await sql`
    CREATE TABLE IF NOT EXISTS sleeve_types (
      id SERIAL PRIMARY KEY,
      label TEXT UNIQUE NOT NULL,
      surcharge NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true
    );
  `

  // 4. Orders table
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      code TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      contact TEXT NOT NULL,
      notes TEXT DEFAULT '',
      admin_notes TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      payment_status TEXT NOT NULL DEFAULT 'unpaid',
      amount_paid NUMERIC(10, 2) DEFAULT 0.00,
      total_price NUMERIC(10, 2) NOT NULL,
      total_quantity INTEGER NOT NULL,
      ip_hash TEXT,
      idempotency_key TEXT UNIQUE,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `

  // 5. Order Items table (with sleeve_label migration check)
  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      shirt_name TEXT NOT NULL,
      size_label TEXT NOT NULL,
      sleeve_label TEXT NOT NULL DEFAULT 'Short Sleeve',
      quantity INTEGER NOT NULL,
      unit_price NUMERIC(10, 2) NOT NULL,
      line_total NUMERIC(10, 2) NOT NULL
    );
  `

  // Migration path: ensure sleeve_label exists if upgrading an existing db
  await sql`
    ALTER TABLE order_items 
    ADD COLUMN IF NOT EXISTS sleeve_label TEXT NOT NULL DEFAULT 'Short Sleeve';
  `

  // 6. Rate limits table
  await sql`
    CREATE TABLE IF NOT EXISTS rate_limits (
      id SERIAL PRIMARY KEY,
      key TEXT NOT NULL,
      window_start TIMESTAMPTZ NOT NULL,
      count INTEGER NOT NULL DEFAULT 1
    );
  `

  // Indexes
  await sql`CREATE INDEX IF NOT EXISTS orders_code_idx ON orders(code);`
  await sql`CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at);`
  await sql`CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);`
  await sql`CREATE INDEX IF NOT EXISTS order_items_size_label_idx ON order_items(size_label);`
  await sql`CREATE INDEX IF NOT EXISTS order_items_sleeve_label_idx ON order_items(sleeve_label);`
  await sql`CREATE INDEX IF NOT EXISTS rate_limits_key_idx ON rate_limits(key);`

  console.log('[db:migrate] Schema applied successfully!\n')
}

runMigration().catch((err) => {
  console.error('[db:migrate] Migration failed:', err)
  process.exit(1)
})


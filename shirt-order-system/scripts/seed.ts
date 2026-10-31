import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV === 'production' && !process.env.FORCE_SEED) {
  console.error('\n[db:seed] ERROR: Seeding in production is blocked!')
  console.error('If you really intend to seed in production, set FORCE_SEED=true.\n')
  process.exit(1)
}

const databaseUrl = process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('\nError: NUXT_DATABASE_URL environment variable is missing.')
  process.exit(1)
}

async function seed() {
  console.log('\n[db:seed] Connecting to Neon PostgreSQL...')
  const sql = neon(databaseUrl!)

  console.log('[db:seed] Seeding default settings...')
  // Default Settings
  await sql`
    INSERT INTO settings (id, event_title, event_description, currency, base_price, is_open, deadline)
    VALUES (
      1,
      'Annual Retreat & Sports Festival 2026',
      'Order your official custom retreat shirt! Premium 100% breathable organic cotton with high-durability print. Please specify your custom name to be printed on the chest.',
      'MYR',
      35.00,
      true,
      now() + interval '14 days'
    )
    ON CONFLICT (id) DO UPDATE SET
      event_title = EXCLUDED.event_title,
      event_description = EXCLUDED.event_description,
      currency = EXCLUDED.currency,
      base_price = EXCLUDED.base_price,
      is_open = EXCLUDED.is_open;
  `

  console.log('[db:seed] Seeding default sizes...')
  const defaultSizes = [
    { label: 'XS', surcharge: '0.00', sort_order: 0 },
    { label: 'S', surcharge: '0.00', sort_order: 1 },
    { label: 'M', surcharge: '0.00', sort_order: 2 },
    { label: 'L', surcharge: '0.00', sort_order: 3 },
    { label: 'XL', surcharge: '0.00', sort_order: 4 },
    { label: '2XL', surcharge: '2.00', sort_order: 5 },
    { label: '3XL', surcharge: '4.00', sort_order: 6 },
    { label: '4XL', surcharge: '6.00', sort_order: 7 },
    { label: '5XL', surcharge: '8.00', sort_order: 8 },
  ]

  for (const s of defaultSizes) {
    await sql`
      INSERT INTO sizes (label, surcharge, sort_order, is_active)
      VALUES (${s.label}, ${s.surcharge}, ${s.sort_order}, true)
      ON CONFLICT (label) DO UPDATE SET
        surcharge = EXCLUDED.surcharge,
        sort_order = EXCLUDED.sort_order,
        is_active = true;
    `
  }

  console.log('[db:seed] Seeding default sleeve types...')
  const defaultSleeves = [
    { label: 'Short Sleeve', surcharge: '0.00', sort_order: 0 },
    { label: 'Long Sleeve', surcharge: '5.00', sort_order: 1 },
    { label: '3/4 Sleeve', surcharge: '3.00', sort_order: 2 },
    { label: 'Sleeveless', surcharge: '0.00', sort_order: 3 },
  ]

  for (const st of defaultSleeves) {
    await sql`
      INSERT INTO sleeve_types (label, surcharge, sort_order, is_active)
      VALUES (${st.label}, ${st.surcharge}, ${st.sort_order}, true)
      ON CONFLICT (label) DO UPDATE SET
        surcharge = EXCLUDED.surcharge,
        sort_order = EXCLUDED.sort_order,
        is_active = true;
    `
  }

  console.log('[db:seed] Seeding sample orders...')
  // Check if sample orders already exist
  const existingOrders = await sql`SELECT count(*) FROM orders;`
  if (Number(existingOrders[0].count) === 0) {
    // Sample Order 1: Alice Tan
    const [order1] = await sql`
      INSERT INTO orders (code, customer_name, contact, notes, status, payment_status, amount_paid, total_price, total_quantity)
      VALUES (
        'SHIRT-7K2M9',
        'Alice Tan',
        '+60123456789',
        'Deliver to engineering dept',
        'confirmed',
        'paid',
        75.00,
        75.00,
        2
      )
      RETURNING id;
    `

    await sql`
      INSERT INTO order_items (order_id, shirt_name, size_label, sleeve_label, quantity, unit_price, line_total)
      VALUES
        (${order1.id}, 'ALICE', 'M', 'Short Sleeve', 1, 35.00, 35.00),
        (${order1.id}, 'ALICE PRO', 'L', 'Long Sleeve', 1, 40.00, 40.00);
    `

    // Sample Order 2: Brian Lim
    const [order2] = await sql`
      INSERT INTO orders (code, customer_name, contact, notes, status, payment_status, amount_paid, total_price, total_quantity)
      VALUES (
        'SHIRT-3R8W2',
        'Brian Lim',
        'brian.lim@example.com',
        '',
        'in_production',
        'paid',
        116.00,
        116.00,
        3
      )
      RETURNING id;
    `

    await sql`
      INSERT INTO order_items (order_id, shirt_name, size_label, sleeve_label, quantity, unit_price, line_total)
      VALUES
        (${order2.id}, 'CAPTAIN BRIAN', '2XL', 'Short Sleeve', 2, 37.00, 74.00),
        (${order2.id}, 'BRIAN JR', 'S', '3/4 Sleeve', 1, 38.00, 38.00);
    `

    // Sample Order 3: Chloe Davis
    const [order3] = await sql`
      INSERT INTO orders (code, customer_name, contact, notes, status, payment_status, amount_paid, total_price, total_quantity)
      VALUES (
        'SHIRT-9X4F1',
        'Chloe Davis',
        '+60198765432',
        'Will collect at front desk',
        'pending',
        'unpaid',
        0.00,
        35.00,
        1
      )
      RETURNING id;
    `

    await sql`
      INSERT INTO order_items (order_id, shirt_name, size_label, sleeve_label, quantity, unit_price, line_total)
      VALUES
        (${order3.id}, 'CHLOE', 'S', 'Sleeveless', 1, 35.00, 35.00);
    `
    console.log('[db:seed] 3 sample orders inserted with line items.')
  } else {
    console.log(`[db:seed] Orders already exist (${existingOrders[0].count} orders), skipping sample orders.`)
  }

  console.log('[db:seed] Seeding completed successfully!\n')
}

seed().catch((err) => {
  console.error('[db:seed] Seeding failed:', err)
  process.exit(1)
})


# Group Shirt Order System

A production-ready, full-stack Group Shirt Order System built with **Nuxt 3**, **TypeScript**, **Drizzle ORM**, **Neon Serverless PostgreSQL**, and **Tailwind CSS**.

---

## 🌟 Key Features

### Public Portal (No login required)
- **Dynamic Order Page (`/`)**: Displays live event details, base pricing, and live countdown timer until the order deadline.
- **Repeatable Shirt Rows**: Add 1 to 20 custom shirts per order with full customization (custom name on shirt, size, sleeve style, and quantity stepper).
- **Interactive SVG T-Shirt Preview**: Changes silhouette shape in real time based on selected sleeve style (**Short Sleeve**, **Long Sleeve**, **3/4 Sleeve**, **Sleeveless**) while live-previewing the custom name printed on the chest.
- **Live Price Calculation**: Server and client pricing with surcharges computed per size and sleeve type.
- **Collision-Safe Order Codes**: Automatically generates unique, human-friendly order codes (e.g., `SHIRT-7K2M9`).
- **Success Celebration**: Screen overlay with confetti particles, full order breakdown, and instant copy-to-clipboard button.
- **Anti-Spam & Reliability**: Honeypot field, database-backed rate limiting (max 5 orders per 10 minutes per IP), and idempotency protection against double submissions.
- **Order Tracking (`/track`)**: Customers can verify their order status and order items privately using their order code and contact number/email.

### Admin Portal (`/admin` - Protected Session)
- **Secure Authentication**: Sealed session cookies via `nuxt-auth-utils` + bcrypt password verification. Login rate limiting applied.
- **Real-Time Analytics Dashboard**:
  - Animated counter cards for Total Orders, Total Shirts, Total Revenue, Paid Balance, and Unpaid Balance.
  - Interactive Donut chart for shirts demand by size.
  - Interactive Donut chart for shirts demand by sleeve style.
  - Daily order volume chart.
  - Recent orders feed.
- **Orders Management (`/admin/orders`)**:
  - Server-side paginated data table with sorting, search (code, customer, contact, shirt names), and multi-dimensional filters (status, payment, size, sleeve style, date range).
  - Side slide-over drawer to inspect and edit customer info, change statuses, record payments, and edit/add/delete shirt line items.
  - Bulk actions: batch update order status, batch update payment status, and bulk delete.
  - Manual order creation bypassing public deadlines.
- **Excel Export (`/api/admin/export`)**:
  - Generates a styled 4-sheet `.xlsx` workbook via ExcelJS with auto-filters, frozen indigo header, zebra rows, currency formatting, and real Excel `SUM` formulas:
    1. **Orders**: Full breakdown of every line item.
    2. **Summary by Size**: Aggregated sizes with Excel SUM totals.
    3. **Size x Sleeve Matrix**: Cross-tabulation matrix of Sizes vs. Sleeve types with row/column totals.
    4. **Production List**: Grouped and formatted ready to hand over directly to screen printers.
- **Store & Event Settings (`/admin/settings`)**:
  - Event title, description, base price, currency, deadline picker, and store open/closed toggle.
  - Sizes manager with active toggles and per-size surcharges.
  - Sleeve types manager with active toggles and per-sleeve surcharges (safe deactivation so historical orders are never corrupted).
  - Size chart image upload (or fallback built-in measurement table).
  - Admin password generator tool.

---

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3, Vite, Nitro Server Routes)
- **Database**: [Neon](https://neon.tech/) Serverless PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) + `@neondatabase/serverless` (neon-http driver)
- **Styling**: Tailwind CSS, `@nuxtjs/color-mode` (Dark Mode), `@nuxt/icon` (Lucide)
- **Validation**: Zod (shared across client and server)
- **Excel Generation**: [ExcelJS](https://github.com/exceljs/exceljs)
- **Authentication**: `nuxt-auth-utils` + `bcryptjs`
- **Charts**: `chart.js` + `vue-chartjs`
- **Celebration & UX**: `canvas-confetti`, `@formkit/auto-animate`, `@vueuse/core`

---

## 🚀 Setup & Local Development

### 1. Create a Neon PostgreSQL Database
1. Go to [Neon.tech](https://neon.tech) and create a free account.
2. Create a new project (e.g. `shirt-order-db`).
3. In the Neon Console dashboard, copy your connection string. Make sure to choose **Pooled connection** (recommended for serverless environments) or Direct connection:
   ```
   postgresql://<user>:<password>@ep-xyz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
# Neon PostgreSQL connection string
NUXT_DATABASE_URL="postgresql://user:password@ep-xyz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Session encryption key (at least 32 random characters)
NUXT_SESSION_PASSWORD="a-very-long-secret-key-that-is-at-least-32-characters"

# Admin credentials
NUXT_ADMIN_USERNAME="admin"

# Admin password hash (see step 3 to generate)
NUXT_ADMIN_PASSWORD_HASH="$2a$10$..."

# Public Site URL
NUXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Generate Admin Password Hash
Run the included password hashing script:
```bash
npm run admin:hash -- "YourStrongPassword123"
```
Copy the printed bcrypt hash and paste it into `NUXT_ADMIN_PASSWORD_HASH` in your `.env`.

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Database Migrations & Seed Data
Initialize the database tables and default configuration:
```bash
# Apply schema and indexes to Neon
npm run db:migrate

# Seed default settings, sizes, sleeve types, and sample orders
npm run db:seed
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser:
- Public Order Page: [http://localhost:3000](http://localhost:3000)
- Track Order: [http://localhost:3000/track](http://localhost:3000/track)
- Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🧪 Running Unit Tests

Run Vitest to verify pricing logic, order code generation, Zod schemas, and Excel spreadsheet matrix builders:
```bash
npm run test
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/), click **Add New Project** and import the repository.
3. Framework Preset: **Nuxt.js** (automatically detected).
4. In **Environment Variables**, add:
   - `NUXT_DATABASE_URL`: Your Neon **pooled** connection string (ends with `-pooler...` and `?sslmode=require`).
   - `NUXT_SESSION_PASSWORD`: Random string of 32+ characters.
   - `NUXT_ADMIN_USERNAME`: Your admin username (e.g. `admin`).
   - `NUXT_ADMIN_PASSWORD_HASH`: The bcrypt hash generated in step 3.
   - `NUXT_PUBLIC_SITE_URL`: Your production URL (e.g. `https://your-shirts.vercel.app`).
5. Click **Deploy**. Vercel will build and deploy the serverless Nitro app seamlessly.

> **Note on Neon Pooled Connections**: On serverless platforms like Vercel, serverless function instances scale dynamically. Using the Neon pooled connection URL ensures connection limits are never exhausted.

---

## 📖 How to Use the System

### 1. Customer Order Flow
1. Visit `/`.
2. Enter your Full Name and Contact (phone number or email).
3. In each shirt row:
   - Type your custom name (max 20 characters) and watch the **Live T-Shirt SVG Preview** update in real time.
   - Choose your sleeve style: **Short Sleeve**, **Long Sleeve**, **3/4 Sleeve**, or **Sleeveless**. The SVG changes silhouette immediately.
   - Pick your size (e.g., XS to 5XL) and select quantity.
4. Click **"Add Another Shirt"** or **"Duplicate Row"** if ordering for colleagues, friends, or family.
5. Review the live order total in the sticky summary bar.
6. Click **"Submit Order"**. The confetti animation plays, presenting your unique order tracking code (e.g. `SHIRT-7K2M9`).
7. Click **"Copy"** to save your code.

### 2. Customer Order Tracking Flow
1. Visit `/track`.
2. Enter your order code and the contact number/email you registered with.
3. View your order status (Pending, Confirmed, In Production, Ready, Delivered) and line item breakdown.

### 3. Admin Flow
1. Visit `/admin/login` and sign in with your admin credentials.
2. **Dashboard (`/admin`)**: View real-time charts and revenue stats.
3. **Orders (`/admin/orders`)**:
   - Filter orders by size, sleeve type, status, payment status, or date range.
   - Click any order row to open the details drawer. Edit customer info, add/modify shirt items, record amount paid, and update status.
   - Select multiple orders to execute batch actions (e.g. change status to *In Production*).
   - Click **"Export Excel"** to download the 4-sheet production and matrix spreadsheet.
4. **Settings (`/admin/settings`)**:
   - Update event title, campaign description, base price, currency, or deadline.
   - Add, reorder, or update size and sleeve surcharges.
   - Toggle store open/closed status.

---

## 🔧 Troubleshooting

- **Database Connection Error (`ECONNREFUSED` or Cold Start)**:
  - Check that `NUXT_DATABASE_URL` is set correctly in `.env`.
  - Ensure `?sslmode=require` is present at the end of the Neon connection string.
- **Admin Login Fails (401 Unauthorized)**:
  - Run `npm run admin:hash -- "yourpassword"` and make sure the output string is copied in full to `NUXT_ADMIN_PASSWORD_HASH` in `.env`.
  - Restart the dev server (`npm run dev`) after changing `.env`.
- **Excel Download Issues**:
  - The Excel export endpoint returns raw binary data (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`). It must be accessed while logged into the admin session.


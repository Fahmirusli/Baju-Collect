CREATE TABLE IF NOT EXISTS "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_title" text DEFAULT 'Group Shirt Order' NOT NULL,
	"event_description" text DEFAULT '',
	"currency" text DEFAULT 'MYR' NOT NULL,
	"base_price" numeric(10, 2) DEFAULT '35' NOT NULL,
	"deadline" timestamp with time zone,
	"is_open" boolean DEFAULT true NOT NULL,
	"size_chart_image" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sizes" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"surcharge" numeric(10, 2) DEFAULT '0' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "sizes_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sleeve_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"surcharge" numeric(10, 2) DEFAULT '0' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "sleeve_types_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"customer_name" text NOT NULL,
	"contact" text NOT NULL,
	"notes" text DEFAULT '',
	"admin_notes" text DEFAULT '',
	"status" text DEFAULT 'pending' NOT NULL,
	"payment_status" text DEFAULT 'unpaid' NOT NULL,
	"amount_paid" numeric(10, 2) DEFAULT '0',
	"total_price" numeric(10, 2) NOT NULL,
	"total_quantity" integer NOT NULL,
	"ip_hash" text,
	"idempotency_key" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "orders_code_unique" UNIQUE("code"),
	CONSTRAINT "orders_idempotency_key_unique" UNIQUE("idempotency_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"shirt_name" text NOT NULL,
	"size_label" text NOT NULL,
	"sleeve_label" text DEFAULT 'Short Sleeve' NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"line_total" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rate_limits" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"count" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_code_idx" ON "orders" USING btree ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_order_id_idx" ON "order_items" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_size_label_idx" ON "order_items" USING btree ("size_label");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_sleeve_label_idx" ON "order_items" USING btree ("sleeve_label");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rate_limits_key_idx" ON "rate_limits" USING btree ("key");


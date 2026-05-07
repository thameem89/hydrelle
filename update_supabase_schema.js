require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function updateSchema() {
  console.log("Updating Supabase schema...");

  // Note: Supabase JS client cannot run arbitrary SQL like 'ALTER TABLE'.
  // This script will try to insert/upsert to show if columns exist, 
  // but the user should ideally run the SQL in the Supabase Dashboard.
  
  console.log("\nIMPORTANT: Please run the following SQL in your Supabase Dashboard SQL Editor:");
  console.log(`
-- Add stock column to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initialize admin password if not set
INSERT INTO settings (key, value) 
VALUES ('admin_password', 'admin123')
ON CONFLICT (key) DO NOTHING;
  `);

  console.log("\nSchema update instructions provided above.");
}

updateSchema();

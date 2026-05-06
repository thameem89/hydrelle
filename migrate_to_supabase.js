require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrate() {
  console.log("Starting migration to Supabase...");
  
  const filePath = path.join(process.cwd(), 'hydrelle_products.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);
  const products = data.products || data;

  for (const product of products) {
    console.log(`Migrating: ${product.name}`);
    
    // Clean up product object for Postgres
    const { id, ...productData } = product;
    
    const { error } = await supabase
      .from('products')
      .upsert({
        name: productData.name,
        category: productData.category,
        price_aed: productData.price_aed,
        price_usd: productData.price_usd,
        amazon_link: productData.amazon_link,
        description: productData.description,
        image_url: productData.image_url,
        images: productData.images || [],
        videos: productData.videos || [],
        details: productData.details || {},
        price: productData.price
      }, { onConflict: 'name' }); // Using name as conflict key for migration

    if (error) {
      console.error(`Error migrating ${product.name}:`, error.message);
    }
  }

  console.log("Migration finished!");
}

migrate();

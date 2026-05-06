import { supabase } from './supabase';
import fs from 'fs';
import path from 'path';

const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here';

export async function getAllProducts() {
  if (useSupabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Supabase fetch error:', error);
      return getJsonProducts();
    }
    return data;
  }
  return getJsonProducts();
}

function getJsonProducts() {
  const filePath = path.join(process.cwd(), 'hydrelle_products.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);
  return data.products || data;
}

export async function addProduct(product: any) {
  if (useSupabase) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    if (error) throw error;
    return data[0];
  }
  return null;
}

export async function updateProduct(id: string, product: any) {
  if (useSupabase) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }
  return null;
}

export async function deleteProduct(id: string) {
  if (useSupabase) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
  return false;
}


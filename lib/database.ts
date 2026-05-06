import { supabase, getSupabaseAdmin } from './supabase';

const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here';

export async function getAllProducts() {
  if (useSupabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Supabase fetch error:', error);
      return null;
    }
    return data;
  }
  return null;
}

export async function addProduct(product: any) {
  if (useSupabase) {
    const adminClient = getSupabaseAdmin();
    const { data, error } = await adminClient
      .from('products')
      .insert([product])
      .select();
    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    return data[0];
  }
  return null;
}

export async function updateProduct(id: string, product: any) {
  if (useSupabase) {
    const adminClient = getSupabaseAdmin();
    const { data, error } = await adminClient
      .from('products')
      .update(product)
      .eq('id', id)
      .select();
    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }
    return data[0];
  }
  return null;
}

export async function deleteProduct(id: string) {
  if (useSupabase) {
    const adminClient = getSupabaseAdmin();
    const { error } = await adminClient
      .from('products')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Supabase delete error:', error);
      throw error;
    }
    return true;
  }
  return false;
}




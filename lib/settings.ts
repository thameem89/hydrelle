import { supabase, getSupabaseAdmin } from './supabase';
import fs from 'fs';
import path from 'path';

const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here';

export async function getAdminPassword() {
  if (useSupabase) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();
      
      if (data && !error) {
        return data.value;
      }
    } catch (e) {
      console.error('Error fetching password from Supabase:', e);
    }
  }
  
  // Fallback to env
  return process.env.ADMIN_PASSWORD || 'admin123';
}

export async function updateAdminPassword(newPassword: string) {
  if (useSupabase) {
    const adminClient = getSupabaseAdmin();
    const { error } = await adminClient
      .from('settings')
      .upsert({ key: 'admin_password', value: newPassword }, { onConflict: 'key' });
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return true;
  }
  
  // If no Supabase, we can't really persist this across restarts/redeployments easily without a DB
  // But we can at least try to store it in a local JSON file as a secondary fallback
  const settingsPath = path.join(process.cwd(), 'settings.json');
  const settings = { admin_password: newPassword };
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  return true;
}

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fjzdsxawpgnprjsxvnfg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uOmY3qnB9_GqqurEHicZrA_RfEcEycd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cloud Sync Helpers
export async function fetchVaultItemsFromCloud() {
  try {
    const { data, error } = await supabase.from('vault_items').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch items error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline or error:', err);
    return null;
  }
}

export async function saveVaultItemToCloud(item) {
  try {
    const { error } = await supabase.from('vault_items').upsert(item);
    if (error) console.warn('Supabase upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase save error:', err);
  }
}

export async function deleteVaultItemFromCloud(id) {
  try {
    const { error } = await supabase.from('vault_items').delete().eq('id', id);
    if (error) console.warn('Supabase delete error:', error.message);
  } catch (err) {
    console.warn('Supabase delete error:', err);
  }
}

export async function fetchTeamInvitesFromCloud() {
  try {
    const { data, error } = await supabase.from('team_invitations').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch invites error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline or error:', err);
    return null;
  }
}

export async function saveTeamInviteToCloud(invite) {
  try {
    const { error } = await supabase.from('team_invitations').upsert(invite);
    if (error) console.warn('Supabase invite upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase invite save error:', err);
  }
}

export async function acceptInviteWithPin(pin, partnerEmail) {
  try {
    const { data, error } = await supabase
      .from('team_invitations')
      .update({ status: 'active', email: partnerEmail || undefined })
      .eq('pin', pin)
      .select();
    if (error) return { success: false, message: error.message };
    if (!data || data.length === 0) return { success: false, message: 'Invalid 4-digit PIN!' };
    return { success: true, invite: data[0] };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

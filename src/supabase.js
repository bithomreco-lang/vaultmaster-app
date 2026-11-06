import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fjzdsxawpgnprjsxvnfg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uOmY3qnB9_GqqurEHicZrA_RfEcEycd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bidirectional Mappers for vault_items (Postgres lowercase <-> App camelCase)
export function toCloudItem(item) {
  if (!item) return null;
  return {
    id: item.id,
    category: item.category || 'blog',
    title: item.title || '',
    url: item.url || '',
    adminurl: item.adminUrl || item.adminurl || '',
    username: item.username || '',
    password: item.password || '',
    linkedgmail: item.linkedGmail || item.linkedgmail || '',
    wpadminemail: item.wpAdminEmail || item.wpadminemail || '',
    adsenseemail: item.adsenseEmail || item.adsenseemail || '',
    analyticsemail: item.analyticsEmail || item.analyticsemail || '',
    hostingemail: item.hostingEmail || item.hostingemail || '',
    linkedhost: item.linkedHost || item.linkedhost || '',
    domainregistrar: item.domainRegistrar || item.domainregistrar || '',
    expirydate: item.expiryDate || item.expirydate || '',
    status: item.status || 'healthy',
    analyticsaccount: item.analyticsAccount || item.analyticsaccount || '',
    monetizationtype: item.monetizationType || item.monetizationtype || 'none',
    monetizationdetails: item.monetizationDetails || item.monetizationdetails || '',
    linkedgithub: item.linkedGithub || item.linkedgithub || '',
    linkedvercel: item.linkedVercel || item.linkedvercel || '',
    customtype: item.customType || item.customtype || '',
    customfields: item.customFields || item.customfields || [],
    notes: item.notes || ''
  };
}

export function fromCloudItem(row) {
  if (!row) return null;
  return {
    id: row.id,
    category: row.category || 'blog',
    title: row.title || '',
    url: row.url || '',
    adminUrl: row.adminurl || row.adminUrl || '',
    username: row.username || '',
    password: row.password || '',
    linkedGmail: row.linkedgmail || row.linkedGmail || '',
    wpAdminEmail: row.wpadminemail || row.wpAdminEmail || '',
    adsenseEmail: row.adsenseemail || row.adsenseEmail || '',
    analyticsEmail: row.analyticsemail || row.analyticsEmail || '',
    hostingEmail: row.hostingemail || row.hostingEmail || '',
    linkedHost: row.linkedhost || row.linkedHost || '',
    domainRegistrar: row.domainregistrar || row.domainRegistrar || '',
    expiryDate: row.expirydate || row.expiryDate || '',
    status: row.status || 'healthy',
    analyticsAccount: row.analyticsaccount || row.analyticsAccount || '',
    monetizationType: row.monetizationtype || row.monetizationType || 'none',
    monetizationDetails: row.monetizationdetails || row.monetizationDetails || '',
    linkedGithub: row.linkedgithub || row.linkedGithub || '',
    linkedVercel: row.linkedvercel || row.linkedVercel || '',
    customType: row.customtype || row.customType || '',
    customFields: row.customfields || row.customFields || [],
    notes: row.notes || ''
  };
}

// Bidirectional Mappers for team_invitations
export function toCloudInvite(inv) {
  if (!inv) return null;
  return {
    id: inv.id,
    name: inv.name || (inv.email ? inv.email.split('@')[0] : ''),
    email: inv.email ? inv.email.trim().toLowerCase() : '',
    role: inv.role || 'editor',
    pin: inv.pin || '',
    status: inv.status || 'pending',
    invitedat: inv.invitedAt || inv.invitedat || 'Today'
  };
}

export function fromCloudInvite(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || (row.email ? row.email.split('@')[0] : ''),
    email: row.email ? row.email.trim().toLowerCase() : '',
    role: row.role || 'editor',
    pin: row.pin || '',
    status: row.status || 'pending',
    invitedAt: row.invitedat || row.invitedAt || 'Today'
  };
}

export async function fetchVaultItemsFromCloud() {
  try {
    const { data, error } = await supabase.from('vault_items').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch items error:', error.message);
      return null;
    }
    return (data || []).map(fromCloudItem);
  } catch (err) {
    console.warn('Supabase offline or error:', err);
    return null;
  }
}

export async function saveVaultItemToCloud(item) {
  try {
    const cloudRow = toCloudItem(item);
    const { error } = await supabase.from('vault_items').upsert(cloudRow);
    if (error) {
      console.warn('Supabase upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase save error:', err);
    return false;
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
    return (data || []).map(fromCloudInvite);
  } catch (err) {
    console.warn('Supabase offline or error:', err);
    return null;
  }
}

export async function saveTeamInviteToCloud(invite) {
  try {
    const cloudInvite = toCloudInvite(invite);
    const { error } = await supabase.from('team_invitations').upsert(cloudInvite);
    if (error) console.warn('Supabase invite upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase invite save error:', err);
  }
}

export async function acceptInviteWithPin(pin, partnerEmail) {
  try {
    const { data, error } = await supabase
      .from('team_invitations')
      .update({ status: 'active', email: partnerEmail ? partnerEmail.trim().toLowerCase() : undefined })
      .eq('pin', pin.trim())
      .select();
    if (error) return { success: false, message: error.message };
    if (!data || data.length === 0) return { success: false, message: 'Invalid 4-digit PIN!' };
    return { success: true, invite: fromCloudInvite(data[0]) };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

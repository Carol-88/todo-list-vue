import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'tu_supabase_url';
const SUPABASE_ANON_KEY = 'tu_supabase_anon_key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

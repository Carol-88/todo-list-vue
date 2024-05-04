import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jzxwknpxvgtmuwqngkva.supabase.co';
const SUPABASE_ANON_KEY = import.meta.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

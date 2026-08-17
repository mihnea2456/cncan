import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mnkeuigogvwujtciqwpu.supabase.co';
const supabaseAnonKey = 'sb_publishable_cJVo8R7QL8dLD7nFkJ-yVQ_ktRVw0D3';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

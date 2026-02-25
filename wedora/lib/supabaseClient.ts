import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Shared Supabase client - koristi se svugdje u aplikaciji
export const supabase = createClient(supabaseUrl, supabaseKey);

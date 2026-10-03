import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If env keys are missing, supabase = null and the app runs in demo mode.
export const supabase = url && key ? createClient(url, key) : null;

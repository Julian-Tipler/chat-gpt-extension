import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_API_URL || "";
const supabaseAnonKey: string = import.meta.env.VITE_WISE_API_TOKEN || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;

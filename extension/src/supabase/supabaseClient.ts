// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_PROJECT_URL || "";
const supabaseAnonKey: string = import.meta.env.VITE_CLIENT_API_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;

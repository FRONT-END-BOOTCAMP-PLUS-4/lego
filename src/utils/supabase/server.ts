import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE!;

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseKey);
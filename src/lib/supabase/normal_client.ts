import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";


//? we didn't use supabase url and supabase key with createBrowserSupabaseClient because we follwed naming convention for supabase enviornment variables
export const supabase = createBrowserSupabaseClient();
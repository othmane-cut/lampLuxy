import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL and Key must be provided in environment variables.");
    return null as any;
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};

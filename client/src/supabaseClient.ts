// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Use Vite's import.meta.env to access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This is a check to make sure you've set your variables.
// It will give a clearer error message if they are missing.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and/or Anon Key are missing from your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js';

// User-provided Supabase URL and anon key
const supabaseUrl = 'https://gunuertpbikffrbwrdyr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bnVlcnRwYmlrZmZyYndyZHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NTQzMDgsImV4cCI6MjAzMzIyMDMwOH0.D--3DWCo3a6aR__-eJt2i6uU_x0vCo7lAst6l6s24w4';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

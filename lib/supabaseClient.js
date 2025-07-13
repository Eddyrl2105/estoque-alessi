import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://urwtgvzsmxsdsfrvyoui.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyd3RndnpzbXhzZHNmcnZ5b3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNjkxMDQsImV4cCI6MjA2Nzk0NTEwNH0.IhFF5AqFsuBsvzp8q7N3lw43e0oOsAXGYeW0pwEC75w'
)
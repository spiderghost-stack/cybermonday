/**
 * ADMIN CLIENT — Service Role
 * ⚠️  NE JAMAIS importer ce fichier dans un Client Component ("use client")
 * ⚠️  UNIQUEMENT pour les Server Actions, Server Components, ou Edge Functions
 * La clé service_role contourne le RLS — utiliser avec extrême précaution.
 */
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase admin env variables. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Export en singleton pour éviter la création multiple
export const adminClient = createAdminClient()

import { createClient } from '@supabase/supabase-js'

export const supabase
    = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/* INVITE USER */
// let { data, error } = await supabase.auth.api.inviteUserByEmail('someone@email.com')

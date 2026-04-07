import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjnysoqptrazjwyxbrdd.supabase.co'
const supabaseKey = 'sb_publishable_6jwAjnVbKC_hYVNt68re6g_Qolk2Iod'

export const supabase = createClient(supabaseUrl, supabaseKey)
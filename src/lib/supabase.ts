import { createClient } from '@supabase/supabase-js'

// 直接使用环境变量值
const supabaseUrl = 'https://pxpgkepnqzgknebnxcbk.supabase.co'
const supabaseKey = 'sb_publishable_BPXw1Cq2u_A1TZlF1eap6g_X6JTFOeT'

export const supabase = createClient(supabaseUrl, supabaseKey)

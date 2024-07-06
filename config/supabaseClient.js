//require('dotenv').config();
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NODE_SUPABASE_URL
const supabaseKey = process.env.E_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default  supabase
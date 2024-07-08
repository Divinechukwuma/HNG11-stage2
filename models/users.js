const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(process.env.NODE_SUPABASE_URL,process.env.NODE_SUPABASE_API_KEY);

class User{
    static async create(userData){
        return await supabase.from('users').insert([userData]).single();
    }

    static async findByEmail(email){
        return await supabase.from('users').select('*').eq('email',email).single();
    }

    static async findById(userId){
        return await supabase.from('users').select('*').eq('userId',userId).single();
    }
}

module.exports = User;
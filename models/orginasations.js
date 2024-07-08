const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(process.env.NODE_SUPABASE_URL,process.env.NODE_SUPABASE_API_KEY);

class Organisation {
     
    static async create(orgId){
        return await supabase.from('organisations').insert([orgData]).single();

    }

    static async findByUserId(userId){
        return await supabase.from('organisations').select('*').eq('userId', userId);

    }

    static async findById(orgId){
        return await supabase.from('organisation').select('*').eq('orgId', orgId).single();
    }

}

module.exports = Organisation;
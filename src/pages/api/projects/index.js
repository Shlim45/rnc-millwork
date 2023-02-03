import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
    let { data } = await supabase.from('projects').select('*');

    res.status(200).json(data);
}
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
    const id = req.query.id;
    let { data } = await supabase.from('projects').select('*').eq('id', id).single();

    if (data)
        res.status(200).json(data);
    else
        res.status(404).json({ message: `Project ID ${id} not found.` })
}